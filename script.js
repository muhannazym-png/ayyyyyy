
document.addEventListener("DOMContentLoaded", () => {
  // ✦ Create the starry sky
  const starField = document.querySelector(".stars");

  if (starField) {
    for (let i = 0; i < 120; i++) {
      const star = document.createElement("span");
      star.className = "star";

      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 5 + "s";
      star.style.animationDuration =
        2 + Math.random() * 4 + "s";

      const size = 1 + Math.random() * 3;
      star.style.width = size + "px";
      star.style.height = size + "px";

      starField.appendChild(star);
    }
  }

  // ✦ Shooting stars
  const shootingField = document.querySelector(".shooting-stars");

  if (shootingField) {
    for (let i = 0; i < 4; i++) {
      const shootingStar = document.createElement("span");
      shootingStar.className = "shooting-star";

      shootingStar.style.top = Math.random() * 60 + "%";
      shootingStar.style.left = Math.random() * 100 + "%";
      shootingStar.style.animationDelay = i * 3 + "s";

      shootingField.appendChild(shootingStar);
    }
  }

  // ✦ Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ✦ Reveal elements when scrolling
  const revealElements = document.querySelectorAll(
    ".reveal, .memory-card, .timeline-item"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ✦ Open and close the love letter
  const letterButton = document.querySelector("#open-letter");
  const letterModal = document.querySelector("#letter-modal");
  const closeLetter = document.querySelector("#close-letter");

  function openLetter() {
    if (!letterModal) return;

    letterModal.classList.add("active");
    letterModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeLetterModal() {
    if (!letterModal) return;

    letterModal.classList.remove("active");
    letterModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  if (letterButton) {
    letterButton.addEventListener("click", openLetter);
  }

  if (closeLetter) {
    closeLetter.addEventListener("click", closeLetterModal);
  }

  if (letterModal) {
    letterModal.addEventListener("click", (event) => {
      if (event.target === letterModal) {
        closeLetterModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLetterModal();
      closeMemoryModal();
    }
  });

  // ✦ Memory cards
  const memoryCards = document.querySelectorAll(".memory-card");
  const memoryModal = document.querySelector("#memory-modal");
  const memoryTitle = document.querySelector("#memory-title");
  const memoryText = document.querySelector("#memory-text");
  const closeMemory = document.querySelector("#close-memory");

  function closeMemoryModal() {
    if (!memoryModal) return;

    memoryModal.classList.remove("active");
    memoryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  memoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title =
        card.dataset.title ||
        card.querySelector("h3")?.textContent ||
        "Our memory";

      const description =
        card.dataset.text ||
        card.querySelector("p")?.textContent ||
        "A little moment I will always keep in my heart.";

      if (memoryModal && memoryTitle && memoryText) {
        memoryTitle.textContent = title;
        memoryText.textContent = description;

        memoryModal.classList.add("active");
        memoryModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      }
    });
  });

  if (closeMemory) {
    closeMemory.addEventListener("click", closeMemoryModal);
  }

  if (memoryModal) {
    memoryModal.addEventListener("click", (event) => {
      if (event.target === memoryModal) {
        closeMemoryModal();
      }
    });
  }

  // ✦ Secret "water plant?" button
  const secretButton = document.querySelector("#water-plant");
  const secretMessage = document.querySelector("#secret-message");

  if (secretButton && secretMessage) {
    secretButton.addEventListener("click", () => {
      const isHidden =
        secretMessage.hidden ||
        getComputedStyle(secretMessage).display === "none";

      secretMessage.hidden = !isHidden;
      secretButton.setAttribute(
        "aria-expanded",
        String(isHidden)
      );

      if (isHidden) {
        secretMessage.textContent =
          "Water plant? 🌱 Maybe it's just a little inside joke. " +
          "But here's something real: I miss you more than " +
          "these words could ever explain. 💗";

        secretMessage.classList.add("secret-visible");
      } else {
        secretMessage.classList.remove("secret-visible");
      }
    });
  }

  // ✦ Floating hearts on button click
  document.querySelectorAll(".heart-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const rect = button.getBoundingClientRect();

      for (let i = 0; i < 8; i++) {
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent = ["♡", "♥", "✦", "❤"][
          Math.floor(Math.random() * 4)
        ];

        heart.style.left =
          rect.left + rect.width / 2 + "px";
        heart.style.top =
          rect.top + window.scrollY + "px";

        heart.style.setProperty(
          "--drift",
          Math.random() * 140 - 70 + "px"
        );

        document.body.appendChild(heart);

        heart.addEventListener("animationend", () => {
          heart.remove();
        });

        setTimeout(() => heart.remove(), 2500);
      }
    });
  });

  // ✦ Days since we met: July 11, 2025
  const daysTogether = document.querySelector("#days-since-met");

  if (daysTogether) {
    const startDate = new Date(2025, 6, 11);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const days = Math.floor(
      (today - startDate) / (1000 * 60 * 60 * 24)
    );

    daysTogether.textContent = Math.max(0, days);
  }

  // ✦ Relationship date: May 2, 2026
  const relationshipDays = document.querySelector(
    "#days-in-relationship"
  );

  if (relationshipDays) {
    const startDate = new Date(2026, 4, 2);
    const today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const days = Math.floor(
      (today - startDate) / (1000 * 60 * 60 * 24)
    );

    relationshipDays.textContent = Math.max(0, days);
  }

  // ✦ Navigation menu for mobile
  const menuButton = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#navigation");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("nav-open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("nav-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ✦ Back to top
  const backToTop = document.querySelector("#back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ✦ Current year
  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  console.log("Our Little Universe is ready ✦");
});
