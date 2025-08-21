// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        document.querySelector('.loading-screen').style.visibility = 'hidden';
    }, 1000);

    // Initialize custom cursor
    initCustomCursor();

    // Initialize testimonials
    initTestimonials();

    // Initialize header scroll effect
    initHeaderScroll();

    // Initialize mobile menu
    initMobileMenu();
});

// Custom cursor functionality
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Add hover effect to all links and buttons
    const hoverElements = document.querySelectorAll('a, button, .testimonial-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = 'var(--secondary-color)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--primary-color)';
        });
    });
}

// Testimonials initialization
function initTestimonials() {
    // Testimonial data with random client images
    const testimonials = [
        {
            id: 1,
            quote: "Apexcify Technology transformed our business with their innovative solutions. Their team's expertise and dedication exceeded our expectations.",
            author: "Sarah Johnson",
            title: "CEO, InnovateTech",
            image: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            id: 2,
            quote: "Working with Apexcify was a game-changer for our startup. Their strategic approach and cutting-edge technology helped us scale rapidly.",
            author: "Michael Chen",
            title: "Founder, NextWave Solutions",
            image: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
            id: 3,
            quote: "The AI solution provided by Apexcify increased our operational efficiency by 40%. Their ongoing support has been exceptional.",
            author: "Emily Rodriguez",
            title: "CTO, DataDrive Inc.",
            image: "https://randomuser.me/api/portraits/women/3.jpg"
        },
        {
            id: 4,
            quote: "Apexcify's team understood our unique challenges and delivered a customized solution that perfectly addressed our needs. Highly recommended!",
            author: "David Wilson",
            title: "Operations Director, Global Systems",
            image: "https://randomuser.me/api/portraits/men/4.jpg"
        },
        {
            id: 5,
            quote: "The implementation process was smooth and the results were immediate. Apexcify's solutions have given us a competitive edge in the market.",
            author: "Jessica Patel",
            title: "Marketing VP, BrandForward",
            image: "https://randomuser.me/api/portraits/women/5.jpg"
        },
        {
            id: 6,
            quote: "Apexcify's cloud integration services streamlined our workflows and improved collaboration across our global teams.",
            author: "Robert Kim",
            title: "IT Director, Worldwide Enterprises",
            image: "https://randomuser.me/api/portraits/men/6.jpg"
        },
        {
            id: 7,
            quote: "The cybersecurity framework implemented by Apexcify has significantly enhanced our data protection measures and given our clients peace of mind.",
            author: "Amanda Foster",
            title: "Security Officer, SecureNet",
            image: "https://randomuser.me/api/portraits/women/7.jpg"
        },
        {
            id: 8,
            quote: "From concept to execution, Apexcify delivered excellence at every stage. Their innovative approach to problem-solving is unmatched.",
            author: "Thomas Garcia",
            title: "Product Manager, InnovateX",
            image: "https://randomuser.me/api/portraits/men/8.jpg"
        },
        {
            id: 9,
            quote: "Apexcify's IoT solutions have revolutionized our manufacturing processes, resulting in significant cost savings and improved product quality.",
            author: "Olivia Martinez",
            title: "Production Head, Industrial Innovations",
            image: "https://randomuser.me/api/portraits/women/9.jpg"
        },
        {
            id: 10,
            quote: "The machine learning algorithms developed by Apexcify have transformed our data analysis capabilities and driven more informed business decisions.",
            author: "James Taylor",
            title: "Analytics Director, Insight Corp",
            image: "https://randomuser.me/api/portraits/men/10.jpg"
        }
    ];

    // DOM elements
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const testimonialForm = document.querySelector('.testimonial-form');
    
    // Current testimonial index
    let currentIndex = 0;
    const testimonialsPerPage = 3;
    
    // Render testimonials
    function renderTestimonials() {
        // Clear testimonials container
        testimonialsContainer.innerHTML = '';
        
        // Calculate start and end indices
        const startIndex = currentIndex;
        const endIndex = Math.min(startIndex + testimonialsPerPage, testimonials.length);
        
        // Render testimonials for current page
        for (let i = startIndex; i < endIndex; i++) {
            const testimonial = testimonials[i];
            
            const testimonialCard = document.createElement('div');
            testimonialCard.classList.add('testimonial-card');
            
            testimonialCard.innerHTML = `
                <div class="testimonial-quote">
                    <i class="fas fa-quote-left"></i>
                    <p>${testimonial.quote}</p>
                    <i class="fas fa-quote-right"></i>
                </div>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="${testimonial.image}" alt="${testimonial.author}">
                    </div>
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.title}</p>
                    </div>
                </div>
            `;
            
            testimonialsContainer.appendChild(testimonialCard);
        }
        
        // Update navigation buttons state
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = endIndex >= testimonials.length;
        
        // Add animation to testimonial cards
        const cards = document.querySelectorAll('.testimonial-card');
        cards.forEach((card, i) => {
            card.style.animation = `fadeIn 0.5s ease forwards ${i * 0.2}s`;
            card.style.opacity = '0';
        });
    }
    
    // Navigation button click events
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex = Math.max(0, currentIndex - testimonialsPerPage);
            renderTestimonials();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex + testimonialsPerPage < testimonials.length) {
            currentIndex += testimonialsPerPage;
            renderTestimonials();
        }
    });
    
    // Testimonial form submission
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.querySelector('#testimonial-name').value;
            const company = document.querySelector('#testimonial-company').value;
            const message = document.querySelector('#testimonial-message').value;
            
            if (name && company && message) {
                // Create new testimonial
                const newTestimonial = {
                    id: testimonials.length + 1,
                    quote: message,
                    author: name,
                    title: company,
                    image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 50) + 11}.jpg`
                };
                
                // Add to testimonials array
                testimonials.push(newTestimonial);
                
                // Reset form
                testimonialForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Thank you for your testimonial! It has been added successfully.';
                testimonialForm.appendChild(successMessage);
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
                
                // Navigate to last page to show new testimonial
                currentIndex = Math.max(0, testimonials.length - testimonialsPerPage);
                renderTestimonials();
            }
        });
    }
    
    // Initial render
    renderTestimonials();
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}