(function () {
  'use strict';

  const header = document.getElementById('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navOverlay = document.querySelector('.nav-overlay');

  // Header scroll state
  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile menu
  function openMenu() {
    nav.classList.add('is-open');
    navOverlay.classList.add('is-visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    nav.classList.remove('is-open');
    navOverlay.classList.remove('is-visible');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  menuToggle.addEventListener('click', function () {
    if (nav.classList.contains('is-open')) closeMenu();
    else openMenu();
  });
  navOverlay.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Stats counter animation
  const statNums = document.querySelectorAll('.stat-num');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };

  function animateValue(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(easeOut * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        statNums.forEach(animateValue);
        statsObserver.disconnect();
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats');
  if (statsSection) statsObserver.observe(statsSection);

  // Work carousel: horizontal scroll + dots
  const track = document.querySelector('.work-track');
  const carousel = document.querySelector('.work-carousel');
  const dotsContainer = document.querySelector('.work-dots');
  if (track && carousel && dotsContainer) {
    const cards = track.querySelectorAll('.work-card');
    const cardCount = cards.length;
    cards.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () {
        const card = cards[i];
        if (card) {
          const gap = 24;
          const left = card.offsetLeft - (carousel.offsetWidth - card.offsetWidth) / 2 + gap / 2;
          carousel.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
          dotsContainer.querySelectorAll('.dot').forEach(function (d) { d.classList.remove('active'); });
          dot.classList.add('active');
        }
      });
      dotsContainer.appendChild(dot);
    });
    let scrollTimeout;
    carousel.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 364;
        const index = Math.round(scrollLeft / cardWidth);
        const safeIndex = Math.max(0, Math.min(index, cardCount - 1));
        dotsContainer.querySelectorAll('.dot').forEach(function (d, j) {
          d.classList.toggle('active', j === safeIndex);
        });
      }, 80);
    }, { passive: true });
  }

  // Contact form
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Placeholder: replace with real submit logic
      alert('Thank you. Our team will get back to you shortly.');
    });
  }
})();
