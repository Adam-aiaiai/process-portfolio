function updateDate() {
  const now = new Date();
  const monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const month = monthNames[now.getMonth()];
  const day = now.getDate();
  document.getElementById("today-date").textContent = `${month} ${day}`;
}
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? "0"+hours : hours;
  minutes = minutes < 10 ? "0"+minutes : minutes;
  document.getElementById("today-time").textContent = `${hours}:${minutes}`;
}
function startLoadingDots() {
  const text = document.getElementById("loadingText");
  let dots = 0;
  setInterval(() => {
    dots = (dots + 1) % 4;
    text.textContent = "Loading" + ".".repeat(dots);
  }, 300);
}
startLoadingDots();
function hideLoadingScreen() {
  const loading = document.getElementById("loadingScreen");
  setTimeout(() => {
    loading.classList.add("hidden");
  }, 800);
}
function initAutoExit() {
  const ticket = document.getElementById("ticket");
  const wrapper = document.querySelector(".exhibition-wrapper");
  const sky = document.querySelector(".sky");

  let isExiting = false;
  ticket.addEventListener("mouseenter", () => {
    triggerExit();
  });
  ticket.addEventListener("touchstart", (e) => {
    e.preventDefault();
    triggerExit();
  });

  function triggerExit() {
    if (isExiting) return;
    isExiting = true;

    ticket.classList.add("hold-open");

    setTimeout(() => {
      wrapper.classList.add("fade-out");
      sky.classList.add("show");
      setTimeout(() => {
        sky.classList.add("fade-to-light");

        setTimeout(() => {
            sky.style.opacity = 0;
            const finalScene = document.querySelector(".final-scene");
            finalScene.classList.add("show");
          }, 500);
      }, 1000);

    }, 600);
  }
}
function initClouds() {
  const scene = document.querySelector('.sky');
  if (!scene) return;

  const numClouds = 6;

  const cloudTemplate = `
  <div class="cloud">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 64" shape-rendering="crispEdges">
      <rect x="24" y="32" width="16" height="16" fill="#fff"/>
      <rect x="40" y="32" width="16" height="16" fill="#fff"/>
      <rect x="56" y="32" width="16" height="16" fill="#fff"/>
      <rect x="72" y="32" width="16" height="16" fill="#fff"/>
      <rect x="40" y="16" width="16" height="16" fill="#fff"/>
      <rect x="56" y="16" width="16" height="16" fill="#fff"/>
      <rect x="72" y="16" width="16" height="16" fill="#fff"/>
    </svg>
  </div>`;

  for (let i = 0; i < numClouds; i++) {
    scene.innerHTML += cloudTemplate;
  }

  const clouds = document.querySelectorAll('.cloud');
  clouds.forEach(cloud => {
    const size = (Math.random() * 50 + 50) / 100;
    const speed = Math.random() * 50 + 40;
    const top = Math.random() * 75 + 10 + '%';
    const delay = Math.random() * -40;

    cloud.style.cssText = `
      position: absolute;
      width: 120px;
      height: 60px;
      top: ${top};
      transform: scale(${size});
      opacity: ${size * 0.95};
      animation: cloudMove ${speed}s linear ${delay}s infinite;
    `;
  });
}

const style = document.createElement('style');
style.textContent = `
@keyframes cloudMove {
  0% { transform: translateX(-150px); }
  100% { transform: translateX(calc(100vw + 150px)); }
}
`;
document.head.appendChild(style);
function initStardewUI() {
  let toggleDropdown = document.querySelector('.menu-icon');
  let dropdown = document.querySelector('.dropdown-nav');
  let dropdownItems = document.querySelectorAll('.dropdown-nav a');
  let form = document.getElementById('question');

  if (!form || !toggleDropdown || !dropdown) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Your question has been submitted");
  });

  function checkState() {
    dropdown.classList.toggle("closed");
  }

  toggleDropdown.addEventListener('click', checkState);

  dropdownItems.forEach((item) => {
    item.addEventListener('click', checkState);
  });
}

