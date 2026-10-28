export const initAudioPlayer = () => {
  const player = document.querySelector('.audio-player');
  if (!player) return;

  const audio = player.querySelector('[data-audio-file]');
  const playBtn = player.querySelector('.btn.play');
  const progress = player.querySelector('.progress');
  const currentTimeEl = player.querySelector('.time.current');
  const durationEl = player.querySelector('.time.duration');

  if (!audio || !playBtn || !progress) return;

  const formatTime = seconds => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  /* ---------- play / pause ---------- */
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.classList.add('active');
    } else {
      audio.pause();
      playBtn.classList.remove('active');
    }
  });

  /* ---------- metadata ---------- */
  audio.addEventListener('loadedmetadata', () => {
    console.log('audio.duration: ', audio.duration);

    durationEl.textContent = formatTime(audio.duration);
  });

  /* ---------- progress ---------- */
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;

    // закраска range (CSS-переменная)
    progress.style.setProperty('--value', `${percent}%`);

    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  /* ---------- seek ---------- */
  progress.addEventListener('input', () => {
    if (!audio.duration) return;

    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  /* ---------- reset ---------- */
  audio.addEventListener('ended', () => {
    playBtn.classList.remove('active');
    progress.value = 0;
    progress.style.setProperty('--value', '0%');
    currentTimeEl.textContent = '0:00';
  });

  audio.addEventListener('timeupdate', () => {
    if (!durationEl.textContent || durationEl.textContent === '0:00') {
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('play', () => {
    if (!durationEl.textContent || durationEl.textContent === '0:00') {
      durationEl.textContent = formatTime(audio.duration);
    }
  });
};
