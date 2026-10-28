// export const initPopup = () => {
//   const openButtons = document.querySelectorAll('[data-popup-open]');
//   const closeButtons = document.querySelectorAll('[data-popup-close]');
//   const backddrop = document.querySelector('[data-backdrop]');

//   if (!openButtons.length || !closeButtons.length || !backddrop) return;

//   const openPopup = e => {
//     const btn = e.currentTarget;

//     const popupId = btn.dataset.popupOpen;
//     const activePopup = document.querySelector('[data-popup].active');

//     if (!backddrop.classList.contains('active')) {
//       backddrop.classList.add('active');
//     }

//     const targetPopup = document.querySelector(`[data-popup="${popupId}"]`);

//     if (activePopup) {
//       activePopup.classList.remove('active');
//       setTimeout(() => {
//         activePopup.style.display = 'none';
//       }, 500);
//       setTimeout(() => {
//         targetPopup.style.display = 'flex';
//       }, 520);
//       setTimeout(() => {
//         targetPopup.classList.add('active');
//       }, 540);

//       return;
//     }

//     targetPopup.style.display = 'flex';
//     setTimeout(() => {
//       targetPopup.classList.add('active');
//     }, 10);
//   };

//   const closePopup = e => {
//     const target = e.target;
//     if (target.hasAttribute('data-popup-close')) {
//       backddrop.classList.remove('active');
//       const activePopup = document.querySelector('[data-popup].active');
//       if (activePopup) {
//         setTimeout(() => {
//           activePopup.classList.remove('active');
//           activePopup.style.display = 'none';
//         }, 500);
//       }
//     }
//   };

//   openButtons.forEach(btn => btn.addEventListener('click', openPopup));
//   closeButtons.forEach(btn => btn.addEventListener('click', closePopup));
// };

export const popup = {
  _backdrop: null,
  _isAnimating: false,
  _isOpening: false,

  init() {
    this._backdrop = document.querySelector('[data-backdrop]');
    if (!this._backdrop) {
      console.warn('Backdrop not found');
      return;
    }

    // CLick events
    this._bindEvents();
  },

  // ==============================
  //           OPEN
  // ==============================
  async open(id) {
    if (this._isOpening || this._isAnimating) return;
    this._isOpening = true;

    const targetPopup = document.querySelector(`[data-popup="${id}"]`);
    if (!targetPopup) {
      console.warn(`Popup "${id}" not found`);
      this._isOpening = false;
      return;
    }

    const activePopup = document.querySelector('[data-popup].active');

    // включаем фон, если ещё не включён
    if (!this._backdrop.classList.contains('active')) {
      this._backdrop.classList.add('active');
    }

    // если есть открытый попап — плавно переключаем
    if (activePopup && activePopup !== targetPopup) {
      await this._switchPopups(activePopup, targetPopup);
      this._isOpening = false;
      return;
    }

    // если это первое открытие
    if (!activePopup) {
      targetPopup.style.display = 'flex';
      setTimeout(() => {
        targetPopup.classList.add('active');
        this._isOpening = false;
      }, 10);
      return;
    }

    this._isOpening = false;
  },

  // ==============================
  //           CLOSE
  // ==============================
  async close() {
    if (this._isOpening || this._isAnimating) return;
    this._isOpening = true;

    const activePopup = document.querySelector('[data-popup].active');
    if (!activePopup) {
      this._isOpening = false;
      return;
    }

    this._backdrop.classList.remove('active');

    setTimeout(() => {
      activePopup.classList.remove('active');
      activePopup.style.display = 'none';
      this._isOpening = false;
    }, 500);
  },

  // ==============================
  //     INTERNAL SWITCH LOGIC
  // ==============================
  async _switchPopups(current, next) {
    this._isAnimating = true;

    current.classList.remove('active');

    // скрываем старый
    setTimeout(() => {
      current.style.display = 'none';
    }, 500);

    // показываем новый
    setTimeout(() => {
      next.style.display = 'flex';
    }, 520);

    setTimeout(() => {
      next.classList.add('active');
      this._isAnimating = false;
    }, 540);
  },

  // ==============================
  //           EVENTS
  // ==============================
  _bindEvents() {
    document.addEventListener('mousedown', e => {
      if (this._isOpening || this._isAnimating) return;

      const target = e.target;

      // Открытие
      const openBtn = target.closest('[data-popup-open]');
      if (openBtn) {
        e.preventDefault();
        this.open(openBtn.dataset.popupOpen);
        return;
      }

      // Закрытие — ТОЛЬКО если target ИМЕЕТ data-popup-close
      if (target.hasAttribute('data-popup-close')) {
        e.preventDefault();
        this.close();
      }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  },
};

// чтобы использовать через window.popup.open(...)
window.popup = popup;
