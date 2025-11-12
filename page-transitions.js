// Page Transition System - Fun & Smooth Transitions
(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Get all internal links
    const internalLinks = document.querySelectorAll('a[href$=".html"]:not([href^="http"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    // Add click handlers to all internal links
    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's the same page, external link, or anchor
        if (!href || href.includes('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          return;
        }
        
        // Skip if it's a button that triggers a function
        if (this.onclick || this.getAttribute('onclick')) {
          return;
        }
        
        // Skip logout buttons and form submissions
        const linkText = this.textContent.toLowerCase().trim();
        if (this.closest('form') || linkText === 'logout' || this.classList.contains('btn-danger')) {
          return;
        }
        
        // Skip if it's a button element
        if (this.tagName === 'BUTTON') {
          return;
        }
        
        e.preventDefault();
        
        // Add transition class to body
        document.body.classList.add('page-transitioning');
        
        // Wait for fade out animation
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    });
    
    // Handle page load - add entrance animation
    addPageEntrance();
    
    // Handle browser back/forward buttons
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        addPageEntrance();
      }
    });
  }

  function addPageEntrance() {
    // Random entrance animation for variety
    const entranceTypes = [
      { type: 'fade', transform: 'translateY(0)' },
      { type: 'slide-right', transform: 'translateX(0)' },
      { type: 'slide-left', transform: 'translateX(0)' },
      { type: 'scale', transform: 'scale(1)' },
      { type: 'fade-up', transform: 'translateY(0)' }
    ];
    
    const entrance = entranceTypes[Math.floor(Math.random() * entranceTypes.length)];
    
    // Set initial state
    document.body.style.opacity = '0';
    
    switch(entrance.type) {
      case 'slide-right':
        document.body.style.transform = 'translateX(20px)';
        break;
      case 'slide-left':
        document.body.style.transform = 'translateX(-20px)';
        break;
      case 'scale':
        document.body.style.transform = 'scale(0.98)';
        break;
      case 'fade-up':
        document.body.style.transform = 'translateY(15px)';
        break;
      default:
        document.body.style.transform = 'translateY(10px)';
    }
    
    // Animate in
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      document.body.style.opacity = '1';
      document.body.style.transform = entrance.transform;
    }, 50);
  }
})();

