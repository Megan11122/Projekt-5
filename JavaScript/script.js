// Selins del
(function () {
  const burger = document.querySelector('[data-burger]');
  const nav = document.querySelector('[data-nav]');

  if (!burger || !nav) {
    return;
  }

  const navLinks = Array.from(nav.querySelectorAll('a[href]'));
  const desktopMedia = window.matchMedia('(min-width: 900px)');
  let menuIsOpen = false;

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    menuIsOpen = true;
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    menuIsOpen = false;
  }

  function toggleMenu() {
    if (menuIsOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  burger.addEventListener('click', toggleMenu);
  burger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  desktopMedia.addEventListener('change', (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
})();
