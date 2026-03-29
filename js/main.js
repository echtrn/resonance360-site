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

  // ── Nav: panel header (logo) and footer (email + tagline) ─
  if (navLinks) {
    var headerLi = document.createElement('li');
    headerLi.className = 'nav__panel-header';
    headerLi.setAttribute('role', 'presentation');
    headerLi.innerHTML = '<span class="nav__panel-logo">Resonance 360</span><span class="nav__logo-dot" aria-hidden="true"></span>';
    navLinks.insertBefore(headerLi, navLinks.firstChild);

    var footerLi = document.createElement('li');
    footerLi.className = 'nav__panel-footer';
    footerLi.setAttribute('role', 'presentation');
    footerLi.innerHTML = '<a href="mailto:hello@resonance360.com" class="nav__panel-email">hello@resonance360.com</a>'
      + '<p class="nav__panel-tagline">Precision Radiology.<br>Intelligent Innovation.</p>';
    navLinks.appendChild(footerLi);
  }

  function closeNav() {
    navLinks && navLinks.classList.remove('is-open');
    navToggle && navToggle.classList.remove('is-open');
    navToggle && navToggle.setAttribute('aria-expanded', 'false');
    navOverlay.classList.remove('is-open');
    nav && nav.classList.remove('is-menu-open');
    document.body.style.overflow = '';
  }

  // ── Nav: hamburger toggle ─────────────────────────────────
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navOverlay.classList.toggle('is-open', isOpen);
      nav.classList.toggle('is-menu-open', isOpen);
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

  // Active link is set via hardcoded `active` class in each page's HTML.

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
