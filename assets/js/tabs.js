export const initTabs = () => {
  const tabs = document.querySelector('[data-tabs]');

  if (!tabs) return;

  const handleTabsClick = e => {
    const target = e.target;
    if (!target.hasAttribute('data-tab-link')) return;

    const activeButton = tabs.querySelector('.tab-button.active');

    if (target === activeButton) return;

    const number = target.dataset.tabLink;
    const activeTab = tabs.querySelector('[data-tab].active');
    const targetButton = tabs.querySelector(`[data-tab-link="${number}"]`);
    const targetTab = tabs.querySelector(`[data-tab="${number}"]`);

    activeButton.classList.remove('active');
    targetButton.classList.add('active');

    //activeTab.style.zIndex = '19';
    //targetTab.style.zIndex = '19';
    activeTab.style.opacity = '0';

    setTimeout(() => {
      activeTab.classList.remove('active');
      targetTab.classList.add('active');
    }, 500);

    setTimeout(() => {
      targetTab.style.opacity = '1';
    }, 550);

    setTimeout(() => {
      //activeTab.style.zIndex = '';
      //targetTab.style.zIndex = '';
    }, 1050);
  };

  tabs.addEventListener('click', handleTabsClick);
};
