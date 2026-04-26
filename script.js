const scenes = [
  {
    kicker: "",
    title: "Куда утекают твои деньги?",
    text:
      "Давай начистоту. Ты делаешь крутой продукт, ведешь проекты, но почему-то к вечеру чувствуешь себя выжатым лимоном, а доход уперся в потолок. Предлагаю сыграть в детектива. Мы пройдем по твоему обычному рабочему дню и найдем дыры, через которые прямо сейчас утекают твои деньги и время.",
    image: "images/scene4.png",
    choices: [
      {
        label: "🔍 Найти мои деньги",
        skipIntermission: true,
      },
    ],
  },
  {
    kicker: "",
    title: "Место преступления: Директ",
    text:
      "Среда, 14:00. В директ падает долгожданное сообщение: «А сколько стоит работа с вами? Можно подробности?». Твои действия?",
    image: "images/images1-1.jpg",
    intermissionImage: "images/images1-1.jpg",
    choices: [
      {
        label: "Бросаю всё и наговариваю голосовые",
        consequence:
          "Любой из этих вариантов — это слив. Пока ты наговариваешь голосовые, ты не живешь свою жизнь. Отвечаешь вечером — клиент остыл. Дежурная ссылка не продает. Итог: упущенная выгода.",
      },
      {
        label: "Отвечу вечером, когда доберусь до ноута",
        consequence:
          "Любой из этих вариантов — это слив. Пока ты наговариваешь голосовые, ты не живешь свою жизнь. Отвечаешь вечером — клиент остыл. Дежурная ссылка не продает. Итог: упущенная выгода.",
      },
      {
        label: "Скину дежурную ссылку",
        consequence:
          "Любой из этих вариантов — это слив. Пока ты наговариваешь голосовые, ты не живешь свою жизнь. Отвечаешь вечером — клиент остыл. Дежурная ссылка не продает. Итог: упущенная выгода.",
      },
    ],
  },
  {
    kicker: "",
    title: "Место преступления: Пустой экран",
    text: "Пятница. Надо выложить пост и прогрев в канал. Ты открываешь пустой экран...",
    image: "images/images2-2.jpg",
    intermissionImage: "images/images2-2.jpg",
    choices: [
      {
        label: "Вымучиваю текст 3 часа, переписывая каждое слово",
        consequence:
          "Тратить часы на текст — сжигать самый дорогой актив. А стандартные нейросети без правильной архитектуры выдают пластиковую инфоцыганщину, которую стыдно публиковать.",
      },
      {
        label: "Прошу ChatGPT, получаю текст с кучей символов и иду плакать",
        consequence:
          "Тратить часы на текст — сжигать самый дорогой актив. А стандартные нейросети без правильной архитектуры выдают пластиковую инфоцыганщину, которую стыдно публиковать.",
      },
    ],
  },
  {
    kicker: "",
    title: "Место преступления: Иллюзия делегирования",
    text: "О чудо, клиент перевел деньги! Что происходит дальше? Как устроен онбординг?",
    image: "images/images3.png",
    intermissionImage: "images/images3-3.jpeg",
    choices: [
      {
        label: "Ручками добавляю в чаты, кидаю доступы и чеки",
        consequence:
          "Техническая рутина съедает энергию. Ассистенту нужно платить оклад, ставить задачи и постоянно его контролировать. Человеческий фактор никто не отменял.",
      },
      {
        label: "Дергаю ассистента, чтобы он всё сделал",
        consequence:
          "Техническая рутина съедает энергию. Ассистенту нужно платить оклад, ставить задачи и постоянно его контролировать. Человеческий фактор никто не отменял.",
      },
    ],
  },
  {
    kicker: "",
    title: "Дело закрыто",
    text:
      "Твой диагноз — острая нехватка вайб-кодинга. Ты пытаешься быть человеком-оркестром там, где давно пора поставить умную систему. Вайб-кодинг — это когда ты общаешься со своим бизнесом на человеческом языке, а я собираю тебе под капотом экосистему из ИИ-агентов. Бот сам продает и выдает доступы, а нейросети генерируют контент в твоем авторском стиле. Я забираю рутину на себя и возвращаю тебе время на жизнь и масштабирование.",
    image: "images/scene4(a).jpeg",
    choices: [
      {
        label: "Завайбкодить свой бизнес",
        actionUrl: "https://t.me/evgeniya5_5",
        isPrimary: true,
      },
    ],
    isFinal: true,
  },
];

const imageEl = document.getElementById("sceneImage");
const mediaWrapEl = document.getElementById("sceneMedia");
const kickerEl = document.getElementById("sceneKicker");
const titleEl = document.getElementById("sceneTitle");
const textEl = document.getElementById("sceneText");
const choicesEl = document.getElementById("choices");
const sceneLayerEl = document.getElementById("sceneContent");
const intermissionEl = document.getElementById("intermission");
const intermissionBgEl = document.getElementById("intermissionBg");
const intermissionTextEl = document.getElementById("intermissionText");

let current = 0;
let isTransitioning = false;

const FADE_MS = 1100;
const INTERMISSION_MS = 3500;

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
  choicesEl.querySelectorAll("button").forEach((button) => {
    button.disabled = disabled;
  });
}

function goToNextSceneWithoutIntermission() {
  sceneLayerEl.classList.add("fade-out");
  mediaWrapEl.classList.add("fade-out");

  setTimeout(() => {
    current += 1;
    setScene(current);
    sceneLayerEl.classList.remove("fade-out");
    mediaWrapEl.classList.remove("fade-out");
    isTransitioning = false;
  }, FADE_MS);
}

function handleChoice(choice) {
  if (isTransitioning) {
    return;
  }

  if (choice.actionUrl !== undefined) {
    window.open(choice.actionUrl, "_blank", "noopener,noreferrer");
    return;
  }

  if (choice.skipIntermission) {
    isTransitioning = true;
    setChoicesDisabled(true);
    goToNextSceneWithoutIntermission();
    return;
  }

  isTransitioning = true;
  setChoicesDisabled(true);

  sceneLayerEl.classList.add("fade-out");
  mediaWrapEl.classList.add("fade-out");

  setTimeout(() => {
    const scene = scenes[current];
    if (scene.intermissionImage) {
      intermissionBgEl.src = scene.intermissionImage;
    }
    intermissionTextEl.textContent = choice.consequence;
    document.body.classList.add("intermission-active");
    intermissionEl.setAttribute("aria-hidden", "false");
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
    mediaWrapEl.classList.remove("fade-out");
    intermissionEl.classList.remove("fade-out");
    intermissionEl.classList.remove("fade-in");
    intermissionTextEl.textContent = "";
    intermissionBgEl.removeAttribute("src");
    intermissionEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("intermission-active");
    isTransitioning = false;
  }, FADE_MS + INTERMISSION_MS + FADE_MS);
}

setScene(current);
