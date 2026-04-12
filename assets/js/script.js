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
  const overlayPrev = document.getElementById("overlayPrev");
  const overlayNext = document.getElementById("overlayNext");
  const overlayDots = document.getElementById("overlayDots");
  const overlayDotsBar = document.getElementById("overlayDotsBar");

  let currentGallery = [];
  let currentImageIndex = 0;

  function parseGallery(card) {
    const galleryRaw = card.dataset.gallery || card.dataset.image || "";
    return galleryRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function renderDots() {
    if (!overlayDots) return;

    overlayDots.innerHTML = "";

    currentGallery.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "overlay-dot";

      if (index === currentImageIndex) {
        dot.classList.add("is-active");
      }

      dot.setAttribute("aria-label", `Zobrazit obrázek ${index + 1}`);

      dot.addEventListener("click", (event) => {
        event.stopPropagation();
        currentImageIndex = index;
        updateOverlayImage();
      });

      overlayDots.appendChild(dot);
    });

    const hasMultipleImages = currentGallery.length > 1;

    if (overlayPrev) {
      overlayPrev.classList.toggle("is-hidden", !hasMultipleImages);
    }

    if (overlayNext) {
      overlayNext.classList.toggle("is-hidden", !hasMultipleImages);
    }

    if (overlayDotsBar) {
      overlayDotsBar.classList.toggle("is-hidden", !hasMultipleImages);
    }
  }

  function updateOverlayImage() {
    if (!overlayImage || !currentGallery.length) return;

    overlayImage.src = currentGallery[currentImageIndex];
    renderDots();
  }

  function openOverlay(card) {
    if (!overlay) return;

    const title = card.dataset.title || "Untitled Project";
    const type = card.dataset.type || "PROJECT";
    const image = card.dataset.image || "";
    const description = card.dataset.description || "No description provided.";
    const year = card.dataset.year || "—";
    const tools = card.dataset.tools || "—";
    const link = card.dataset.link || "#";

    currentGallery = parseGallery(card);

    if (!currentGallery.length && image) {
      currentGallery = [image];
    }

    currentImageIndex = 0;

    if (overlayImage) {
      overlayImage.alt = title;
    }

    if (overlayType) overlayType.textContent = type;
    if (overlayTitleEl) overlayTitleEl.textContent = title;
    if (overlayYear) overlayYear.textContent = year;
    if (overlayTools) overlayTools.textContent = tools;
    if (overlayDescription) overlayDescription.textContent = description;

    if (overlayLink) {
      overlayLink.href = link;

      if (link === "#") {
        overlayLink.style.display = "none";
      } else {
        overlayLink.style.display = "inline-flex";
        overlayLink.textContent = "OPEN FULL PROJECT";
      }
    }

    updateOverlayImage();

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

  function showPrevImage() {
    if (currentGallery.length <= 1) return;

    currentImageIndex =
      (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;

    updateOverlayImage();
  }

  function showNextImage() {
    if (currentGallery.length <= 1) return;

    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    updateOverlayImage();
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

  if (overlayPrev) {
    overlayPrev.addEventListener("click", (event) => {
      event.stopPropagation();
      showPrevImage();
    });
  }

  if (overlayNext) {
    overlayNext.addEventListener("click", (event) => {
      event.stopPropagation();
      showNextImage();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (!overlay || !overlay.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeOverlay();
    }

    if (event.key === "ArrowLeft") {
      showPrevImage();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }
  });
});