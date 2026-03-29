/* ============================================================
   RESONANCE 360 — MAIN JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  // ── DOM refs ──────────────────────────────────────────────
  const nav       = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // ── Nav: scroll state (transparent → solid) ───────────────
  function onScroll() {
    if (window.scrollY > 48) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on init

  // ── Nav: create backdrop overlay for mobile slide-in ──────
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav__overlay';
  navOverlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(navOverlay);

  function closeNav() {
    navLinks && navLinks.classList.remove('is-open');
    navToggle && navToggle.classList.remove('is-open');
    navToggle && navToggle.setAttribute('aria-expanded', 'false');
    navOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // ── Nav: hamburger toggle ─────────────────────────────────
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navOverlay.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Close mobile nav when overlay is tapped
  navOverlay.addEventListener('click', closeNav);

  // Close mobile nav when a link is clicked
  if (navLinks) {
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // Close mobile nav on resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeNav();
  });

  // ── Nav: active link by current page ─────────────────────
  (function setActiveLink() {
    const path     = window.location.pathname;
    const page     = path.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav__link');

    allLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      // Strip query strings from href for comparison
      const hrefBase = href ? href.split('?')[0] : '';
      const isHome   = (page === '' || page === 'index.html') && hrefBase === 'index.html';
      const isMatch  = hrefBase === page;

      if (isHome || isMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  })();

  // ── Scroll reveal ─────────────────────────────────────────
  (function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all immediately
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealEls.forEach(function (el) { observer.observe(el); });
  })();

  // ── Footer: dynamic year ──────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── Contact form: tab pre-selection ──────────────────────
  // If arriving at contact.html?type=clinical or ?type=partner,
  // the contact page JS will handle tab activation.
  // We expose the param here for use by contact.js if needed.
  window.R360 = window.R360 || {};
  window.R360.contactType = (function () {
    const params = new URLSearchParams(window.location.search);
    return params.get('type') || null;
  })();

})();
