document.addEventListener('DOMContentLoaded', () => {

    /* CANVAS — PARTÍCULAS FONDO */
    const lienzo = document.getElementById('lienzo-fondo');
    const ctx = lienzo.getContext('2d');
    let particulas = [];

    function ajustarLienzo() {
        lienzo.width = window.innerWidth;
        lienzo.height = window.innerHeight;
    }
    ajustarLienzo();
    window.addEventListener('resize', ajustarLienzo);

    class Particula {
        constructor() { this.reiniciar(); }
        reiniciar() {
            this.x = Math.random() * lienzo.width;
            this.y = Math.random() * lienzo.height;
            this.radio = Math.random() * 1.5 + 0.3;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.opacidad = Math.random() * 0.4 + 0.05;
        }
        actualizar() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > lienzo.width || this.y < 0 || this.y > lienzo.height) this.reiniciar();
        }
        dibujar() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(110, 231, 183, ${this.opacidad})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 55; i++) particulas.push(new Particula());

    function dibujarConexiones() {
        for (let i = 0; i < particulas.length; i++) {
            for (let j = i + 1; j < particulas.length; j++) {
                const dx = particulas[i].x - particulas[j].x;
                const dy = particulas[i].y - particulas[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particulas[i].x, particulas[i].y);
                    ctx.lineTo(particulas[j].x, particulas[j].y);
                    ctx.strokeStyle = `rgba(110, 231, 183, ${(1 - dist / 120) * 0.1})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function bucle() {
        ctx.clearRect(0, 0, lienzo.width, lienzo.height);
        particulas.forEach(p => { p.actualizar(); p.dibujar(); });
        dibujarConexiones();
        requestAnimationFrame(bucle);
    }
    bucle();

    /* BARRA DE PROGRESO + NAV */
    const barraProgreso = document.querySelector('.barra-progreso-nav');
    const nav = document.getElementById('navegacion');

    window.addEventListener('scroll', () => {
        const progreso = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (barraProgreso) barraProgreso.style.width = progreso + '%';
        if (nav) nav.classList.toggle('desplazada', window.scrollY > 40);
        actualizarActivos();
    }, { passive: true });

    /* ENLACES ACTIVOS */
    function actualizarActivos() {
        const secciones = document.querySelectorAll('section[id]');
        const enlaces = document.querySelectorAll('.enlace-nav');
        secciones.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
                const id = sec.getAttribute('id');
                enlaces.forEach(a => {
                    a.classList.toggle('activo', a.getAttribute('href') === '#' + id);
                });
            }
        });
    }

    /* ANIMACIONES DE ENTRADA */
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const retraso = parseInt(entrada.target.dataset.delay) || 0;
                setTimeout(() => entrada.target.classList.add('visible'), retraso);
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animado').forEach(el => observador.observe(el));

    /* --- ENVÍO DE FORMULARIO EMAILJS (SIN ALERTS) --- */
    // Inicialización (Asegúrate de que tu Public Key sea esta)
    emailjs.init("XzMSjlce0fiN9j5vz");

    const formulario = document.getElementById('formulario-principal');
    
    if (formulario) {
        const btnEnviar = formulario.querySelector('.boton-enviar');
        const btnTexto = formulario.querySelector('.texto-boton');
        const iconoBtn = formulario.querySelector('.icono-enviar');

        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            // Guardar estado original
            const textoOriginal = btnTexto.innerText;
            
            // UI: Estado Cargando
            btnTexto.innerText = 'Enviando...';
            btnEnviar.disabled = true;
            btnEnviar.style.opacity = '0.7';

            // Parámetros EmailJS (Usa tu Service ID real aquí)
            const serviceID = 'service_l3bwu8l'; 
            const templateID = 'template_dq1ukhh';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // ÉXITO
                    btnTexto.innerText = '¡Enviado!';
                    if(iconoBtn) iconoBtn.className = 'fas fa-check';
                    btnEnviar.style.background = '#22c55e'; // Verde éxito
                    formulario.reset();
                })
                .catch((error) => {
                    // ERROR
                    btnTexto.innerText = 'Error al enviar';
                    if(iconoBtn) iconoBtn.className = 'fas fa-times';
                    btnEnviar.style.background = '#ef4444'; // Rojo error
                    console.error('Fallo el envío:', error);
                })
                .finally(() => {
                    // Restaurar botón tras 4 segundos
                    setTimeout(() => {
                        btnTexto.innerText = textoOriginal;
                        if(iconoBtn) iconoBtn.className = 'fas fa-paper-plane icono-enviar';
                        btnEnviar.disabled = false;
                        btnEnviar.style.opacity = '1';
                        btnEnviar.style.background = ''; // Vuelve al color original
                    }, 4000);
                });
        });
    }

    console.log('Portfolio Francisco Asensio ✓');
});