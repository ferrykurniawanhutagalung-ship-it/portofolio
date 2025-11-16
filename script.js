// Generate floating particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = window.innerWidth > 768 ? 30 : 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 8 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 4 + Math.random() * 6;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particlesContainer.appendChild(particle);
  }
}

// Typewriter effect for subtitle with cycling
function typeWriterEffect(element, texts, speed = 80, deleteSpeed = 50, pause = 2000) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];
    element.style.borderRight = '2px solid #bb6cf9';

    if (!isDeleting) {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, pause);
        return;
      }
    } else {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(type, isDeleting ? deleteSpeed : speed);
  }

  setTimeout(type, 500);
}

// Scroll reveal animation
function revealOnScroll() {
  const fadeElements = document.querySelectorAll('.fade-in');

  fadeElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      el.classList.add('visible');
    }
  });
}

// Theme Toggle
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const body = document.body;

  // Check for saved theme preference or default to purple
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'green') {
    body.classList.add('green-mode');
    updateIcon(true);
  } else {
    updateIcon(false);
  }

  toggle.addEventListener('click', () => {
    const isGreen = body.classList.toggle('green-mode');
    localStorage.setItem('theme', isGreen ? 'green' : 'purple');
    updateIcon(isGreen);
  });

  function updateIcon(isGreen) {
    if (isGreen) {
      toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
      </svg>`;
    } else {
      toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
      </svg>`;
    }
  }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  createParticles();
  
  const typewriter = document.getElementById('typewriter');
  const texts = ["Front End Web Developer", "Web Developer", "Photography", "Fullstack Developer"];
  typewriter.textContent = ''; // Clear for typing
  typeWriterEffect(typewriter, texts);

  initThemeToggle();
});

// Reveal on scroll
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Run once on load

// Recreate particles on resize
window.addEventListener('resize', () => {
  const particlesContainer = document.getElementById('particles');
  particlesContainer.innerHTML = '';
  createParticles();
});