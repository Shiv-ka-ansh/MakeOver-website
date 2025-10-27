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

  // Navbar hide/show on scroll direction
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
      // scrolling down — hide navbar
      navbar.classList.add('hidden');
    } else {
      // scrolling up — show navbar
      navbar.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

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

document.addEventListener('DOMContentLoaded', () => {
  // If the Swiper library isn't loaded, exit gracefully
  if (typeof Swiper === 'undefined') {
    // You must include Swiper core script before this file
    console.warn('Swiper not found. Make sure the Swiper CDN script is loaded before swiper-init.js');
    return;
  }

  try {
    const swiper = new Swiper('.mySwiper', {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      speed: 800,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      // responsive breakpoints if you later want multiple slides per view
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
      },
    });
  } catch (error) {
    console.error('Error initializing Swiper:', error);
  }
});

// ===== Accordion Functionality with Auto-Unfold =====
document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = item.querySelector(".accordion-content");
      const isOpen = content.classList.contains("open");

      // Close all
      document.querySelectorAll(".accordion-content").forEach(c => {
        c.classList.remove("open");
        c.style.maxHeight = null;
      });
      document.querySelectorAll(".accordion-header").forEach(h => h.classList.remove("active"));

      // Open clicked
      if (!isOpen) {
        content.classList.add("open");
        header.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // Auto-open if coming from index.html#bridal
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target && target.classList.contains("accordion-item")) {
      const header = target.querySelector(".accordion-header");
      const content = target.querySelector(".accordion-content");

      header.classList.add("active");
      content.classList.add("open");
      content.style.maxHeight = content.scrollHeight + "px";

      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }
});

