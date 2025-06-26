// Enhanced Modern JavaScript for Hyperlink Website with Cosmic Effects

// Global variables
let currentLanguage = 'ar';
let animations = [];
let cosmicParticles = [];
let mousePosition = { x: 0, y: 0 };

// تهيئة EmailJS
(function() {
    emailjs.init("YbM42o0zLvMiq-uR3");
})();

// إعدادات Supabase
const SUPABASE_URL = 'https://wpqifesvxoieavfcptyt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwcWlmZXN2eG9pZWF2ZmNwdHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODQyNzMsImV4cCI6MjA2NTU2MDI3M30.KMKRGfKmQuhbkP_ZG5OSlg_IuZE0GxugMuY-q9Lxgtc';

// تهيئة Supabase Client
let supabase;
if (typeof window !== 'undefined' && window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Language Switching
function setLanguage(lang) {
    currentLanguage = lang;
    const html = document.documentElement;
    const langToggle = document.getElementById('langToggle');
    const langCurrent = langToggle?.querySelector('.lang-current');
    const langOther = langToggle?.querySelector('.lang-other');
    
    if (lang === 'ar') {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        if (langCurrent && langOther) {
            langCurrent.textContent = 'ع';
            langOther.textContent = 'EN';
        }
    } else {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        if (langCurrent && langOther) {
            langCurrent.textContent = 'EN';
            langOther.textContent = 'ع';
        }
    }
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-en], [data-ar]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if(el.hasAttribute('placeholder')) {
                el.placeholder = text;
            }
        } else {
            el.innerHTML = text;
        }
    });
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

// Toggle Language Function
function toggleLanguage() {
    const newLang = currentLanguage === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
}

// ===== MOBILE-FIRST ENHANCEMENTS =====

// Mobile Detection and Optimization
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
}

// Enhanced Mobile Navigation
function initializeMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (!hamburger || !navMenu) return;
    
    let isMenuOpen = false;
    
    // Enhanced hamburger toggle with haptic feedback
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active', isMenuOpen);
        navMenu.classList.toggle('active', isMenuOpen);
        body.classList.toggle('nav-open', isMenuOpen);
        
        // Prevent body scroll when menu is open
        if (isMenuOpen) {
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
            body.style.touchAction = 'none';
        } else {
            body.style.overflow = '';
            body.style.height = '';
            body.style.touchAction = '';
        }
        
        // Haptic feedback for mobile devices
        if (navigator.vibrate && isMobile()) {
            navigator.vibrate(50);
        }
        
        // Update ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', isMenuOpen);
        navMenu.setAttribute('aria-hidden', !isMenuOpen);
    }
    
    // Close menu function
    function closeMenu() {
        if (isMenuOpen) {
            toggleMenu();
        }
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleMenu();
    }, { passive: false });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
        link.addEventListener('touchend', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(closeMenu, 100);
    });
    
    // Handle resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });
}

// Enhanced Tab System for Mobile
function initializeMobileTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabLinks.length || !tabContents.length) return;
    
    // Add touch feedback
    tabLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        link.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Haptic feedback
            if (navigator.vibrate && isMobile()) {
                navigator.vibrate(30);
            }
            
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show target content with animation
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.style.display = 'block';
                setTimeout(() => {
                    targetContent.classList.add('active');
                }, 10);
            }
            
            // Scroll to content on mobile
            if (isMobile()) {
                setTimeout(() => {
                    targetContent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });
}

// Enhanced FAQ for Mobile
function initializeMobileFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
            
            // Haptic feedback
            if (navigator.vibrate && isMobile()) {
                navigator.vibrate(40);
            }
            
            // Smooth scroll to item if it's being opened
            if (!isActive && isMobile()) {
                setTimeout(() => {
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 400);
            }
        });
        
        // Touch feedback
        question.addEventListener('touchstart', function() {
            this.style.backgroundColor = 'rgba(66, 153, 225, 0.1)';
        }, { passive: true });
        
        question.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 150);
        }, { passive: true });
    });
}

// Mobile Form Enhancements
function initializeMobileFormEnhancements() {
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input, textarea, select');
    
    // Enhanced input focus handling
    inputs.forEach(input => {
        // Smooth scroll to input when focused (iOS Safari fix)
        input.addEventListener('focus', function() {
            if (isMobile()) {
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
        
        // Visual feedback for touch
        input.addEventListener('touchstart', function() {
            this.style.borderColor = '#4299e1';
            this.style.boxShadow = '0 0 0 3px rgba(66, 153, 225, 0.2)';
        }, { passive: true });
        
        input.addEventListener('blur', function() {
            if (!this.matches(':focus')) {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Enhanced form submission
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && isMobile()) {
                // Visual feedback
                submitBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    submitBtn.style.transform = '';
                }, 150);
                
                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(100);
                }
            }
        });
    });
}

