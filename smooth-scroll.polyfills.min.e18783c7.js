// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/smooth-scroll.polyfills.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! smooth-scroll v14.2.1 | (c) 2018 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
  var t,
      n = (this.document || this.ownerDocument).querySelectorAll(e),
      o = this;

  do {
    for (t = n.length; --t >= 0 && n.item(t) !== o;) {
      ;
    }
  } while (t < 0 && (o = o.parentElement));

  return o;
}), function () {
  function e(e, t) {
    t = t || {
      bubbles: !1,
      cancelable: !1,
      detail: void 0
    };
    var n = document.createEvent("CustomEvent");
    return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
  }

  if ("function" == typeof window.CustomEvent) return !1;
  e.prototype = window.Event.prototype, window.CustomEvent = e;
}(), function () {
  for (var e = 0, t = ["ms", "moz", "webkit", "o"], n = 0; n < t.length && !window.requestAnimationFrame; ++n) {
    window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
  }

  window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
    var o = new Date().getTime(),
        i = Math.max(0, 16 - (o - e)),
        r = window.setTimeout(function () {
      t(o + i);
    }, i);
    return e = o + i, r;
  }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
    clearTimeout(e);
  });
}(), function (e, t) {
  "function" == typeof define && define.amd ? define([], function () {
    return t(e);
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.SmoothScroll = t(e);
}("undefined" != typeof global ? global : "undefined" != typeof window ? window : this, function (e) {
  "use strict";

  var t = {
    ignore: "[data-scroll-ignore]",
    header: null,
    topOnEmptyHash: !0,
    speed: 500,
    clip: !0,
    offset: 0,
    easing: "easeInOutCubic",
    customEasing: null,
    updateURL: !0,
    popstate: !0,
    emitEvents: !0
  },
      n = function n() {
    return "querySelector" in document && "addEventListener" in e && "requestAnimationFrame" in e && "closest" in e.Element.prototype;
  },
      o = function o() {
    for (var e = {}, t = 0; t < arguments.length; t++) {
      !function (t) {
        for (var n in t) {
          t.hasOwnProperty(n) && (e[n] = t[n]);
        }
      }(arguments[t]);
    }

    return e;
  },
      i = function i(t) {
    return !!("matchMedia" in e && e.matchMedia("(prefers-reduced-motion)").matches);
  },
      r = function r(t) {
    return parseInt(e.getComputedStyle(t).height, 10);
  },
      a = function a(e) {
    var t;

    try {
      t = decodeURIComponent(e);
    } catch (n) {
      t = e;
    }

    return t;
  },
      u = function u(e) {
    "#" === e.charAt(0) && (e = e.substr(1));

    for (var t, n = String(e), o = n.length, i = -1, r = "", a = n.charCodeAt(0); ++i < o;) {
      if (0 === (t = n.charCodeAt(i))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
      t >= 1 && t <= 31 || 127 == t || 0 === i && t >= 48 && t <= 57 || 1 === i && t >= 48 && t <= 57 && 45 === a ? r += "\\" + t.toString(16) + " " : r += t >= 128 || 45 === t || 95 === t || t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 97 && t <= 122 ? n.charAt(i) : "\\" + n.charAt(i);
    }

    var u;

    try {
      u = decodeURIComponent("#" + r);
    } catch (e) {
      u = "#" + r;
    }

    return u;
  },
      c = function c(e, t) {
    var n;
    return "easeInQuad" === e.easing && (n = t * t), "easeOutQuad" === e.easing && (n = t * (2 - t)), "easeInOutQuad" === e.easing && (n = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1), "easeInCubic" === e.easing && (n = t * t * t), "easeOutCubic" === e.easing && (n = --t * t * t + 1), "easeInOutCubic" === e.easing && (n = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1), "easeInQuart" === e.easing && (n = t * t * t * t), "easeOutQuart" === e.easing && (n = 1 - --t * t * t * t), "easeInOutQuart" === e.easing && (n = t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t), "easeInQuint" === e.easing && (n = t * t * t * t * t), "easeOutQuint" === e.easing && (n = 1 + --t * t * t * t * t), "easeInOutQuint" === e.easing && (n = t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t), e.customEasing && (n = e.customEasing(t)), n || t;
  },
      s = function s() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  },
      l = function l(t, n, o, i) {
    var r = 0;
    if (t.offsetParent) do {
      r += t.offsetTop, t = t.offsetParent;
    } while (t);
    return r = Math.max(r - n - o, 0), i && (r = Math.min(r, s() - e.innerHeight)), r;
  },
      m = function m(e) {
    return e ? r(e) + e.offsetTop : 0;
  },
      d = function d(e, t, n) {
    t || history.pushState && n.updateURL && history.pushState({
      smoothScroll: JSON.stringify(n),
      anchor: e.id
    }, document.title, e === document.documentElement ? "#top" : "#" + e.id);
  },
      f = function f(t, n, o) {
    0 === t && document.body.focus(), o || (t.focus(), document.activeElement !== t && (t.setAttribute("tabindex", "-1"), t.focus(), t.style.outline = "none"), e.scrollTo(0, n));
  },
      h = function h(t, n, o, i) {
    if (n.emitEvents && "function" == typeof e.CustomEvent) {
      var r = new CustomEvent(t, {
        bubbles: !0,
        detail: {
          anchor: o,
          toggle: i
        }
      });
      document.dispatchEvent(r);
    }
  };

  return function (r, p) {
    var g,
        v,
        w,
        y,
        E,
        b,
        S,
        A = {};
    A.cancelScroll = function (e) {
      cancelAnimationFrame(S), S = null, e || h("scrollCancel", g);
    }, A.animateScroll = function (n, i, r) {
      var a = o(g || t, r || {}),
          u = "[object Number]" === Object.prototype.toString.call(n),
          p = u || !n.tagName ? null : n;

      if (u || p) {
        var v = e.pageYOffset;
        a.header && !y && (y = document.querySelector(a.header)), E || (E = m(y));

        var w,
            b,
            C,
            O = u ? n : l(p, E, parseInt("function" == typeof a.offset ? a.offset(n, i) : a.offset, 10), a.clip),
            I = O - v,
            q = s(),
            F = 0,
            L = function L(t, o) {
          var r = e.pageYOffset;
          if (t == o || r == o || (v < o && e.innerHeight + r) >= q) return A.cancelScroll(!0), f(n, o, u), h("scrollStop", a, n, i), w = null, S = null, !0;
        },
            H = function H(t) {
          w || (w = t), F += t - w, b = F / parseInt(a.speed, 10), b = b > 1 ? 1 : b, C = v + I * c(a, b), e.scrollTo(0, Math.floor(C)), L(C, O) || (S = e.requestAnimationFrame(H), w = t);
        };

        0 === e.pageYOffset && e.scrollTo(0, 0), d(n, u, a), h("scrollStart", a, n, i), A.cancelScroll(!0), e.requestAnimationFrame(H);
      }
    };

    var C = function C(t) {
      if (!i() && 0 === t.button && !t.metaKey && !t.ctrlKey && "closest" in t.target && (w = t.target.closest(r)) && "a" === w.tagName.toLowerCase() && !t.target.closest(g.ignore) && w.hostname === e.location.hostname && w.pathname === e.location.pathname && /#/.test(w.href)) {
        var n = u(a(w.hash)),
            o = g.topOnEmptyHash && "#" === n ? document.documentElement : document.querySelector(n);
        o = o || "#top" !== n ? o : document.documentElement, o && (t.preventDefault(), A.animateScroll(o, w));
      }
    },
        O = function O(e) {
      if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(g) && history.state.anchor) {
        var t = document.querySelector(u(a(history.state.anchor)));
        t && A.animateScroll(t, null, {
          updateURL: !1
        });
      }
    },
        I = function I(e) {
      b || (b = setTimeout(function () {
        b = null, E = m(y);
      }, 66));
    };

    return A.destroy = function () {
      g && (document.removeEventListener("click", C, !1), e.removeEventListener("resize", I, !1), e.removeEventListener("popstate", O, !1), A.cancelScroll(), g = null, v = null, w = null, y = null, E = null, b = null, S = null);
    }, A.init = function (i) {
      if (!n()) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
      A.destroy(), g = o(t, i || {}), y = g.header ? document.querySelector(g.header) : null, E = m(y), document.addEventListener("click", C, !1), y && e.addEventListener("resize", I, !1), g.updateURL && g.popstate && e.addEventListener("popstate", O, !1);
    }, A.init(p), A;
  };
});
},{}],"C:/Users/pelle/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63246" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/pelle/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/smooth-scroll.polyfills.min.js"], null)
//# sourceMappingURL=/smooth-scroll.polyfills.min.e18783c7.map