  
// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Responsive menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Animasi skill bar saat terlihat di layar
  const skillBars = document.querySelectorAll('.skill-level');

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      const target = el.getAttribute('data-percent');
      const value = parseInt(target.replace('%', ''), 10);
      if (entry.isIntersecting) {
        el.style.width = value + '%';
      } else {
        el.style.width = '0';
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => {
    bar.style.width = '0'; // Awal bar kosong
    skillObserver.observe(bar);
  });

  // Toggle button untuk about-text
  const toggleButton = document.querySelector('.toggle-button');
  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      const aboutText = document.querySelector('.about-text');
      aboutText.classList.toggle('expanded');
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-chevron-down');
      icon.classList.toggle('fa-chevron-up');

      const span = this.querySelector('span');
      if (aboutText.classList.contains('expanded')) {
        span.textContent = 'Read Less';
      } else {
        span.textContent = 'Read More';
      }
    });
  }

  // Page load animation: add class to body
  document.body.classList.add('page-loaded');

  // Scroll-triggered animations for elements with .animate-on-scroll
  const scrollElements = document.querySelectorAll('.animate-on-scroll');

  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        entry.target.classList.remove('hidden');
      } else {
        entry.target.classList.remove('fade-in');
        entry.target.classList.add('hidden');
      }
    });
  }, {
    threshold: 0.1
  });

  scrollElements.forEach(el => {
    scrollObserver.observe(el);
  });


  // Also listen to hashchange to trigger animation on navigation
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target && target.classList.contains('animate-on-scroll')) {
        // Reset animation by removing and re-adding classes
        target.classList.remove('fade-in');
        target.classList.add('hidden');
        // Force reflow to restart animation
        void target.offsetWidth;
        target.classList.add('fade-in');
        target.classList.remove('hidden');
      }
    }
  });

  // Contact form submission with EmailJS
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const status = document.getElementById('form-status');
      const error = document.getElementById('form-error');
      status.style.display = 'none';
      error.style.display = 'none';

      emailjs.init('O8Yzjn_YjxezneOsD');

      emailjs.sendForm('emailkearyo', 'emailkearyo', this)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          status.textContent = 'Pesan berhasil dikirim!';
          status.style.display = 'block';
          error.style.display = 'none';
          contactForm.reset();
        }, function(err) {
          console.error('FAILED...', err);
          error.textContent = 'Terjadi kesalahan saat mengirim pesan.';
          status.style.display = 'none';
          error.style.display = 'block';
        });

    });
  }
});
