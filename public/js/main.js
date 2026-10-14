/* ===================================
   Jade & Andy Vintage Specialist
   Main JavaScript Functionality
   =================================== */

// ===== Initialize AOS (Animate on Scroll) =====
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 100
});

// ===== Navigation Functionality =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Smooth Scrolling =====
function smoothScrollTo(href) {
    const target = document.querySelector(href);
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            smoothScrollTo(href);
        }
    });
});

// Hero buttons smooth scroll
document.querySelectorAll('.hero-buttons a, .btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            smoothScrollTo(href);
        }
    });
});

// ===== Stats Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateStats = () => {
    if (hasAnimated) return;

    const statsSection = document.querySelector('.stats');
    const statsSectionTop = statsSection.offsetTop;
    const statsSectionHeight = statsSection.clientHeight;
    const windowHeight = window.innerHeight;

    if (scrollY + windowHeight > statsSectionTop + (statsSectionHeight / 3)) {
        hasAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }
};

window.addEventListener('scroll', animateStats);

// ===== Gallery Filter Functionality =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add transition styles for gallery items
galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// ===== Testimonial Carousel (Swiper) =====
const testimonialSwiper = new Swiper('.testimonial-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 800,
});

// ===== Contact Form Handling (POST /api/bookings) =====
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const payload = Object.fromEntries(new FormData(bookingForm).entries());

    submitBtn.disabled = true;
    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            const details = data.errors ? data.errors.map(err => err.message).join('\n') : data.message;
            alert(details || 'Sorry, your request could not be submitted. Please try again.');
            return;
        }

        alert(data.message);
        bookingForm.reset();
    } catch (error) {
        console.error('Booking error:', error);
        alert('Sorry, there was an error submitting your request. Please try again.');
    } finally {
        submitBtn.disabled = false;
    }
});

// ===== Newsletter Form Handling (POST /api/newsletter) =====
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = newsletterForm.querySelector('input[type="email"]').value;

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            alert(data.errors ? data.errors.map(err => err.message).join('\n') : data.message);
            if (data.success) newsletterForm.reset();
        } catch (error) {
            console.error('Newsletter error:', error);
            alert('Sorry, we could not process your subscription. Please try again.');
        }
    });
}

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Gallery Image Modal (Lightbox) =====
const galleryViewButtons = document.querySelectorAll('.btn-view');

galleryViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const galleryItem = button.closest('.gallery-item');
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('h3').textContent;
        const description = galleryItem.querySelector('p').textContent;

        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${img.src}" alt="${title}">
                <div class="modal-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
});

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = window.scrollY * 0.5 + 'px';
    }
});

// ===== Hero content entrance animation =====
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===== Service Card Hover Ripple =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        const ripple = document.createElement('div');
        ripple.className = 'card-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(212, 103, 28, 0.1);
            transform: translate(-50%, -50%);
            pointer-events: none;
            transition: width 0.6s ease, height 0.6s ease;
        `;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.style.width = '500px';
            ripple.style.height = '500px';
        }, 10);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== Team Card Image Fade-in =====
document.querySelectorAll('.team-image img').forEach(img => {
    img.addEventListener('load', function () {
        this.style.opacity = '1';
    });
});

// ===== Intersection Observer for Enhanced Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.service-card, .gallery-item, .team-card, .process-step').forEach(el => {
    observer.observe(el);
});

// ===== Typing effect for hero tagline =====
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const originalText = heroTagline.textContent;
    heroTagline.textContent = '';
    heroTagline.style.opacity = '1';

    let index = 0;
    const typeWriter = () => {
        if (index < originalText.length) {
            heroTagline.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 1500);
}

// ===== Console welcome message =====
console.log('%c🔧 Jade & Andy Vintage Specialist 🔧', 'color: #d4671c; font-size: 20px; font-weight: bold;');
console.log('%cCrafting Excellence in Every Classic Since 1995', 'color: #c0c0c0; font-size: 14px;');
console.log('🚀 All scripts initialized successfully!');
