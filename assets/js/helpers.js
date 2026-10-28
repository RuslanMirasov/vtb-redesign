export const debounce = (fn, delay = 150) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const hidePreloader = () => {
  const preloader = document.querySelector('[data-preloader]');
  const header = document.querySelector('.header');
  const mainSection = document.querySelector('.section--hero');
  const columnLeft = document.querySelector('.column--left');
  const columnRight = document.querySelector('.column--right');
  const fixedBackground = document.querySelector('.fixed-background');
  const preloaderImage = document.querySelector('.preloader__image');
  const isMainPage = fixedBackground ? fixedBackground.classList.contains('scaleble') : false;

  const delay = isMainPage ? 1200 : 500;
  const delay2 = isMainPage ? 1000 : 0;

  if (isMainPage) {
    requestAnimationFrame(() => {
      preloaderImage.style.height = '100%';
      columnLeft.classList.add('in-main-page');
      columnRight.classList.add('in-main-page');
    });
  }

  const handlerLoad = () => {
    preloader?.classList.add('hidden');
    fixedBackground?.classList.remove('scaleble');
    if (isMainPage) {
      mainSection.classList.add('show');
    }

    setTimeout(() => {
      document.body.classList.add('loaded');
    }, delay);

    setTimeout(() => {
      preloader?.remove();
      header?.classList.remove('scaleble');
      columnLeft?.classList.remove('scaleble');
      columnRight?.classList.remove('scaleble');
      if (isMainPage) {
        mainSection.classList.remove('show');
      }
    }, 3000);
  };

  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      setTimeout(handlerLoad, delay2);
    });
  });
};

export const initNavigationMenu = () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.navigation ');
  const menuLinks = document.querySelectorAll('.menu__link');
  const main = document.querySelector('.main');
  const columnLeft = document.querySelector('.column--left');
  const columnRight = document.querySelector('.column--right');
  const fixedBackground = document.querySelector('.fixed-background');
  const selectPlayBtn = document.querySelector('.select-a-play');
  const fullScreenButton = document.querySelector('.full-screen-button');
  const mobilNavMenu = document.querySelector('.mobil-nav-menu');
  const goBackButton = document.querySelector('.go-back');
  const tipNavigation = document.querySelector('.tip-navigation');

  const toggleMenu = () => {
    burger?.classList.toggle('open');
    menu?.classList.toggle('open');
    main?.classList.toggle('hidden');
    columnLeft?.classList.toggle('hidden');
    columnRight?.classList.toggle('hidden');
    selectPlayBtn?.classList.toggle('hidden');
    fullScreenButton?.classList.toggle('hidden');
    mobilNavMenu?.classList.toggle('hidden');
    goBackButton?.classList.toggle('hidden');
    fixedBackground?.classList.toggle('move');
    tipNavigation?.classList.toggle('hidden');
  };

  if (burger) burger.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => link.addEventListener('click', toggleMenu));
};

export const initLinksMiddleware = () => {
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    if (link.hasAttribute('data-closed')) {
      e.preventDefault();
      alert('В помещении идут приготовления. Скоро оно распахнет для вас свои двери!');
      return;
    }

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    e.preventDefault();

    document.body.classList.remove('loaded');

    setTimeout(() => {
      const target = link.getAttribute('target');
      if (target === '_blank') {
        window.open(href, '_blank'); // новая вкладка
      } else {
        window.location.href = href; // текущая вкладка
      }
    }, 700);
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const linkPath = new URL(href, window.location.origin).pathname.replace(/\/+$/, '');
    const currentPath = window.location.pathname.replace(/\/+$/, '');

    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
};

export const initScrollArea = () => {
  const scrollArea = document.querySelector('[data-scroll-area]');

  if (!scrollArea) return;
  if (scrollArea.dataset.scrollInitialized === 'true') return;

  scrollArea.dataset.scrollInitialized = 'true';

  const abortController = new AbortController();
  const signal = abortController.signal;

  const getLimits = () => {
    const maxScroll = scrollArea.scrollWidth - scrollArea.clientWidth;
    return {
      min: maxScroll * 0, // 0.08
      max: maxScroll * maxScroll, // 0.81
      maxScroll,
    };
  };

  const clampScroll = () => {
    const { min, max } = getLimits();
    const currentScroll = scrollArea.scrollLeft;
    if (currentScroll < min) {
      scrollArea.scrollLeft = min;
    } else if (currentScroll > max) {
      scrollArea.scrollLeft = max;
    }
  };

  const centerScroll = (instant = false) => {
    const { maxScroll } = getLimits();
    const center = maxScroll / 2;
    scrollArea.scrollTo({
      left: center,
      behavior: instant ? 'instant' : 'smooth',
    });
  };

  const handleWheel = e => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      const { min, max } = getLimits();
      const newScroll = Math.max(min, Math.min(max, scrollArea.scrollLeft + e.deltaY));
      scrollArea.scrollLeft = newScroll;
    }
  };

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      setTimeout(() => centerScroll(true), 50);
    }
  };

  const debouncedCenterScroll = debounce(() => centerScroll(true), 200);

  const initCenter = () => {
    setTimeout(() => {
      centerScroll(true);
    }, 100);
  };

  if (document.readyState === 'complete') {
    initCenter();
  } else {
    window.addEventListener('load', initCenter, { once: true, signal });
  }

  window.addEventListener('resize', debouncedCenterScroll, { signal });
  document.addEventListener('visibilitychange', handleVisibilityChange, { signal });
  scrollArea.addEventListener('scroll', clampScroll, { passive: true, signal });
  scrollArea.addEventListener('wheel', handleWheel, { passive: false, signal });

  const resizeObserver = new ResizeObserver(() => {
    debouncedCenterScroll();
  });
  resizeObserver.observe(scrollArea);

  return () => {
    abortController.abort();
    resizeObserver.disconnect();
    delete scrollArea.dataset.scrollInitialized;
  };
};

export const fixScreenHeight = () => {
  const fixMobileVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  fixMobileVH();
  window.addEventListener('resize', fixMobileVH);
};

export const initFullScreenButton = () => {
  const fullScreenBtn = document.querySelectorAll('[data-full-screen]');

  if (!fullScreenBtn.length) return;

  const fullScreenToggle = () => {
    document.body.classList.toggle('full-screen');
    fullScreenBtn.forEach(btn => btn.classList.toggle('active'));
  };

  fullScreenBtn.forEach(btn => btn.addEventListener('click', fullScreenToggle));
};
