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

  let isExiting = false;

  ticket.addEventListener("mouseenter", () => {
    if (isExiting) return;
    isExiting = true;

    ticket.classList.add("hold-open");

    setTimeout(() => {
      wrapper.classList.add("fade-out");
      sky.classList.add("show");

      // 8秒后 → 全部温柔变化
      setTimeout(() => {
        sky.classList.add("fade-to-light");
      }, 1000);

    }, 600);
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
// 页面加载后统一初始化
// =========================================
window.onload = function () {
  updateDate();
  updateTime();
  setInterval(updateTime, 60000); // 每分钟更新时间
  initAutoExit();
  initClouds(); // ✅ 启动云朵
};