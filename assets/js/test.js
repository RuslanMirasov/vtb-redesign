const results = [
  {
    title: '«Другая»',
    image: null,
    url: './secret-room',
    combination: null,
    description:
      'Вариантов для&nbsp;творчества — много! Освойте вязание или создайте свою волшебную картину! Вдохновитесь идеями в&nbsp;нашей Потайной комнате. А&nbsp;может, вы захотите написать свою сказку?',
  },
  {
    title: '«По щучьему велению»',
    image: 'assets/img/stage/3_head.gif',
    url: 'stage/po-shuchyemu-veleniyu',
    combination: [
      {
        question1: [],
        question2: ['Приключения', 'Мелодрама'],
        question3: ['Петь и танцевать'],
      },
    ],
    description:
      'Мюзикл про&nbsp;любовь, которая сильнее лени, властолюбия, уныния и&nbsp;безысходности. Супер-Щука, Супер-Ведра и&nbsp;такси Супер-Печь помогают Емеле спасти Марью из&nbsp;дворца, смягчить злого Марьиного Царя-отца и&nbsp;вспомнить, что&nbsp;любовь — это повод для&nbsp;риска. Для зрителей всех возрастов.',
  },
  {
    title: '«Зайкина избушка»',
    image: 'assets/img/stage/4_head.webp',
    url: 'stage/zaikina-izbushka',
    combination: [
      {
        question1: [],
        question2: ['Приключения', 'Триллер', 'Артхаус'],
        question3: ['Стендап'],
      },
    ],
    description:
      'Остросюжетное драмеди о&nbsp;том, как непонятно как в&nbsp;самых безнадежных ситуациях все заканчивается хорошо. Главное — выбрать правильную маску.',
  },
  {
    title: '«Путешествие Конька-Горбунка»',
    image: 'assets/img/stage/5_head.webp',
    url: 'stage/konek-gorbunok',
    combination: [
      {
        question1: [],
        question2: ['Приключения'],
        question3: ['Читать стихи'],
      },
    ],
    description:
      'Сказка про доброго Ивана, про&nbsp;верного Конька-Горбунка, про&nbsp;завистливого Царя и&nbsp;про&nbsp;чудо, которое встречается на&nbsp;каждом шагу. А&nbsp;еще — инструкция по&nbsp;созданию простого, свободного и&nbsp;фантазийного домашнего театра, где возможно все.',
  },
];

export const getTestResult = () => {
  const stored = sessionStorage.getItem('testResults');
  if (!stored) return null;

  const answers = JSON.parse(stored);

  for (const item of results) {
    if (!item.combination) continue;

    for (const comb of item.combination) {
      const matchQ2 = Array.isArray(comb.question2) && comb.question2.includes(answers.question2);
      const matchQ3 = Array.isArray(comb.question3) && comb.question3.includes(answers.question3);

      if (matchQ2 && matchQ3) {
        return item;
      }
    }
  }
  return results[0];
};

export const renderResults = data => {
  const resultsBlock = document.querySelector('[data-test-results-block]');
  const path = resultsBlock.dataset.path;

  if (!resultsBlock || !path) return;

  const { title, image, description, url } = data;

  let resultMarkup = ['<h2 class="title title--26">Какая пьеса <br />вам подходит?</h2><hr class="big" />'];

  if (title) {
    resultMarkup.push(`<h2 class="title title--26">${title}</h2>`);
  }

  if (image) {
    resultMarkup.push(`<div class="test-image"><img src="${path}${image}" alt="ВТБ" class="circle__image"/></div>`);
  }

  if (description) {
    resultMarkup.push(`<p class="subtitle subtitle--16 ta--c">${description}</p>`);
  }

  if (url) {
    resultMarkup.push(
      `<a href="${path}${title === '«Другая»' ? '' : url}" class="button" data-test-result-url><span>${
        title === '«Другая»' ? 'Далее' : 'Перейти к пьесе'
      }</span></a>`
    );
  }

  while (resultsBlock.children.length > 1) {
    resultsBlock.removeChild(resultsBlock.lastElementChild);
  }

  resultsBlock.insertAdjacentHTML('beforeend', resultMarkup.join(''));
};

export const saveAnswerToSession = (key, value) => {
  const sessionKey = 'testResults';
  const stored = sessionStorage.getItem(sessionKey);

  let results;

  if (!stored) {
    results = {
      question1: null,
      question2: null,
      question3: null,
    };
  } else {
    results = JSON.parse(stored);
  }

  results[key] = value;
  sessionStorage.setItem(sessionKey, JSON.stringify(results));
};
