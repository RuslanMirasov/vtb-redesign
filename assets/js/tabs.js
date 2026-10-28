// export const initTabs = () => {
//   const tabs = document.querySelector('[data-tabs]');
//   if (!tabs) return;

//   const tabsName = tabs.getAttribute('data-tabs');
//   const STORAGE_KEY = `tabs:${tabsName}`;

//   const buttons = tabs.querySelectorAll('[data-tab-link]');
//   const tabsContent = tabs.querySelectorAll('[data-tab]');

//   // -------------------------------
//   // 1. Восстановление сохраненного таба
//   // -------------------------------
//   const restoreTab = () => {
//     const saved = sessionStorage.getItem(STORAGE_KEY);
//     if (!saved) return;

//     const targetButton = tabs.querySelector(`[data-tab-link="${saved}"]`);
//     const targetTab = tabs.querySelector(`[data-tab="${saved}"]`);

//     if (!targetButton || !targetTab) return;

//     buttons.forEach(btn => btn.classList.remove('active'));
//     tabsContent.forEach(t => {
//       t.classList.remove('active');
//       t.style.opacity = '0';
//     });

//     targetButton.classList.add('active');
//     targetTab.classList.add('active');
//     targetTab.style.opacity = '1';
//   };

//   restoreTab();

//   window.addEventListener('pageshow', restoreTab);

//   // -------------------------------
//   // 2. Обработка кликов по табам
//   // -------------------------------
//   const handleTabsClick = e => {
//     const target = e.target;
//     if (!target.hasAttribute('data-tab-link')) return;

//     const activeButton = tabs.querySelector('.tab-button.active');
//     if (target === activeButton) return;

//     const number = target.dataset.tabLink;

//     const activeTab = tabs.querySelector('[data-tab].active');
//     const targetTab = tabs.querySelector(`[data-tab="${number}"]`);
//     const targetButton = tabs.querySelector(`[data-tab-link="${number}"]`);

//     sessionStorage.setItem(STORAGE_KEY, number);
//     activeButton.classList.remove('active');
//     targetButton.classList.add('active');
//     activeTab.style.opacity = '0';

//     setTimeout(() => {
//       activeTab.classList.remove('active');
//       targetTab.classList.add('active');
//     }, 500);

//     setTimeout(() => {
//       targetTab.style.opacity = '1';
//     }, 550);
//   };

//   tabs.addEventListener('click', handleTabsClick);
// };

export const initTabs = () => {
  const tabsList = document.querySelectorAll('[data-tabs]');
  if (!tabsList.length) return;

  tabsList.forEach(tabs => {
    const tabsName = tabs.getAttribute('data-tabs');
    const STORAGE_KEY = tabsName ? `tabs:${tabsName}` : null;

    let isAnimating = false;
    let timers = [];

    const clearTimers = () => {
      timers.forEach(t => clearTimeout(t));
      timers = [];
    };

    // ---------------------------------
    // 1. Восстановление таба из storage
    // ---------------------------------
    const restoreTab = () => {
      if (!STORAGE_KEY) return;

      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const targetButtons = tabs.querySelectorAll(`[data-tab-link="${saved}"]`);
      const targetTabs = tabs.querySelectorAll(`[data-tab="${saved}"]`);

      if (!targetTabs.length) return;

      const allButtons = tabs.querySelectorAll('[data-tab-link]');
      const allTabs = tabs.querySelectorAll('[data-tab]');

      allButtons.forEach(btn => btn.classList.remove('active'));
      allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.opacity = '0';
      });

      targetButtons.forEach(btn => btn.classList.add('active'));
      targetTabs.forEach(tab => {
        tab.classList.add('active');
        tab.style.opacity = '1';
      });
    };

    restoreTab();
    window.addEventListener('pageshow', restoreTab);

    // ---------------------------------
    // 2. Клик по табам
    // ---------------------------------
    const handleTabsClick = e => {
      if (isAnimating) return;

      const target = e.target.closest('[data-tab-link]');
      if (!target || !tabs.contains(target)) return;

      const activeButton = tabs.querySelector('[data-tab-link].active');
      if (!activeButton || target === activeButton) return;

      const number = target.dataset.tabLink;

      const targetButtons = tabs.querySelectorAll(`[data-tab-link="${number}"]`);
      const activeTabs = tabs.querySelectorAll('[data-tab].active');
      const targetTabs = tabs.querySelectorAll(`[data-tab="${number}"]`);

      if (!targetTabs.length) return;

      // сохраняем состояние
      if (STORAGE_KEY) {
        sessionStorage.setItem(STORAGE_KEY, number);
      }

      isAnimating = true;
      clearTimers();

      /* кнопки */
      activeButton.classList.remove('active');
      targetButtons.forEach(btn => btn.classList.add('active'));

      /* закрываем активные табы */
      activeTabs.forEach(tab => {
        tab.style.opacity = '0';
      });

      timers.push(
        setTimeout(() => {
          activeTabs.forEach(tab => tab.classList.remove('active'));
          targetTabs.forEach(tab => tab.classList.add('active'));
        }, 500)
      );

      timers.push(
        setTimeout(() => {
          targetTabs.forEach(tab => {
            tab.style.opacity = '1';
          });
          isAnimating = false;
        }, 550)
      );
    };

    tabs.addEventListener('click', handleTabsClick);
  });
};
