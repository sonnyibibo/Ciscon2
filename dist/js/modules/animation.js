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
 * Animations Module
 * Handles scroll animations and transitions
 */
var Animations = /*#__PURE__*/function () {
  function Animations() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Animations);
    // Default options
    this.options = _objectSpread({
      counterDuration: 2000,
      // Duration for counter animations in ms
      counterEasing: 'easeOutExpo'
    }, options);

    // Initialize
    this.init();
  }

  /**
   * Initialize animations
   */
  return _createClass(Animations, [{
    key: "init",
    value: function init() {
      // Initialize AOS if it's loaded
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 800,
          easing: 'ease-out-cubic',
          once: false,
          mirror: false,
          offset: 50,
          disable: 'mobile'
        });
      }

      // Initialize number counters
      this.initCounters();

      // Initialize other animations
      this.initMiscAnimations();
    }

    /**
     * Initialize counter animations
     */
  }, {
    key: "initCounters",
    value: function initCounters() {
      var _this = this;
      var counterElements = document.querySelectorAll('[data-count]');
      if (counterElements.length === 0) return;

      // Set up Intersection Observer to trigger counters when visible
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            _this.animateCounter(entry.target);

            // Unobserve after triggering
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2 // Trigger when at least 20% of the element is visible
      });

      // Observe all counter elements
      counterElements.forEach(function (element) {
        observer.observe(element);
      });
    }

    /**
     * Animate a counter element
     * @param {HTMLElement} element - The counter element to animate
     */
  }, {
    key: "animateCounter",
    value: function animateCounter(element) {
      var _this2 = this;
      var targetValue = parseInt(element.getAttribute('data-count'), 10);
      if (isNaN(targetValue)) return;
      var duration = this.options.counterDuration;
      var startTime = performance.now();
      var startValue = 0;

      // Animation frame function
      var _updateCounter = function updateCounter(currentTime) {
        var elapsedTime = currentTime - startTime;
        var progress = Math.min(elapsedTime / duration, 1);
        var easedProgress = _this2.easing(progress, _this2.options.counterEasing);
        var currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);

        // Update the element text
        element.textContent = _this2.formatNumber(currentValue);

        // Continue animation if not complete
        if (progress < 1) {
          requestAnimationFrame(_updateCounter);
        } else {
          // Ensure the final value is exactly the target value
          element.textContent = _this2.formatNumber(targetValue);
        }
      };

      // Start the animation
      requestAnimationFrame(_updateCounter);
    }

    /**
     * Format a number with commas for thousands
     * @param {number} number - The number to format
     * @returns {string} - The formatted number
     */
  }, {
    key: "formatNumber",
    value: function formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * Easing function calculator
     * @param {number} progress - Progress value between 0 and 1
     * @param {string} type - Type of easing function
     * @returns {number} - Eased progress value
     */
  }, {
    key: "easing",
    value: function easing(progress, type) {
      switch (type) {
        case 'linear':
          return progress;
        case 'easeInQuad':
          return progress * progress;
        case 'easeOutQuad':
          return progress * (2 - progress);
        case 'easeInOutQuad':
          return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        case 'easeOutExpo':
          return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        default:
          return progress;
      }
    }

    /**
     * Initialize miscellaneous animations
     */
  }, {
    key: "initMiscAnimations",
    value: function initMiscAnimations() {
      // Navbar scroll effect
      this.initNavbarScrollEffect();

      // Image hover effects
      this.initImageHoverEffects();
    }

    /**
     * Initialize navbar scroll effect
     */
  }, {
    key: "initNavbarScrollEffect",
    value: function initNavbarScrollEffect() {
      var navbar = document.querySelector('.site-header');
      if (!navbar) return;
      var handleScroll = function handleScroll() {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };

      // Initial check
      handleScroll();

      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
    }

    /**
     * Initialize image hover effects
     */
  }, {
    key: "initImageHoverEffects",
    value: function initImageHoverEffects() {
      var projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(function (card) {
        var image = card.querySelector('img');
        if (!image) return;

        // Add subtle zoom effect on hover
        card.addEventListener('mouseenter', function () {
          image.style.transform = 'scale(1.05)';
          image.style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseleave', function () {
          image.style.transform = 'scale(1)';
        });
      });
    }

    /**
     * Refresh animations, e.g., after dynamic content changes
     */
  }, {
    key: "refresh",
    value: function refresh() {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }

      // Re-initialize counters
      this.initCounters();
    }
  }]);
}(); // Export the class - make sure to export the class itself, not an instance
export default Animations;
//# sourceMappingURL=animation.js.map
