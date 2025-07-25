/* ------------------ Typing Effect ------------------ */
const typingElement = document.querySelector('.typing');
const words = ["Abhishek", "a Developer", "a Tech Enthusiast"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  typingElement.textContent = words[wordIndex].substring(0, charIndex);
  if (!isDeleting) {
    charIndex++;
    if (charIndex > words[wordIndex].length) { isDeleting = true; setTimeout(type, 1000); return; }
  } else {
    charIndex--;
    if (charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
  }
  setTimeout(type, isDeleting ? 80 : 150);
}
type();

/* ---------------- Fade-in on scroll ---------------- */
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

/* ----------------- Skill Showcase ------------------ */
const skillOverlay = document.getElementById('skillOverlay');
const overlayInner = document.getElementById('overlayInner');
const overlayClose = document.querySelector('.overlay-close');

const showcases = {
  ae: {
    type: 'videoSlider',
    title: 'After Effects Renders',
    items: [
      // Put your repo-hosted paths here, e.g.:
       "videos/ae1.mp4",
       "videos/ae2.mp4",
       "videos/ae3.mp4"
    ]
  },
  htmlcss: {
    type: 'links',
    title: 'Websites I Built',
    items: [
      // { title: 'My Portfolio', url: 'https://yourusername.github.io/portfolio', img: 'images/site1.png', description: 'v1 of my site' }
    ]
  },
  dbms: {
    type: 'imageCarousel',
    title: 'DBMS Project Screens',
    items: [
      // "images/dbms1.png",
      // "images/dbms2.png"
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

function openSkillOverlay(skillId) {
  const data = showcases[skillId];
  if (!data) return;

  overlayInner.innerHTML = `<h2>${data.title || 'Showcase'}</h2>`;

  if (data.type === 'videoSlider') {
    renderFilmStripSlider(data.items);
  } else if (data.type === 'links') {
    renderLinksGrid(data.items);
  } else if (data.type === 'imageCarousel') {
    renderImageCarousel(data.items);
  } else if (data.type === 'demos') {
    renderJSDemos(data.demos || []);
  }

  skillOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeSkillOverlay() {
  skillOverlay.style.display = 'none';
  document.body.style.overflow = '';
  // Stop videos
  skillOverlay.querySelectorAll('video').forEach(v => { v.pause(); v.currentTime = 0; });
}

overlayClose.addEventListener('click', closeSkillOverlay);
skillOverlay.addEventListener('click', e => {
  if (e.target === skillOverlay) closeSkillOverlay();
});
document.querySelectorAll('.skill').forEach(el => {
  el.addEventListener('click', () => openSkillOverlay(el.dataset.skill));
});

/* ------------- Film-strip video slider ------------- */
function renderFilmStripSlider(items) {
  if (!items || !items.length) {
    overlayInner.insertAdjacentHTML('beforeend', `<p>No videos yet. Add them in <code>showcases.ae.items</code>.</p>`);
    return;
  }

  let current = 0;

  const wrapper = document.createElement('div');
  wrapper.className = 'video-slider filmstrip';

  const leftVideo = document.createElement('video');
  const mainVideo = document.createElement('video');
  const rightVideo = document.createElement('video');
  [leftVideo, mainVideo, rightVideo].forEach(v => {
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
  });
  mainVideo.controls = true;
  mainVideo.autoplay = true;

  function updateVideos() {
    leftVideo.src = items[(current - 1 + items.length) % items.length];
    mainVideo.src = items[current];
    rightVideo.src = items[(current + 1) % items.length];

    // Play
    mainVideo.play().catch(()=>{});
    leftVideo.play().catch(()=>{});
    rightVideo.play().catch(()=>{});
  }

  // Buttons
  const leftBtn = document.createElement('button');
  leftBtn.className = 'slider-btn left';
  leftBtn.innerHTML = '&#10094;';
  leftBtn.onclick = () => {
    current = (current - 1 + items.length) % items.length;
    updateVideos();
  };

  const rightBtn = document.createElement('button');
  rightBtn.className = 'slider-btn right';
  rightBtn.innerHTML = '&#10095;';
  rightBtn.onclick = () => {
    current = (current + 1) % items.length;
    updateVideos();
  };

  wrapper.append(leftVideo, mainVideo, rightVideo, leftBtn, rightBtn);
  overlayInner.appendChild(wrapper);
  updateVideos();

  // Clicking the side videos jumps to them
  leftVideo.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    updateVideos();
  });
  rightVideo.addEventListener('click', () => {
    current = (current + 1) % items.length;
    updateVideos();
  });
}

/* ----------------- Other renderers ----------------- */
function renderLinksGrid(items) {
  if (!items || !items.length) {
    overlayInner.insertAdjacentHTML('beforeend', `<p>No websites yet. Add them in <code>showcases.htmlcss.items</code>.</p>`);
    return;
  }
  const grid = document.createElement('div');
  grid.className = 'link-grid';
  items.forEach(item => {
    const card = document.createElement('a');
    card.href = item.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'link-card';

    if (item.img) {
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.title || 'Project thumbnail';
      card.appendChild(img);
    }

    const h3 = document.createElement('h3');
    h3.textContent = item.title || 'Untitled';
    card.appendChild(h3);

    if (item.description) {
      const p = document.createElement('p');
      p.textContent = item.description;
      card.appendChild(p);
    }

    grid.appendChild(card);
  });
  overlayInner.appendChild(grid);
}

function renderImageCarousel(items) {
  if (!items || !items.length) {
    overlayInner.insertAdjacentHTML('beforeend', `<p>No screenshots yet. Add them in <code>showcases.dbms.items</code>.</p>`);
    return;
  }

  let current = 0;
  const wrapper = document.createElement('div');
  wrapper.className = 'image-carousel';

  const img = document.createElement('img');
  img.src = items[current];

  const left = document.createElement('button');
  left.className = 'slider-btn left';
  left.innerHTML = '&#10094;';
  left.onclick = () => {
    current = (current - 1 + items.length) % items.length;
    img.src = items[current];
  };

  const right = document.createElement('button');
  right.className = 'slider-btn right';
  right.innerHTML = '&#10095;';
  right.onclick = () => {
    current = (current + 1) % items.length;
    img.src = items[current];
  };

  wrapper.append(left, img, right);
  overlayInner.appendChild(wrapper);
}

function renderJSDemos(demos) {
  if (!demos || !demos.length) {
    overlayInner.insertAdjacentHTML('beforeend', `<p>No JS demos yet. Add them in <code>showcases.javascript.demos</code>.</p>`);
    return;
  }

  const container = document.createElement('div');
  container.className = 'js-demo';

  demos.forEach((demo, idx) => {
    const box = document.createElement('div');
    box.className = 'demo-box';

    const h3 = document.createElement('h3');
    h3.textContent = demo.title || `Demo ${idx + 1}`;
    box.appendChild(h3);

    const desc = document.createElement('p');
    desc.textContent = demo.description || '';
    box.appendChild(desc);

    const codePre = document.createElement('pre');
    codePre.textContent = demo.code || '';
    box.appendChild(codePre);

    const htmlWrap = document.createElement('div');
    htmlWrap.innerHTML = demo.html || '';
    box.appendChild(htmlWrap);

    try { new Function(demo.code || "")(); } catch (e) { console.warn('Demo code error:', e); }

    container.appendChild(box);
  });

  overlayInner.appendChild(container);
}
