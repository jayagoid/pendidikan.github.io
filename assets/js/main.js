// ===== SMK Modern Website JavaScript =====
// Industrial & Technical Theme

// ===== Global Variables =====
let isMenuOpen = false;
let scrollPosition = 0;
let isScrolling = false;

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== Initialize Website =====
function initializeWebsite() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFormValidation();
    initBackToTop();
    initTypingEffect();
    initCounterAnimation();
    initParallaxEffects();
    initLazyLoading();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    console.log('SMK Modern Website Initialized Successfully!');
}

// ===== Navigation Functions =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navbar.contains(e.target)) {
            toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    isMenuOpen = !isMenuOpen;
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.classList.toggle('scrolled', scrolled);
}

function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// ===== Scroll Effects =====
function initScrollEffects() {
    // Throttle scroll events for better performance
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScrollEffects() {
    scrollPosition = window.pageYOffset;
    
    // Update active navigation link
    updateActiveNavLink();
    
    // Parallax effects
    updateParallaxElements();
    
    // Show/hide back to top button
    updateBackToTopVisibility();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== Animation Functions =====
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}

// ===== Typing Effect =====
function initTypingEffect() {
    const titleElement = document.querySelector('.title-main');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    const words = originalText.split(' ');
    
    // Clear the element
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = '';
    
    function typeWord() {
        if (wordIndex < words.length) {
            if (charIndex < words[wordIndex].length) {
                currentWord += words[wordIndex][charIndex];
                titleElement.textContent = currentWord;
                charIndex++;
                setTimeout(typeWord, 100);
            } else {
                // Add space and move to next word
                currentWord += ' ';
                titleElement.textContent = currentWord;
                wordIndex++;
                charIndex = 0;
                setTimeout(typeWord, 200);
            }
        } else {
            // Typing complete, add cursor blink effect
            titleElement.style.borderRight = '3px solid #ff6b35';
            titleElement.style.animation = 'blink 1s infinite';
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
                titleElement.style.animation = 'none';
            }, 3000);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWord, 1000);
}

// ===== Counter Animation =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with suffix
        let displayValue = Math.floor(current);
        if (element.textContent.includes('+')) {
            displayValue += '+';
        }
        if (element.textContent.includes('%')) {
            displayValue += '%';
        }
        
        element.textContent = displayValue;
    }, 16);
}

// ===== Parallax Effects =====
function initParallaxEffects() {
    // Initialize parallax elements
    window.addEventListener('scroll', updateParallaxElements);
}

function updateParallaxElements() {
    const parallaxElements = document.querySelectorAll('.floating-gear');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrollPosition * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrollPosition * 0.1}deg)`;
    });
    
    // Hero image parallax
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const yPos = scrollPosition * 0.3;
        heroImage.style.transform = `translateY(${yPos}px)`;
    }
}

// ===== Form Validation =====
function initFormValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Add real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} wajib diisi`;
    }
    
    // Specific field validations
    if (value && isValid) {
        switch (fieldName) {
            case 'nama':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Nama minimal 2 karakter';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Nama hanya boleh berisi huruf dan spasi';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Format email tidak valid';
                }
                break;
                
            case 'telepon':
                const phoneRegex = /^[0-9+\-\s()]+$/;
                if (!phoneRegex.test(value) || value.length < 10) {
                    isValid = false;
                    errorMessage = 'Nomor telepon tidak valid (minimal 10 digit)';
                }
                break;
                
            case 'nik':
                if (!/^[0-9]{16}$/.test(value)) {
                    isValid = false;
                    errorMessage = 'NIK harus 16 digit angka';
                }
                break;
                
            case 'nilai_un':
                const nilai = parseFloat(value);
                if (isNaN(nilai) || nilai < 0 || nilai > 100) {
                    isValid = false;
                    errorMessage = 'Nilai UN harus antara 0-100';
                }
                break;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : field.name;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    // Validate all required fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    // Check terms agreement
    const termsCheckbox = form.querySelector('input[name="terms"]');
    if (termsCheckbox && !termsCheckbox.checked) {
        isFormValid = false;
        showNotification('Anda harus menyetujui syarat dan ketentuan', 'error');
    }
    
    if (isFormValid) {
        submitForm(form);
    } else {
        showNotification('Mohon periksa kembali data yang Anda masukkan', 'error');
        
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
}

function submitForm(form) {
    const submitButton = form.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        
        // Show success message
        showNotification('Pendaftaran berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
        
        // Reset form
        form.reset();
        
        // Clear all errors
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => clearFieldError(field));
        
    }, 2000);
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#00d4aa',
        error: '#ef5350',
        warning: '#ffa726',
        info: '#2196f3'
    };
    return colors[type] || colors.info;
}

// ===== Back to Top Button =====
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;
    
    backToTopButton.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', updateBackToTopVisibility);
}

function updateBackToTopVisibility() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;
    
    const shouldShow = scrollPosition > 300;
    backToTopButton.classList.toggle('visible', shouldShow);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== Lazy Loading =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Program Cards Interaction =====
function initProgramCards() {
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== Facility Cards Interaction =====
function initFacilityCards() {
    const facilityCards = document.querySelectorAll('.facility-card');
    
    facilityCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add click animation
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ===== Search Functionality =====
function initSearch() {
    const searchInput = document.querySelector('#searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const searchableElements = document.querySelectorAll('[data-searchable]');
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        const isMatch = text.includes(query);
        
        element.style.display = isMatch || query === '' ? '' : 'none';
    });
}

// ===== Theme Switcher (Optional) =====
function initThemeSwitcher() {
    const themeSwitcher = document.querySelector('#themeSwitcher');
    if (!themeSwitcher) return;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===== Performance Monitoring =====
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Send analytics if needed
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: Math.round(loadTime),
                custom_parameter: 'smk_website'
            });
        }
    });
}

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    
    // Show user-friendly error message for critical errors
    if (e.error && e.error.message.includes('critical')) {
        showNotification('Terjadi kesalahan. Silakan refresh halaman.', 'error');
    }
});

// ===== Service Worker Registration (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== CSS Animation Classes =====
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: #ff6b35; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

// ===== Initialize Additional Features =====
document.addEventListener('DOMContentLoaded', () => {
    initProgramCards();
    initFacilityCards();
    initSearch();
    initThemeSwitcher();
    initPerformanceMonitoring();
});

// ===== Export functions for external use =====
window.SMKWebsite = {
    showNotification,
    scrollToTop,
    validateField,
    toggleMobileMenu
};