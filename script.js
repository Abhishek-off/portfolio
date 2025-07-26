// Typing effect
const typingElement = document.querySelector(".typing");
const words = ["Abhishek", "a Developer", "a Tech Enthusiast"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  if (!typingElement) return;
  const word = words[wordIndex];
  typingElement.textContent = word.slice(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex > word.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 70 : 120);
}
typeEffect();

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
faders.forEach(fade => observer.observe(fade));

// Back to top button
const topBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) topBtn.style.display = 'flex';
  else topBtn.style.display = 'none';
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// GLightbox
const lightbox = GLightbox({ selector: '.gallery-grid a' });

// Particles.js config
particlesJS("particles-js", {
  particles: {
    number: { value: 70, density: { enable: true, value_area: 800 } },
    color: { value: "#00d4ff" },
    shape: { type: "circle" },
    opacity: { value: 0.4, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 120, color: "#00d4ff", opacity: 0.3, width: 1 },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
