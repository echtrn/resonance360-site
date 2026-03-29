/* ── Projects renderer ──────────────────────────────────────
   Reads data/projects.json and renders project cards into
   #projects-clinical or #projects-ai containers.
   Shows first 4 by default; "View all" expands the rest.
   ─────────────────────────────────────────────────────────── */

(function () {
  const VISIBLE_COUNT = 4;

  const container = document.querySelector('[data-projects]');
  if (!container) return;

  const key = container.getAttribute('data-projects');
  const grid = container.querySelector('.projects__grid');
  const section = container.closest('.projects');

  fetch(container.getAttribute('data-src'))
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var items = data[key];
      if (!items || !items.length) { section.style.display = 'none'; return; }
      if (items.length === 1) grid.classList.add('projects__grid--single');

      items.forEach(function (p, i) {
        var card = document.createElement('article');
        card.className = 'project-card reveal' + (i < 3 ? ' reveal-delay-' + (i + 1) : '');
        if (i >= VISIBLE_COUNT) card.classList.add('project-card--hidden');

        var tags = p.tags.map(function (t) {
          return '<span class="project-card__tag">' + t + '</span>';
        }).join('');

        var linkHtml = p.link
          ? '<a href="' + p.link + '" target="_blank" rel="noopener noreferrer" class="project-card__link">'
            + 'View project <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">'
            + '<path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>'
          : '';

        card.innerHTML =
          '<div class="project-card__meta">'
            + '<div class="project-card__tags">' + tags + '</div>'
            + '<span class="project-card__year">' + p.year + '</span>'
          + '</div>'
          + '<h3 class="project-card__heading">' + p.title + '</h3>'
          + '<p class="project-card__summary">' + p.summary + '</p>'
          + linkHtml;

        grid.appendChild(card);
      });

      // "View all" toggle
      if (items.length > VISIBLE_COUNT) {
        var toggle = document.createElement('button');
        toggle.className = 'projects__toggle btn btn--outline-teal';
        toggle.textContent = 'View all projects (' + items.length + ')';
        toggle.addEventListener('click', function () {
          grid.querySelectorAll('.project-card--hidden').forEach(function (c) {
            c.classList.remove('project-card--hidden');
            // Trigger reveal animation
            requestAnimationFrame(function () { c.classList.add('is-visible'); });
          });
          toggle.remove();
        });
        container.appendChild(toggle);
      }
    })
    .catch(function () {
      // Silently hide section on error
      section.style.display = 'none';
    });
})();