const waitForScene = setInterval(() => {
  if (document.querySelector(".final-scene.show")) {
    initStardewUI();
    clearInterval(waitForScene);
  }
}, 500);
function initTimelineScroll() {
  const timelineSidebar = document.getElementById('timelineSidebar');
  const timelineToggle = document.getElementById('timelineToggle');
  const timelineItems = document.querySelectorAll('.timeline-item, .timeline-subitem');
  const sections = [];

  if (!timelineSidebar || timelineItems.length === 0) return;
  if (timelineSidebar.dataset.timelineInit === '1') return;
  timelineSidebar.dataset.timelineInit = '1';
  timelineItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        sections.push({
          item: item,
          section: section
        });
      }
    }
  });

  function highlightTimeline() {
    let currentSection = null;

    sections.forEach(({ item, section }) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.pageYOffset;
      const sectionHeight = rect.height;
      if (window.pageYOffset >= sectionTop - 200 && 
          window.pageYOffset < sectionTop + sectionHeight - 200) {
        currentSection = item;
      }
    });

    timelineItems.forEach(item => item.classList.remove('active'));
    if (currentSection) {
      currentSection.classList.add('active');
    }
  }

  const syncToggle = (collapsed) => {
    timelineSidebar.classList.toggle('is-collapsed', collapsed);
    if (!timelineToggle) return;
    timelineToggle.textContent = collapsed ? '▶' : '◀';
    timelineToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    timelineToggle.setAttribute('aria-label', collapsed ? 'Expand timeline' : 'Collapse timeline');
  };

  if (timelineToggle) {
    timelineToggle.addEventListener('click', () => {
      syncToggle(!timelineSidebar.classList.contains('is-collapsed'));
    });
  }

  syncToggle(false);
  window.addEventListener('scroll', highlightTimeline, { passive: true });
  highlightTimeline();
}
function initPortfolioPixel() {
  const figmaBtn = document.getElementById('figmaPixelBtn');
  const pixelMockup = document.getElementById('pixelMockup');

  if (!figmaBtn || !pixelMockup) return;

  figmaBtn.addEventListener('click', () => {
    const isOpen = pixelMockup.style.display === 'block';
    pixelMockup.style.display = isOpen ? 'none' : 'block';
    figmaBtn.textContent = isOpen
      ? '🎨 Expand Low-Fi Prototype Demo'
      : '📦 Close Prototype Demo';
  });
}

