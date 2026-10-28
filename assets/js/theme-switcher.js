const withOpacityTransition = (el, duration = 0.6) => {
  const computed = getComputedStyle(el);
  const originalTransition = el.style.transition;
  const fullTransition = computed.transition;
  const parts = fullTransition.replace(/,\s+/g, ',').split(',');
  const hasOpacityTransition = parts.some(p => p.trim().startsWith('opacity'));

  let newTransition;

  if (hasOpacityTransition) {
    newTransition = parts
      .map(p => {
        return p.trim().startsWith('opacity') ? `opacity ${duration}s ease` : p;
      })
      .join(', ');
  } else {
    newTransition = fullTransition ? `${fullTransition}, opacity ${duration}s ease` : `opacity ${duration}s ease`;
  }

  el.style.transition = newTransition;

  return () => {
    if (originalTransition) {
      el.style.transition = originalTransition;
    } else {
      el.style.transition = '';
    }
  };
};

const fadeSwitchImage = () => {
  document.querySelectorAll('img[data-snow]').forEach(img => {
    const normalSrc = img.getAttribute('src');
    const snowSrc = img.getAttribute('data-snow');

    const restoreTransition = withOpacityTransition(img, 0.6);

    img.offsetWidth;
    img.style.opacity = '0';

    img.addEventListener(
      'transitionend',
      () => {
        img.setAttribute('src', snowSrc);
        img.setAttribute('data-snow', normalSrc);

        img.onload = () => {
          requestAnimationFrame(() => {
            img.style.opacity = '1';
          });

          setTimeout(restoreTransition, 600);
        };
      },
      { once: true }
    );
  });
};

const fadeSwitchImageNoAnim = () => {
  document.querySelectorAll('img[data-snow]').forEach(img => {
    const normalSrc = img.getAttribute('src');
    const snowSrc = img.getAttribute('data-snow');
    img.setAttribute('src', snowSrc);
    img.setAttribute('data-snow', normalSrc);
  });
};

export const initThemeSwitcher = () => {
  const themeSwitcher = document.querySelector('[data-theme-switcher]');
  const STORAGE_KEY = 'theme:snow';

  if (!themeSwitcher) return;

  // ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
  const switchTheme = () => {
    const isSnowEnabled = document.body.classList.toggle('snow');
    localStorage.setItem(STORAGE_KEY, isSnowEnabled ? 'on' : 'off');
    fadeSwitchImage();
  };

  themeSwitcher.addEventListener('click', switchTheme);

  // ВОССТАНОВЛЕНИЕ
  window.addEventListener('pageshow', () => {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    if (savedValue === 'on') {
      document.body.classList.add('snow');
      fadeSwitchImageNoAnim();
    }
  });
};
