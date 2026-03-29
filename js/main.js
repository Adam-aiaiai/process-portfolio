// 自动更新日期
function updateDate() {
  const now = new Date();
  const monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const month = monthNames[now.getMonth()];
  const day = now.getDate();
  document.getElementById("today-date").textContent = `${month} ${day}`;
}

// 自动更新时间
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours = hours < 10 ? "0"+hours : hours;
  minutes = minutes < 10 ? "0"+minutes : minutes;
  document.getElementById("today-time").textContent = `${hours}:${minutes}`;
}

// ✅ 核心：票裂开 → 退场 → 显示天空云朵
// ✅ 核心：票裂开 → 退场 → 显示天空 → 8秒后向上淡出 → 显示渐变背景
function initAutoExit() {
  const ticket = document.getElementById("ticket");
  const wrapper = document.querySelector(".exhibition-wrapper");
  const sky = document.querySelector(".sky");
  const finalScene = document.getElementById("finalScene");
  
  // 使用闭包变量，避免全局污染
  let isExiting = false;
  
  ticket.addEventListener('mouseenter', () => {
    if (isExiting) return;
    isExiting = true;
    
    ticket.classList.add("hold-open");
    
    setTimeout(() => {
      wrapper.classList.add("fade-out");
      sky.classList.add("show");
      
      setTimeout(() => {
        sky.classList.add("fade-to-light");
        
        setTimeout(() => {
          sky.style.opacity = "0";
          
          setTimeout(() => {
            finalScene.classList.add("show");
            // 🎯 在 final-scene 显示后初始化背景云朵
            initBackgroundClouds();
          }, 400);
          
        }, 800);
        
      }, 1000);
      
    }, 200);
  });
}
function initClouds() {
  const scene = document.querySelector('.sky');
  if (!scene) return;

  // 👇 这里改成 6～8 就会变少，你可以自己调
  const numClouds = 6;

  // 👇 像素风云朵 SVG（超可爱 8bit 风格）
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

  // 生成云朵
  for (let i = 0; i < numClouds; i++) {
    scene.innerHTML += cloudTemplate;
  }

  // 给每个云朵设置随机大小、速度、位置
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

// 云朵飘动动画
const style = document.createElement('style');
style.textContent = `
@keyframes cloudMove {
  0% { transform: translateX(-150px); }
  100% { transform: translateX(calc(100vw + 150px)); }
}
`;
document.head.appendChild(style);

// =========================================
// 星露谷官网菜单 + 表单功能（第三场景）
// =========================================
function initStardewUI() {
  let toggleDropdown = document.querySelector('.menu-icon');
  let dropdown = document.querySelector('.dropdown-nav');
  let dropdownItems = document.querySelectorAll('.dropdown-nav a');
  let form = document.getElementById('question');

  if (!form || !toggleDropdown || !dropdown) return;

  // 表单提交
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Your question has been submitted");
  });

  // 菜单切换
  function checkState() {
    dropdown.classList.toggle("closed");
  }

  toggleDropdown.addEventListener('click', checkState);

  // 点击菜单关闭下拉框
  dropdownItems.forEach((item) => {
    item.addEventListener('click', checkState);
  });
}

// 等待场景显示后再初始化
const waitForScene = setInterval(() => {
  if (document.querySelector(".final-scene.show")) {
    initStardewUI();
    clearInterval(waitForScene);
  }
}, 500);

// =========================================
// 页面加载后统一初始化
// =========================================
window.onload = function () {
  updateDate();
  updateTime();
  setInterval(updateTime, 60000); // 每分钟更新时间
  initAutoExit();
  initClouds(); // ✅ 启动云朵
  initBackgroundClouds(); // ✅ 新增：页面加载就生成背景蓝色天空上的白云
};
// 生成背景云朵（在图片后面飘动）
function initBackgroundClouds() {
  const container = document.getElementById('bgClouds');
  if (!container) {
    console.warn('bgClouds 容器不存在');
    return;
  }
  
  // 清除旧云朵
  const oldClouds = container.querySelectorAll('.cloud');
  oldClouds.forEach(cloud => cloud.remove());
  
  // 像素风云朵 SVG
  const cloudTemplate = `
  <div class="cloud">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 64" shape-rendering="crispEdges">
      <rect x="24" y="32" width="16" height="16" fill="#ffffff"/>
      <rect x="40" y="32" width="16" height="16" fill="#ffffff"/>
      <rect x="56" y="32" width="16" height="16" fill="#ffffff"/>
      <rect x="72" y="32" width="16" height="16" fill="#ffffff"/>
      <rect x="40" y="16" width="16" height="16" fill="#ffffff"/>
      <rect x="56" y="16" width="16" height="16" fill="#ffffff"/>
      <rect x="72" y="16" width="16" height="16" fill="#ffffff"/>
      <rect x="32" y="40" width="8" height="8" fill="#f0f0f0"/>
      <rect x="80" y="40" width="8" height="8" fill="#f0f0f0"/>
    </svg>
  </div>`;
  
  // 生成 8-12 朵云
  const numClouds = Math.floor(Math.random() * 5) + 8;
  
  for (let i = 0; i < numClouds; i++) {
    container.insertAdjacentHTML('beforeend', cloudTemplate);
  }
  
  // 设置每朵云的随机属性
  const clouds = document.querySelectorAll('#bgClouds .cloud');
  clouds.forEach((cloud, index) => {
    // 随机大小 0.4 - 1.2
    const size = 0.4 + Math.random() * 0.8;
    // 随机速度 40-100 秒（数值越大飘得越慢）
    const speed = 40 + Math.random() * 60;
    // 随机垂直位置 5% - 80%
    const top = 5 + Math.random() * 75;
    // 随机延迟 -40 到 0 秒
    const delay = Math.random() * -40;
    // 随机宽度 80-150px
    const width = 80 + Math.random() * 70;
    // 随机透明度 0.5-0.9
    const opacity = 0.5 + Math.random() * 0.4;
    
    cloud.style.cssText = `
      position: absolute;
      width: ${width}px;
      height: auto;
      top: ${top}%;
      left: 0;
      transform: scale(${size});
      opacity: ${opacity};
      animation: cloudMove ${speed}s linear ${delay}s infinite;
      z-index: ${Math.floor(Math.random() * 5) + 1};
    `;
  });
  
  console.log(`✅ 已生成 ${numClouds} 朵背景云朵`);
}

// 确保云朵动画已定义
if (!document.querySelector('#cloudMoveStyle')) {
  const style = document.createElement('style');
  style.id = 'cloudMoveStyle';
  style.textContent = `
    @keyframes cloudMove {
      0% {
        transform: translateX(-200px) scale(var(--scale, 1));
      }
      100% {
        transform: translateX(calc(100vw + 200px)) scale(var(--scale, 1));
      }
    }
  `;
  document.head.appendChild(style);
}