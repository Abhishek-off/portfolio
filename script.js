/** Typing effect **/
const typingElement = document.querySelector('.typing');
const words = ["Abhishek", "a Developer", "a Tech Enthusiast"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  typingElement.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? 80 : 150);
}
type();

/** Fade-in on scroll **/
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));

/** Skill showcase overlay logic **/
const skillOverlay = document.getElementById('skillOverlay');
const overlayInner = document.getElementById('overlayInner');
const overlayClose = document.querySelector('.overlay-close');

const showcases = {
  ae: {
    type: 'videoCarousel',
    title: 'After Effects Renders',
    items: [
      "videos/ae1.mp4",
      "videos/ae2.mp4",
      "videos/ae3.mp4"
    ]
  },
  htmlcss: {
    type: 'links',
    title: 'Websites I Built (HTML/CSS)',
    items: []
  },
  dbms: {
    type: 'imageCarousel',
    title: 'DBMS Project Screens',
    items: []
  },
  javascript: {
    type: 'demos',
    title: 'JavaScript Mini Demos',
    demos: []
  }
};

function openSkillOverlay(skillId) {
  const data = showcases[skillId];
  if (!data) return;
  overlayInner.innerHTML = "";
  const title = document.createElement('h2');
  title.textContent = data.title || 'Showcase';
  overlayInner.appendChild(title);

  if (data.type === 'videoCarousel') {
    renderVideoCarousel(data.items);
  }

  skillOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeSkillOverlay() {
  skillOverlay.style.display = 'none';
  document.body.style.overflow = '';
}

overlayClose.addEventListener('click', closeSkillOverlay);
skillOverlay.addEventListener('click', (e) => {
  if (e.target === skillOverlay) closeSkillOverlay();
});

document.querySelectorAll('.skill').forEach(el => {
  el.addEventListener('click', () => openSkillOverlay(el.dataset.skill));
});

/** Video carousel **/
function renderVideoCarousel(items) {
  const wrapper = document.createElement('div');
  wrapper.className = 'video-carousel';

  if (!items || items.length === 0) {
    const note = document.createElement('p');
    note.textContent = 'No videos yet. Add them in /videos folder.';
    wrapper.appendChild(note);
  } else {
    items.forEach(src => {
      const vid = document.createElement('video');
      vid.src = src;
      vid.controls = true;
      vid.muted = true;
      wrapper.appendChild(vid);
    });
  }

  overlayInner.appendChild(wrapper);

  // Auto-scroll carousel
  let scrollAmount = 0;
  setInterval(() => {
    if (wrapper.scrollWidth > wrapper.clientWidth) {
      scrollAmount += 320;
      if (scrollAmount >= wrapper.scrollWidth - wrapper.clientWidth) {
        scrollAmount = 0;
      }
      wrapper.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }, 4000);
}

/** Resume fullscreen **/
function openFullscreen() {
  const iframe = document.getElementById("resumeFrame");
  if (iframe.requestFullscreen) iframe.requestFullscreen();
  else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
  else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
}
