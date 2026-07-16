// ============================================
// LISTA DE NOMBRES (OCULTA EN EL CÓDIGO)
// ============================================
const listaNombres = [
    "Mi Amor",
    "❤️ Corazón ❤️",
    "Princesa",
    "Reina",
    "Dueña de mi vida",
    "Amor de mi vida",
    "💕 Mi Todo 💕",
    "Estrella",
    "Luz de mis ojos",
    "Alma gemela",
    "Mi razón de ser",
    "🌸 Mi Flor 🌸"
];

// ============================================
// MENSAJES PERSONALIZADOS
// ============================================
const mensajesPersonalizados = [
    "Eres la persona más especial en mi vida ❤️",
    "Cada día a tu lado es un regalo 🎁",
    "Tu sonrisa ilumina mi mundo entero ✨",
    "No hay nadie como tú, eres única 💎",
    "Te amo más de lo que las palabras pueden expresar 💕",
    "Eres mi sueño hecho realidad 🌟",
    "Gracias por existir y alegrar mi vida 🌈",
    "Contigo todo es mejor, mi amor 💖"
];

const mensajesModal = [
    "Desde que llegaste a mi vida, todo cambió para bien. Eres la persona más hermosa que he conocido, no solo por fuera, sino por dentro. Tu alma es pura luz y tu corazón es inmenso. 💖",
    
    "Cada momento compartido contigo es un tesoro que guardo en mi corazón. Eres mi compañera, mi amiga, mi amante y mi todo. Gracias por ser como eres y por amarme como me amas. 🌹",
    
    "Hoy celebramos tu vida, y yo celebro cada día que puedo verte sonreír. Eres la razón de mis días felices, la musa que inspira mis sueños. ¡Feliz cumpleaños, mi amor eterno! 💕",
    
    "No hay palabras suficientes para describir lo que siento por ti. Eres mi refugio, mi paz y mi alegría. Que este nuevo año de vida te traiga todas las bendiciones que mereces. Te amo. ❤️"
];

// ============================================
// CONFIGURACIÓN DEL CONFETI
// ============================================
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
let particles = [];
let animationId = null;

// Elementos del DOM
const displayNombre = document.getElementById('displayNombre');
const mensajePersonal = document.getElementById('mensajePersonal');
const numeroAnos = document.getElementById('numeroAnos');
const btnConfeti = document.getElementById('btnConfeti');
const btnMensajes = document.getElementById('btnMensajes');
const mensajeFlotanteMovil = document.getElementById('mensajeFlotanteMovil');
const modalMensaje = document.getElementById('modalMensaje');
const mensajeModal = document.getElementById('mensajeModal');
const cerrarModal = document.getElementById('cerrarModal');
const corazonAnimado = document.getElementById('corazonAnimado');
const footerFecha = document.getElementById('footerFecha');

// ============================================
// EDAD EXACTA (33 AÑOS)
// ============================================
const EDAD_EXACTA = 33;

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

// Mostrar nombre aleatorio
function mostrarNombreAleatorio() {
    const nombre = listaNombres[Math.floor(Math.random() * listaNombres.length)];
    displayNombre.textContent = nombre;
}

// Mostrar mensaje personalizado aleatorio
function mostrarMensajeAleatorio() {
    const mensaje = mensajesPersonalizados[Math.floor(Math.random() * mensajesPersonalizados.length)];
    mensajePersonal.textContent = mensaje;
}

// Mostrar edad exacta (33 años)
function mostrarEdad() {
    numeroAnos.innerHTML = `🎈 ${EDAD_EXACTA} 🎈`;
}

// Mostrar fecha en el footer
function mostrarFechaFooter() {
    const now = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = now.toLocaleDateString('es-ES', opciones);
    footerFecha.textContent = `📅 ${fechaFormateada} · ${EDAD_EXACTA} años de pura magia ✨`;
}

// Cambiar mensaje flotante móvil
function cambiarMensajeMovil() {
    const mensajes = [
        '💕 ¡Bienvenida, amor! 💕',
        '🎉 ¡Feliz Cumpleaños, mi vida! 🎉',
        '❤️ Eres mi todo ❤️',
        '✨ ¡Brillas con luz propia! ✨',
        '💖 Te amo con todo mi corazón 💖',
        '🌟 Eres la estrella de mi vida 🌟',
        '🎂 ¡Día especial para una persona especial! 🎂',
        '💝 Mi amor eterno 💝'
    ];
    
    let index = 0;
    setInterval(() => {
        mensajeFlotanteMovil.textContent = mensajes[index % mensajes.length];
        index++;
    }, 4000);
}

