import { registerNamedSwiper } from './goToSlide.js';

const sliders = document.querySelectorAll('[data-slider]');

const toBool = s => String(s).toLowerCase() === 'true';

export const initSliders = () => {
  if (sliders.length === 0) return;

  sliders.forEach(sliderWrapper => {
    const swiperElement = sliderWrapper.querySelector('.swiper');
    if (!swiperElement) return;

    // --- Определяем имя слайдера ---
    // data-slider="name" → именованный
    // data-slider="" или просто наличие атрибута → НЕ запоминаем
    const rawKey = sliderWrapper.getAttribute('data-slider');
    const sliderKey = rawKey && rawKey.trim() ? rawKey.trim() : null;

    // Парсим параметры
    const {
      effect = 'slide',
      speed = '600',
      spaceBetween = '0,0,0',
      slidesPerView = '1,1,1',
      slidesPerGroup = '1,1,1',
      loop = false,
      centered = false,
      initialSlide = '0,0,0',
      direction = 'horizontal',
      allowTouchMove = 'true',
    } = sliderWrapper.dataset;

    const arrowPrev = sliderWrapper.querySelector('[data-arrow-prev]');
    const arrowNext = sliderWrapper.querySelector('[data-arrow-next]');
    const pagination = sliderWrapper.querySelector('[data-pagination]');

    // Преобразуем DATA → числа
    const space = spaceBetween.split(',');
    const view = slidesPerView === 'auto' ? 'auto' : slidesPerView.split(',');
    const group = slidesPerGroup.split(',');
    const initial = initialSlide.split(',');

    // --- Создаем базовые options ---
    const options = {
      allowTouchMove: toBool(allowTouchMove),
      effect,
      speed: Number(speed),
      loop: toBool(loop),
      centeredSlides: centered,
      centeredSlidesBounds: centered,
      direction,
      breakpoints: {
        0: {
          slidesPerView: view === 'auto' ? 'auto' : Number(view[2]),
          slidesPerGroup: Number(group[2]),
          spaceBetween: Number(space[2]),
          initialSlide: Number(initial[2]),
        },
        768: {
          slidesPerView: view === 'auto' ? 'auto' : Number(view[1]),
          slidesPerGroup: Number(group[1]),
          spaceBetween: Number(space[1]),
          initialSlide: Number(initial[1]),
        },
        1280: {
          slidesPerView: view === 'auto' ? 'auto' : Number(view[0]),
          slidesPerGroup: Number(group[0]),
          spaceBetween: Number(space[0]),
          initialSlide: Number(initial[0]),
        },
      },
    };

    if (arrowPrev && arrowNext) {
      options.navigation = {
        prevEl: arrowPrev,
        nextEl: arrowNext,
      };
    }

    if (pagination) {
      options.pagination = {
        el: pagination,
        clickable: true,
        dynamicBullets: true,
      };
    }

    // ======================================================================
    // 1. ВОССТАНОВЛЕНИЕ СОХРАНЁННОГО СЛАЙДА
    // ======================================================================
    if (sliderKey) {
      const STORAGE_KEY = `slider:${sliderKey}`;
      const savedIndex = sessionStorage.getItem(STORAGE_KEY);

      if (savedIndex !== null) {
        const saved = Number(savedIndex);

        // Перебиваем initialSlide для всех breakpoints
        options.breakpoints[0].initialSlide = saved;
        options.breakpoints[768].initialSlide = saved;
        options.breakpoints[1280].initialSlide = saved;
      }
    }

    // ======================================================================
    // 2. СОЗДАЁМ SWIPER
    // ======================================================================
    const instance = new Swiper(swiperElement, options);

    // Регистрируем в глобальной системе (у тебя уже есть эта логика)
    if (sliderKey) {
      registerNamedSwiper(sliderKey, instance);
    }

    // ======================================================================
    // 3. СОХРАНЕНИЕ ТЕКУЩЕГО СЛАЙДА
    // ======================================================================
    if (sliderKey) {
      const STORAGE_KEY = `slider:${sliderKey}`;

      instance.on('slideChange', () => {
        const index = instance.realIndex; // учитывает loop
        sessionStorage.setItem(STORAGE_KEY, index);
      });

      // Перевосстановление при бэке на iOS (bfcache)
      window.addEventListener('pageshow', () => {
        const savedIndex = sessionStorage.getItem(STORAGE_KEY);
        if (savedIndex !== null) {
          const i = Number(savedIndex);
          instance.slideToLoop(i, 0); // мгновенно
        }
      });
    }
  });
};

export const onStageSlideChange = number => {
  if (!number) return;
  const activeHead = document.querySelector('.circle__image.active');
  const activeDescription = document.querySelector('.stage-desctiption.active');
  const targetHead = document.querySelector(`.circle__image--${number}`);
  const targetDescription = document.querySelector(`.stage-desctiption--${number}`);

  activeHead?.classList.remove('active');
  activeDescription?.classList.remove('active');
  targetHead?.classList.add('active');
  targetDescription?.classList.add('active');
};
