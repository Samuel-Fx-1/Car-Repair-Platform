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
        const sectionHeight = section.clientHeight;
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
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Hero buttons smooth scroll
const heroButtons = document.querySelectorAll('.hero-buttons a, .btn-primary, .btn-secondary');
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
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
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                // Add fade-in animation
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

// ===== Contact Form Handling =====
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        vehicle: document.getElementById('vehicle').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    console.log('Booking form submitted:', formData);
    
    // Show success message
    alert('Thank you for your booking request! We will contact you within 24 hours to confirm your appointment.');
    
    // Reset form
    bookingForm.reset();
    
    // In a real application, you would send this data to a server:
    /*
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Thank you for your booking! We will contact you soon.');
        bookingForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was an error submitting your request. Please try again.');
    });
    */
});

// ===== Newsletter Form Handling =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to our newsletter!');
        
        newsletterForm.reset();
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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Gallery Image Modal (Simple Lightbox Effect) =====
const galleryViewButtons = document.querySelectorAll('.btn-view');

galleryViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const galleryItem = button.closest('.gallery-item');
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('h3').textContent;
        const description = galleryItem.querySelector('p').textContent;
        
        // Create modal
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
        
        // Add styles for modal
        const modalStyles = `
            <style>
                .image-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    cursor: pointer;
                }
                
                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    z-index: 10001;
                    animation: zoomIn 0.3s ease;
                }
                
                @keyframes zoomIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                
                .modal-content img {
                    max-width: 100%;
                    max-height: 80vh;
                    border-radius: 10px;
                    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
                }
                
                .modal-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    width: 40px;
                    height: 40px;
                    background: var(--accent-rust);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    font-size: 28px;
                    cursor: pointer;
                    transition: 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1;
                }
                
                .modal-close:hover {
                    background: var(--warning-yellow);
                    transform: rotate(90deg);
                }
                
                .modal-info {
                    text-align: center;
                    margin-top: 20px;
                    color: white;
                }
                
                .modal-info h3 {
                    font-family: var(--font-title);
                    font-size: 24px;
                    letter-spacing: 2px;
                    margin-bottom: 5px;
                }
                
                .modal-info p {
                    color: var(--accent-rust);
                    font-size: 16px;
                }
            </style>
        `;
        
        if (!document.querySelector('.modal-styles')) {
            const styleTag = document.createElement('div');
            styleTag.className = 'modal-styles';
            styleTag.innerHTML = modalStyles;
            document.head.appendChild(styleTag);
        }
        
        // Close modal functionality
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        
        // Close on ESC key
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
    const scrollPosition = window.scrollY;
    
    if (hero) {
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// ===== Add Gear Animation to Loading State =====
window.addEventListener('load', () => {
    // Remove any loading overlay if present
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Add entrance animation to hero content
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

// ===== Service Card Hover Effects Enhancement =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add a ripple effect
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
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== Team Card Image Quality Enhancement =====
const teamImages = document.querySelectorAll('.team-image img');

teamImages.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
});

// ===== Intersection Observer for Enhanced Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .team-card, .process-step');
animatedElements.forEach(el => {
    observer.observe(el);
});

// ===== Add typing effect to hero tagline =====
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const originalText = heroTagline.textContent;
    heroTagline.textContent = '';
    heroTagline.style.opacity = '1';
    
    let index = 0;
    const typingSpeed = 100;
    
    setTimeout(() => {
        const typeWriter = () => {
            if (index < originalText.length) {
                heroTagline.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            }
        };
        typeWriter();
    }, 1500);
}

// ===== Console welcome message =====
console.log('%c🔧 Jade & Andy Vintage Specialist 🔧', 'color: #d4671c; font-size: 20px; font-weight: bold;');
console.log('%cCrafting Excellence in Every Classic Since 1995', 'color: #c0c0c0; font-size: 14px;');
console.log('%cWebsite built with passion for vintage automobiles', 'color: #95a5a6; font-size: 12px;');

// ===== Performance optimization: Lazy loading images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Add fadeOut animation for modal =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('🚀 All scripts initialized successfully!');