
"use strict";

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
      closeMenu();
    }
  });
}

/* BBOYFIK — Discover My Story interaction */

(() => {
  const storySection = document.getElementById("story");

  if (!storySection) return;

  const title = document.getElementById("story-title");
  const text = document.getElementById("story-text");
  const counter = document.getElementById("story-counter");
  const nextButton = document.getElementById("story-next");
  const content = storySection.querySelector(".story-content");
  const steps = storySection.querySelectorAll(".story-step");

  const chapters = [
    {
      title: "The Beginning",
      text: "I became interested in website development, designing, game development, and making apps. This interest inspired me to start exploring the world of technology."
    },
    {
      title: "My Project",
      text: "One project I am proud of is my BBOYFIK website. I have learned HTML, and this website is part of my journey into web development."
    },
    {
      title: "My Vision",
      text: "My dream is to develop games and websites. I want to keep exploring technology, developing my skills, and bringing my ideas to life."
    }
  ];

  let currentChapter = 0;

  function showChapter(index) {
    currentChapter = (index + chapters.length) % chapters.length;

    const chapter = chapters[currentChapter];

    title.textContent = chapter.title;
    text.textContent = chapter.text;
    counter.textContent =
      `CHAPTER ${String(currentChapter + 1).padStart(2, "0")} / 03`;

    steps.forEach((step, i) => {
      const active = i === currentChapter;

      step.classList.toggle("active", active);
      step.setAttribute("aria-pressed", String(active));
    });

    nextButton.innerHTML =
      currentChapter === chapters.length - 1
        ? 'Read again <span aria-hidden="true">↻</span>'
        : 'Next chapter <span aria-hidden="true">↗</span>';

    content.classList.remove("story-animate");
    void content.offsetWidth;
    content.classList.add("story-animate");
  }

  steps.forEach((step) => {
    step.addEventListener("click", () => {
      showChapter(Number(step.dataset.story));
    });
  });

  nextButton.addEventListener("click", () => {
    showChapter(currentChapter + 1);
  });

  showChapter(0);
})();
