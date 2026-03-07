import "./styles/main.css";
import "flyonui/flyonui";

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (
      window.HSStaticMethods &&
      typeof window.HSStaticMethods.autoInit === "function"
    ) {
      window.HSStaticMethods.autoInit();
    }
  }, 100);

  const faqItems = document.querySelectorAll(".faq-accordion .faq-item");

  faqItems.forEach((item) => {
    const toggle = item.querySelector(".faq-toggle");

    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("is-open");
        const faqToggle = faqItem.querySelector(".faq-toggle");
        if (faqToggle) {
          faqToggle.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        item.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });
});
function updateCenterSlide() {
  const activeSlides = document.querySelectorAll(".carousel-slide.active");

  activeSlides.forEach(slide => slide.classList.remove("center-slide"));

  if (activeSlides.length >= 3) {
    activeSlides[1].classList.add("center-slide"); // middle slide
  }
}

setInterval(updateCenterSlide, 100);