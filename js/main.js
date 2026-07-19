/* ===================================
   Brazos Valley Community Band
   Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Scroll Spy (Active Nav Link) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScrollSpy = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  // --- Years of Music ---
  const yearsEl = document.getElementById('years-of-music');
  if (yearsEl) {
    yearsEl.textContent = new Date().getFullYear() - 2008;
  }

  // --- Scroll Fade-In Animations ---
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // In production, replace with actual form submission (e.g., fetch to API or form service)
    alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
    contactForm.reset();
  });

  // --- Lightbox Image (click-to-enlarge class) ---
  const lightboxImages = document.querySelectorAll('img.lightbox-image');

  if (lightboxImages.length) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<button class="lightbox-overlay-close" aria-label="Close lightbox">&times;</button><img src="" alt="">';
    document.body.appendChild(overlay);

    const overlayImg = overlay.querySelector('img');
    const overlayClose = overlay.querySelector('.lightbox-overlay-close');

    const openLightbox = (src, alt) => {
      overlayImg.src = src;
      overlayImg.alt = alt || '';
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightboxImages.forEach(img => {
      img.addEventListener('click', () => {
        const fullSrc = img.getAttribute('data-full-src') || img.src;
        openLightbox(fullSrc, img.alt);
      });
    });

    overlayClose.addEventListener('click', closeLightbox);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

});
