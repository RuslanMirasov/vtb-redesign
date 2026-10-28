// export const initRundomColorSelect = () => {
//   const colorSelectButtons = document.querySelectorAll('[data-random-color]');

//   if (!colorSelectButtons.length) return;

//   const defaltColor = 'rgba(21, 0, 125, 0.4)';

//   const colors = [
//     'rgba(21, 0, 125, 0.3)',
//     'rgba(156, 183, 255, 0.6)',
//     'rgba(212, 156, 255, 0.6)',
//     'rgba(255, 156, 247, 0.6)',
//     'rgba(255, 158, 158, 0.6)',
//     'rgba(255, 211, 156, 0.6)',
//     'rgba(255, 247, 156, 0.6)',
//     'rgba(255, 247, 156, 0.6)',
//     'rgba(156, 255, 163, 0.6)',
//     'rgba(107, 157, 0, 0.4)',
//     'rgba(171, 210, 159, 0.6)',
//     'rgba(156, 248, 255, 0.6)',
//     'rgba(214, 214, 214, 0.6)',
//     'rgba(134, 94, 94, 0.4)',
//   ];

//   const selectedColors = [];

//   const handleSetColor = e => {
//     const button = e.currentTarget;
//     const isChecked = button.classList.contains('checked');
//     const name = button.dataset.name.toLowerCase();

//     if (!button || !name) return;

//     const textCollection = [...document.querySelectorAll('[data-name]')];
//     const filtered = textCollection.filter(el => el.dataset.name.toLowerCase().includes(name));

//     if (!isChecked) {
//       button.classList.add('checked');
//       filtered.forEach(el => (el.style.backgroundColor = 'red'));
//       return;
//     }

//     button.classList.remove('checked');
//     filtered.forEach(el => (el.style.backgroundColor = ''));
//   };

//   colorSelectButtons.forEach(btn => btn.addEventListener('click', handleSetColor));
// };

export const initRundomColorSelect = () => {
  const colorSelectButtons = document.querySelectorAll('[data-random-color]');
  if (!colorSelectButtons.length) return;

  const defaultColor = 'rgba(21, 0, 125, 0.4)';

  let colors = [
    'rgba(21, 0, 125, 0.3)', //0.3
    'rgba(156, 183, 255, 0.4)', //0.6
    'rgba(212, 156, 255, 0.4)', //0.6
    'rgba(255, 156, 247, 0.4)', //0.6
    'rgba(255, 158, 158, 0.4)', //0.6
    'rgba(255, 211, 156, 0.4)', //0.6
    'rgba(255, 247, 156, 0.4)', //0.6
    'rgba(255, 247, 156, 0.4)', //0.6
    'rgba(156, 255, 163, 0.4)', //0.6
    'rgba(107, 157, 0, 0.4)', //0.4
    'rgba(171, 210, 159, 0.4)', //0.6
    'rgba(156, 248, 255, 0.4)', //0.6
    'rgba(214, 214, 214, 0.4)', //0.6
    'rgba(134, 94, 94, 0.4)', //0.4
  ];

  let selectedColors = [];

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

  const handleSetColor = e => {
    const button = e.currentTarget;
    const name = button.dataset.name?.toLowerCase();
    if (!name) return;

    const isChecked = button.classList.contains('checked');

    const textCollection = [...document.querySelectorAll('[data-name]')];
    const filtered = textCollection.filter(el => el.dataset.name?.toLowerCase().includes(name));

    if (isChecked) {
      button.classList.remove('checked');

      const found = selectedColors.find(obj => obj.name === name);

      if (found) {
        freeColorBack(found.color);
      }

      selectedColors = selectedColors.filter(obj => obj.name !== name);

      filtered.forEach(el => (el.style.backgroundColor = ''));

      return;
    }

    button.classList.add('checked');
    let colorObj = selectedColors.find(obj => obj.name === name);

    let color;
    if (colorObj) {
      color = colorObj.color;
    } else {
      color = getRandomColor();
      selectedColors.push({ name, color });
    }

    filtered.forEach(el => (el.style.backgroundColor = color));
  };

  colorSelectButtons.forEach(btn => btn.addEventListener('click', handleSetColor));
};
