/* -----------------------------------------
  Create Scroll Darkness Overlay
 ---------------------------------------- */

// Create overlay element for scroll darkness effect
const scrollOverlay = document.createElement('div');
scrollOverlay.className = 'scroll-overlay';
document.body.appendChild(scrollOverlay);

/* -----------------------------------------
  Scroll Darkness Effect
 ---------------------------------------- */

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const headerHeight = document.querySelector('.header').offsetHeight;
  
  // Calculate opacity based on scroll position
  // Starts at 100vh (header height) and reaches max at 200vh
  const startFade = headerHeight * 0.8; // Start fading at 80% of header
  const maxFade = headerHeight * 1.5;
  
  if (scrollY > startFade) {
    const opacity = Math.min((scrollY - startFade) / (maxFade - startFade) * 0.7, 0.7);
    scrollOverlay.style.background = `rgba(26, 20, 16, ${opacity})`;
  } else {
    scrollOverlay.style.background = 'rgba(26, 20, 16, 0)';
  }
});

/* -----------------------------------------
  Focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

/* -----------------------------------------
  Back to Top Button
 ---------------------------------------- */

const backToTopButton = document.querySelector('.back-to-top');
let isBackToTopRendered = false;

const alterStyles = (isVisible) => {
  if (isVisible) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
};

window.addEventListener('scroll', () => {
  if (window.scrollY > 700) {
    if (!isBackToTopRendered) {
      isBackToTopRendered = true;
      alterStyles(isBackToTopRendered);
    }
  } else {
    if (isBackToTopRendered) {
      isBackToTopRendered = false;
      alterStyles(isBackToTopRendered);
    }
  }
});

/* -----------------------------------------
  Smooth Scroll for Navigation Links
 ---------------------------------------- */

const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    // Only prevent default for anchor links
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

/* -----------------------------------------
  Navigation Background on Scroll
 ---------------------------------------- */

const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.style.background = 'transparent';
    nav.style.boxShadow = '0 4px 20px rgba(255, 217, 61, 0.3)';
  } else {
    nav.style.background = 'transparent';;
    nav.style.boxShadow = 'none';
  }
});

/* -----------------------------------------
  Intersection Observer for Fade-in Animations
 ---------------------------------------- */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.work__card, .framework__card, .about__content');

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(el);
});

/* -----------------------------------------
  Active Navigation Link on Scroll
 ---------------------------------------- */

const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
  const scrollY = window.scrollY;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active');
    } else {
      navLink?.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', highlightNavigation);

/* -----------------------------------------
  Add active class styling via JavaScript
 ---------------------------------------- */

const style = document.createElement('style');
style.textContent = `
  .nav__link.active {
    color: var(--primary);
  }
  .nav__link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

/* -----------------------------------------
  Loading Animation
 ---------------------------------------- */

window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

/* -----------------------------------------
  Parallax Effect for Header
 ---------------------------------------- */

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (header && scrolled < header.offsetHeight) {
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

/* -----------------------------------------
  Random Ticket Rotation on Hover
 ---------------------------------------- */

const workCards = document.querySelectorAll('.work__card');

workCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const randomRotation = (Math.random() - 0.5) * 6; // -3 to 3 degrees
    card.style.setProperty('--hover-rotation', `${randomRotation}deg`);
  });
});

/* -----------------------------------------
  Animated Skills Entrance
 ---------------------------------------- */

const skillCards = document.querySelectorAll('.framework__card');

skillCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

/* -----------------------------------------
  Sunflower Particles Effect (Optional Enhancement)
 ---------------------------------------- */

function createSunflowerParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.fontSize = `${Math.random() * 20 + 10}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = '-50px';
  particle.style.opacity = '0.3';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '0';
  particle.textContent = '🌻';
  particle.style.transition = 'all 10s linear';
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.style.top = '100vh';
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    particle.style.opacity = '0';
  }, 100);
  
  setTimeout(() => {
    particle.remove();
  }, 10000);
}

// Create particles occasionally
setInterval(() => {
  if (Math.random() > 0.7) {
    createSunflowerParticle();
  }
}, 3000);