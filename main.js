document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          const menuItems = document.querySelector('.menu-items');
          menuItems.classList.remove('active');
        }
      }
    });
  });

  // Improved mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const menuItems = document.querySelector('.menu-items');
  
  hamburger?.addEventListener('click', () => {
    menuItems.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !e.target.closest('.hamburger') && 
        !e.target.closest('.menu-items') && 
        menuItems.classList.contains('active')) {
      menuItems.classList.remove('active');
    }
  });

  // Enhanced scroll animations with custom timing
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '50px'
  });

  // Apply animations to elements with delays
  document.querySelectorAll('.service-card').forEach((el, index) => {
    el.dataset.delay = (index * 0.2).toString();
    observer.observe(el);
  });

  document.querySelectorAll('.value').forEach((el, index) => {
    el.dataset.delay = (index * 0.2).toString();
    observer.observe(el);
  });

  // Parallax effect for header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPositionY = `${scrolled * 0.5}px`;
  });

  // Improved navbar scroll effect
  let lastScroll = 0;
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 150) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });

  // Enhanced form feedback
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.innerText;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    submitBtn.disabled = true;

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé!';
    submitBtn.style.background = '#28a745';

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      contactForm.reset();
    }, 2000);

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = 'Merci pour votre message! Nous vous contacterons bientôt.';
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 5000);
  });

  // Service card hover effect
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const icon = card.querySelector('i');
      icon.style.transform = 'scale(1.2)';
    });

    card.addEventListener('mouseleave', (e) => {
      const icon = card.querySelector('i');
      icon.style.transform = 'scale(1)';
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menuItems.classList.remove('active');
    }
  });

  // Animation des cartes de services au scroll
  const cards = document.querySelectorAll('.service-detail-card');
  
  const observerCards = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => {
    observerCards.observe(card);
  });
});