/* Changes tab title when user changes tab: */
const tabTitle = document.title;
window.addEventListener("blur", () => (document.title = "<NG /> Come back 😔"));
window.addEventListener("focus", () => (document.title = tabTitle + " 😀"));

document.body.classList.add("js-loading");
window.addEventListener("load", function () {
  /* Remove page loader and enable animations on body */
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "none";
  document.body.classList.remove("js-loading");
});

// Wait for the document to finish loading
document.addEventListener("DOMContentLoaded", function () {
  /* Capture body height for bubbles translateY animation */
  function captureBodyHeight() {
    const bodyHeight = document.body.offsetHeight;
    const translateYValue = -bodyHeight + "px";

    // Apply the translateY value to each "bubble"
    const bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach(function (bubble) {
      bubble.style.transform = "translateY(" + translateYValue + ")";
    });
  }
  // Call the captureBodyHeight function whenever the window is resized
  window.addEventListener("resize", captureBodyHeight);
  // Call the captureBodyHeight function initially
  captureBodyHeight();
});

/* Toggle Menu for mobile */
const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");

function toggleMenu() {
  menu.classList.toggle("menu_opened");
}

openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);

/* Scroll progress bar */
const body = document.querySelector("body");
const bar = document.getElementById("scroll-progress");
const updateBar = () => {
  let progress =
    (window.scrollY / (body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = `${progress}%`;
  requestAnimationFrame(updateBar);
};
updateBar();

/* Intersection observer */
const observerProfileDescription = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
      // if I wanted to do the animation every time the element is observed:
      // else {
      //   entry.target.classList.remove("show");
      // }
    });
  }
);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observerProfileDescription.observe(el));

observerProfileTitle = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("type");
    } else {
      entry.target.classList.remove("type");
    }
  });
});

const typewriterTitle = document.querySelector(".typewriter h3");
observerProfileTitle.observe(typewriterTitle);

const observerSkills = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("addGap");
        entry.target.style.transition = `.3s linear ${i / 30}s`;
      } else {
        entry.target.classList.remove("addGap");
      }
    });
  },
  { rootMargin: "15px 0px", threshold: 0 }
);

const skills = document.querySelectorAll(".skills-list div");
skills.forEach((skill) => observerSkills.observe(skill));

/* Dark Mode Toggle */
const toggleBtn = document.getElementById("toggle-btn");
const theme = document.querySelector("body");
const header = document.querySelector(".topheader");
const portfolio = document.querySelector(".logo span");
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const links = document.querySelectorAll("ul.menu li a");

let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  theme.classList.add("dark-mode-theme");
  toggleBtn.checked = true;
  header.classList.add("dark-mode-theme");
  portfolio.style.color = "var(--theme-color)";
  openMenu.style.filter = "invert(100%)";
  closeMenu.style.filter = "invert(100%)";
  for (const link of links) {
    link.style.color = "var(--theme-color)";
  }
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  theme.classList.remove("dark-mode-theme");
  toggleBtn.checked = false;
  header.classList.remove("dark-mode-theme");
  portfolio.style.color = "var(--dark-theme-color)";
  openMenu.style.filter = "grayscale(100%)";
  closeMenu.style.filter = "grayscale(100%)";
  for (const link of links) {
    link.style.color = "var(--dark-theme-color)";
  }
  localStorage.setItem("dark-mode", "disabled");
};

// set state of darkMode on page load
darkMode === "enabled" ? enableDarkMode() : disableDarkMode();

toggleBtn.addEventListener("click", (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
