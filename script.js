const splashScreen = document.getElementById('splashScreen');
const loginScreen = document.getElementById('loginScreen');
const appScreen = document.getElementById('appScreen');
const loginBtn = document.getElementById('loginBtn');
const loginMsg = document.getElementById('loginMsg');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const bgAudio = document.getElementById('bgAudio');
const soundToggle = document.getElementById('soundToggle');
const navButtons = document.querySelectorAll('.nav-btn');
let soundEnabled = true;

function playClick(){
  const s = new Audio('assets/click.wav');
  s.volume = 0.7;
  s.play().catch(() => {});
}

function startBackgroundAudio(){
  if(!bgAudio) return;
  bgAudio.volume = 0.35;
  if(soundEnabled){
    bgAudio.play().catch(() => {});
  }
}

function showScreen(screen){
  [splashScreen, loginScreen, appScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

setTimeout(() => {
  showScreen(loginScreen);
}, 2600);

loginBtn.addEventListener('click', () => {
  playClick();
  const user = usernameInput.value.trim().toLowerCase();
  const pass = passwordInput.value.trim();

  if(user === 'xinn' && pass === '123'){
    loginMsg.textContent = 'Login berhasil. Membuka panel...';
    loginMsg.className = 'login-msg ok';
    setTimeout(() => {
      showScreen(appScreen);
      startBackgroundAudio();
    }, 700);
  } else {
    loginMsg.textContent = 'Username atau password salah.';
    loginMsg.className = 'login-msg error';
  }
});

togglePassword.addEventListener('click', () => {
  playClick();
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
});

soundToggle.addEventListener('click', () => {
  playClick();
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
  if(soundEnabled){
    bgAudio.play().catch(() => {});
  } else {
    bgAudio.pause();
  }
});

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    playClick();
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// neon particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function makeParticles(){
  particles = Array.from({length: 55}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 1 + Math.random() * 2.8,
    dx: -0.35 + Math.random() * 0.7,
    dy: -0.35 + Math.random() * 0.7,
    a: 0.35 + Math.random() * 0.55
  }));
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(216,77,255,${p.a})`;
    ctx.shadowBlur = 18;
    ctx.shadowColor = 'rgba(216,77,255,.8)';
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if(p.x < -10) p.x = canvas.width + 10;
    if(p.x > canvas.width + 10) p.x = -10;
    if(p.y < -10) p.y = canvas.height + 10;
    if(p.y > canvas.height + 10) p.y = -10;
  });
  requestAnimationFrame(drawParticles);
}

resize();
makeParticles();
drawParticles();
window.addEventListener('resize', () => {
  resize();
  makeParticles();
});

// user gesture fallback for autoplay audio
window.addEventListener('click', () => {
  if(appScreen.classList.contains('active') && soundEnabled){
    bgAudio.play().catch(() => {});
  }
}, { once: false });
