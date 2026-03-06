import "./styles/main.css";
import "flyonui/flyonui";
  const monthlyBtn = document.getElementById("monthlyBtn");
  const yearlyBtn = document.getElementById("yearlyBtn");
  const proPrice = document.getElementById("proPrice");
  const basicPrice = document.getElementById("basicPrice");

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (
      window.HSStaticMethods &&
      typeof window.HSStaticMethods.autoInit === "function"
    ) {
      window.HSStaticMethods.autoInit();
    }
  }, 100);
});


    const toggles = document.querySelectorAll(".faq-toggle");

  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.parentElement.querySelector(".faq-content");
      const icon = btn.querySelector("span:last-child");

      // Close all first
      document.querySelectorAll(".faq-content").forEach(item => {
        item.classList.add("hidden");
      });

      document.querySelectorAll(".faq-toggle span:last-child").forEach(i => {
        if (i.textContent === "−") i.textContent = "+";
      });

      // Open clicked
      content.classList.toggle("hidden");
      icon.textContent = content.classList.contains("hidden") ? "+" : "−";
    });
  });


  monthlyBtn.addEventListener("click", () => {
    proPrice.textContent = "99";
    basicPrice.textContent = "39";

    monthlyBtn.classList.add("bg-emerald-800", "text-white");
    yearlyBtn.classList.remove("bg-emerald-800", "text-white");
  });

  yearlyBtn.addEventListener("click", () => {
    proPrice.textContent = "999";
    basicPrice.textContent = "399";

    yearlyBtn.classList.add("bg-emerald-800", "text-white");
    monthlyBtn.classList.remove("bg-emerald-800", "text-white");
  });

// section 2
  const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

const target = +counter.getAttribute("data-target");

let count = 0;

const updateCounter = () => {

const increment = target / 100;

count += increment;

if(count < target){

counter.innerText = Math.ceil(count).toLocaleString();
requestAnimationFrame(updateCounter);

}else{

counter.innerText = "+" + target.toLocaleString();

}

};

updateCounter();

});