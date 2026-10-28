export const initRundomColorSelect = () => {
  const colorSelectButtons = document.querySelectorAll('[data-random-color]');
  if (!colorSelectButtons.length) return;

  const defaultColor = 'rgba(21, 0, 125, 0.4)';

  let colors = [
    'rgba(21, 0, 125, 0.3)',
    'rgba(156, 183, 255, 0.4)',
    'rgba(212, 156, 255, 0.4)',
    'rgba(255, 156, 247, 0.4)',
    'rgba(255, 158, 158, 0.4)',
    'rgba(255, 211, 156, 0.4)',
    'rgba(255, 247, 156, 0.4)',
    'rgba(255, 247, 156, 0.4)',
    'rgba(156, 255, 163, 0.4)',
    'rgba(107, 157, 0, 0.4)',
    'rgba(171, 210, 159, 0.4)',
    'rgba(156, 248, 255, 0.4)',
    'rgba(214, 214, 214, 0.4)',
    'rgba(134, 94, 94, 0.4)',
  ];

  // Map: имя → цвет
  let selectedColors = new Map();

  // Кэшируем все реплики заранее
  const textNodes = [...document.querySelectorAll('[data-name]')].map(el => {
    const names = el.dataset.name.split(',').map(n => n.trim().toLowerCase());
    return { el, names };
  });

  const getRandomColor = () => {
    if (colors.length === 0) return defaultColor;
    const index = Math.floor(Math.random() * colors.length);
    const color = colors[index];
    colors.splice(index, 1);
    return color;
  };

  const freeColorBack = color => {
    if (color !== defaultColor) {
      colors.push(color);
    }
  };

  const updateAllElements = () => {
    textNodes.forEach(({ el, names }) => {
      // цвета всех участвующих персонажей
      const myColors = names.map(n => selectedColors.get(n)).filter(Boolean);

      if (myColors.length === 0) {
        el.style.background = '';
        return;
      }

      if (myColors.length === 1) {
        el.style.background = myColors[0];
        return;
      }

      // Градиент
      el.style.background = `linear-gradient(to left, ${myColors.join(',')})`;
    });
  };

  const handleSetColor = e => {
    const button = e.currentTarget;
    const name = button.dataset.name?.toLowerCase();
    if (!name) return;

    const isChecked = button.classList.contains('checked');

    if (isChecked) {
      // Снимаем выделение
      button.classList.remove('checked');

      const oldColor = selectedColors.get(name);
      if (oldColor) freeColorBack(oldColor);

      selectedColors.delete(name);

      updateAllElements();
      return;
    }

    // Ставим выделение
    button.classList.add('checked');

    if (!selectedColors.has(name)) {
      selectedColors.set(name, getRandomColor());
    }

    updateAllElements();
  };

  colorSelectButtons.forEach(btn => btn.addEventListener('click', handleSetColor));
};
