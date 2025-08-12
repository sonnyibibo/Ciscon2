function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Router Module
 * A lightweight client-side router using the History API
 * Provides SPA-like experience with smooth transitions between pages
 */
var Router = /*#__PURE__*/function () {
  function Router() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Router);
    // Default options
    this.options = _objectSpread({
      linkSelector: 'a:not([target="_blank"]):not([href^="http"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([data-no-route])',
      animationDuration: 300,
      loadingClass: 'page-loading',
      activeClass: 'active',
      pageCache: {},
      onBeforePageLoad: null,
      onAfterPageLoad: null
    }, options);

    // Under construction paths - without leading slash to match actual paths
    this.underConstructionPaths = ['sitemap.html', 'news.html', 'careers.html'];

    // DOM elements
    this.body = document.body;
    this.contentContainer = document.getElementById('main-content');
    if (!this.contentContainer) {
      console.error('Router: No content container with id "main-content" found.');
      return;
    }

    // State
    this.isTransitioning = false;
    this.currentPath = window.location.pathname;

    // If we're on the root, set the path to index.html
    if (this.currentPath === '/') {
      this.currentPath = 'index.html';
    } else if (this.currentPath.startsWith('/')) {
      // Remove leading slash if present
      this.currentPath = this.currentPath.substring(1);
    }

    // Initialize
    this.init();
  }

  /**
   * Initialize the router
   */
  return _createClass(Router, [{
    key: "init",
    value: function init() {
      // Listen for link clicks
      document.addEventListener('click', this.handleLinkClick.bind(this));

      // Listen for popstate events (browser back/forward)
      window.addEventListener('popstate', this.handlePopState.bind(this));

      // Cache the initial page
      this.cacheCurrentPage();

      // Set active links for current page
      this.updateActiveLinks();

      // Check if current page is under construction
      this.checkUnderConstruction(this.currentPath);
    }

    /**
     * Handle link clicks
     * @param {Event} e - Click event
     */
  }, {
    key: "handleLinkClick",
    value: function handleLinkClick(e) {
      // Find if the clicked element is a link or within a link
      var link = e.target.closest(this.options.linkSelector);
      if (!link) return;

      // Don't handle if modifier keys are pressed
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // Get the URL from the link
      var href = link.getAttribute('href');

      // Skip if this is a hash link on the current page
      if (href.startsWith('#') || href === '') return;

      // Only handle relative URLs
      if (href.startsWith('http') || href.startsWith('//')) return;

      // Prevent default link behavior
      e.preventDefault();

      // Navigate to the new page
      this.navigateTo(href);
    }

    /**
     * Handle browser back/forward navigation
     * @param {Event} e - Popstate event
     */
  }, {
    key: "handlePopState",
    value: function handlePopState(e) {
      if (e.state && e.state.path) {
        this.navigateTo(e.state.path, false);
      }
    }

    /**
     * Check if path should redirect to under construction
     * @param {string} path - The path to check
     * @returns {boolean} - True if path is under construction
     */
  }, {
    key: "isUnderConstruction",
    value: function isUnderConstruction(path) {
      // Remove leading slash if present for comparison
      var normalizedPath = path.startsWith('/') ? path.substring(1) : path;
      return this.underConstructionPaths.includes(normalizedPath);
    }

    /**
     * Check and redirect to under construction if needed
     * @param {string} path - The path to check
     */
  }, {
    key: "checkUnderConstruction",
    value: function checkUnderConstruction(path) {
      if (this.isUnderConstruction(path) && path !== 'under-construction.html') {
        console.log("Path ".concat(path, " is under construction, redirecting..."));
        this.navigateTo('under-construction.html');
        return true;
      }
      return false;
    }

    /**
    * Resolve a relative path based on the current page path
    * @param {string} path - The path to resolve
    * @returns {string} - The resolved path
    */
  }, {
    key: "resolvePath",
    value: function resolvePath(path) {
      // If the path already starts with a slash, convert to relative (for consistency)
      if (path.startsWith('/')) {
        return './' + path.substring(1);
      }

      // If it starts with ./ or ../, it's base-relative
      if (path.startsWith('./')) {
        // If we're in a subdirectory
        if (this.currentPath.includes('/')) {
          // Get the subdirectory depth
          var depth = this.currentPath.split('/').length - 1;

          // Add ../ prefix for each level deep we are
          var prefix = '';
          for (var i = 0; i < depth; i++) {
            prefix += '../';
          }
          return prefix + path.substring(2);
        }
        return path;
      }

      // Otherwise, resolve relative to current path
      var currentDir = this.currentPath.includes('/') ? this.currentPath.substring(0, this.currentPath.lastIndexOf('/') + 1) : '';
      return currentDir + path;
    }

    /**
     * Navigate to a new page
     * @param {string} path - The path to navigate to
     * @param {boolean} pushState - Whether to push a new browser history state
     */
  }, {
    key: "navigateTo",
    value: (function () {
      var _navigateTo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(path) {
        var _this = this;
        var pushState,
          pageContent,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              pushState = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
              path = this.resolvePath(path);

              // Check if path is under construction and redirect if needed
              if (!this.checkUnderConstruction(path)) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return");
            case 4:
              if (!(this.currentPath === path)) {
                _context2.next = 6;
                break;
              }
              return _context2.abrupt("return");
            case 6:
              if (!this.isTransitioning) {
                _context2.next = 8;
                break;
              }
              return _context2.abrupt("return");
            case 8:
              // Set transitioning flag
              this.isTransitioning = true;

              // Add loading class to body
              this.body.classList.add(this.options.loadingClass);

              // Call the before load callback if provided
              if (typeof this.options.onBeforePageLoad === 'function') {
                this.options.onBeforePageLoad(this.currentPath, path);
              }
              _context2.prev = 11;
              _context2.next = 14;
              return this.getPage(path);
            case 14:
              pageContent = _context2.sent;
              // Fade out current content
              this.fadeOut(this.contentContainer, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      // Update the content container with new content
                      _this.updateContent(pageContent);

                      // Update the browser history
                      if (pushState) {
                        window.history.pushState({
                          path: path
                        }, '', path);
                      }

                      // Update the current path
                      _this.currentPath = path;

                      // Update active links
                      _this.updateActiveLinks();

                      // Fade in new content
                      _this.fadeIn(_this.contentContainer, function () {
                        // Reset transitioning flag
                        _this.isTransitioning = false;

                        // Remove loading class from body
                        _this.body.classList.remove(_this.options.loadingClass);

                        // Call the after load callback if provided
                        if (typeof _this.options.onAfterPageLoad === 'function') {
                          _this.options.onAfterPageLoad(path);
                        }
                      });
                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              })));
              _context2.next = 22;
              break;
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](11);
              console.error('Router: Navigation error:', _context2.t0);

              // Fallback to traditional navigation on error
              window.location.href = path;
            case 22:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[11, 18]]);
      }));
      function navigateTo(_x) {
        return _navigateTo.apply(this, arguments);
      }
      return navigateTo;
    }()
    /**
     * Get page content, either from cache or by fetching it
     * @param {string} path - The path to get
     * @returns {Promise<string>} - The page content
     */
    )
  }, {
    key: "getPage",
    value: (function () {
      var _getPage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(path) {
        var response, html, parser, doc, content, _response, _html, _parser, _doc, _content;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.options.pageCache[path]) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return", this.options.pageCache[path]);
            case 2:
              if (!(path === 'under-construction.html')) {
                _context3.next = 24;
                break;
              }
              _context3.prev = 3;
              _context3.next = 6;
              return fetch(path);
            case 6:
              response = _context3.sent;
              if (response.ok) {
                _context3.next = 10;
                break;
              }
              // If under-construction.html doesn't exist, check if we're in development mode
              console.warn('Under construction page not found, redirecting to index.html');
              return _context3.abrupt("return", this.getPage('index.html'));
            case 10:
              _context3.next = 12;
              return response.text();
            case 12:
              html = _context3.sent;
              // Extract the content container from the fetched HTML
              parser = new DOMParser();
              doc = parser.parseFromString(html, 'text/html');
              content = doc.getElementById('main-content').innerHTML; // Cache the content
              this.options.pageCache[path] = content;
              return _context3.abrupt("return", content);
            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](3);
              console.error('Router: Unable to fetch under construction page:', _context3.t0);
              return _context3.abrupt("return", this.getPage('index.html'));
            case 24:
              _context3.prev = 24;
              _context3.next = 27;
              return fetch(path);
            case 27:
              _response = _context3.sent;
              if (_response.ok) {
                _context3.next = 30;
                break;
              }
              throw new Error("Failed to fetch page: ".concat(_response.status, " ").concat(_response.statusText));
            case 30:
              _context3.next = 32;
              return _response.text();
            case 32:
              _html = _context3.sent;
              // Extract the content container from the fetched HTML
              _parser = new DOMParser();
              _doc = _parser.parseFromString(_html, 'text/html');
              _content = _doc.getElementById('main-content').innerHTML; // Cache the content
              this.options.pageCache[path] = _content;
              return _context3.abrupt("return", _content);
            case 40:
              _context3.prev = 40;
              _context3.t1 = _context3["catch"](24);
              console.error('Router: Fetch error:', _context3.t1);
              throw _context3.t1;
            case 44:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[3, 20], [24, 40]]);
      }));
      function getPage(_x2) {
        return _getPage.apply(this, arguments);
      }
      return getPage;
    }()
    /**
     * Update the content container with new content
     * @param {string} content - The new content
     */
    )
  }, {
    key: "updateContent",
    value: function updateContent(content) {
      // Update the content container
      this.contentContainer.innerHTML = content;

      // Run scripts in the new content
      this.executeScripts(this.contentContainer);
    }

    /**
     * Execute scripts in the new content
     * @param {HTMLElement} container - The content container
     */
  }, {
    key: "executeScripts",
    value: function executeScripts(container) {
      // Find all script tags in the new content
      var scripts = container.querySelectorAll('script');
      scripts.forEach(function (oldScript) {
        var newScript = document.createElement('script');

        // Copy all attributes
        Array.from(oldScript.attributes).forEach(function (attr) {
          newScript.setAttribute(attr.name, attr.value);
        });

        // Copy the script content
        newScript.textContent = oldScript.textContent;

        // Replace the old script with the new one
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    }

    /**
     * Update active links based on current path
     */
  }, {
    key: "updateActiveLinks",
    value: function updateActiveLinks() {
      var _this2 = this;
      // Remove active class from all links
      document.querySelectorAll(this.options.linkSelector).forEach(function (link) {
        link.classList.remove(_this2.options.activeClass);
      });

      // Add active class to links matching the current path
      document.querySelectorAll("".concat(this.options.linkSelector, "[href=\"").concat(this.currentPath, "\"]")).forEach(function (link) {
        link.classList.add(_this2.options.activeClass);
      });
    }

    /**
     * Cache the current page
     */
  }, {
    key: "cacheCurrentPage",
    value: function cacheCurrentPage() {
      // Get the current content
      var content = this.contentContainer.innerHTML;

      // Cache it
      this.options.pageCache[this.currentPath] = content;
    }

    /**
     * Fade out an element
     * @param {HTMLElement} element - The element to fade out
     * @param {Function} callback - Callback to run after fade out
     */
  }, {
    key: "fadeOut",
    value: function fadeOut(element, callback) {
      element.style.opacity = '1';

      // Trigger a reflow to ensure the initial opacity is applied
      void element.offsetWidth;
      element.style.transition = "opacity ".concat(this.options.animationDuration, "ms ease");
      element.style.opacity = '0';
      setTimeout(function () {
        if (typeof callback === 'function') {
          callback();
        }
      }, this.options.animationDuration);
    }

    /**
     * Fade in an element
     * @param {HTMLElement} element - The element to fade in
     * @param {Function} callback - Callback to run after fade in
     */
  }, {
    key: "fadeIn",
    value: function fadeIn(element, callback) {
      element.style.opacity = '0';

      // Trigger a reflow to ensure the initial opacity is applied
      void element.offsetWidth;
      element.style.transition = "opacity ".concat(this.options.animationDuration, "ms ease");
      element.style.opacity = '1';
      setTimeout(function () {
        if (typeof callback === 'function') {
          callback();
        }
      }, this.options.animationDuration);
    }

    /**
     * Prefetch pages for faster navigation
     * @param {string[]} paths - Array of paths to prefetch
     */
  }, {
    key: "prefetchPages",
    value: function prefetchPages(paths) {
      var _this3 = this;
      if (!Array.isArray(paths)) return;
      paths.forEach(function (path) {
        // Only prefetch if not already in cache and not under construction
        if (!_this3.options.pageCache[path] && !_this3.isUnderConstruction(path)) {
          // Use a low-priority fetch to not impact current page performance
          var prefetchPromise = fetch(path, {
            priority: 'low'
          }).then(function (response) {
            return response.text();
          }).then(function (html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var content = doc.getElementById('main-content').innerHTML;

            // Cache the content
            _this3.options.pageCache[path] = content;
          })["catch"](function (error) {
            console.warn("Router: Failed to prefetch ".concat(path, ":"), error);
          });
        }
      });
    }

    /**
     * Prefetch pages on link hover for instant navigation
     */
  }, {
    key: "enablePrefetchOnHover",
    value: function enablePrefetchOnHover() {
      var _this4 = this;
      document.addEventListener('mouseover', function (e) {
        var link = e.target.closest(_this4.options.linkSelector);
        if (!link) return;
        var href = link.getAttribute('href');

        // Skip if this is a hash link, external link, etc.
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:') || _this4.isUnderConstruction(href)) {
          return;
        }

        // Prefetch this page if not already in cache
        if (!_this4.options.pageCache[href]) {
          _this4.prefetchPages([href]);
        }
      });
    }
  }]);
}();
export default Router;
//# sourceMappingURL=router.js.map
