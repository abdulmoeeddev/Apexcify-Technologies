// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        document.querySelector('.loading-screen').style.visibility = 'hidden';
    }, 1000);

    // Initialize custom cursor
    initCustomCursor();

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

// Products initialization
function initProducts() {
    // Product data - expanded with more random products
    const products = [
        {
            id: 1,
            title: 'AI Assistant Pro',
            owner: 'TechGenius Inc.',
            price: 299,
            category: 'tech',
            icon: 'fa-robot',
            image: 'https://picsum.photos/id/1/300/200',
            description: 'Advanced AI assistant with natural language processing capabilities.'
        },
        {
            id: 2,
            title: 'Smart Home Hub',
            owner: 'ConnectLife',
            price: 199,
            category: 'home',
            icon: 'fa-home',
            image: 'https://picsum.photos/id/42/300/200',
            description: 'Central control system for all your smart home devices.'
        },
        {
            id: 3,
            title: 'Business Analytics Suite',
            owner: 'DataDriven Co.',
            price: 499,
            category: 'business',
            icon: 'fa-chart-line',
            image: 'https://picsum.photos/id/180/300/200',
            description: 'Comprehensive analytics tools for business intelligence.'
        },
        {
            id: 4,
            title: 'Quantum Computing Access',
            owner: 'QuantumTech',
            price: 999,
            category: 'tech',
            icon: 'fa-microchip',
            image: 'https://picsum.photos/id/96/300/200',
            description: 'Cloud access to quantum computing resources for advanced calculations.'
        },
        {
            id: 5,
            title: 'Smart Kitchen System',
            owner: 'ModernLiving',
            price: 349,
            category: 'home',
            icon: 'fa-utensils',
            image: 'https://picsum.photos/id/225/300/200',
            description: 'Automated kitchen system with recipe suggestions and inventory management.'
        },
        {
            id: 6,
            title: 'Enterprise CRM Solution',
            owner: 'BusinessPro',
            price: 799,
            category: 'business',
            icon: 'fa-users',
            image: 'https://picsum.photos/id/48/300/200',
            description: 'Complete customer relationship management system for enterprises.'
        },
        {
            id: 7,
            title: 'VR Development Kit',
            owner: 'ImmerseTech',
            price: 599,
            category: 'tech',
            icon: 'fa-vr-cardboard',
            image: 'https://picsum.photos/id/119/300/200',
            description: 'Professional virtual reality development toolkit with advanced features.'
        },
        {
            id: 8,
            title: 'Smart Security System',
            owner: 'SafeHome',
            price: 449,
            category: 'home',
            icon: 'fa-shield-alt',
            image: 'https://picsum.photos/id/177/300/200',
            description: 'Comprehensive home security system with AI-powered threat detection.'
        },
        {
            id: 9,
            title: 'Financial Planning Software',
            owner: 'WealthWise',
            price: 399,
            category: 'business',
            icon: 'fa-money-bill-wave',
            image: 'https://picsum.photos/id/104/300/200',
            description: 'Advanced financial planning and forecasting tools for businesses.'
        },
        {
            id: 10,
            title: 'Augmented Reality Glasses',
            owner: 'FutureSight',
            price: 899,
            category: 'tech',
            icon: 'fa-glasses',
            image: 'https://picsum.photos/id/160/300/200',
            description: 'Next-generation AR glasses with advanced spatial mapping.'
        },
        {
            id: 11,
            title: 'Smart Garden System',
            owner: 'GreenTech',
            price: 249,
            category: 'home',
            icon: 'fa-seedling',
            image: 'https://picsum.photos/id/106/300/200',
            description: 'Automated garden care system with moisture and light monitoring.'
        },
        {
            id: 12,
            title: 'Supply Chain Management',
            owner: 'LogisticsPro',
            price: 699,
            category: 'business',
            icon: 'fa-truck',
            image: 'https://picsum.photos/id/155/300/200',
            description: 'End-to-end supply chain management solution with real-time tracking.'
        },
        {
            id: 13,
            title: 'Neural Interface Device',
            owner: 'MindTech',
            price: 1299,
            category: 'tech',
            icon: 'fa-brain',
            image: 'https://picsum.photos/id/175/300/200',
            description: 'Cutting-edge neural interface for direct brain-computer interaction.'
        },
        {
            id: 14,
            title: 'Smart Lighting Ecosystem',
            owner: 'BrightLife',
            price: 199,
            category: 'home',
            icon: 'fa-lightbulb',
            image: 'https://picsum.photos/id/110/300/200',
            description: 'Complete smart lighting system with mood and activity-based settings.'
        },
        {
            id: 15,
            title: 'HR Management Platform',
            owner: 'PeopleFirst',
            price: 599,
            category: 'business',
            icon: 'fa-id-card',
            image: 'https://picsum.photos/id/28/300/200',
            description: 'Comprehensive human resources management platform for modern businesses.'
        },
        {
            id: 16,
            title: 'Quantum Encryption System',
            owner: 'SecureTech',
            price: 899,
            category: 'tech',
            icon: 'fa-lock',
            image: 'https://picsum.photos/id/60/300/200',
            description: 'Unbreakable encryption system based on quantum computing principles.'
        },
        {
            id: 17,
            title: 'Smart Furniture Set',
            owner: 'ModernSpace',
            price: 1499,
            category: 'home',
            icon: 'fa-couch',
            image: 'https://picsum.photos/id/116/300/200',
            description: 'Intelligent furniture that adapts to your needs and preferences.'
        },
        {
            id: 18,
            title: 'Market Analysis Tool',
            owner: 'MarketSmart',
            price: 499,
            category: 'business',
            icon: 'fa-search-dollar',
            image: 'https://picsum.photos/id/201/300/200',
            description: 'Advanced market analysis and competitor intelligence platform.'
        },
        {
            id: 19,
            title: 'Holographic Display',
            owner: 'VisualTech',
            price: 1999,
            category: 'tech',
            icon: 'fa-cube',
            image: 'https://picsum.photos/id/200/300/200',
            description: 'Next-generation holographic display for immersive presentations.'
        },
        {
            id: 20,
            title: 'Climate Control System',
            owner: 'ComfortZone',
            price: 649,
            category: 'home',
            icon: 'fa-temperature-high',
            image: 'https://picsum.photos/id/125/300/200',
            description: 'Smart climate control system with AI-powered efficiency optimization.'
        }
    ];

    // DOM elements
    const productsContainer = document.querySelector('.products-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const priceRange = document.querySelector('#price-range');
    const priceValue = document.querySelector('#price-value');
    const sortSelect = document.querySelector('#sort-select');
    
    // Current filter state
    let currentCategory = 'all';
    let currentMaxPrice = 2000;
    let currentSort = 'default';

    // Initialize price range
    if (priceRange) {
        priceRange.max = 2000;
        priceRange.value = 2000;
        priceValue.textContent = `$${priceRange.value}`;
        
        priceRange.addEventListener('input', () => {
            currentMaxPrice = priceRange.value;
            priceValue.textContent = `$${currentMaxPrice}`;
            filterProducts();
        });
    }

    // Manufacturer filters removed as requested

    // Initialize sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            filterProducts();
        });
    }

    // Filter button click event
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update current category
            currentCategory = btn.dataset.filter;
            
            // Filter products
            filterProducts();
        });
    });

    // Filter products based on current filters
    function filterProducts() {
        // Clear products container
        productsContainer.innerHTML = '';
        
        // Filter products based on category and price
        let filteredProducts = products.filter(product => {
            // Category filter
            const categoryMatch = currentCategory === 'all' || product.category === currentCategory;
            
            // Price filter
            const priceMatch = product.price <= currentMaxPrice;
            
            return categoryMatch && priceMatch;
        });
        
        // Sort products
        switch (currentSort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                // Keep original order
                break;
        }
        
        // Render filtered products
        renderProducts(filteredProducts);
        
        // Update product count
        const productCount = document.querySelector('.product-count');
        if (productCount) {
            productCount.textContent = `${filteredProducts.length} products found`;
        }
    }

    // Render products
    function renderProducts(productsToRender) {
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.category = product.category;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="product-owner">By ${product.owner}</p>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price-container">
                        <p class="product-price">$${product.price}</p>
                        <button class="btn-primary">Add to Cart</button>
                    </div>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Re-initialize custom cursor for new elements
        const newProductCards = document.querySelectorAll('.product-card');
        newProductCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const cursor = document.querySelector('.cursor');
                const cursorFollower = document.querySelector('.cursor-follower');
                
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.borderColor = 'var(--secondary-color)';
            });
            
            card.addEventListener('mouseleave', () => {
                const cursor = document.querySelector('.cursor');
                const cursorFollower = document.querySelector('.cursor-follower');
                
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.borderColor = 'var(--primary-color)';
            });
        });
    }

    // Initial render
    filterProducts();
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