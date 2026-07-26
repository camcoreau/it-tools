(() => {
  'use strict';
  if (document.querySelector('[data-camcore-platform]')) return;

  const links = [
    ['Start', 'https://start.inside.camcore.au/', '⌂'],
    ['Inside CamCore', 'https://inside.camcore.au/', '◆'],
    ['Software Centre', 'https://software.inside.camcore.au/', '⬇'],
    ['IT Tools', 'https://tools.inside.camcore.au/', '⌘'],
    ['Requests', 'https://requests.camcore.au/', '▶'],
    ['Service Status', 'https://status.camcore.au/', '●'],
    ['Help Centre', 'https://camcore.au/help-centre.html', '?'],
  ];

  const root = document.createElement('div');
  root.dataset.camcorePlatform = 'true';
  root.innerHTML = `
    <button class="cc-platform-launcher" type="button" aria-label="Open CamCore services" aria-expanded="false">
      <span class="cc-platform-launcher-mark">CC</span><span class="cc-platform-launcher-label">CamCore</span><kbd>⌘K</kbd>
    </button>
    <div class="cc-platform-backdrop" hidden></div>
    <section class="cc-platform-panel" role="dialog" aria-modal="true" aria-label="CamCore services" hidden>
      <header class="cc-platform-panel-head"><div><strong>CamCore</strong><span>Private services</span></div><button class="cc-platform-close" type="button" aria-label="Close CamCore services">×</button></header>
      <label class="cc-platform-search"><span class="sr-only">Search CamCore services</span><input type="search" autocomplete="off" placeholder="Search CamCore services…"></label>
      <nav class="cc-platform-links" aria-label="CamCore services"></nav>
      <footer class="cc-platform-footer"><span>CamCore – Cameron Family Secure Network</span><a href="https://status.camcore.au/">Check service status</a></footer>
    </section>`;

  const launcher = root.querySelector('.cc-platform-launcher');
  const panel = root.querySelector('.cc-platform-panel');
  const backdrop = root.querySelector('.cc-platform-backdrop');
  const close = root.querySelector('.cc-platform-close');
  const search = root.querySelector('input');
  const nav = root.querySelector('.cc-platform-links');

  const render = (filter = '') => {
    const term = filter.trim().toLowerCase();
    nav.innerHTML = '';
    links.filter(([label]) => label.toLowerCase().includes(term)).forEach(([label, href, icon]) => {
      const a = document.createElement('a');
      a.href = href;
      a.className = 'cc-platform-link';
      if (window.location.href.startsWith(href)) a.setAttribute('aria-current', 'page');
      a.innerHTML = `<span class="cc-platform-icon" aria-hidden="true">${icon}</span><span>${label}</span><span class="cc-platform-external" aria-hidden="true">↗</span>`;
      nav.appendChild(a);
    });
    if (!nav.children.length) {
      const empty = document.createElement('p');
      empty.className = 'cc-platform-empty';
      empty.textContent = 'No matching CamCore service.';
      nav.appendChild(empty);
    }
  };

  const openPanel = () => {
    panel.hidden = false;
    backdrop.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('cc-platform-open');
    render();
    setTimeout(() => search.focus(), 0);
  };
  const closePanel = () => {
    panel.hidden = true;
    backdrop.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('cc-platform-open');
    search.value = '';
    launcher.focus();
  };

  launcher.addEventListener('click', openPanel);
  close.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);
  search.addEventListener('input', () => render(search.value));
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      panel.hidden ? openPanel() : closePanel();
    }
    if (event.key === 'Escape' && !panel.hidden) closePanel();
  });

  document.body.appendChild(root);
  render();
})();
