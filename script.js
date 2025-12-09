(function () {
  const burger = document.querySelector('[data-burger]');
  const nav = document.querySelector('[data-nav]');

  if (!burger || !nav) {
    return;
  }

  const navLinks = nav.querySelectorAll('a[href]');
  const desktopMedia = window.matchMedia('(min-width: 900px)');

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }

  function toggleMenu() {
    if (nav.classList.contains('open')) {
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
