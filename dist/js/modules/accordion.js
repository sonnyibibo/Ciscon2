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
 * Accordion Module
 * Handles the functionality for accordion/collapsible elements
 */
var Accordion = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {string} selector - The accordion container selector
   * @param {Object} options - The options for the accordion
   */
  function Accordion(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Accordion);
    // Default options
    this.defaults = {
      itemSelector: '.accordion-item',
      headerSelector: '.accordion-header',
      buttonSelector: '.accordion-button',
      contentSelector: '.accordion-collapse',
      activeClass: 'show',
      collapsedClass: 'collapsed',
      singleOpen: true,
      // Whether only one item can be open at a time
      onToggle: null // Callback function when an item is toggled
    };

    // Merge options with defaults
    this.options = _objectSpread(_objectSpread({}, this.defaults), options);

    // Find accordion element
    this.accordion = document.querySelector(selector);

    // If accordion doesn't exist, exit
    if (!this.accordion) return;

    // Find accordion items
    this.items = this.accordion.querySelectorAll(this.options.itemSelector);

    // Exit if no items
    if (!this.items.length) return;

    // Bind methods
    this.handleClick = this.handleClick.bind(this);

    // Initialize
    this.init();
  }

  /**
   * Initialize the accordion
   */
  return _createClass(Accordion, [{
    key: "init",
    value: function init() {
      var _this = this;
      // Add click event listeners to all buttons
      this.accordion.querySelectorAll(this.options.buttonSelector).forEach(function (button) {
        button.addEventListener('click', _this.handleClick);
      });
    }

    /**
     * Handle button click
     * @param {Event} e - The click event
     */
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var button = e.currentTarget;
      var isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Find the target content
      var targetId = button.getAttribute('data-bs-target') || button.getAttribute('href') || "#".concat(button.closest(this.options.headerSelector).id, "-collapse");
      var target = document.querySelector(targetId);
      if (!target) return;

      // If single open mode is enabled, close all other items
      if (this.options.singleOpen && !isExpanded) {
        this.closeAll(target);
      }

      // Toggle the clicked accordion item
      this.toggleItem(button, target, !isExpanded);

      // Call onToggle callback if provided
      if (typeof this.options.onToggle === 'function') {
        this.options.onToggle(button, target, !isExpanded);
      }
    }

    /**
     * Toggle an accordion item
     * @param {HTMLElement} button - The button element
     * @param {HTMLElement} content - The content element
     * @param {boolean} open - Whether to open or close the item
     */
  }, {
    key: "toggleItem",
    value: function toggleItem(button, content, open) {
      if (open) {
        // Open the item
        button.classList.remove(this.options.collapsedClass);
        button.setAttribute('aria-expanded', 'true');
        content.classList.add(this.options.activeClass);

        // Set explicit display for browsers without CSS transition support
        content.style.display = 'block';
      } else {
        // Close the item
        button.classList.add(this.options.collapsedClass);
        button.setAttribute('aria-expanded', 'false');
        content.classList.remove(this.options.activeClass);

        // Set explicit display for browsers without CSS transition support
        content.style.display = 'none';
      }
    }

    /**
     * Close all accordion items except the specified one
     * @param {HTMLElement} exceptContent - The content element to exclude
     */
  }, {
    key: "closeAll",
    value: function closeAll(exceptContent) {
      var _this2 = this;
      this.items.forEach(function (item) {
        var button = item.querySelector(_this2.options.buttonSelector);
        var content = item.querySelector(_this2.options.contentSelector);
        if (content && content !== exceptContent) {
          _this2.toggleItem(button, content, false);
        }
      });
    }

    /**
     * Open a specific accordion item by index
     * @param {number} index - The index of the item to open
     */
  }, {
    key: "openItem",
    value: function openItem(index) {
      if (index < 0 || index >= this.items.length) return;
      var item = this.items[index];
      var button = item.querySelector(this.options.buttonSelector);
      var content = item.querySelector(this.options.contentSelector);
      if (button && content) {
        // Close other items if single open mode is enabled
        if (this.options.singleOpen) {
          this.closeAll(content);
        }

        // Open the specified item
        this.toggleItem(button, content, true);
      }
    }

    /**
     * Refresh the accordion (useful after dynamic content changes)
     */
  }, {
    key: "refresh",
    value: function refresh() {
      var _this3 = this;
      // Remove existing event listeners
      this.accordion.querySelectorAll(this.options.buttonSelector).forEach(function (button) {
        button.removeEventListener('click', _this3.handleClick);
      });

      // Find accordion items again (in case they changed)
      this.items = this.accordion.querySelectorAll(this.options.itemSelector);

      // Reinitialize
      this.init();
    }

    /**
     * Destroy the accordion (remove event listeners)
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;
      this.accordion.querySelectorAll(this.options.buttonSelector).forEach(function (button) {
        button.removeEventListener('click', _this4.handleClick);
      });
    }
  }]);
}();
export default Accordion;
//# sourceMappingURL=accordion.js.map
