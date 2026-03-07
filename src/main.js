import "./styles/main.css";
import "flyonui/flyonui";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: false,
    offset: 100,
    easing: 'ease-out-cubic',
    disable: function() {
      return window.innerWidth < 768;
    }
  });

  setTimeout(() => {
    if (
      window.HSStaticMethods &&
      typeof window.HSStaticMethods.autoInit === "function"
    ) {
      window.HSStaticMethods.autoInit();
    }
  }, 100);

  // Stats Counter Animation with GSAP
  const statsNumbers = document.querySelectorAll('[data-count]');
  if (statsNumbers.length > 0) {
    statsNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-count'));
      gsap.fromTo(stat, 
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            once: true
          },
          onUpdate: function() {
            stat.textContent = '+' + Math.ceil(stat.textContent).toLocaleString('ar-SA');
          }
        }
      );
    });
  }

  // Enhanced FAQ Accordion with GSAP
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
        
        // GSAP animation for opening
        const answer = item.querySelector('.faq-answer');
        if (answer) {
          gsap.fromTo(answer, 
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
          );
        }
      }
    });
  });

  // Enhanced Testimonials Carousel Animation
  let previousCenterSlide = null;

  function updateCenterSlide() {
    const activeSlides = document.querySelectorAll(".carousel-slide.active");
    
    activeSlides.forEach(slide => {
      if (slide.classList.contains("center-slide")) {
        gsap.to(slide.querySelector('.card'), {
          rotateY: -10,
          scale: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.inOut'
        });
      }
      slide.classList.remove("center-slide");
    });

    if (activeSlides.length >= 3) {
      const centerSlide = activeSlides[1];
      const centerCard = centerSlide.querySelector('.card');
      centerSlide.classList.add("center-slide");

      if (previousCenterSlide !== centerSlide && centerCard) {
        gsap.fromTo(centerCard,
          {
            rotateY: 18,
            scale: 0.98,
            y: 6,
            opacity: 0.92,
            transformPerspective: 1200,
            transformOrigin: 'center center'
          },
          {
            rotateY: 0,
            scale: 1.09,
            y: -6,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out'
          }
        );
      }

      previousCenterSlide = centerSlide;
    }
  }

  // One-time entrance animation for testimonials cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length) {
    gsap.fromTo(testimonialCards,
      {
        opacity: 0,
        y: 20,
        rotateY: 24,
        scale: 0.95,
        transformPerspective: 1200,
        transformOrigin: 'center center'
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#multi-slide',
          start: 'top 78%',
          once: true
        }
      }
    );
  }

  setInterval(updateCenterSlide, 100);
});