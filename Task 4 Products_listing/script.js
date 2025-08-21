// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen - reduced timeout for better UX
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        document.querySelector('.loading-screen').style.visibility = 'hidden';
    }, 1000);

    // Initialize Three.js background
    initThreeJSBackground();

    // Initialize custom cursor
    initCustomCursor();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize counters
    initCounters();

    // Initialize products
    initProducts();

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
    const hoverElements = document.querySelectorAll('a, button, .filter-btn, .product-card');
    
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

// Three.js rotating background
function initThreeJSBackground() {
    const canvas = document.getElementById('bg-canvas');
    
    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Create renderer - fix for canvas element
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.domElement.id = 'bg-canvas-renderer';
    canvas.appendChild(renderer.domElement);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Optimize for mobile by adjusting pixel ratio
    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio);
    
    // Create particles - reduce count on mobile
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile ? 1000 : 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material with custom shaders for better performance
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        transparent: true,
        color: 0x6e00ff,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add some ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Position camera
    camera.position.z = 3;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    // Use passive event listeners for better performance
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });
    
    // Handle window resize with debounce for performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = window.innerWidth < 768;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(newIsMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio);
        }, 250);
    }, { passive: true });
    
    // Animation loop with frame rate optimization
    let lastTime = 0;
    const frameRate = 60; // Target frame rate
    const interval = 1000 / frameRate;
    
    const animate = (currentTime) => {
        requestAnimationFrame(animate);
        
        const deltaTime = currentTime - lastTime;
        
        // Limit frame rate for better performance
        if (deltaTime > interval) {
            lastTime = currentTime - (deltaTime % interval);
            
            // Rotate particles
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            
            // Mouse interaction
            particlesMesh.rotation.x += mouseY * 0.0005;
            particlesMesh.rotation.y += mouseX * 0.0005;
            
            renderer.render(scene, camera);
        }
    };
    
    animate(0);
}

// Scroll animations using GSAP and ScrollTrigger
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.2
            }
        );
    });
    
    // Animate testimonials
    gsap.utils.toArray('.testimonial').forEach((item, i) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                delay: i * 0.2
            }
        );
    });
    
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        // Start counter animation when in viewport
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
}

// Products functionality
function initProducts() {
    // Sample product data
    const products = [
        {
            id: 1,
            title: 'Quantum Processor X1',
            owner: 'Apexcify Labs',
            price: 1299,
            category: 'tech',
            icon: 'fa-microchip'
        },
        {
            id: 2,
            title: 'Neural Interface Headset',
            owner: 'NeuroTech Division',
            price: 899,
            category: 'tech',
            icon: 'fa-brain'
        },
        {
            id: 3,
            title: 'Holographic Display Unit',
            owner: 'Apexcify Vision',
            price: 1599,
            category: 'home',
            icon: 'fa-tv'
        },
        {
            id: 4,
            title: 'Autonomous Drone Assistant',
            owner: 'AeroTech Solutions',
            price: 799,
            category: 'tech',
            icon: 'fa-drone'
        },
        {
            id: 5,
            title: 'Smart Home Ecosystem',
            owner: 'Apexcify Home',
            price: 1499,
            category: 'home',
            icon: 'fa-house-signal'
        },
        {
            id: 6,
            title: 'Business Analytics Suite',
            owner: 'Enterprise Division',
            price: 1999,
            category: 'business',
            icon: 'fa-chart-pie'
        },
        {
            id: 7,
            title: 'Virtual Reality Workstation',
            owner: 'Apexcify Immersive',
            price: 1799,
            category: 'business',
            icon: 'fa-vr-cardboard'
        },
        {
            id: 8,
            title: 'Biometric Security System',
            owner: 'SecureTech',
            price: 1299,
            category: 'home',
            icon: 'fa-fingerprint'
        },
        {
            id: 9,
            title: 'AI Development Platform',
            owner: 'Apexcify Intelligence',
            price: 1899,
            category: 'business',
            icon: 'fa-robot'
        }
    ];
    
    const productsContainer = document.querySelector('.products-container');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const prevBtn = document.getElementById('prev-product');
    const nextBtn = document.getElementById('next-product');
    
    let currentPage = 1;
    const productsPerPage = 6;
    let filteredProducts = [...products];
    
    // Update price value display
    priceRange.addEventListener('input', () => {
        priceValue.textContent = `$${priceRange.value}`;
        filterProducts();
    });
    
    // Filter button click handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts();
        });
    });
    
    // Filter products based on selected criteria
    function filterProducts() {
        const selectedCategory = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const maxPrice = parseInt(priceRange.value);
        
        filteredProducts = products.filter(product => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            const priceMatch = product.price <= maxPrice;
            
            return categoryMatch && priceMatch;
        });
        
        currentPage = 1;
        renderProducts();
    }
    
    // Render products to the DOM
    function renderProducts() {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = filteredProducts.slice(startIndex, endIndex);
        
        productsContainer.innerHTML = '';
        
        if (currentProducts.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">No products match your criteria</p>';
            return;
        }
        
        currentProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            
            productCard.innerHTML = `
                <div class="product-icon">
                    <i class="fas ${product.icon}"></i>
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <div class="product-meta">
                        <span>By ${product.owner}</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
            
            // Add animation after a small delay
            setTimeout(() => {
                gsap.fromTo(productCard, 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );
            }, 100);
        });
        
        // Update navigation buttons state
        updateNavButtons();
    }
    
    // Update navigation buttons state
    function updateNavButtons() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    // Navigation button click handlers
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }
    });
    
    // Initial render
    renderProducts();
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            gsap.fromTo('nav ul li', 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }
            );
        }
    });
}