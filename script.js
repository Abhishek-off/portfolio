/** Typing effect **/
const typingElement = document.querySelector('.typing');
const words = ["Abhishek", "a Developer", "a Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

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
    type: 'videoSlider',
    title: 'After Effects Renders',
    items: [
      // Add your video paths here
      // "videos/ae1.mp4",
      // "videos/ae2.mp4",
      // "videos/ae3.mp4"
    ]
  },
  htmlcss: {
    type: 'links',
    title: 'Websites I Built (HTML/CSS)',
    items: [
      // Example entries: replace with your own
      // { title: 'Portfolio v1', url: 'https://example.com', img: 'images/site1.png' },
      // { title: 'Landing Page', url: 'https://example.com/landing', img: 'images/site2.png' }
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
        code: \`
let count = 0;
function increment() {
  count++;
  document.getElementById('counter').innerText = count;
}\`,
        html: \`
<div>
  <p>Count: <span id="counter">0</span></p>
  <button onclick="increment()">Increment</button>
</div>\`
      }
    ]
  }
};

function openSkillOverlay(skillId) {
  const data = showcases[skillId];
  if (!data) return;

  overlayInner.innerHTML = ""; // clear

  const title = document.createElement('h2');
  title.textContent = data.title || 'Showcase';
  overlayInner.appendChild(title);

  if (data.type === 'videoSlider') {
    if (!data.items || data.items.length === 0) {
      const note = document.createElement('p');
      note.textContent = 'No videos added yet. Put your .mp4 files inside the /videos folder and register them in script.js → showcases.ae.items.';
      overlayInner.appendChild(note);
    } else {
      renderVideoSlider(data.items);
    }
  } else if (data.type === 'links') {
    if (!data.items || data.items.length === 0) {
      const note = document.createElement('p');
      note.textContent = 'No websites added yet. Add them inside script.js → showcases.htmlcss.items.';
      overlayInner.appendChild(note);
    } else {
      renderLinksGrid(data.items);
    }
  } else if (data.type === 'imageCarousel') {
    if (!data.items || data.items.length === 0) {
      const note = document.createElement('p');
      note.textContent = 'No screenshots added yet. Add them inside script.js → showcases.dbms.items.';
      overlayInner.appendChild(note);
    } else {
      renderImageCarousel(data.items);
    }
  } else if (data.type === 'demos') {
    renderJSDemos(data.demos || []);
  }

  skillOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeSkillOverlay() {
  skillOverlay.style.display = 'none';
  document.body.style.overflow = '';
  // Stop any playing videos
  const vids = skillOverlay.querySelectorAll('video');
  vids.forEach(v => { v.pause(); v.currentTime = 0; });
}

overlayClose.addEventListener('click', closeSkillOverlay);
skillOverlay.addEventListener('click', (e) => {
  if (e.target === skillOverlay) closeSkillOverlay();
});

document.querySelectorAll('.skill').forEach(el => {
  el.addEventListener('click', () => openSkillOverlay(el.dataset.skill));
});

/** Renderers **/
function renderVideoSlider(items) {
  let current = 0;

  const wrapper = document.createElement('div');
  wrapper.className = 'video-slider';

  const video = document.createElement('video');
  video.controls = true;
  video.autoplay = true;
  video.muted = true;
  video.src = items[current];

  const left = document.createElement('button');
  left.className = 'slider-btn left';
  left.innerHTML = '&#10094;';
  left.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    video.src = items[current];
    video.play();
  });

  const right = document.createElement('button');
  right.className = 'slider-btn right';
  right.innerHTML = '&#10095;';
  right.addEventListener('click', () => {
    current = (current + 1) % items.length;
    video.src = items[current];
    video.play();
  });

  wrapper.appendChild(left);
  wrapper.appendChild(video);
  wrapper.appendChild(right);
  overlayInner.appendChild(wrapper);
}

function renderLinksGrid(items) {
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
  let current = 0;

  const wrapper = document.createElement('div');
  wrapper.className = 'image-carousel';

  const img = document.createElement('img');
  img.src = items[current];

  const left = document.createElement('button');
  left.className = 'slider-btn left';
  left.innerHTML = '&#10094;';
  left.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    img.src = items[current];
  });

  const right = document.createElement('button');
  right.className = 'slider-btn right';
  right.innerHTML = '&#10095;';
  right.addEventListener('click', () => {
    current = (current + 1) % items.length;
    img.src = items[current];
  });

  wrapper.appendChild(left);
  wrapper.appendChild(img);
  wrapper.appendChild(right);
  overlayInner.appendChild(wrapper);
}

function renderJSDemos(demos) {
  if (!demos.length) {
    const p = document.createElement('p');
    p.textContent = 'Add JavaScript demos inside script.js → showcases.javascript.demos';
    overlayInner.appendChild(p);
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
    codePre.textContent = demo.code;
    box.appendChild(codePre);

    const htmlWrap = document.createElement('div');
    htmlWrap.innerHTML = demo.html;
    box.appendChild(htmlWrap);

    // Attach dynamic functions to window to work in injected HTML (simple demos only)
    try {
      const fn = new Function(demo.code + "\nreturn true;");
      fn.call(window);
    } catch (e) {
      console.warn('Demo code error:', e);
    }

    container.appendChild(box);
  });

  overlayInner.appendChild(container);
}
