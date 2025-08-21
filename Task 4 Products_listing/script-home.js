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
    
    // Create particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    // Use passive event listener for better performance
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    }, { passive: true });
    
    // Debounce resize event for better performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }, 100);
    });
    
    // Animation loop with frame rate optimization
    let lastTime = 0;
    const fps = 60;
    const frameTime = 1000 / fps;
    
    const animate = (currentTime) => {
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > frameTime) {
            lastTime = currentTime - (deltaTime % frameTime);
            
            particlesMesh.rotation.y += 0.002;
            particlesMesh.rotation.x += 0.001;
            
            // Smooth camera movement based on mouse position
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
            
            renderer.render(scene, camera);
        }
        
        requestAnimationFrame(animate);
    };
    
    animate(0);
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