export const initStikySidebar = () => {
  const main = document.querySelector('main');
  const sidebar = document.querySelector('.sidebar');

  if (!sidebar || !main) return;

  let lastMainScroll = 0;

  const handleScroll = () => {
    const current = main.scrollTop;
    const delta = current - lastMainScroll;

    const stickyTop = parseInt(getComputedStyle(sidebar).top, 10);
    const isStuck = Math.floor(sidebar.getBoundingClientRect().top) <= stickyTop;

    if (isStuck) {
      sidebar.scrollTop += delta;
    }

    lastMainScroll = current;
  };

  const updateListeners = () => {
    if (window.innerWidth >= 1024) {
      main.addEventListener('scroll', handleScroll);
    } else {
      main.removeEventListener('scroll', handleScroll);
    }
  };

  updateListeners();

  window.addEventListener('resize', updateListeners);
};

export const initSidebarPopups = () => {
  const navButtons = document.querySelectorAll('[data-open-sidebar-popup]');
  const closeButtons = document.querySelectorAll('[data-sidebar-popup-close]');
  const backddrop = document.querySelector('[data-stiky-sidebar]');

  if (!navButtons.length || !closeButtons.length || !backddrop) return;

  const openSidebarPopup = e => {
    const btn = e.currentTarget;

    const targetPopupNumber = btn.dataset.openSidebarPopup;
    const activePopup = document.querySelector('[data-sidebar-mobil-popup].active');

    if (!backddrop.classList.contains('active')) {
      backddrop.classList.add('active');
    }

    const targetPopup = document.querySelector(`[data-sidebar-mobil-popup="${targetPopupNumber}"]`);

    if (activePopup) {
      activePopup.classList.remove('active');
      setTimeout(() => {
        activePopup.style.display = 'none';
      }, 500);
      setTimeout(() => {
        targetPopup.style.display = 'flex';
      }, 520);
      setTimeout(() => {
        targetPopup.classList.add('active');
      }, 540);
      return;
    }
    targetPopup.style.display = 'flex';
    setTimeout(() => {
      targetPopup.classList.add('active');
    }, 10);
  };

  const closeSidebarPopup = e => {
    const target = e.target;
    if (target.classList.contains('sidebar') || target.classList.contains('sidebar-popup-close-button')) {
      backddrop.classList.remove('active');
      const activePopup = document.querySelector('[data-sidebar-mobil-popup].active');
      if (activePopup) {
        setTimeout(() => {
          activePopup.classList.remove('active');
          activePopup.style.display = 'none';
        }, 500);
      }
    }
  };

  navButtons.forEach(btn => btn.addEventListener('click', openSidebarPopup));
  closeButtons.forEach(btn => btn.addEventListener('click', closeSidebarPopup));
};
