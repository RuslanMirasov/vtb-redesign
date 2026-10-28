import { initNavigationMenu, hidePreloader, initLinksMiddleware, initScrollArea, fixScreenHeight, initFullScreenButton } from './helpers.js';
import { initSliders, onStageSlideChange } from './sliders.js';
import { initTabs } from './tabs.js';
import { initScrollToBlock } from './scrollToBlock.js';
import { initSounds } from './playSound.js';
import { initRundomColorSelect } from './rundomColor.js';
import { initPrint } from './print.js';
import { initSidebarPopups, initStikySidebar } from './stiky-sidebar.js';
import { popup } from './popup.js';
import { saveAnswerToSession, getTestResult, renderResults } from './test.js';
import { generatePDF, printPlay } from './stage.js';

window.printPlay = printPlay;
window.generatePDF = generatePDF;
window.saveAnswerToSession = saveAnswerToSession;
window.getTestResult = getTestResult;
window.renderResults = renderResults;

fixScreenHeight();
initScrollArea();
initNavigationMenu();
initLinksMiddleware();
initFullScreenButton();
initSliders();
initScrollToBlock();
initTabs();
initSounds();
initRundomColorSelect();
initPrint();
initStikySidebar();
popup.init();
initSidebarPopups();

hidePreloader();

document.addEventListener('DOMContentLoaded', () => {
  const stageSlider = window.swipers?.['stage-slider'];
  if (!stageSlider) return;

  stageSlider.on('slideChange', () => {
    const index = stageSlider.activeIndex;
    const slideEl = stageSlider.slides[index];
    const number = slideEl?.dataset?.number;
    if (number) {
      onStageSlideChange(Number(number));
    }
  });
});
