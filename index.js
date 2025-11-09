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
    nav.style.background = 'rgba(10, 10, 10, 0.98)';
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
  } else {
    nav.style.background = 'rgba(10, 10, 10, 0.95)';
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
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
    color: var(--text-primary);
  }
  .nav__link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

/* -----------------------------------------
  Loading Animation (Optional)
 ---------------------------------------- */

window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});