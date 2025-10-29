const btn = document.getElementById('menu-button');
const menu = document.getElementById('primary-menu');

if (btn && menu) {
  const getLinks = () => Array.from(menu.querySelectorAll('a'));

  function openMenu() {
    btn.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    menu.classList.add('is-open');
    const links = getLinks();
    if (links.length) links[0].focus();
  }

  function closeMenu({ returnFocus = true } = {}) {
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.hidden = true;
    if (returnFocus) btn.focus();
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  btn.addEventListener('keydown', (e) => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      isOpen ? closeMenu() : openMenu();
    }
    if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const links = getLinks();
      if (links.length) links[0].focus();
    }
  });

  menu.addEventListener('keydown', (e) => {
    const links = getLinks();
    const currentIndex = links.indexOf(document.activeElement);

    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!links.length) return;
      const dir = e.key === 'ArrowDown' ? 1 : -1;
      const next = (currentIndex + dir + links.length) % links.length;
      links[next].focus();
      return;
    }

    if (e.key === 'Tab') {
      if (e.shiftKey && currentIndex === 0) {
        e.preventDefault();
        btn.focus();
        return;
      }
      if (!e.shiftKey && currentIndex === links.length - 1) {
        closeMenu({ returnFocus: false });
      }
    }
  });

  document.addEventListener('click', (e) => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu({ returnFocus: false });
    }
  });
}
