// Seleccionar el canvas
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

// Ajuste automático del tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Configuración de los fuegos artificiales
const fireworks = [];
const particles = [];

// Crear un fuego artificial
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const targetY = Math.random() * (canvas.height / 2);
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;

    fireworks.push({
        x,
        y,
        targetY,
        speed: 6 + Math.random() * 4,
        color
    });
}

// Crear partículas al explotar
function explode(x, y, color) {
    for (let i = 0; i < 40; i++) {
        particles.push({
            x,
            y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 4 + 2,
            alpha: 1,
            color
        });
    }
}

// Animación
function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Actualizar fuegos artificiales
    for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.y -= fw.speed;

        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = fw.color;
        ctx.fill();

        if (fw.y <= fw.targetY) {
            explode(fw.x, fw.y, fw.color);
            fireworks.splice(i, 1);
        }
    }

    // Actualizar partículas
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color.replace("60%", "80%").replace("100%", "80%")}`;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (p.alpha <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(animate);
}

// Lanzar fuegos artificiales automáticamente
setInterval(createFirework, 700);

// Iniciar animación
animate();

// ================================
//  SISTEMA DE FASES
// ================================
let fase = 0; 
let puedeAvanzar = false;

const mainText = document.getElementById("main-text");
const subtext = document.getElementById("subtext");
const polaroids = document.getElementById("polaroids");
const carta = document.getElementById("carta");
const finalScreen = document.getElementById("final");

// Mostrar texto principal con delay
setTimeout(() => {
  mainText.classList.add("visible");
}, 800);

// Permitir avanzar después de 3 segundos
setTimeout(() => {
  subtext.classList.add("visible");
  puedeAvanzar = true;
}, 3000);

// Click para avanzar
document.addEventListener("click", avanzar);
document.addEventListener("touchstart", avanzar);

function avanzar() {
  if (!puedeAvanzar) return;

  fase++;
  puedeAvanzar = false;

  switch (fase) {
    case 1:
      mostrarPolaroids();
      break;
    case 2:
      mostrarCarta();
      break;
    case 3:
      mostrarFinal();
      break;
  }
}

// ================================
//  FASE 1 — POLAROID
// ================================
function mostrarPolaroids() {
  mainText.classList.remove("visible");
  subtext.classList.remove("visible");

  setTimeout(() => {
    polaroids.classList.add("visible");
    puedeAvanzar = true;
  }, 700);
}

// ================================
//  FASE 2 — CARTA
// ================================
function mostrarCarta() {
  polaroids.classList.remove("visible");

  setTimeout(() => {
    carta.classList.add("visible");
    puedeAvanzar = true;
  }, 700);
}

// ================================
//  FASE 3 — FINAL
// ================================
function mostrarFinal() {
  carta.classList.remove("visible");

  setTimeout(() => {
    finalScreen.classList.add("visible");
  }, 700);
}
