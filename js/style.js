document.addEventListener('DOMContentLoaded', () => {
      const navbar = document.getElementById('navbar');
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const navMenu = document.getElementById('navMenu');
      const filterBtns = document.querySelectorAll('.filter-btn');
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      const slides = document.querySelectorAll('.carousel-slide');

      // Navbar scroll effect
      const handleScroll = () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
      };
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      // Mobile menu toggle
      mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
      });

      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      });

      // Portfolio filter
      const filterPortfolio = (filter) => {
        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
        });
      };
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          filterBtns.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          filterPortfolio(e.target.dataset.filter);
        });
      });
      filterPortfolio('all');

      // Hero Carousel
      let currentSlide = 0;
      const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
      };
      setInterval(() => showSlide(currentSlide + 1), 5000);
    });