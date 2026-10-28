import { initNavigationMenu, hidePreloader, initLinksMiddleware, initScrollArea, fixScreenHeight, initFullScreenButton } from './helpers.js';
import { initSliders, onStageSlideChange } from './sliders.js';
import { initTabs } from './tabs.js';
import { initScrollToBlock } from './scrollToBlock.js';
import { initSounds } from './playSound.js';
import { initRundomColorSelect } from './rundomColor.js';
import { initSidebarPopups, initStikySidebar } from './stiky-sidebar.js';
import { popup } from './popup.js';
import { saveAnswerToSession, getTestResult, renderResults } from './test.js';
import { generatePDF, printPlay } from './stage.js';
import { initYandexMap } from './yandex-map.js';
import { initPredictions } from './predictions.js';
import { initThemeSwitcher } from './theme-switcher.js';
import { initAudioPlayer } from './audioPlayer.js';

window.printPlay = printPlay;
window.generatePDF = generatePDF;
window.saveAnswerToSession = saveAnswerToSession;
window.getTestResult = getTestResult;
window.renderResults = renderResults;

hidePreloader();

initThemeSwitcher();
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
initStikySidebar();
popup.init();
initSidebarPopups();
initPredictions();
initYandexMap();

document.addEventListener('DOMContentLoaded', () => {
  initAudioPlayer();
  const stageSlider = window.swipers?.['stage-slider'];
  const soundsSlider = window.swipers?.['sound-slider'];

  if (stageSlider) {
    stageSlider.on('slideChange', () => {
      const index = stageSlider.activeIndex;
      const slideEl = stageSlider.slides[index];
      const number = slideEl?.dataset?.number;
      if (number) {
        onStageSlideChange(Number(number));
      }
    });
  }
});
