const RANDOM_QUOTE_API = "http://api.quotable.io/random";
const QUOTE_DISPLAY_ELEMENT = document.querySelector("#quoteDisplay");
const TEXTAREA = document.querySelector("#quoteInpute");
const TIMER = document.querySelector("#timer");

TIMER.innerText = 0;

TEXTAREA.addEventListener("input", () => {
  const arrayQuote = QUOTE_DISPLAY_ELEMENT.querySelectorAll("span");
  const arrayValue = TEXTAREA.value.split("");

  let correct = true;
  arrayQuote.forEach((CHARACTER_SPAN, index) => {
    const character = arrayValue[index];
    console.log(character);
    if (character == null) {
      CHARACTER_SPAN.classList.remove("correct");
      CHARACTER_SPAN.classList.remove("incorrect");
      correct = false;
    } else if (character === CHARACTER_SPAN.innerText) {
      CHARACTER_SPAN.classList.add("correct");
      CHARACTER_SPAN.classList.remove("incorrect");
    } else {
      CHARACTER_SPAN.classList.remove("correct");
      CHARACTER_SPAN.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) renderNewQuote();
});

const GET_RANDOM_QUOTE = () => {
  return fetch(RANDOM_QUOTE_API)
    .then((response) => response.json())
    .then((data) => data.content);
};

async function renderNewQuote() {
  const quote = await GET_RANDOM_QUOTE();
  QUOTE_DISPLAY_ELEMENT.innerText = "";
  quote.split("").forEach((character) => {
    const CHARACTER_SPAN = document.createElement("span");
    CHARACTER_SPAN.innerText = character;
    QUOTE_DISPLAY_ELEMENT.appendChild(CHARACTER_SPAN);
  });
  TEXTAREA.value = null;
  startTimer();
}

let startTime;
const startTimer = () => {
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
};

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();
