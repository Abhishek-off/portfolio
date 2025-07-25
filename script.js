// Typing effect
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

// Fade-in on scroll
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

// Skill showcase data
const showcases = {
  ae: {
    type: 'videoSlider',
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
    items: [
      { title: 'Sample Portfolio', url: 'https://example.com', img: 'https://via.placeholder.com/300x200?text=Portfolio' }
    ]
  },
  dbms: {
    type: 'imageCarousel',
    title: 'DBMS Project Screens',
    items: [
      "https://via.placeholder.com/600x400?text=DBMS+1",
      "https://via.placeholder.com/600x400?text=DBMS+2"
    ]
  },
  javascript: {
    type: 'demos',
    title: 'JavaScript Mini Demos',
    demos: [
      {
        title: 'Counter Demo',
        description: 'A tiny example showing state updates with JS.',
        code: `
let count = 0;
function increment() {
  count++;
  document.getElementById('counter').innerText = count;
}`,
        html: `
<div>
  <p>Count: <span id="counter">0</span></p>
  <button onclick="increment()">Increment</button>
</div>`
      }
    ]
  }
};

// Overlay logic
const skillOverlay = document.getElementById('skillOverlay');
const overlayInner = document.getElementById('overlayInner');
const overlayClose = document.querySelector('.overlay-close');

function openSkillOverlay(skillId) {
  const data = showcases[skillId];
  if (!data) return;

  overlayInner.innerHTML = ""; 
  const title = document.createElement('h2');
  title.textContent = data.title || 'Showcase';
  overlayInner.appendChild(title);

  if (data.type === 'videoSlider') renderVideoSlider(data.items);
  else if (data.type === 'links') renderLinksGrid(data.items);
  else if (data.type === 'imageCarousel') renderImageCarousel(data.items);
  else if (data.type === 'demos') renderJSDemos(data.demos);

  skillOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeSkillOverlay() {
  skillOverlay.style.display = 'none';
  document.body.style.overflow = '';
  skillOverlay.querySelectorAll('video').forEach(v => { v.pause(); v.currentTime = 0; });
}

overlayClose.addEventListener('click', closeSkillOverlay);
skillOverlay.addEventListener('click', e => { if (e.target === skillOverlay) closeSkillOverlay(); });
document.querySelectorAll('.skill').forEach(el => el.addEventListener('click', () => openSkillOverlay(el.dataset.skill)));

// Render functions
function renderVideoSlider(items) {
  let current = 0;
  const wrapper = document.createElement('div');
  wrapper.className = 'video-slider';
  const video = document.createElement('video');
  video.controls = true; video.autoplay = true; video.muted = true; video.src = items[current];
  const left = document.createElement('button');
  left.className = 'slider-btn left'; left.innerHTML = '&#10094;';
  left.onclick = () => { current = (current - 1 + items.length) % items.length; video.src = items[current]; video.play(); };
  const right = document.createElement('button');
  right.className = 'slider-btn right'; right.innerHTML = '&#10095;';
  right.onclick = () => { current = (current + 1) % items.length; video.src = items[current]; video.play(); };
  wrapper.append(left, video, right);
  overlayInner.appendChild(wrapper);
}
function renderLinksGrid(items) {
  const grid = document.createElement('div');
  grid.className = 'link-grid';
  items.forEach(item => {
    const card = document.createElement('a');
    card.href = item.url; card.target = '_blank'; card.rel = 'noopener noreferrer'; card.className = 'link-card';
    if (item.img) { const img = document.createElement('img'); img.src = item.img; img.alt = item.title || 'Project'; card.appendChild(img); }
    const h3 = document.createElement('h3'); h3.textContent = item.title || 'Untitled'; card.appendChild(h3);
    grid.appendChild(card);
  });
  overlayInner.appendChild(grid);
}
function renderImageCarousel(items) {
  let current = 0;
  const wrapper = document.createElement('div'); wrapper.className = 'image-carousel';
  const img = document.createElement('img'); img.src = items[current];
  const left = document.createElement('button');
  left.className = 'slider-btn left'; left.innerHTML = '&#10094;';
  left.onclick = () => { current = (current - 1 + items.length) % items.length; img.src = items[current]; };
  const right = document.createElement('button');
  right.className = 'slider-btn right'; right.innerHTML = '&#10095;';
  right.onclick = () => { current = (current + 1) % items.length; img.src = items[current]; };
  wrapper.append(left, img, right);
  overlayInner.appendChild(wrapper);
}
function renderJSDemos(demos) {
  const container = document.createElement('div'); container.className = 'js-demo';
  demos.forEach(demo => {
    const box = document.createElement('div'); box.className = 'demo-box';
    const h3 = document.createElement('h3'); h3.textContent = demo.title; box.appendChild(h3);
    const desc = document.createElement('p'); desc.textContent = demo.description; box.appendChild(desc);
    const codePre = document.createElement('pre'); codePre.textContent = demo.code; box.appendChild(codePre);
    const htmlWrap = document.createElement('div'); htmlWrap.innerHTML = demo.html; box.appendChild(htmlWrap);
    try { new Function(demo.code)(); } catch (e) { console.warn('Demo error:', e); }
    container.appendChild(box);
  });
  overlayInner.appendChild(container);
}
