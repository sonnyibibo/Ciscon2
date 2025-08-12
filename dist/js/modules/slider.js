function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Slider Module
 * Handles the functionality for sliders/carousels
 */
var Slider = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {string} selector - The slider container selector
   * @param {Object} options - The options for the slider
   */
  function Slider(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Slider);
    // Default options
    this.defaults = {
      slideSelector: '.slider-slide',
      dotsSelector: '.slider-dots',
      arrowsSelector: '.slider-arrows',
      prevArrowSelector: '.slider-arrow-prev',
      nextArrowSelector: '.slider-arrow-next',
      autoplay: false,
      autoplaySpeed: 5000,
      fade: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [],
      onInit: null,
      onBeforeChange: null,
      onAfterChange: null
    };

    // Merge options with defaults
    this.options = _objectSpread(_objectSpread({}, this.defaults), options);

    // Find slider elements
    this.slider = document.querySelector(selector);

    // If slider doesn't exist, exit
    if (!this.slider) return;

    // Find slider elements
    this.sliderWrapper = this.slider.querySelector('.slider-wrapper');
    this.slides = this.slider.querySelectorAll(this.options.slideSelector);
    this.dotsContainer = this.slider.querySelector(this.options.dotsSelector);
    this.arrowsContainer = this.slider.querySelector(this.options.arrowsSelector);
    this.prevArrow = this.slider.querySelector(this.options.prevArrowSelector);
    this.nextArrow = this.slider.querySelector(this.options.nextArrowSelector);

    // State
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.autoplayTimer = null;
    this.dots = [];
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.xDiff = 0;

    // Bind methods
    this.goToSlide = this.goToSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.startAutoplay = this.startAutoplay.bind(this);
    this.stopAutoplay = this.stopAutoplay.bind(this);
    this.createDots = this.createDots.bind(this);
    this.updateDots = this.updateDots.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleResize = this.handleResize.bind(this);

    // Initialize
    this.init();
  }

  /**
   * Initialize the slider
   */
  return _createClass(Slider, [{
    key: "init",
    value: function init() {
      // If only one slide, exit
      if (this.slideCount <= 1) return;

      // Add active class to first slide
      this.slides[0].classList.add('active');

      // Create dots
      if (this.dotsContainer) {
        this.createDots();
      }

      // Add event listeners for arrows
      if (this.prevArrow) {
        this.prevArrow.addEventListener('click', this.prevSlide);
      }
      if (this.nextArrow) {
        this.nextArrow.addEventListener('click', this.nextSlide);
      }

      // Set up touch/mouse events for swiping
      this.slider.addEventListener('mousedown', this.handleDragStart);
      this.slider.addEventListener('touchstart', this.handleDragStart, {
        passive: true
      });
      this.slider.addEventListener('mousemove', this.handleDragMove);
      this.slider.addEventListener('touchmove', this.handleDragMove, {
        passive: true
      });
      this.slider.addEventListener('mouseup', this.handleDragEnd);
      this.slider.addEventListener('touchend', this.handleDragEnd);
      this.slider.addEventListener('mouseleave', this.handleDragEnd);

      // Start autoplay if enabled
      if (this.options.autoplay) {
        this.startAutoplay();

        // Pause autoplay on hover
        this.slider.addEventListener('mouseenter', this.stopAutoplay);
        this.slider.addEventListener('mouseleave', this.startAutoplay);
      }

      // Handle window resize
      window.addEventListener('resize', this.handleResize);

      // Call onInit callback if provided
      if (typeof this.options.onInit === 'function') {
        this.options.onInit(this);
      }
    }

    /**
     * Go to a specific slide
     * @param {number} index - The index of the slide to go to
     */
  }, {
    key: "goToSlide",
    value: function goToSlide(index) {
      // If slide index is out of bounds
      if (index < 0) {
        index = this.options.infinite ? this.slideCount - 1 : 0;
      } else if (index >= this.slideCount) {
        index = this.options.infinite ? 0 : this.slideCount - 1;
      }

      // Call onBeforeChange callback if provided
      if (typeof this.options.onBeforeChange === 'function') {
        this.options.onBeforeChange(this.currentSlide, index);
      }

      // If using fade effect
      if (this.options.fade) {
        // Remove active class from current slide
        this.slides[this.currentSlide].classList.remove('active');

        // Add active class to new slide
        this.slides[index].classList.add('active');
      } else if (this.sliderWrapper) {
        // Calculate the translation value
        var translateX = -index * 100;

        // Apply translation
        this.sliderWrapper.style.transform = "translateX(".concat(translateX, "%)");

        // Update active classes
        this.slides.forEach(function (slide, i) {
          if (i === index) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
      }

      // Update current slide
      this.currentSlide = index;

      // Update dots
      this.updateDots();

      // Call onAfterChange callback if provided
      if (typeof this.options.onAfterChange === 'function') {
        this.options.onAfterChange(this.currentSlide);
      }
    }

    /**
     * Go to the next slide
     */
  }, {
    key: "nextSlide",
    value: function nextSlide() {
      this.goToSlide(this.currentSlide + 1);
    }

    /**
     * Go to the previous slide
     */
  }, {
    key: "prevSlide",
    value: function prevSlide() {
      this.goToSlide(this.currentSlide - 1);
    }

    /**
     * Start autoplay
     */
  }, {
    key: "startAutoplay",
    value: function startAutoplay() {
      var _this = this;
      this.autoplayTimer = setInterval(function () {
        _this.nextSlide();
      }, this.options.autoplaySpeed);
    }

    /**
     * Stop autoplay
     */
  }, {
    key: "stopAutoplay",
    value: function stopAutoplay() {
      clearInterval(this.autoplayTimer);
    }

    /**
     * Create dots for navigation
     */
  }, {
    key: "createDots",
    value: function createDots() {
      var _this2 = this;
      // Clear existing dots
      this.dotsContainer.innerHTML = '';

      // Create new dots
      var _loop = function _loop(i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', "Go to slide ".concat(i + 1));
        if (i === 0) {
          dot.classList.add('active');
        }

        // Add click event
        dot.addEventListener('click', function () {
          _this2.goToSlide(i);
        });

        // Add to container
        _this2.dotsContainer.appendChild(dot);

        // Store for later access
        _this2.dots.push(dot);
      };
      for (var i = 0; i < this.slideCount; i++) {
        _loop(i);
      }
    }

    /**
     * Update dots based on current slide
     */
  }, {
    key: "updateDots",
    value: function updateDots() {
      var _this3 = this;
      if (!this.dots.length) return;
      this.dots.forEach(function (dot, i) {
        if (i === _this3.currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    /**
     * Handle the start of a drag/swipe
     * @param {Event} e - The event object
     */
  }, {
    key: "handleDragStart",
    value: function handleDragStart(e) {
      this.isDragging = true;
      this.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      this.currentX = this.startX;

      // Stop autoplay during drag
      if (this.options.autoplay) {
        this.stopAutoplay();
      }
    }

    /**
     * Handle drag/swipe movement
     * @param {Event} e - The event object
     */
  }, {
    key: "handleDragMove",
    value: function handleDragMove(e) {
      if (!this.isDragging) return;
      this.currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      this.xDiff = this.currentX - this.startX;

      // If using transform instead of fade, apply drag effect
      if (!this.options.fade && this.sliderWrapper) {
        var translateX = -this.currentSlide * 100 + this.xDiff / this.slider.offsetWidth * 100;
        this.sliderWrapper.style.transform = "translateX(".concat(translateX, "%)");
      }
    }

    /**
     * Handle the end of a drag/swipe
     */
  }, {
    key: "handleDragEnd",
    value: function handleDragEnd() {
      if (!this.isDragging) return;
      this.isDragging = false;

      // Determine if we should move to the next or previous slide
      if (Math.abs(this.xDiff) > 50) {
        if (this.xDiff > 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      } else {
        // Go back to current slide
        this.goToSlide(this.currentSlide);
      }

      // Restart autoplay
      if (this.options.autoplay) {
        this.startAutoplay();
      }
    }

    /**
     * Handle window resize
     */
  }, {
    key: "handleResize",
    value: function handleResize() {
      // Recalculate slider dimensions
      this.goToSlide(this.currentSlide);

      // Check responsive options
      if (this.options.responsive && this.options.responsive.length) {
        // Current window width
        var windowWidth = window.innerWidth;

        // Find the matching breakpoint
        var matchedBreakpoint = null;
        for (var i = 0; i < this.options.responsive.length; i++) {
          var breakpoint = this.options.responsive[i];
          if (windowWidth <= breakpoint.breakpoint) {
            matchedBreakpoint = breakpoint;
          }
        }

        // Apply responsive settings if matched
        if (matchedBreakpoint) {
          this.options = _objectSpread(_objectSpread({}, this.options), matchedBreakpoint.settings);
        }
      }
    }

    /**
     * Destroy the slider
     */
  }, {
    key: "destroy",
    value: function destroy() {
      // Remove event listeners
      if (this.prevArrow) {
        this.prevArrow.removeEventListener('click', this.prevSlide);
      }
      if (this.nextArrow) {
        this.nextArrow.removeEventListener('click', this.nextSlide);
      }
      this.slider.removeEventListener('mousedown', this.handleDragStart);
      this.slider.removeEventListener('touchstart', this.handleDragStart);
      this.slider.removeEventListener('mousemove', this.handleDragMove);
      this.slider.removeEventListener('touchmove', this.handleDragMove);
      this.slider.removeEventListener('mouseup', this.handleDragEnd);
      this.slider.removeEventListener('touchend', this.handleDragEnd);
      this.slider.removeEventListener('mouseleave', this.handleDragEnd);
      if (this.options.autoplay) {
        this.slider.removeEventListener('mouseenter', this.stopAutoplay);
        this.slider.removeEventListener('mouseleave', this.startAutoplay);
        this.stopAutoplay();
      }
      window.removeEventListener('resize', this.handleResize);

      // Reset slides
      this.slides.forEach(function (slide) {
        slide.classList.remove('active');
        slide.style.transform = '';
      });
      if (this.sliderWrapper) {
        this.sliderWrapper.style.transform = '';
      }

      // Clear dots
      if (this.dotsContainer) {
        this.dotsContainer.innerHTML = '';
      }
    }
  }]);
}(); // Initialize sliders
document.addEventListener('DOMContentLoaded', function () {
  // Hero slider
  var heroSlider = new Slider('.hero-slider', {
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true
  });

  // Testimonials slider
  var testimonialsSlider = new Slider('.home-testimonials-slider', {
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }]
  });

  // Projects slider (if exists)
  var projectsSlider = document.querySelector('.projects-slider');
  if (projectsSlider) {
    new Slider('.projects-slider', {
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  }
});
export default Slider;
//# sourceMappingURL=slider.js.map