// Mobile Performance Optimizations
function initializeMobileOptimizations() {
    // Reduce animations on lower-end devices
    if (isMobile() && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        document.documentElement.style.setProperty('--transition-duration', '0.15s');
    }
    
    // Optimize touch scrolling
    if (isMobile()) {
        document.body.style.webkitOverflowScrolling = 'touch';
        document.body.style.overflowScrolling = 'touch';
    }
    
    // Viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--mobile-vh', `${window.innerHeight}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
    });
}

// Touch Gesture Support
function initializeTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Detect swipe gestures
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                if (deltaX > 0) {
                    // Swipe right - close menu
                    const hamburger = document.getElementById('hamburger');
                    if (hamburger) {
                        hamburger.click();
                    }
                }
            }
        }
    }, { passive: true });
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language') || 'ar';
    setLanguage(savedLang);
    
    // Initialize mobile-specific features
    initializeMobileNavigation();
    initializeMobileTabs();
    initializeMobileFAQ();
    initializeMobileFormEnhancements();
    initializeMobileOptimizations();
    initializeTouchGestures();
    
    // Initialize existing features
    initializeCosmicEffects();
    initializeParticleSystem();
    setupMouseTracking();
    setupTabs();
});

// Enhanced Header Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Header hide/show on scroll
    if (currentScroll > lastScrollTop && currentScroll > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Advanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special handling for counter animation
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stat-number');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('en-US') + suffix;
    }, 16);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Advanced Form Handling
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
    
    // Enhanced form validation for contact form
    const inputs = contactForm?.querySelectorAll('input, textarea');
    inputs?.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

// Field Validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // Remove existing error states
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = currentLanguage === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = currentLanguage === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            message = currentLanguage === 'ar' ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// FAQ Accordion (for contact page)
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Advanced Search Functionality
function setupSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const targetSelector = this.getAttribute('data-target');
            const items = document.querySelectorAll(targetSelector);
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Theme Switching (Light/Dark)
function setupThemeSwitch() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Mouse Movement Parallax Effect
function setupMouseParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const floatingElements = document.querySelectorAll('.floating-card');
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

// Copy to Clipboard Functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification(
            currentLanguage === 'ar' ? 'تم النسخ بنجاح!' : 'Copied successfully!',
            'success'
        );
    }, function() {
        showNotification(
            currentLanguage === 'ar' ? 'فشل في النسخ' : 'Failed to copy',
            'error'
        );
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    setupFormHandling();
    setupFAQAccordion();
    setupSearch();
    setupThemeSwitch();
    setupMouseParallax();
    
    // Add copy functionality to contact info
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const text = item.querySelector('span');
        if (text && (text.textContent.includes('@') || text.textContent.includes('+'))) {
            item.style.cursor = 'pointer';
            item.title = currentLanguage === 'ar' ? 'اضغط للنسخ' : 'Click to copy';
            item.addEventListener('click', function() {
                copyToClipboard(text.textContent);
            });
        }
    });
});

// Service Worker for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            }, function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Lazy loading fallback
        if ('IntersectionObserver' in window) {
            const imgObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imgObserver.unobserve(img);
                        }
                    }
                });
            });
            
            if (img.dataset.src) {
                imgObserver.observe(img);
            }
        }
    });
}

// Call optimization functions
document.addEventListener('DOMContentLoaded', optimizeImages);

// Analytics Integration (placeholder)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        trackEvent('Button', 'Click', e.target.textContent.trim());
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// Print Optimization
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// FAQ Functionality Enhancement
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });
}

