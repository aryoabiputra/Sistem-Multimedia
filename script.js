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
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.getAttribute('data-percent');
          // Pastikan hanya angka, buang simbol %
          const value = parseInt(target.replace('%', ''), 10);
          el.style.width = value + '%';
          observer.unobserve(el); // hanya animasi 1x
        }
      });
    }, {
      threshold: 0.5
    });
  
    skillBars.forEach(bar => {
      bar.style.width = '0'; // Awal bar kosong
      observer.observe(bar);
    });
  });
  