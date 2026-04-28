document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Tech Tabs Switcher
    const techTabs = document.querySelectorAll('.tech-tab');
    const techItems = document.querySelectorAll('.tech-item');
    techTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            techTabs.forEach(t => t.classList.remove('active'));
            techItems.forEach(i => i.classList.remove('active'));
            
            tab.classList.add('active');
            const targetEl = document.getElementById(target);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // 4. Hero Particles Animation
    const particlesContainer = document.querySelector('.hero-particles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    // 5. Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = { threshold: 0.5 };
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseFloat(target.innerText);
                let startValue = 0;
                const duration = 2000;
                const startTime = performance.now();
                
                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentValue = progress * endValue;
                    
                    if (endValue % 1 === 0) {
                        target.innerText = Math.floor(currentValue);
                    } else {
                        target.innerText = currentValue.toFixed(1);
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        target.innerText = endValue;
                    }
                };
                requestAnimationFrame(animate);
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // 6. Efficiency Bar Animation
    const effBars = document.querySelectorAll('.eff-fill');
    const effObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const width = target.dataset.width;
                if (width) target.style.width = width + '%';
                effObserver.unobserve(target);
            }
        });
    }, observerOptions);

    effBars.forEach(bar => effObserver.observe(bar));
});