// ============================================
// CONFETI
// ============================================

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createConfetti() {
    const shapes = ['circle', 'rect', 'triangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const colors = [
        `hsl(${random(0, 360)}, 85%, 60%)`,
        `hsl(${random(0, 360)}, 85%, 55%)`,
        `hsl(${random(0, 360)}, 85%, 50%)`
    ];
    
    return {
        x: random(0, width),
        y: random(-height, -10),
        size: random(6, 15),
        speedX: random(-4, 4),
        speedY: random(3, 9),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: random(0, 360),
        rotationSpeed: random(-8, 8),
        shape: shape,
        opacity: 1,
        fade: random(0, 0.5)
    };
}

function drawConfetti(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 3;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    
    if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
    } else if (p.shape === 'rect') {
        ctx.fillRect(-p.size/2, -p.size/3, p.size, p.size * 0.7);
    } else if (p.shape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(0, -p.size/2);
        ctx.lineTo(-p.size/2, p.size/2);
        ctx.lineTo(p.size/2, p.size/2);
        ctx.closePath();
        ctx.fill();
    }
    
    ctx.restore();
}

function updateConfetti(p) {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;
    p.speedY += 0.05;
    p.opacity -= p.fade * 0.01;
    
    return p.y < height + 100 && p.x > -100 && p.x < width + 100 && p.opacity > 0.1;
}

function startConfetti() {
    console.log('🎊 Lanzando confeti...');
    
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        particles = [];
    }
    
    particles = [];
    
    const cantidadParticulas = 350;
    for (let i = 0; i < cantidadParticulas; i++) {
        particles.push(createConfetti());
    }
    
    let startTime = Date.now();
    const duracionSegundos = 4;
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles = particles.filter(p => updateConfetti(p));
        particles.forEach(p => drawConfetti(p));
        
        if (particles.length < 400 && (Date.now() - startTime) < duracionSegundos * 1000) {
            for (let i = 0; i < 12; i++) {
                particles.push(createConfetti());
            }
        }
        
        if (particles.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationId);
            animationId = null;
            console.log('✅ Confeti terminado');
        }
    }
    
    animate();
    
    // Efectos durante el confeti
    let intervalo = setInterval(() => {
        mostrarNombreAleatorio();
        mostrarMensajeAleatorio();
    }, 500);
    
    setTimeout(() => {
        clearInterval(intervalo);
        mostrarNombreAleatorio();
        mostrarMensajeAleatorio();
    }, duracionSegundos * 1000);
}

// ============================================
// MODAL DE MENSAJES
// ============================================

function abrirModal() {
    console.log('💌 Abriendo modal de mensaje especial');
    const mensaje = mensajesModal[Math.floor(Math.random() * mensajesModal.length)];
    mensajeModal.textContent = mensaje;
    modalMensaje.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalFunc() {
    modalMensaje.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// EFECTOS ESPECIALES
// ============================================

// Corazón latiendo con efecto de cambio
function animarCorazon() {
    const emojis = ['💖', '💗', '💕', '❤️', '💝', '💘'];
    let index = 0;
    setInterval(() => {
        corazonAnimado.textContent = emojis[index % emojis.length];
        index++;
    }, 500);
}

// Cambiar colores de fondo dinámicamente
function cambiarFondo() {
    const colores = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    ];
    
    setInterval(() => {
        const color = colores[Math.floor(Math.random() * colores.length)];
        document.body.style.background = color;
        document.body.style.transition = 'background 3s ease';
    }, 8000);
}

// ============================================
// EVENTOS
// ============================================

btnConfeti.addEventListener('click', function(e) {
    console.log('🖱️ Click en botón Confeti');
    startConfetti();
});

btnMensajes.addEventListener('click', function(e) {
    console.log('🖱️ Click en botón Mensaje Especial');
    abrirModal();
});

cerrarModal.addEventListener('click', cerrarModalFunc);

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModalFunc();
});

// Cerrar modal clicando fuera
modalMensaje.addEventListener('click', (e) => {
    if (e.target === modalMensaje) cerrarModalFunc();
});

// ============================================
// INICIALIZACIÓN
// ============================================

function init() {
    console.log('🎂 Iniciando aplicación de cumpleaños...');
    
    mostrarNombreAleatorio();
    mostrarMensajeAleatorio();
    mostrarEdad();
    mostrarFechaFooter();
    animarCorazon();
    cambiarFondo();
    cambiarMensajeMovil();
    
    // Lanzar confeti al inicio después de 1.5 segundos
    setTimeout(() => {
        console.log('🎊 Confeti inicial automático');
        startConfetti();
    }, 1500);
    
    // Cambiar mensaje personal cada 6 segundos
    setInterval(mostrarMensajeAleatorio, 6000);
    
    // Cambiar nombre cada 5 segundos
    setInterval(mostrarNombreAleatorio, 5000);
    
    console.log('✅ ¡Aplicación iniciada correctamente!');
    console.log('🎂 ¡Feliz Cumpleaños Mi Amor! ❤️');
    console.log(`🎈 ${EDAD_EXACTA} años de pura magia ✨`);
    console.log('💖 Código creado con todo el amor del mundo 💖');
}

// Iniciar cuando la página esté completamente cargada
window.addEventListener('load', init);