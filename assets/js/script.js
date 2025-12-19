// ========================================
// MENU HAMBÚRGUER MOBILE
// ========================================

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
