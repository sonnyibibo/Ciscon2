function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Navigation Module
 * Handles all navigation related functionality
 */
var Navigation = /*#__PURE__*/function () {
  function Navigation() {
    _classCallCheck(this, Navigation);
    // Elements
    this.header = document.querySelector('.site-header');
    this.nav = document.querySelector('.site-header-nav');
    this.toggle = document.querySelector('.site-header-toggle');
    this.body = document.body;

    // Bind methods
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.handleStickyHeader = this.handleStickyHeader.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.closeMenuOnClickOutside = this.closeMenuOnClickOutside.bind(this);
    this.handleDropdowns = this.handleDropdowns.bind(this);

    // Initialize
    this.init();
  }

  /**
   * Initialize the navigation functionality
   */
  return _createClass(Navigation, [{
    key: "init",
    value: function init() {
      if (this.toggle) {
        this.toggle.addEventListener('click', this.toggleMobileMenu);
      }

      // Sticky header functionality
      window.addEventListener('scroll', this.handleStickyHeader);

      // Handle window resize
      window.addEventListener('resize', this.handleResize);

      // Close menu when clicking outside
      document.addEventListener('click', this.closeMenuOnClickOutside);

      // Initialize dropdowns
      this.handleDropdowns();

      // Set active menu item based on current page
      this.setActiveMenuItem();
    }

    /**
     * Toggle mobile menu
     */
  }, {
    key: "toggleMobileMenu",
    value: function toggleMobileMenu() {
      if (this.toggle.classList.contains('active')) {
        this.toggle.classList.remove('active');
        this.nav.classList.remove('active');
        this.body.classList.remove('menu-open');
      } else {
        this.toggle.classList.add('active');
        this.nav.classList.add('active');
        this.body.classList.add('menu-open');
      }
    }

    /**
     * Handle sticky header on scroll
     */
  }, {
    key: "handleStickyHeader",
    value: function handleStickyHeader() {
      var scrollPosition = window.scrollY;
      if (this.header) {
        if (scrollPosition > 100) {
          this.header.classList.add('sticky');
          document.body.style.paddingTop = this.header.offsetHeight + 'px';
        } else {
          this.header.classList.remove('sticky');
          document.body.style.paddingTop = 0;
        }
      }

      // Handle transparent header
      if (this.header && this.header.classList.contains('navbar-transparent')) {
        if (scrollPosition > 50) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }
      }
    }

    /**
     * Handle window resize
     */
  }, {
    key: "handleResize",
    value: function handleResize() {
      // Reset mobile menu on window resize
      if (window.innerWidth >= 992 && this.nav && this.nav.classList.contains('active')) {
        this.toggle.classList.remove('active');
        this.nav.classList.remove('active');
        this.body.classList.remove('menu-open');
      }
    }

    /**
     * Close menu when clicking outside
     */
  }, {
    key: "closeMenuOnClickOutside",
    value: function closeMenuOnClickOutside(event) {
      if (this.nav && this.nav.classList.contains('active') && !this.nav.contains(event.target) && !this.toggle.contains(event.target)) {
        this.toggle.classList.remove('active');
        this.nav.classList.remove('active');
        this.body.classList.remove('menu-open');
      }
    }

    /**
     * Handle dropdowns
     */
  }, {
    key: "handleDropdowns",
    value: function handleDropdowns() {
      // Add accessibility attributes to dropdown triggers
      var dropdownItems = document.querySelectorAll('.has-dropdown > a');
      dropdownItems.forEach(function (item) {
        // Add aria attributes
        item.setAttribute('aria-expanded', 'false');
        item.setAttribute('aria-haspopup', 'true');

        // For mobile - prevent default on click to not navigate away when opening dropdown
        item.addEventListener('click', function (e) {
          if (window.innerWidth < 992) {
            e.preventDefault();
            var expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            var dropdown = this.nextElementSibling;
            if (dropdown) {
              dropdown.style.display = expanded ? 'none' : 'block';
            }
          }
        });
      });
    }

    /**
     * Set active menu item based on current page
     */
  }, {
    key: "setActiveMenuItem",
    value: function setActiveMenuItem() {
      var currentPath = window.location.pathname;
      var menuItems = document.querySelectorAll('.site-header-nav a');
      menuItems.forEach(function (item) {
        var href = item.getAttribute('href');

        // Handle home page
        if (currentPath === '/' && href === 'index.html') {
          item.classList.add('active');
          return;
        }

        // Handle other pages
        if (href && currentPath.includes(href) && href !== 'index.html') {
          item.classList.add('active');

          // If it's part of a dropdown, add active class to parent
          var parentLi = item.closest('li');
          if (parentLi && parentLi.parentElement.classList.contains('dropdown')) {
            var parentDropdown = parentLi.parentElement.previousElementSibling;
            if (parentDropdown) {
              parentDropdown.classList.add('active');
            }
          }
        }
      });
    }
  }]);
}(); // Initialize navigation
var navigation = new Navigation();
export default navigation;
//# sourceMappingURL=navigation.js.map
