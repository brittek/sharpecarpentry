document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  const baseElements = [".t-sydney",".t-nsw",".t-company",".t-uc",".t-inquiryLabel",".t-phoneLabel",".t-email",".t-phone",".t-fine",".t-divider"];
  gsap.set(baseElements, { opacity: 0 });
  gsap.set(".t-logo", { opacity: 0, y: 18, scale: 0.985 });

  if(reduce){
    gsap.set([...baseElements, ".t-logo"], { opacity: 1, y: 0, scale: 1 });
    return;
  }

  tl.to([".t-sydney",".t-nsw"], { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.05)
    .to(".t-company", { opacity: 1, duration: 0.8 }, 0.15)
    .to(".t-logo", { opacity: 1, y: 0, scale: 1, duration: 0.95 }, 0.25)
    .to(".t-uc", { opacity: 1, duration: 0.75 }, 0.55)
    .to([".t-inquiryLabel",".t-phoneLabel"], { opacity: 1, duration: 0.6, stagger: 0.06 }, 0.75)
    .to([".t-email",".t-phone"], { opacity: 1, duration: 0.65, stagger: 0.06 }, 0.85)
    .to([".t-divider",".t-fine"], { opacity: 1, duration: 0.8, stagger: 0.06 }, 0.95);

  gsap.to(".dot", {
    boxShadow: "0 0 0 10px rgba(49,209,88,.06), 0 0 36px rgba(49,209,88,.28)",
    duration: 2.8,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".bottomGlow", {
    opacity: 0.72,
    duration: 3.2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".t-logo", {
    y: -2,
    duration: 4.2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 1.2
  });

  gsap.fromTo(".t-uc", { letterSpacing: "0.78em" }, {
    letterSpacing: "0.65em",
    duration: 1.2,
    ease: "power2.out",
    delay: 0.6
  });
});

// Slider Logic
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('.slider-container');

  sliders.forEach(container => {
    const handle = container.querySelector('.slider-handle');
    const beforeImage = container.querySelector('.slider-image-before');

    // Ensure image width matches container for proper clipping
    const img = beforeImage.querySelector('img');
    const updateImgWidth = () => {
      img.style.width = `${container.offsetWidth}px`;
    };

    window.addEventListener('resize', updateImgWidth);
    updateImgWidth();

    handle.addEventListener('input', (e) => {
      const val = e.target.value;
      beforeImage.style.width = `${val}%`;
      // Update the visual line position via CSS variables
      container.style.setProperty('--slider-pos', `${val}%`);
    });
  });
});

// GSAP Scroll Reveals
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const reveals = document.querySelectorAll('.gsap-reveal');

  reveals.forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%", // Animation starts when top of element hits 85% of viewport
        toggleActions: "play none none none"
      }
    });
  });
});
