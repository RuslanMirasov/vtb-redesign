const getRandomPrediction = data => data[Math.floor(Math.random() * data.length)];

export const initPredictions = async () => {
  const predictionList = document.querySelector('[data-prediction-list]');

  if (!predictionList) return;

  const response = await fetch('./../../assets/json/predskazaniya.json');
  const data = await response.json();

  if (!data || !Array.isArray(data)) return;

  const predictions = data.map(({ title, text }) => `<li><h2>${title}</h2><p>${text}</p></li>`).join('');
  predictionList.innerHTML = `<li></li>${predictions}<li data-prediction></li>`;

  const button = document.querySelector('[data-predict-btn]');
  const predictionEl = document.querySelector('[data-prediction]');

  const handlerClick = () => {
    const { title, text } = getRandomPrediction(data);

    predictionList.classList.remove('active');

    setTimeout(() => {
      predictionEl.innerHTML = `<h2>${title}</h2><p>${text}</p>`;
      predictionList.classList.add('active');
      button.setAttribute('disabled', true);
    }, 200);

    setTimeout(() => {
      button.removeAttribute('disabled');
      if (button.innerText !== 'Еще предсказание') {
        button.innerHTML = `<span>Еще предсказание</span>`;
      }
    }, 5200);
  };

  button.addEventListener('click', handlerClick);
};
