document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.getElementById("contactBtn");
  const contactSection = document.getElementById("contact");
  const menuBtn = document.getElementById("menuBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (contactBtn && contactSection) {
    contactBtn.addEventListener("click", () => {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  if (menuBtn && dropdownMenu) {
    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdownMenu.classList.toggle("show");

      const expanded = dropdownMenu.classList.contains("show");
      menuBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    dropdownMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
      if (!dropdownMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        dropdownMenu.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  const tabs = document.querySelectorAll(".archive-tab");
  const cards = document.querySelectorAll(".archive-card");
  const archiveTitle = document.getElementById("archiveTitle");

  function showCategory(category) {
    tabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.category === category);
    });

    cards.forEach((card) => {
      card.classList.toggle("is-visible", card.dataset.category === category);
    });

    if (archiveTitle) {
      archiveTitle.textContent = category.toUpperCase();
    }
  }

  if (tabs.length && cards.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        showCategory(tab.dataset.category);
      });
    });

    showCategory("3d");
  }

  const overlay = document.getElementById("archiveOverlay");
  const overlayBackdrop = document.getElementById("archiveOverlayBackdrop");
  const overlayClose = document.getElementById("archiveOverlayClose");
  const overlayImage = document.getElementById("overlayImage");
  const overlayType = document.getElementById("overlayType");
  const overlayTitleEl = document.getElementById("overlayTitle");
  const overlayYear = document.getElementById("overlayYear");
  const overlayTools = document.getElementById("overlayTools");
  const overlayDescription = document.getElementById("overlayDescription");
  const overlayLink = document.getElementById("overlayLink");

  function openOverlay(card) {
    if (!overlay) return;

    const title = card.dataset.title || "Untitled Project";
    const type = card.dataset.type || "PROJECT";
    const image = card.dataset.image || "";
    const description = card.dataset.description || "No description provided.";
    const year = card.dataset.year || "—";
    const tools = card.dataset.tools || "—";
    const link = card.dataset.link || "#";

    if (overlayImage) {
      overlayImage.src = image;
      overlayImage.alt = title;
    }

    if (overlayType) overlayType.textContent = type;
    if (overlayTitleEl) overlayTitleEl.textContent = title;
    if (overlayYear) overlayYear.textContent = year;
    if (overlayTools) overlayTools.textContent = tools;
    if (overlayDescription) overlayDescription.textContent = description;

    if (overlayLink) {
      overlayLink.href = link;
      overlayLink.style.display = link === "#" ? "none" : "inline-flex";
    }

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("overlay-open");
  }

  function closeOverlay() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overlay-open");
  }

  if (cards.length && overlay) {
    cards.forEach((card) => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => openOverlay(card));
    });
  }

  if (overlayBackdrop) {
    overlayBackdrop.addEventListener("click", closeOverlay);
  }

  if (overlayClose) {
    overlayClose.addEventListener("click", closeOverlay);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverlay();
    }
  });
});