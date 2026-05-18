/**
 * Data Reapers - Main Script
 */

// --------------------------------------------------------------------------
// Navigation Scroll Shadow
// --------------------------------------------------------------------------
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 40 ? '0 2px 20px rgba(44,33,18,.1)' : 'none';
});

// --------------------------------------------------------------------------
// Active Navigation Link Tracker
// --------------------------------------------------------------------------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  threshold: 0.35
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// --------------------------------------------------------------------------
// Scroll Reveal Animations
// --------------------------------------------------------------------------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// --------------------------------------------------------------------------
// Staggered Animations for Grids
// --------------------------------------------------------------------------
const grids = document.querySelectorAll('.ds-grid, .var-grid, .findings-grid, .stack-groups, .rec-list, .team-grid');

grids.forEach(grid => {
  const gridReveals = grid.querySelectorAll('.reveal');
  gridReveals.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.07}s`;
  });
});