// إرسال نموذج التواصل
async function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Validate all fields before submitting
    let isFormValid = true;
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showNotification(
            currentLanguage === 'ar' ? 'يرجى تصحيح الأخطاء في النموذج.' : 'Please correct the errors in the form.',
            'error'
        );
        return;
    }

    // Show loading state
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${currentLanguage === 'ar' ? 'جاري الإرسال...' : 'Sending...'}`;
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        created_at: new Date().toISOString()
    };

    try {
        // --- Step 1: Save data to Supabase ---
        if (!supabase) {
            throw new Error("Supabase client is not initialized.");
        }
        
        const { data, error } = await supabase
            .from('contacts')
            .insert([contactData]);

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(`Supabase Error: ${error.message}`);
        }

        console.log('Supabase response:', data);

        // --- Step 2: Send email notification via EmailJS ---
        const templateParams = {
            from_name: contactData.name,
            from_email: contactData.email,
            phone_number: contactData.phone,
            message_subject: contactData.subject,
            message_body: contactData.message,
            to_email: 'waleedalhabib@gmail.com' // Your notification email
        };
        
        await emailjs.send(
            'service_jxx60sf',  // EmailJS Service ID
            'template_jdaev4n', // EmailJS Template ID
            templateParams
        );

        showNotification(
            currentLanguage === 'ar' ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : 'Your message has been sent successfully! We will contact you soon.',
            'success'
        );
        form.reset();

    } catch (error) {
        console.error('Form submission failed:', error);
        showNotification(
            currentLanguage === 'ar' ? 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'Failed to send message. Please try again.',
            'error'
        );
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
}

// ربط النموذج بالدالة
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
});

// Chat Button Functionality
function initializeChatButton() {
    const chatBtn = document.querySelector('.chat-btn');
    
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            // Simulate chat opening
            showNotification(
                currentLanguage === 'ar' 
                    ? 'سيتم فتح المحادثة المباشرة قريباً...' 
                    : 'Live chat will open soon...',
                'info'
            );
            
            // Track chat button click
            trackEvent('Chat', 'Open', 'Contact Page');
        });
    }
}

// Initialize all enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
    initializeChatButton();
});

// Export functions for use in other scripts
window.HyperlinkApp = {
    setLanguage,
    showNotification,
    copyToClipboard,
    trackEvent,
    initializeFAQ,
    submitContactForm
};

// ===== COSMIC EFFECTS =====

// Initialize cosmic background effects
function initializeCosmicEffects() {
    createStarField();
    animateHeroShapes();
    setupGlowEffects();
}

// Create animated star field
function createStarField() {
    const starField = document.createElement('div');
    starField.className = 'cosmic-stars';
    starField.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    
    // Create stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'cosmic-star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite ease-in-out alternate;
        `;
        starField.appendChild(star);
    }
    
    document.body.appendChild(starField);
    
    // Add CSS animation for twinkling
    if (!document.getElementById('cosmic-styles')) {
        const style = document.createElement('style');
        style.id = 'cosmic-styles';
        style.textContent = `
            @keyframes twinkle {
                0% { opacity: 0.2; transform: scale(1); }
                100% { opacity: 1; transform: scale(1.2); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
            .cosmic-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #6B46C1, transparent);
                border-radius: 50%;
                animation: float 6s infinite ease-in-out;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }
}

// Animate hero shapes with cosmic movement
function animateHeroShapes() {
    const heroShapes = document.querySelectorAll('.hero-shape, .cosmic-shape');
    
    heroShapes.forEach((shape, index) => {
        // Add hover effect with cosmic glow
        shape.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 20px rgba(107, 70, 193, 0.8))';
            this.style.transform = 'translateY(-15px) scale(1.05) rotate(5deg)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.filter = '';
            this.style.transform = '';
        });
        
        // Add click effect
        shape.addEventListener('click', function() {
            createParticleExplosion(this);
        });
    });
}

// Setup glow effects for interactive elements
function setupGlowEffects() {
    const glowElements = document.querySelectorAll('.btn, .service-card, .stat-item, .mv-card, .value-card');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(107, 70, 193, 0.6)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Initialize particle system
function initializeParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    setInterval(createFloatingParticle, 2000);
}

// Create floating particle
function createFloatingParticle() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    const particle = document.createElement('div');
    particle.className = 'cosmic-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 7000);
}

// Create particle explosion effect
function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #2d3748, #4299e1);
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 1000;
            animation: explode 1s ease-out forwards;
        `;
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.style.setProperty('--end-x', endX + 'px');
        particle.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
    
    // Add explosion animation if not exists
    if (!document.getElementById('explosion-styles')) {
        const style = document.createElement('style');
        style.id = 'explosion-styles';
        style.textContent = `
            @keyframes explode {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup mouse tracking for interactive effects
function setupMouseTracking() {
    document.addEventListener('mousemove', function(e) {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
        
        // Create trailing particles occasionally
        if (Math.random() < 0.05) {
            createMouseParticle(e.clientX, e.clientY);
        }
    });
}

// Create mouse trail particle
function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        background: radial-gradient(circle, rgba(45, 55, 72, 0.8), transparent);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 999;
        animation: fadeOut 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
    
    // Add fade out animation if not exists
    if (!document.getElementById('mouse-trail-styles')) {
        const style = document.createElement('style');
        style.id = 'mouse-trail-styles';
        style.textContent = `
            @keyframes fadeOut {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function setupTabs() {
    // Services page tabs
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Workflow steps animation on scroll
        const workflowSteps = document.querySelectorAll('.workflow-step');
        if (workflowSteps.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            });

            workflowSteps.forEach((step, index) => {
                step.style.opacity = '0';
                step.style.transform = 'translateY(20px)';
                step.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
                observer.observe(step);
            });
        }

        // Tech badges hover effect
        const techBadges = document.querySelectorAll('.tech-badge');
        techBadges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Generic tabs (for other pages)
    const tabs = document.querySelectorAll('.tab-btn');
    const genericTabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);

            genericTabContents.forEach(tabContent => {
                tabContent.classList.remove('active');
            });

            tabs.forEach(t => {
                t.classList.remove('active');
            });

            tab.classList.add('active');
            if (target) {
                target.classList.add('active');
            }
        });
    });

    // Activate the first tab by default if it exists on the page
    if (tabs.length > 0) {
        // Check if there is an active tab already from a previous state
        const activeTab = document.querySelector('.tab-btn.active');
        if (!activeTab) {
            tabs[0].click();
        } else {
            // if there is an active tab, ensure its content is displayed.
             const target = document.querySelector(activeTab.dataset.tabTarget);
             if(target) target.classList.add('active');
        }
    }
}