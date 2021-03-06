const SITE = document.querySelector(".site");
const TRIGGER = document.querySelector(".trigger");
const REVEAL = document.querySelector(".main-nav");
const MENUITEMS = REVEAL.querySelectorAll("nav a");
const MENUARRAY = Array.apply(null, MENUITEMS);
let screenReaderText = document.querySelector(".trigger .screen-reader-text");

// Toggle reveal class on body element, set aria-expanded and screen reader text on TRIGGER:
function revealMenu() {
  SITE.classList.toggle("reveal");
  REVEAL.classList.add("open"); // cause the menu ul to appear
  TRIGGER.getAttribute("aria-expanded") == "false"
    ? TRIGGER.setAttribute("aria-expanded", true)
    : TRIGGER.setAttribute("aria-expanded", false);
  screenReaderText.innerHTML == "Reveal menu"
    ? (screenReaderText.innerHTML = "Hide menu")
    : (screenReaderText.innerHTML = "Reveal menu");
}

// Hide nav area when focus shifts away:
function catchFocus() {
  if (
    TRIGGER.getAttribute("aria-expanded") == "true" &&
    !(
      MENUARRAY.includes(document.activeElement) ||
      document.activeElement === TRIGGER
    )
  ) {
    revealMenu();
  } else {
    return;
  }
}

function removeMenu() {
  // Phân biệt trường hợp menu đang đóng hay mở, vì hàm này đưa vào event "transitionend", có 2 trường hợp.
  if (TRIGGER.getAttribute("aria-expanded") == "false") {
    REVEAL.classList.remove("open"); // cause the menu ul to disappear
  }
}

// Hide nav area when touch or click happens elsewhere:
function clickTarget(e) {
  if (
    TRIGGER.getAttribute("aria-expanded") == "true" &&
    !REVEAL.contains(e.target)
  ) {
    revealMenu();
  }
}

// Liten for clicks on TRIGGER button:
TRIGGER.addEventListener("click", revealMenu, false);

// Listen for focus changes:
SITE.addEventListener("focusin", catchFocus, true);

// Listen for clicks:
SITE.addEventListener(
  "click",
  function (e) {
    clickTarget(e);
  },
  true
);

// Transition vừa kết thúc (trong removeMenu có check menu đang on hoặc off) thì remove class 'open' ra khỏi 'main-nav'
SITE.addEventListener("transitionend", removeMenu, false);
