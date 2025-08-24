// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Interactive Problem Solver
let currentStep = 1;
const totalSteps = 4;

function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.style.display = 'none';
    });
    
    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
    if (currentStepElement) {
        currentStepElement.style.display = 'block';
    }
}

function handleOptionClick(button, isCorrect) {
    // Disable all options in current step
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    const options = currentStepElement.querySelectorAll('.option-btn');
    options.forEach(option => {
        option.disabled = true;
    });
    
    // Mark the clicked option
    if (isCorrect) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        // Find and mark the correct answer
        const correctOption = currentStepElement.querySelector('[data-correct="true"]');
        if (correctOption) {
            correctOption.classList.add('correct');
        }
    }
    
    // Wait a moment then proceed to next step
    setTimeout(() => {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        } else {
            // Show completion feedback
            showCompletionFeedback();
        }
    }, 1500);
}

function showCompletionFeedback() {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.style.display = 'none';
    });
    
    // Show feedback
    const feedback = document.querySelector('.scenario-feedback');
    if (feedback) {
        feedback.style.display = 'block';
    }
}

function resetScenario() {
    currentStep = 1;
    
    // Reset all option buttons
    document.querySelectorAll('.option-btn').forEach(button => {
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
    });
    
    // Hide feedback
    const feedback = document.querySelector('.scenario-feedback');
    if (feedback) {
        feedback.style.display = 'none';
    }
    
    // Show first step
    showStep(1);
}

// Initialize the scenario
document.addEventListener('DOMContentLoaded', () => {
    showStep(1);
    
    // Add event listeners to option buttons
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', () => {
            const isCorrect = button.getAttribute('data-correct') === 'true';
            handleOptionClick(button, isCorrect);
        });
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.thinking-card, .project-card, .skills-category');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission (in a real app, you'd send this to a server)
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Skills animation on scroll
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Trigger skills animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Add typing effect to hero title
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for skills
function animateCounters() {
    const counters = document.querySelectorAll('.skill-progress');
    
    counters.forEach(counter => {
        const target = parseInt(counter.style.width);
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.style.width = current + '%';
                requestAnimationFrame(updateCounter);
            } else {
                counter.style.width = target + '%';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (document.querySelector('.skills')) {
    skillsObserver.observe(document.querySelector('.skills'));
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation for images (if any are added later)
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Initialize image preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('button, a, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #2563eb';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16); // 60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add error handling for the interactive scenario
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
    // Fallback: show all steps if there's an error
    document.querySelectorAll('.step').forEach(step => {
        step.style.display = 'block';
    });
});

// Export functions for global access (if needed)
window.resetScenario = resetScenario;
window.animateSkills = animateSkills;

// Industry Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-industry') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Enhanced case study interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for case study sections
    const caseStudySections = document.querySelectorAll('.problem-scenario, .analysis-process, .solution-implementation, .results');
    
    caseStudySections.forEach(section => {
        section.addEventListener('click', () => {
            section.style.transform = 'scale(1.02)';
            setTimeout(() => {
                section.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Add hover effects for framework steps
    const frameworkSteps = document.querySelectorAll('.framework-step');
    frameworkSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            step.style.borderLeftColor = '#7c3aed';
        });
        
        step.addEventListener('mouseleave', () => {
            step.style.borderLeftColor = '#2563eb';
        });
    });
    
    // Add testimonial card interactions
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#2563eb';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = '#e5e7eb';
        });
    });
});

// Enhanced form handling with topic selection
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const topic = formData.get('topic');
    const message = formData.get('message');
    
    // Enhanced validation
    if (!name || !email || !topic || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification(`Thank you for your message, ${name}! I'll get back to you soon about ${topic}.`, 'success');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#2563eb';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Enhanced metrics animation
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    
    metrics.forEach(metric => {
        const finalValue = metric.textContent;
        const isPercentage = finalValue.includes('%');
        const isNumber = !isNaN(parseFloat(finalValue));
        
        if (isNumber) {
            const target = parseFloat(finalValue);
            let current = 0;
            const increment = target / 50;
            
            const updateMetric = () => {
                if (current < target) {
                    current += increment;
                    metric.textContent = isPercentage ? 
                        Math.round(current) + '%' : 
                        Math.round(current);
                    requestAnimationFrame(updateMetric);
                } else {
                    metric.textContent = finalValue;
                }
            };
            
            updateMetric();
        }
    });
}

// Trigger metrics animation when case studies are visible
const caseStudiesSection = document.querySelector('.case-studies');
if (caseStudiesSection) {
    const caseStudiesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetrics();
                caseStudiesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    caseStudiesObserver.observe(caseStudiesSection);
}
