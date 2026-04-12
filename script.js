document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.getElementById("contactBtn");
  const contactSection = document.getElementById("contact");
  const menuBtn = document.getElementById("menuBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  contactBtn.addEventListener("click", () => {
    if (contactSection) {
      const targetY =
        contactSection.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });
    }
  });

  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("show");

    const expanded = dropdownMenu.classList.contains("show");
    menuBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  dropdownMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});