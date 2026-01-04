// ========================================
// MENU HAMBÚRGUER MOBILE
// ========================================

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000); // 2 segundos de loading
});

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle do menu
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Atualiza aria-expanded para acessibilidade
    const isExpanded = mobileMenuToggle.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
});

// Fecha o menu ao clicar em um link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Fecha o menu ao clicar fora (no overlay)
document.addEventListener('click', (e) => {
    if (document.body.classList.contains('menu-open') && 
        !navLinks.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});

// ========================================
// NAVBAR TRANSPARENTE AO ROLAR
// ========================================

const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// EFEITO TYPING NO SUBTÍTULO DO HERO
// ========================================

const typingText = document.querySelector('.hero-text h2');
if (typingText) {
    const originalText = typingText.textContent;
    typingText.textContent = '';
    typingText.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 50; // ms por caractere
    
    function typeChar() {
        if (charIndex < originalText.length) {
            typingText.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        } else {
            typingText.classList.add('typing-complete');
        }
    }
    
    // Inicia após pequeno delay
    setTimeout(typeChar, 600);
}

// ========================================
// BACKGROUND ANIMADO COM PARTÍCULAS/GRID
// ========================================

function createTechBackground() {
    const hero = document.getElementById('hero');
    const canvas = document.createElement('canvas');
    canvas.className = 'tech-canvas';
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(51, 153, 204, 0.6)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Criar partículas
    const particleCount = window.innerWidth > 768 ? 50 : 30;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(51, 153, 204, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Limpar quando sair da view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    });
    
    observer.observe(hero);
}

// Iniciar background animado após carregar
window.addEventListener('load', createTechBackground);

// ========================================
// EFEITO MATRIX/CÓDIGO CAINDO (OPCIONAL)
// ========================================

function createMatrixEffect() {
    const hero = document.getElementById('hero');
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.className = 'matrix-canvas';
    hero.insertBefore(matrixCanvas, hero.firstChild);
    
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = hero.offsetHeight;
    
    const chars = '01</>{}[];()+=*&^%$#@!';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(51, 51, 51, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = 'rgba(51, 153, 204, 0.2)';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            if (y > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    let matrixInterval = setInterval(drawMatrix, 50);
    
    // Limpar quando redimensionar
    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = hero.offsetHeight;
    });
    
    // Pausar quando fora da viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                clearInterval(matrixInterval);
            } else {
                matrixInterval = setInterval(drawMatrix, 50);
            }
        });
    });
    
    observer.observe(hero);
}

// Ativar efeito Matrix (descomente se quiser mais intensidade)
// window.addEventListener('load', createMatrixEffect);

// ========================================
// ÍCONES DE TECNOLOGIAS FLUTUANTES
// ========================================

function createFloatingIcons() {
    const hero = document.getElementById('hero');
    const techStack = ['Java', 'JS', 'AWS', 'SQL', 'Git', 'React', 'Node', 'Docker'];
    const container = document.createElement('div');
    container.className = 'floating-icons';
    
    techStack.forEach((tech, index) => {
        const icon = document.createElement('div');
        icon.className = 'tech-icon';
        icon.textContent = tech;
        icon.style.left = `${Math.random() * 80 + 10}%`;
        icon.style.animationDelay = `${index * 0.5}s`;
        icon.style.animationDuration = `${15 + Math.random() * 10}s`;
        container.appendChild(icon);
    });
    
    hero.appendChild(container);
}

window.addEventListener('load', createFloatingIcons);

// ========================================
// SCROLL REVEAL PARA SEÇÕES
// ========================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.about-text, .project-card, .section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

window.addEventListener('load', revealOnScroll);

// ========================================
// EFEITO DE GLITCH NO NOME (HOVER)
// ========================================

const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', function() {
        this.classList.add('glitch-active');
        setTimeout(() => {
            this.classList.remove('glitch-active');
        }, 600);
    });
}

// ========================================
// CURSOR PERSONALIZADO (DESKTOP)
// ========================================

if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Cursor principal com lag
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Dot central sem lag
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Efeito hover em elementos clicáveis
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// ========================================
// EFEITO RIPPLE NOS BOTÕES (CLICK)
// ========================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});
