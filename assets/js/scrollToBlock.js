export const initScrollToBlock = () => {
  const buttons = document.querySelectorAll('[data-scrollto]');
  const main = document.querySelector('main');

  if (!buttons.length || !main) return;

  const scrollToBlock = e => {
    e.preventDefault();

    const link = e.currentTarget;
    const targetId = link.getAttribute('href')?.replace('#', '');
    const targetEl = document.getElementById(targetId);

    if (!targetId || !targetEl) return;

    const targetOffset = targetEl.offsetTop - main.offsetTop;

    main.scrollTo({
      top: targetOffset - 20,
      behavior: 'smooth',
    });
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', scrollToBlock);
  });
};
