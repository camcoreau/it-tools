(() => {
  'use strict';

  const RELEASE = '2026.07.28';
  if (document.querySelector('[data-camcore-platform]')) return;

  const host = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const shield = `
    <svg viewBox="0 0 210 210" role="img" aria-label="CamCore" focusable="false">
      <defs>
        <linearGradient id="cc-tools-cyan" x1="30" y1="25" x2="190" y2="190" gradientUnits="userSpaceOnUse">
          <stop stop-color="#18D7F2"/><stop offset="1" stop-color="#0096C7"/>
        </linearGradient>
        <linearGradient id="cc-tools-white" x1="20" y1="15" x2="175" y2="170" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#DCEBFF"/>
        </linearGradient>
      </defs>
      <path d="M105 12 190 44v48c0 21-3 40-12 58" fill="none" stroke="url(#cc-tools-white)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 150c-9-18-12-37-12-58V44l85-32" fill="none" stroke="url(#cc-tools-white)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M52 118V82l53-41 53 41v36M145 72V50h18v36" fill="none" stroke="url(#cc-tools-white)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="91" y="82" width="12" height="12" rx="1.5" fill="#fff"/><rect x="108" y="82" width="12" height="12" rx="1.5" fill="#fff"/>
      <rect x="91" y="99" width="12" height="12" rx="1.5" fill="#fff"/><rect x="108" y="99" width="12" height="12" rx="1.5" fill="#fff"/>
      <path d="M40 143h130M105 143v45" fill="none" stroke="url(#cc-tools-cyan)" stroke-width="10" stroke-linecap="round"/>
      <circle cx="40" cy="143" r="16" fill="#06111F" stroke="url(#cc-tools-cyan)" stroke-width="9"/>
      <circle cx="170" cy="143" r="16" fill="#06111F" stroke="url(#cc-tools-cyan)" stroke-width="9"/>
      <circle cx="105" cy="143" r="18" fill="url(#cc-tools-cyan)"/>
      <circle cx="105" cy="188" r="16" fill="#06111F" stroke="url(#cc-tools-cyan)" stroke-width="9"/>
      <path d="M57 169c14 12 29 20 48 27 19-7 34-15 48-27" fill="none" stroke="url(#cc-tools-white)" stroke-width="10" stroke-linecap="round"/>
    </svg>`;

  const links = [
    { group: 'CamCore websites', icon: 'ST', label: 'CamCore Start', description: 'Reliable home page for trusted devices.', href: 'https://start.inside.camcore.au/' },
    { group: 'CamCore websites', icon: 'IN', label: 'Inside CamCore', description: 'Systems, services and administration dashboard.', href: 'https://inside.camcore.au/' },
    { group: 'CamCore websites', icon: 'SW', label: 'Software Centre', description: 'Approved software and Windows tools.', href: 'https://software.inside.camcore.au/' },
    { group: 'CamCore websites', icon: 'TL', label: 'IT Tools', description: 'Private technical and conversion utilities.', href: 'https://tools.inside.camcore.au/' },
    { group: 'Service access', icon: 'UP', label: 'CamCore Status', description: 'Incidents, maintenance and service health.', href: 'https://status.camcore.au/' },
    { group: 'Service access', icon: 'PX', label: 'Cameron-Media', description: 'Movies, TV Shows and Live TV in Plex.', href: 'https://plex.camcore.au/' },
    { group: 'Service access', icon: 'RQ', label: 'Media Requests', description: 'Request approved Movies and TV Shows.', href: 'https://requests.camcore.au/' },
    { group: 'Support', icon: 'HC', label: 'Help Centre', description: 'Setup, playback and troubleshooting help.', href: 'https://camcore.au/help-centre.html' },
    { group: 'Support', icon: 'SUP', label: 'Submit Support Request', description: 'Report access, tool or service problems.', href: 'https://sites.plane.so/intake/forms/2054158f365d49d2a27bfb2c88df72be' },
  ];

  const isCurrent = (href) => {
    try {
      const target = new URL(href);
      if (target.hostname.toLowerCase() !== host) return false;
      if (target.pathname === '/' || !target.pathname) return path === '/' || !path;
      return path.startsWith(target.pathname.toLowerCase());
    }
    catch {
      return false;
    }
  };

  const root = document.createElement('div');
  root.dataset.camcorePlatform = 'true';
  root.dataset.release = RELEASE;
  root.innerHTML = `
    <button class="cc-platform-launcher" type="button" aria-label="Open CamCore navigation" aria-expanded="false" aria-controls="cc-platform-panel">
      <span class="cc-platform-launcher-mark" aria-hidden="true">${shield}</span>
      <span class="cc-platform-launcher-copy"><strong>CamCore</strong><small>Navigate</small></span>
      <kbd>Alt K</kbd>
    </button>
    <div class="cc-platform-backdrop" hidden></div>
    <section class="cc-platform-panel" id="cc-platform-panel" role="dialog" aria-modal="true" aria-labelledby="cc-platform-title" hidden>
      <header class="cc-platform-panel-head">
        <div class="cc-platform-brand">
          <span class="cc-platform-brand-mark" aria-hidden="true">${shield}</span>
          <div><strong id="cc-platform-title">IT Tools</strong><span>Private technical utilities</span></div>
        </div>
        <button class="cc-platform-close" type="button" aria-label="Close CamCore navigation">×</button>
      </header>
      <div class="cc-platform-context"><span class="cc-platform-scope"><i></i>CamCore LAN or NetBird</span><span>Release ${RELEASE}</span></div>
      <label class="cc-platform-search"><span class="cc-sr-only">Search CamCore destinations</span><input type="search" autocomplete="off" spellcheck="false" placeholder="Search CamCore websites and services…"></label>
      <nav class="cc-platform-links" aria-label="CamCore destinations"></nav>
      <footer class="cc-platform-footer"><span>CamCore – Cameron Family Secure Network</span><a href="https://status.camcore.au/">Check service status</a></footer>
    </section>`;

  const launcher = root.querySelector('.cc-platform-launcher');
  const panel = root.querySelector('.cc-platform-panel');
  const backdrop = root.querySelector('.cc-platform-backdrop');
  const closeButton = root.querySelector('.cc-platform-close');
  const search = root.querySelector('.cc-platform-search input');
  const nav = root.querySelector('.cc-platform-links');
  let previousFocus = null;

  const render = (filter = '') => {
    const term = filter.trim().toLowerCase();
    nav.innerHTML = '';
    const matches = links.filter(item => !term || `${item.label} ${item.description} ${item.group} ${item.icon}`.toLowerCase().includes(term));
    const groups = matches.reduce((result, item) => {
      (result[item.group] ||= []).push(item);
      return result;
    }, {});

    Object.entries(groups).forEach(([group, items]) => {
      const section = document.createElement('section');
      section.className = 'cc-platform-group';
      section.innerHTML = `<h2>${group}</h2><div class="cc-platform-grid"></div>`;
      const grid = section.querySelector('.cc-platform-grid');
      items.forEach((item) => {
        const link = document.createElement('a');
        link.href = item.href;
        link.className = 'cc-platform-link';
        if (isCurrent(item.href)) link.setAttribute('aria-current', 'page');
        link.innerHTML = `<span class="cc-platform-icon" aria-hidden="true">${item.icon}</span><span class="cc-platform-link-copy"><strong>${item.label}</strong><small>${item.description}</small></span><span class="cc-platform-arrow" aria-hidden="true">↗</span>`;
        grid.appendChild(link);
      });
      nav.appendChild(section);
    });

    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'cc-platform-empty';
      empty.textContent = 'No matching CamCore destination.';
      nav.appendChild(empty);
    }
  };

  const focusable = () => [...panel.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]')]
    .filter(element => element.getClientRects().length);

  const openPanel = () => {
    previousFocus = document.activeElement;
    panel.hidden = false;
    backdrop.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('cc-platform-open');
    search.value = '';
    render();
    requestAnimationFrame(() => search.focus());
  };

  const closePanel = () => {
    panel.hidden = true;
    backdrop.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('cc-platform-open');
    search.value = '';
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    else launcher.focus();
  };

  launcher.addEventListener('click', openPanel);
  closeButton.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);
  search.addEventListener('input', () => render(search.value));

  document.addEventListener('keydown', (event) => {
    const shortcut = event.altKey && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === 'k';
    if (shortcut) {
      event.preventDefault();
      panel.hidden ? openPanel() : closePanel();
      return;
    }

    if (event.key === 'Escape' && !panel.hidden) {
      event.preventDefault();
      closePanel();
      return;
    }

    if (event.key === 'Tab' && !panel.hidden) {
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.body.appendChild(root);
  document.documentElement.dataset.camcoreRelease = RELEASE;
  document.documentElement.dataset.camcoreSite = 'tools';
  render();
})();
