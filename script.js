// Typing animation
const typingElement = document.querySelector('.typing');
const words = ["Abhishek", "a Developer", "a Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let currentWord = '';
let isDeleting = false;

function type() {
  currentWord = words[wordIndex];
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

// Video modal
const skills = document.querySelectorAll('.skill');
const modal = document.getElementById('videoModal');
const video = modal.querySelector('video');
const closeBtn = modal.querySelector('.close');

skills.forEach(skill => {
  skill.addEventListener('click', () => {
    video.src = skill.getAttribute('data-video');
    modal.style.display = 'flex';
    video.play();
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  video.pause();
});
