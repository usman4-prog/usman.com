// script-p.js — cleaned, merged and robust
document.addEventListener('DOMContentLoaded', () => {
  // Elements (single declarations)
  const menu = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');
  const header = document.querySelector('.header');
  const skillBars = document.querySelectorAll('.bar span');
  const counters = document.querySelectorAll('.counter');
  const themeToggle = document.querySelector('.theme-toggle');

  /* ---------- Navbar toggle ---------- */
  if (menu && navbar) {
    menu.addEventListener('click', () => navbar.classList.toggle('active'));
  }

  /* ---------- Active nav link on scroll + sticky header ---------- */
  window.addEventListener('scroll', () => {
    const top = window.scrollY;

    // active link
    sections.forEach(sec => {
      const offset = sec.offsetTop - 100;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`header nav a[href*="${id}"]`);
        if (active) active.classList.add('active');
      }
    });

    // sticky header
    if (header) header.classList.toggle('sticky', window.scrollY > 50);

    // close mobile navbar when scrolling
    if (navbar && navbar.classList.contains('active')) navbar.classList.remove('active');
  });

  /* ---------- Animate skill bars once when visible ---------- */
  let skillsAnimated = false;
  function animateSkills() {
    skillBars.forEach(bar => {
      const target = bar.getAttribute('data-width') || '0%';
      bar.style.width = target;
    });

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target') || 0;
      let count = 0;
      const step = Math.max(1, Math.floor(target / 50));
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.textContent = target + '%';
          clearInterval(timer);
        } else {
          counter.textContent = count + '%';
        }
      }, 12);
    });
  }

  window.addEventListener('scroll', () => {
    if (skillsAnimated) return;
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    const pos = skillsSection.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      animateSkills();
      skillsAnimated = true;
    }
  });

  /* ---------- Theme toggle (safe & persistent) ---------- */
  if (themeToggle) {
    // restore saved theme
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.body.classList.add('light');
      themeToggle.textContent = '🌙';
    } else {
      themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      themeToggle.textContent = isLight ? '🌙' : '☀️';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }
});/* ---------- Binary Background Animation ---------- */
const binaryBg = document.querySelector(".binary-bg");

function createBinary() {
  const binary = document.createElement("div");
  binary.classList.add("binary");

  // 0 ya 1 generate karo
  binary.textContent = Math.random() > 0.5 ? "1" : "0";

  // Random horizontal position
  binary.style.left = Math.random() * 100 + "vw";

  // Random font size
  binary.style.fontSize = 12 + Math.random() * 16 + "px";

  // Random duration (pehle 4–8s tha)
const duration = 8 + Math.random() * 6;  
binary.style.animationDuration = duration + "s";


  // Random direction (left→right ya right→left)
  binary.style.animationName = Math.random() > 0.5 ? "moveBinary" : "moveBinaryAlt";

  binaryBg.appendChild(binary);

  // Remove after animation complete
  setTimeout(() => binary.remove(), duration * 1000);
}

// Har 300ms me ek binary create karo
setInterval(createBinary, 300);

// Typing Effect
const typed = new Typed("#typing", {
  strings: ["Frontend Developer", "Web Designer", "Freelancer"], // 👈 words list
  typeSpeed: 100,   // typing speed
  backSpeed: 60,    // backspacing speed
  backDelay: 1500,  // wait before deleting
  loop: true        // repeat forever
});
