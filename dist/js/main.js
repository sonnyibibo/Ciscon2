/**
 * Main JavaScript file
 * Imports and initializes all modules
 */

// Import modules
import './modules/navigation.js';
import './modules/slider.js';
import Accordion from './modules/accordion.js';
import Router from './modules/router.js';
import Animations from './modules/animation.js';

// Global module instances
var router;
var animations;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  console.log('Ciscon website initialized');

  // Let AOS initialize from the layout.html script
  // It's already being initialized there

  // Initialize animations
  animations = new Animations();
  try {
    // Initialize router with error handling
    router = new Router({
      animationDuration: 300,
      onBeforePageLoad: function onBeforePageLoad(fromPath, toPath) {
        console.log("Navigating from ".concat(fromPath, " to ").concat(toPath));
        window.scrollTo(0, 0);
      },
      onAfterPageLoad: function onAfterPageLoad(path) {
        console.log("Loaded page: ".concat(path));
        initPageSpecificFunctionality();

        // Refresh animations
        animations.refresh();

        // Refresh AOS
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      }
    });
    console.log("Router initialized successfully");

    // Enable prefetching on hover for faster navigation
    router.enablePrefetchOnHover();

    // Prefetch common pages
    router.prefetchPages(['/', '/index.html', '/about.html', '/services.html', '/projects.html', '/contact.html']);
  } catch (error) {
    console.error("Error initializing router:", error);
    // Simple fallback for navigation if router fails
    document.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        // Let default navigation happen for links
        console.log("Using default browser navigation");
      });
    });
  }

  // Initialize counter 
  initCounter();

  // Initialize page-specific functionality
  initPageSpecificFunctionality();
});

/**
 * Initialize counter 
 */
function initCounter() {
  var counterElements = document.querySelectorAll('[data-count]');
  if (counterElements.length === 0) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var element = entry.target;
        var targetValue = parseInt(element.getAttribute('data-count'), 10);
        if (!isNaN(targetValue)) {
          animateCounter(element, targetValue);
        }
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.2
  });
  counterElements.forEach(function (element) {
    observer.observe(element);
  });
}

/**
 * Animate a counter from 0 to target value
 * @param {HTMLElement} element - The element to animate
 * @param {number} targetValue - The target number to count to
 */
function animateCounter(element, targetValue) {
  var duration = 2000; // ms
  var startTime = performance.now();
  var startValue = 0;
  var _updateCounter = function updateCounter(currentTime) {
    var elapsedTime = currentTime - startTime;
    var progress = Math.min(elapsedTime / duration, 1);
    var easedProgress = 1 - Math.pow(2, -10 * progress); // easeOutExpo
    var currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);
    element.textContent = currentValue.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(_updateCounter);
    } else {
      element.textContent = targetValue.toLocaleString();
    }
  };
  requestAnimationFrame(_updateCounter);
}

// Store accordion instances to prevent memory leaks
var accordionInstances = [];

/**
 * Initialize page-specific functionality
 * This function will be called on initial page load and after each navigation
 */
function initPageSpecificFunctionality() {
  // Clear any existing accordion instances to prevent memory leaks
  accordionInstances.forEach(function (instance) {
    if (typeof instance.destroy === 'function') {
      instance.destroy();
    }
  });
  accordionInstances = [];

  // Initialize accordions
  var accordionContainers = document.querySelectorAll('.accordion');
  if (accordionContainers.length > 0) {
    accordionContainers.forEach(function (container, index) {
      var accordionId = container.id || "accordion-".concat(index);
      var accordion = new Accordion("#".concat(accordionId));
      accordionInstances.push(accordion);
    });
  }

  // Project filtering
  var filterButtons = document.querySelectorAll('.projects-filter button, .home-projects-filter button');
  if (filterButtons.length > 0) {
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
          return btn.classList.remove('active');
        });

        // Add active class to clicked button
        this.classList.add('active');

        // Get filter value
        var filterValue = this.getAttribute('data-filter');

        // Get the appropriate project items based on what's on the page
        var projectItems = document.querySelectorAll('.project-item, .project-card');
        projectItems.forEach(function (item) {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Form validation
  var forms = document.querySelectorAll('form');
  if (forms.length > 0) {
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simple validation
        var isValid = true;
        var requiredFields = this.querySelectorAll('[required]');
        requiredFields.forEach(function (field) {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });
        if (isValid) {
          // Show success message (in a real implementation, you would submit the form to your backend)
          alert('Thank you for your message! We will get back to you soon.');
          this.reset();
        } else {
          alert('Please fill in all required fields.');
        }
      });
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Video play buttons
  var videoPlayButtons = document.querySelectorAll('.video-play-button, .home-why-us-video-play');
  if (videoPlayButtons.length > 0) {
    videoPlayButtons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        alert('Video player would open here in the production version.');
      });
    });
  }

  // Initialize testimonial sliders
  initTestimonialSliders();
}

/**
 * Initialize testimonial sliders
 */
function initTestimonialSliders() {
  var sliders = document.querySelectorAll('.testimonial-slider, .home-testimonials-slider');
  sliders.forEach(function (slider) {
    var wrapper = slider.querySelector('.slider-wrapper, .home-testimonials-slider-wrapper');
    var slides = slider.querySelectorAll('.slider-slide, .home-testimonials-slider-slide');
    var dots = slider.querySelectorAll('.slider-dots button, .home-testimonials-slider-dots button');
    var prevButton = slider.querySelector('.slider-arrow-prev, .home-testimonials-slider-arrow:first-child');
    var nextButton = slider.querySelector('.slider-arrow-next, .home-testimonials-slider-arrow:last-child');
    if (!wrapper || slides.length === 0) return;
    var currentSlide = 0;

    // Function to go to a specific slide
    var goToSlide = function goToSlide(index) {
      // Wrap around if index is out of bounds
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      // Update current slide
      currentSlide = index;

      // Update wrapper position
      wrapper.style.transform = "translateX(-".concat(currentSlide * 100, "%)");

      // Update active dot
      if (dots.length > 0) {
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
    };

    // Set up dot navigation
    if (dots.length > 0) {
      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
          return goToSlide(i);
        });
      });
    }

    // Set up arrow navigation
    if (prevButton) {
      prevButton.addEventListener('click', function () {
        return goToSlide(currentSlide - 1);
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', function () {
        return goToSlide(currentSlide + 1);
      });
    }

    // Initialize by going to the first slide
    goToSlide(0);
  });
}
//# sourceMappingURL=main.js.map