function initPortfolioReadingMode() {
  const portfolio = document.querySelector('.portfolio-pixel');
  if (!portfolio || portfolio.dataset.readingReady === '1') return;

  const sections = Array.from(portfolio.querySelectorAll('.portfolio-section'));
  const nav = portfolio.querySelector('.portfolio-nav');
  if (!sections.length || !nav) return;

  portfolio.dataset.readingReady = '1';
  portfolio.classList.add('reading-mode');

  const accentPalette = ['#b8743f', '#b8743f', '#b8743f', '#b8743f', '#b8743f'];
  const sectionMeta = [];

  const dock = document.createElement('div');
  dock.className = 'reading-dock';
  nav.parentNode.insertBefore(dock, nav);
  dock.append(nav);

  const navItems = Array.from(nav.querySelectorAll('.nav-item[href^="#"]'));

  const wrapReadingBlocks = (bodyInner) => {
    const nodes = Array.from(bodyInner.childNodes).filter((node) => {
      return node.nodeType !== 3 || node.textContent.trim() !== '';
    });

    bodyInner.replaceChildren();

    let activePanel = null;

    const createPanel = (subtitleNode = null) => {
      const panel = document.createElement('div');
      panel.className = 'micro-section';

      if (!subtitleNode) {
        panel.classList.add('micro-section--plain');
      } else {
        const head = document.createElement('div');
        head.className = 'micro-section-head';
        head.appendChild(subtitleNode);
        panel.appendChild(head);
      }

      bodyInner.appendChild(panel);
      return panel;
    };

    nodes.forEach((node) => {
      const isSubtitle = node.nodeType === 1 && node.classList.contains('pixel-subtitle');
      if (isSubtitle) {
        activePanel = createPanel(node);
        return;
      }

      if (!activePanel) {
        activePanel = createPanel();
      }

      activePanel.appendChild(node);
    });

    if (!bodyInner.children.length) {
      createPanel();
    }

    Array.from(bodyInner.children).forEach((child, revealIndex) => {
      child.style.setProperty('--reveal-order', String(revealIndex));
    });
  };

  sections.forEach((section, index) => {
    const title = section.querySelector('h2.pixel-title');
    if (!title) return;

    const subtitle = title.nextElementSibling && title.nextElementSibling.classList.contains('pixel-subtitle')
      ? title.nextElementSibling
      : null;
    const firstBodyNode = subtitle ? subtitle.nextSibling : title.nextSibling;

    const head = document.createElement('div');
    head.className = 'reading-head';

    const copy = document.createElement('div');
    copy.className = 'reading-head-copy';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'reading-toggle';
    toggle.setAttribute('aria-label', `Toggle ${title.textContent.trim()}`);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '+';

    title.style.marginBottom = '0';
    title.style.display = 'block';
    title.style.paddingBottom = '6px';
    if (subtitle) {
      subtitle.style.marginTop = '8px';
      subtitle.style.marginBottom = '0';
    }

    title.before(head);
    head.append(copy, toggle);
    copy.append(title);
    if (subtitle) {
      copy.append(subtitle);
    }

    const body = document.createElement('div');
    body.className = 'reading-body';
    const bodyInner = document.createElement('div');
    bodyInner.className = 'reading-body-inner';
    body.append(bodyInner);

    let cursor = firstBodyNode;
    while (cursor) {
      const next = cursor.nextSibling;
      bodyInner.appendChild(cursor);
      cursor = next;
    }
    wrapReadingBlocks(bodyInner);
    section.appendChild(body);

    const accent = accentPalette[index % accentPalette.length];
    section.style.setProperty('--section-accent', accent);
    sectionMeta.push({ section, toggle });
  });

  const setNavActive = (sectionId) => {
    navItems.forEach((item) => {
      const targetId = item.getAttribute('href').slice(1);
      const isActive = targetId === sectionId;
      item.classList.toggle('is-active', isActive);
      if (isActive) {
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  };

  const setSectionState = (entry, isOpen) => {
    entry.section.classList.toggle('is-open', isOpen);
    entry.toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    entry.toggle.textContent = isOpen ? '-' : '+';
  };

  sectionMeta.forEach((entry) => {
    setSectionState(entry, true);
  });

  navItems.forEach((item) => {
    const targetId = item.getAttribute('href').slice(1);
    const targetEntry = sectionMeta.find((entry) => entry.section.id === targetId);
    if (!targetEntry) return;

    item.addEventListener('click', (event) => {
      event.preventDefault();
      setNavActive(targetEntry.section.id);
      requestAnimationFrame(() => {
        targetEntry.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      if (event.detail > 0) {
        item.blur();
      }
    });
  });

  setNavActive(sectionMeta[0] ? sectionMeta[0].section.id : null);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setNavActive(visible.target.id);
      }
    }, {
      rootMargin: '-35% 0px -45% 0px',
      threshold: [0.25, 0.5, 0.75]
    });

    sectionMeta.forEach((entry) => observer.observe(entry.section));
  }

  const initPaperFlipCards = () => {
    const paperCards = Array.from(document.querySelectorAll('#motivation-research .paper-grid .paper-item'));
    if (!paperCards.length) return;

    const paperTones = [
      { front: '#fff7e9', back: '#fffdf6', border: '#d8b58c', hint: '#f7e1c8' },
      { front: '#f4fbef', back: '#fbfff8', border: '#aeca98', hint: '#e1efda' },
      { front: '#eef6ff', back: '#f9fbff', border: '#9fb6dd', hint: '#dde8f7' },
      { front: '#fff3ef', back: '#fffafa', border: '#dfac9e', hint: '#f6ddd7' },
      { front: '#f7f0ff', back: '#fcfbff', border: '#c6a7e6', hint: '#ebdef7' }
    ];

    paperCards.forEach((card, index) => {
      if (card.dataset.flipReady === '1') return;

      const strong = card.querySelector('strong');
      const title = strong ? strong.textContent.trim() : `Academic Paper ${index + 1}`;
      const bodyHTML = card.innerHTML;

      card.dataset.flipReady = '1';
      card.classList.add('paper-flip-card');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');
      card.setAttribute('aria-label', `Flip ${title}`);

      const tone = paperTones[index % paperTones.length];
      card.style.setProperty('--paper-front-bg', tone.front);
      card.style.setProperty('--paper-back-bg', tone.back);
      card.style.setProperty('--paper-border', tone.border);
      card.style.setProperty('--paper-hint-bg', tone.hint);

      const inner = document.createElement('div');
      inner.className = 'paper-flip-inner';
      inner.innerHTML = `
        <div class="paper-flip-face paper-flip-front">
          <div class="paper-flip-title">${title}</div>
          <div class="paper-flip-hint">Click to view details</div>
        </div>
        <div class="paper-flip-face paper-flip-back">
          ${bodyHTML}
        </div>
      `;

      card.innerHTML = '';
      card.appendChild(inner);

      const toggleFlip = () => {
        const flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-expanded', flipped ? 'true' : 'false');
      };

      card.addEventListener('click', (event) => {
        if (event.target.closest('a')) return;
        toggleFlip();
      });

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleFlip();
        }
      });
    });
  };

  initPaperFlipCards();

  const initPersonaFlipCards = () => {
    const personaCards = Array.from(document.querySelectorAll('.persona-flip-card'));
    if (!personaCards.length) return;

    personaCards.forEach((card) => {
      if (card.dataset.flipReady === '1') return;
      card.dataset.flipReady = '1';

      const toggleFlip = () => {
        const flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-expanded', flipped ? 'true' : 'false');
      };

      card.addEventListener('click', (event) => {
        if (event.target.closest('a')) return;
        toggleFlip();
      });

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleFlip();
        }
      });
    });
  };

  initPersonaFlipCards();

  const zoomTargets = Array.from(document.querySelectorAll(
    '#hero .hero-img, .portfolio-pixel img, #footerStyle .logo-gif'
  )).filter((img) => !img.closest('a') && !img.dataset.noZoom);

  zoomTargets.forEach((img) => {
    if (img.dataset.zoomBound === '1') return;
    img.dataset.zoomBound = '1';
    img.classList.add('zoomable-image');
    img.addEventListener('click', () => openZoom(img));
  });
}

