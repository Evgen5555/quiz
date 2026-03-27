const scenes = [
  {
    kicker: "Сцена I",
    title: "Место преступления: Директ",
    text: "Среда, 14:00. В директ падает сообщение: «А сколько стоит работа с вами?». Твои действия?",
    image: "images/slide-1.svg",
    choices: [
      {
        label: "Бросаю всё и наговариваю голосовые",
        consequence:
          "Следствие установило: Любой из этих вариантов — это слив времени и клиентов. Итог: упущенная выгода.",
      },
      {
        label: "Отвечу вечером",
        consequence:
          "Следствие установило: Любой из этих вариантов — это слив времени и клиентов. Итог: упущенная выгода.",
      },
      {
        label: "Скину дежурную ссылку",
        consequence:
          "Следствие установило: Любой из этих вариантов — это слив времени и клиентов. Итог: упущенная выгода.",
      },
    ],
  },
  {
    kicker: "Сцена II",
    title: "Место преступления: Пустой экран",
    text: "Пятница. Надо выложить пост. Ты открываешь пустой экран...",
    image: "images/slide-2.svg",
    choices: [
      {
        label: "Вымучиваю текст 3 часа",
        consequence:
          "Следствие установило: Тратить часы на текст — сжигать самый дорогой актив. А ИИ без правильной архитектуры выдает инфоцыганщину.",
      },
      {
        label: "Прошу нейросеть, получаю текст с кучей эмодзи и иду плакать",
        consequence:
          "Следствие установило: Тратить часы на текст — сжигать самый дорогой актив. А ИИ без правильной архитектуры выдает инфоцыганщину.",
      },
    ],
  },
  {
    kicker: "Вердикт",
    title: "Дело закрыто",
    text: "Твой диагноз — острая нехватка вайб-кодинга. Я собираю экосистему из ИИ-агентов, которая забирает рутину и возвращает время на жизнь.",
    image: "images/slide-3.svg",
    choices: [
      {
        label: "⚡️ Завайбкодить мой бизнес",
        actionUrl: "https://example.com",
        isPrimary: true,
      },
    ],
    isFinal: true,
  },
];

const imageEl = document.getElementById("sceneImage");
const kickerEl = document.getElementById("sceneKicker");
const titleEl = document.getElementById("sceneTitle");
const textEl = document.getElementById("sceneText");
const choicesEl = document.getElementById("choices");
const sceneLayerEl = document.getElementById("sceneContent");
const intermissionEl = document.getElementById("intermission");
const intermissionTextEl = document.getElementById("intermissionText");

let current = 0;
let isTransitioning = false;

const FADE_MS = 1100;
const INTERMISSION_MS = 3000;

function renderChoices(scene) {
  choicesEl.innerHTML = "";

  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = choice.isPrimary ? "choice-btn choice-btn--cta" : "choice-btn";
    button.textContent = choice.label;
    button.addEventListener("click", () => handleChoice(choice));
    choicesEl.appendChild(button);
  });
}

function setScene(index) {
  const scene = scenes[index];

  imageEl.src = scene.image;
  imageEl.alt = scene.title;
  kickerEl.textContent = scene.kicker;
  titleEl.textContent = scene.title;
  textEl.textContent = scene.text;
  renderChoices(scene);
}

function setChoicesDisabled(disabled) {
  const buttons = choicesEl.querySelectorAll("button");
  buttons.forEach((button) => {
    button.disabled = disabled;
  });
}

function handleChoice(choice) {
  if (isTransitioning) {
    return;
  }

  if (choice.actionUrl) {
    window.open(choice.actionUrl, "_blank", "noopener,noreferrer");
    return;
  }

  isTransitioning = true;
  setChoicesDisabled(true);

  sceneLayerEl.classList.add("fade-out");
  imageEl.classList.add("fade-out");

  setTimeout(() => {
    intermissionTextEl.textContent = choice.consequence;
    intermissionEl.classList.add("fade-in");
    intermissionEl.classList.remove("fade-out");
  }, FADE_MS);

  setTimeout(() => {
    intermissionEl.classList.remove("fade-in");
    intermissionEl.classList.add("fade-out");
  }, FADE_MS + INTERMISSION_MS);

  setTimeout(() => {
    current += 1;
    if (current >= scenes.length) {
      current = scenes.length - 1;
    }
    setScene(current);

    sceneLayerEl.classList.remove("fade-out");
    imageEl.classList.remove("fade-out");
    intermissionEl.classList.remove("fade-out");
    intermissionEl.classList.remove("fade-in");
    isTransitioning = false;
  }, FADE_MS + INTERMISSION_MS + FADE_MS);
}

setScene(current);
