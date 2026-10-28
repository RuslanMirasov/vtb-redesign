export const initSounds = () => {
  const soundButtons = document.querySelectorAll('[data-sound-src]');
  if (!soundButtons.length) return;

  const audioCache = new Map(); // <src, Audio>
  let currentAudio = null;
  let currentButton = null;

  // ---------- ПРЕДЗАГРУЗКА ----------
  soundButtons.forEach(btn => {
      const rawSrc = btn.dataset.soundSrc;
    if (!rawSrc) return;

      const src = new URL(rawSrc, window.location.href).href;

    if (!audioCache.has(src)) {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.load();
      audioCache.set(src, audio);
    }
  });

  // ---------- ОБРАБОТКА КЛИКОВ ----------
  soundButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const rawSrc = btn.dataset.soundSrc;
      const src = new URL(rawSrc, window.location.href).href;
      const audio = audioCache.get(src);

      if (!audio) return;

      // 🔥 1. Если нажимаем на ту же кнопку → toggle play / stop
      if (currentButton === btn) {
        if (!audio.paused) {
          stopCurrent(); // ← тут была ошибка — теперь стоп работает
        } else {
          audio.currentTime = 0;
          audio.play();
          currentButton.classList.add('play');
        }
        return;
      }

      // 🔥 2. Переключение на новый звук
      stopCurrent();

      currentAudio = audio;
      currentButton = btn;
      currentButton.classList.add('play');

      // Ждём готовность или проигрываем сразу
      if (audio.readyState >= 3) {
        audio.play();
      } else {
        audio.addEventListener(
          'canplaythrough',
          () => {
            audio.play();
          },
          { once: true }
        );
      }

      audio.onended = () => stopCurrent();
    });
  });

  // ---------- STOP ----------
  function stopCurrent() {
    if (!currentAudio) return;

    currentAudio.pause();
    currentAudio.currentTime = 0;

    if (currentButton) {
      currentButton.classList.remove('play');
    }

    currentAudio = null;
    currentButton = null;
  }
};