function initHeroTitleTyping() {
  const title = document.querySelector('.page-title');
  const finalScene = document.querySelector('.final-scene');

  if (!title || title.dataset.typingBound === '1') return;
  title.dataset.typingBound = '1';

  const fullText = title.dataset.fullText || title.textContent.trim() || 'RunBuddy';
  title.dataset.fullText = fullText;

  const playTyping = () => {
    const chars = Array.from(fullText);
    let index = 0;
    const startDelay = 320;
    const charDelay = 190;
    const finishDelay = 220;

    title.textContent = '';
    title.classList.add('is-typing');

    const typeNext = () => {
      title.textContent = chars.slice(0, index + 1).join('');

      if (index === 0) {
        document.documentElement.classList.remove('runbuddy-title-pending');
      }

      index += 1;

      if (index < chars.length) {
        window.setTimeout(typeNext, index === chars.length - 1 ? finishDelay : charDelay);
      }
    };

    window.setTimeout(typeNext, startDelay);
  };

  if (finalScene && finalScene.classList.contains('show')) {
    playTyping();
    return;
  }

  if (!finalScene) {
    title.textContent = fullText;
    document.documentElement.classList.remove('runbuddy-title-pending');
    return;
  }

  const observer = new MutationObserver(() => {
    if (finalScene.classList.contains('show')) {
      observer.disconnect();
      playTyping();
    }
  });

  observer.observe(finalScene, { attributes: true, attributeFilter: ['class'] });
}

const portfolioInterval = setInterval(() => {
  const final = document.querySelector('.final-scene.show');
  if (final) {
    initPortfolioPixel();
    initTimelineScroll();
    clearInterval(portfolioInterval);
  }
}, 300);
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  const progressFill = document.getElementById('scrollProgressFill');
  const progressTooltip = document.getElementById('scrollProgressTooltip');

  if (!progressBar || !progressFill || !progressTooltip) return;

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    progressFill.style.height = `${Math.min(progress, 100)}%`;
    progressTooltip.textContent = `${Math.round(progress)}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientY - rect.top;
    const percentage = clickPosition / rect.height;
    const targetScroll = percentage * (document.documentElement.scrollHeight - window.innerHeight);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  });
}
function openZoom(img) {
  const existing = document.querySelector('.image-zoom-overlay');
  if (existing) existing.remove();

  const zoomDiv = document.createElement('div');
  zoomDiv.className = 'image-zoom-overlay';
  zoomDiv.innerHTML = `
    <button type="button" class="image-zoom-close" aria-label="Close zoom">×</button>
  `;

  const zoomImg = document.createElement('img');
  zoomImg.src = img.src;
  zoomImg.alt = img.alt || '';
  zoomImg.className = 'image-zoomed';

  zoomDiv.appendChild(zoomImg);
  document.body.appendChild(zoomDiv);

  const closeZoom = () => {
    document.removeEventListener('keydown', handleKeydown);
    if (zoomDiv.parentNode) {
      zoomDiv.parentNode.removeChild(zoomDiv);
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      closeZoom();
    }
  };

  zoomDiv.addEventListener('click', (event) => {
    if (event.target === zoomDiv || event.target.classList.contains('image-zoom-close')) {
      closeZoom();
    }
  });

  document.addEventListener('keydown', handleKeydown);
}
window.onload = function () {
  hideLoadingScreen();

  updateDate();
  updateTime();
  setInterval(updateTime, 60000);
  initAutoExit();
  initClouds();
  initPortfolioReadingMode();
  initScrollProgress();
  initTimelineScroll();
  initHeroTitleTyping();
};
