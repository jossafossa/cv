(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const c of s.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && r(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const s = {};
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const s = n(o);
    fetch(o.href, s);
  }
})();
function Lc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
function Ic(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.keys(t).forEach(function (r) {
      var o = Object.getOwnPropertyDescriptor(t, r);
      Object.defineProperty(
        n,
        r,
        o.get
          ? o
          : {
              enumerable: !0,
              get: function () {
                return t[r];
              },
            }
      );
    }),
    n
  );
}
var gs = { exports: {} };
(function (t) {
  (function (e, n) {
    var r = n(e, e.document, Date);
    (e.lazySizes = r), t.exports && (t.exports = r);
  })(typeof window < "u" ? window : {}, function (n, r, o) {
    var s, c;
    if (
      ((function () {
        var T,
          P = {
            lazyClass: "lazyload",
            loadedClass: "lazyloaded",
            loadingClass: "lazyloading",
            preloadClass: "lazypreload",
            errorClass: "lazyerror",
            autosizesClass: "lazyautosizes",
            fastLoadedClass: "ls-is-cached",
            iframeLoadMode: 0,
            srcAttr: "data-src",
            srcsetAttr: "data-srcset",
            sizesAttr: "data-sizes",
            minSize: 40,
            customMedia: {},
            init: !0,
            expFactor: 1.5,
            hFac: 0.8,
            loadMode: 2,
            loadHidden: !0,
            ricTimeout: 0,
            throttleDelay: 125,
          };
        c = n.lazySizesConfig || n.lazysizesConfig || {};
        for (T in P) T in c || (c[T] = P[T]);
      })(),
      !r || !r.getElementsByClassName)
    )
      return { init: function () {}, cfg: c, noSupport: !0 };
    var i = r.documentElement,
      l = n.HTMLPictureElement,
      a = "addEventListener",
      u = "getAttribute",
      f = n[a].bind(n),
      h = n.setTimeout,
      d = n.requestAnimationFrame || h,
      _ = n.requestIdleCallback,
      b = /^picture$/i,
      C = ["load", "error", "lazyincluded", "_lazyloaded"],
      E = {},
      w = Array.prototype.forEach,
      A = function (T, P) {
        return (
          E[P] || (E[P] = new RegExp("(\\s|^)" + P + "(\\s|$)")),
          E[P].test(T[u]("class") || "") && E[P]
        );
      },
      I = function (T, P) {
        A(T, P) ||
          T.setAttribute("class", (T[u]("class") || "").trim() + " " + P);
      },
      B = function (T, P) {
        var W;
        (W = A(T, P)) &&
          T.setAttribute("class", (T[u]("class") || "").replace(W, " "));
      },
      k = function (T, P, W) {
        var ue = W ? a : "removeEventListener";
        W && k(T, P),
          C.forEach(function (re) {
            T[ue](re, P);
          });
      },
      U = function (T, P, W, ue, re) {
        var te = r.createEvent("Event");
        return (
          W || (W = {}),
          (W.instance = s),
          te.initEvent(P, !ue, !re),
          (te.detail = W),
          T.dispatchEvent(te),
          te
        );
      },
      X = function (T, P) {
        var W;
        !l && (W = n.picturefill || c.pf)
          ? (P && P.src && !T[u]("srcset") && T.setAttribute("srcset", P.src),
            W({ reevaluate: !0, elements: [T] }))
          : P && P.src && (T.src = P.src);
      },
      Ee = function (T, P) {
        return (getComputedStyle(T, null) || {})[P];
      },
      G = function (T, P, W) {
        for (W = W || T.offsetWidth; W < c.minSize && P && !T._lazysizesWidth; )
          (W = P.offsetWidth), (P = P.parentNode);
        return W;
      },
      ee = (function () {
        var T,
          P,
          W = [],
          ue = [],
          re = W,
          te = function () {
            var pe = re;
            for (re = W.length ? ue : W, T = !0, P = !1; pe.length; )
              pe.shift()();
            T = !1;
          },
          ve = function (pe, oe) {
            T && !oe
              ? pe.apply(this, arguments)
              : (re.push(pe), P || ((P = !0), (r.hidden ? h : d)(te)));
          };
        return (ve._lsFlush = te), ve;
      })(),
      qe = function (T, P) {
        return P
          ? function () {
              ee(T);
            }
          : function () {
              var W = this,
                ue = arguments;
              ee(function () {
                T.apply(W, ue);
              });
            };
      },
      Me = function (T) {
        var P,
          W = 0,
          ue = c.throttleDelay,
          re = c.ricTimeout,
          te = function () {
            (P = !1), (W = o.now()), T();
          },
          ve =
            _ && re > 49
              ? function () {
                  _(te, { timeout: re }),
                    re !== c.ricTimeout && (re = c.ricTimeout);
                }
              : qe(function () {
                  h(te);
                }, !0);
        return function (pe) {
          var oe;
          (pe = pe === !0) && (re = 33),
            !P &&
              ((P = !0),
              (oe = ue - (o.now() - W)),
              oe < 0 && (oe = 0),
              pe || oe < 9 ? ve() : h(ve, oe));
        };
      },
      F = function (T) {
        var P,
          W,
          ue = 99,
          re = function () {
            (P = null), T();
          },
          te = function () {
            var ve = o.now() - W;
            ve < ue ? h(te, ue - ve) : (_ || re)(re);
          };
        return function () {
          (W = o.now()), P || (P = h(te, ue));
        };
      },
      fe = (function () {
        var T,
          P,
          W,
          ue,
          re,
          te,
          ve,
          pe,
          oe,
          Ce,
          Re,
          Ze,
          ct = /^img$/i,
          Ut = /^iframe$/i,
          Vt = "onscroll" in n && !/(gle|ing)bot/.test(navigator.userAgent),
          p = 0,
          g = 0,
          m = 0,
          v = -1,
          x = function (R) {
            m--, (!R || m < 0 || !R.target) && (m = 0);
          },
          q = function (R) {
            return (
              Ze == null && (Ze = Ee(r.body, "visibility") == "hidden"),
              Ze ||
                !(
                  Ee(R.parentNode, "visibility") == "hidden" &&
                  Ee(R, "visibility") == "hidden"
                )
            );
          },
          L = function (R, V) {
            var ce,
              ke = R,
              ae = q(R);
            for (
              pe -= V, Re += V, oe -= V, Ce += V;
              ae && (ke = ke.offsetParent) && ke != r.body && ke != i;

            )
              (ae = (Ee(ke, "opacity") || 1) > 0),
                ae &&
                  Ee(ke, "overflow") != "visible" &&
                  ((ce = ke.getBoundingClientRect()),
                  (ae =
                    Ce > ce.left &&
                    oe < ce.right &&
                    Re > ce.top - 1 &&
                    pe < ce.bottom + 1));
            return ae;
          },
          D = function () {
            var R,
              V,
              ce,
              ke,
              ae,
              de,
              Oe,
              tt,
              it,
              nt,
              mt,
              St,
              Be = s.elements;
            if ((ue = c.loadMode) && m < 8 && (R = Be.length)) {
              for (V = 0, v++; V < R; V++)
                if (!(!Be[V] || Be[V]._lazyRace)) {
                  if (!Vt || (s.prematureUnveil && s.prematureUnveil(Be[V]))) {
                    ne(Be[V]);
                    continue;
                  }
                  if (
                    ((!(tt = Be[V][u]("data-expand")) || !(de = tt * 1)) &&
                      (de = g),
                    nt ||
                      ((nt =
                        !c.expand || c.expand < 1
                          ? i.clientHeight > 500 && i.clientWidth > 500
                            ? 500
                            : 370
                          : c.expand),
                      (s._defEx = nt),
                      (mt = nt * c.expFactor),
                      (St = c.hFac),
                      (Ze = null),
                      g < mt && m < 1 && v > 2 && ue > 2 && !r.hidden
                        ? ((g = mt), (v = 0))
                        : ue > 1 && v > 1 && m < 6
                        ? (g = nt)
                        : (g = p)),
                    it !== de &&
                      ((te = innerWidth + de * St),
                      (ve = innerHeight + de),
                      (Oe = de * -1),
                      (it = de)),
                    (ce = Be[V].getBoundingClientRect()),
                    (Re = ce.bottom) >= Oe &&
                      (pe = ce.top) <= ve &&
                      (Ce = ce.right) >= Oe * St &&
                      (oe = ce.left) <= te &&
                      (Re || Ce || oe || pe) &&
                      (c.loadHidden || q(Be[V])) &&
                      ((P && m < 3 && !tt && (ue < 3 || v < 4)) ||
                        L(Be[V], de)))
                  ) {
                    if ((ne(Be[V]), (ae = !0), m > 9)) break;
                  } else
                    !ae &&
                      P &&
                      !ke &&
                      m < 4 &&
                      v < 4 &&
                      ue > 2 &&
                      (T[0] || c.preloadAfterLoad) &&
                      (T[0] ||
                        (!tt &&
                          (Re ||
                            Ce ||
                            oe ||
                            pe ||
                            Be[V][u](c.sizesAttr) != "auto"))) &&
                      (ke = T[0] || Be[V]);
                }
              ke && !ae && ne(ke);
            }
          },
          S = Me(D),
          y = function (R) {
            var V = R.target;
            if (V._lazyCache) {
              delete V._lazyCache;
              return;
            }
            x(R),
              I(V, c.loadedClass),
              B(V, c.loadingClass),
              k(V, O),
              U(V, "lazyloaded");
          },
          z = qe(y),
          O = function (R) {
            z({ target: R.target });
          },
          M = function (R, V) {
            var ce = R.getAttribute("data-load-mode") || c.iframeLoadMode;
            ce == 0
              ? R.contentWindow.location.replace(V)
              : ce == 1 && (R.src = V);
          },
          j = function (R) {
            var V,
              ce = R[u](c.srcsetAttr);
            (V = c.customMedia[R[u]("data-media") || R[u]("media")]) &&
              R.setAttribute("media", V),
              ce && R.setAttribute("srcset", ce);
          },
          J = qe(function (R, V, ce, ke, ae) {
            var de, Oe, tt, it, nt, mt;
            (nt = U(R, "lazybeforeunveil", V)).defaultPrevented ||
              (ke &&
                (ce ? I(R, c.autosizesClass) : R.setAttribute("sizes", ke)),
              (Oe = R[u](c.srcsetAttr)),
              (de = R[u](c.srcAttr)),
              ae &&
                ((tt = R.parentNode), (it = tt && b.test(tt.nodeName || ""))),
              (mt = V.firesLoad || ("src" in R && (Oe || de || it))),
              (nt = { target: R }),
              I(R, c.loadingClass),
              mt && (clearTimeout(W), (W = h(x, 2500)), k(R, O, !0)),
              it && w.call(tt.getElementsByTagName("source"), j),
              Oe
                ? R.setAttribute("srcset", Oe)
                : de && !it && (Ut.test(R.nodeName) ? M(R, de) : (R.src = de)),
              ae && (Oe || it) && X(R, { src: de })),
              R._lazyRace && delete R._lazyRace,
              B(R, c.lazyClass),
              ee(function () {
                var St = R.complete && R.naturalWidth > 1;
                (!mt || St) &&
                  (St && I(R, c.fastLoadedClass),
                  y(nt),
                  (R._lazyCache = !0),
                  h(function () {
                    "_lazyCache" in R && delete R._lazyCache;
                  }, 9)),
                  R.loading == "lazy" && m--;
              }, !0);
          }),
          ne = function (R) {
            if (!R._lazyRace) {
              var V,
                ce = ct.test(R.nodeName),
                ke = ce && (R[u](c.sizesAttr) || R[u]("sizes")),
                ae = ke == "auto";
              ((ae || !P) &&
                ce &&
                (R[u]("src") || R.srcset) &&
                !R.complete &&
                !A(R, c.errorClass) &&
                A(R, c.lazyClass)) ||
                ((V = U(R, "lazyunveilread").detail),
                ae && $.updateElem(R, !0, R.offsetWidth),
                (R._lazyRace = !0),
                m++,
                J(R, V, ae, ke, ce));
            }
          },
          he = F(function () {
            (c.loadMode = 3), S();
          }),
          xe = function () {
            c.loadMode == 3 && (c.loadMode = 2), he();
          },
          Se = function () {
            if (!P) {
              if (o.now() - re < 999) {
                h(Se, 999);
                return;
              }
              (P = !0), (c.loadMode = 3), S(), f("scroll", xe, !0);
            }
          };
        return {
          _: function () {
            (re = o.now()),
              (s.elements = r.getElementsByClassName(c.lazyClass)),
              (T = r.getElementsByClassName(
                c.lazyClass + " " + c.preloadClass
              )),
              f("scroll", S, !0),
              f("resize", S, !0),
              f("pageshow", function (R) {
                if (R.persisted) {
                  var V = r.querySelectorAll("." + c.loadingClass);
                  V.length &&
                    V.forEach &&
                    d(function () {
                      V.forEach(function (ce) {
                        ce.complete && ne(ce);
                      });
                    });
                }
              }),
              n.MutationObserver
                ? new MutationObserver(S).observe(i, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0,
                  })
                : (i[a]("DOMNodeInserted", S, !0),
                  i[a]("DOMAttrModified", S, !0),
                  setInterval(S, 999)),
              f("hashchange", S, !0),
              [
                "focus",
                "mouseover",
                "click",
                "load",
                "transitionend",
                "animationend",
              ].forEach(function (R) {
                r[a](R, S, !0);
              }),
              /d$|^c/.test(r.readyState)
                ? Se()
                : (f("load", Se), r[a]("DOMContentLoaded", S), h(Se, 2e4)),
              s.elements.length ? (D(), ee._lsFlush()) : S();
          },
          checkElems: S,
          unveil: ne,
          _aLSL: xe,
        };
      })(),
      $ = (function () {
        var T,
          P = qe(function (te, ve, pe, oe) {
            var Ce, Re, Ze;
            if (
              ((te._lazysizesWidth = oe),
              (oe += "px"),
              te.setAttribute("sizes", oe),
              b.test(ve.nodeName || ""))
            )
              for (
                Ce = ve.getElementsByTagName("source"), Re = 0, Ze = Ce.length;
                Re < Ze;
                Re++
              )
                Ce[Re].setAttribute("sizes", oe);
            pe.detail.dataAttr || X(te, pe.detail);
          }),
          W = function (te, ve, pe) {
            var oe,
              Ce = te.parentNode;
            Ce &&
              ((pe = G(te, Ce, pe)),
              (oe = U(te, "lazybeforesizes", { width: pe, dataAttr: !!ve })),
              oe.defaultPrevented ||
                ((pe = oe.detail.width),
                pe && pe !== te._lazysizesWidth && P(te, Ce, oe, pe)));
          },
          ue = function () {
            var te,
              ve = T.length;
            if (ve) for (te = 0; te < ve; te++) W(T[te]);
          },
          re = F(ue);
        return {
          _: function () {
            (T = r.getElementsByClassName(c.autosizesClass)), f("resize", re);
          },
          checkElems: re,
          updateElem: W,
        };
      })(),
      Y = function () {
        !Y.i && r.getElementsByClassName && ((Y.i = !0), $._(), fe._());
      };
    return (
      h(function () {
        c.init && Y();
      }),
      (s = {
        cfg: c,
        autoSizer: $,
        loader: fe,
        init: Y,
        uP: X,
        aC: I,
        rC: B,
        hC: A,
        fire: U,
        gW: G,
        rAF: ee,
      }),
      s
    );
  });
})(gs);
var zc = gs.exports,
  Pc = { exports: {} };
(function (t) {
  (function (e, n) {
    if (e) {
      var r = function () {
        n(e.lazySizes), e.removeEventListener("lazyunveilread", r, !0);
      };
      (n = n.bind(null, e, e.document)),
        t.exports
          ? n(zc)
          : e.lazySizes
          ? r()
          : e.addEventListener("lazyunveilread", r, !0);
    }
  })(typeof window < "u" ? window : 0, function (e, n, r) {
    if (e.addEventListener) {
      var o = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
        s = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
        c = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,
        i = /^picture$/i,
        l = r.cfg,
        a = function (f) {
          return getComputedStyle(f, null) || {};
        },
        u = {
          getParent: function (f, h) {
            var d = f,
              _ = f.parentNode;
            return (
              (!h || h == "prev") &&
                _ &&
                i.test(_.nodeName || "") &&
                (_ = _.parentNode),
              h != "self" &&
                (h == "prev"
                  ? (d = f.previousElementSibling)
                  : h && (_.closest || e.jQuery)
                  ? (d =
                      (_.closest ? _.closest(h) : jQuery(_).closest(h)[0]) || _)
                  : (d = _)),
              d
            );
          },
          getFit: function (f) {
            var h,
              d,
              _ = a(f),
              b = _.content || _.fontFamily,
              C = {
                fit: f._lazysizesParentFit || f.getAttribute("data-parent-fit"),
              };
            return (
              !C.fit && b && (h = b.match(s)) && (C.fit = h[1]),
              C.fit
                ? ((d =
                    f._lazysizesParentContainer ||
                    f.getAttribute("data-parent-container")),
                  !d && b && (h = b.match(c)) && (d = h[1]),
                  (C.parent = u.getParent(f, d)))
                : (C.fit = _.objectFit),
              C
            );
          },
          getImageRatio: function (f) {
            var h,
              d,
              _,
              b,
              C,
              E,
              w,
              A = f.parentNode,
              I =
                A && i.test(A.nodeName || "")
                  ? A.querySelectorAll("source, img")
                  : [f];
            for (h = 0; h < I.length; h++)
              if (
                ((f = I[h]),
                (d =
                  f.getAttribute(l.srcsetAttr) ||
                  f.getAttribute("srcset") ||
                  f.getAttribute("data-pfsrcset") ||
                  f.getAttribute("data-risrcset") ||
                  ""),
                (_ = f._lsMedia || f.getAttribute("media")),
                (_ = l.customMedia[f.getAttribute("data-media") || _] || _),
                d && (!_ || ((e.matchMedia && matchMedia(_)) || {}).matches))
              ) {
                (b = parseFloat(f.getAttribute("data-aspectratio"))),
                  b ||
                    ((C = d.match(o)),
                    C
                      ? C[2] == "w"
                        ? ((E = C[1]), (w = C[3]))
                        : ((E = C[3]), (w = C[1]))
                      : ((E = f.getAttribute("width")),
                        (w = f.getAttribute("height"))),
                    (b = E / w));
                break;
              }
            return b;
          },
          calculateSize: function (f, h) {
            var d,
              _,
              b,
              C,
              E = this.getFit(f),
              w = E.fit,
              A = E.parent;
            return w != "width" &&
              ((w != "contain" && w != "cover") || !(b = this.getImageRatio(f)))
              ? h
              : (A ? (h = A.clientWidth) : (A = f),
                (C = h),
                w == "width"
                  ? (C = h)
                  : ((_ = A.clientHeight),
                    (d = h / _) &&
                      ((w == "cover" && d < b) || (w == "contain" && d > b)) &&
                      (C = h * (b / d))),
                C);
          },
        };
      (r.parentFit = u),
        n.addEventListener("lazybeforesizes", function (f) {
          if (!(f.defaultPrevented || f.detail.instance != r)) {
            var h = f.target;
            f.detail.width = u.calculateSize(h, f.detail.width);
          }
        });
    }
  });
})(Pc);
/**
 * @vue/shared v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function qr(t, e) {
  const n = new Set(t.split(","));
  return e ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r);
}
const me = {},
  Ft = [],
  $e = () => {},
  Mc = () => !1,
  qn = (t) =>
    t.charCodeAt(0) === 111 &&
    t.charCodeAt(1) === 110 &&
    (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97),
  Tr = (t) => t.startsWith("onUpdate:"),
  Ae = Object.assign,
  Fr = (t, e) => {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1);
  },
  Nc = Object.prototype.hasOwnProperty,
  se = (t, e) => Nc.call(t, e),
  H = Array.isArray,
  Rt = (t) => Tn(t) === "[object Map]",
  ms = (t) => Tn(t) === "[object Set]",
  K = (t) => typeof t == "function",
  ye = (t) => typeof t == "string",
  Nt = (t) => typeof t == "symbol",
  _e = (t) => t !== null && typeof t == "object",
  _s = (t) => (_e(t) || K(t)) && K(t.then) && K(t.catch),
  bs = Object.prototype.toString,
  Tn = (t) => bs.call(t),
  Oc = (t) => Tn(t).slice(8, -1),
  vs = (t) => Tn(t) === "[object Object]",
  Rr = (t) =>
    ye(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t,
  gn = qr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Fn = (t) => {
    const e = Object.create(null);
    return (n) => e[n] || (e[n] = t(n));
  },
  Bc = /-(\w)/g,
  zt = Fn((t) => t.replace(Bc, (e, n) => (n ? n.toUpperCase() : ""))),
  $c = /\B([A-Z])/g,
  Ot = Fn((t) => t.replace($c, "-$1").toLowerCase()),
  xs = Fn((t) => t.charAt(0).toUpperCase() + t.slice(1)),
  Zn = Fn((t) => (t ? `on${xs(t)}` : "")),
  dt = (t, e) => !Object.is(t, e),
  Kn = (t, e) => {
    for (let n = 0; n < t.length; n++) t[n](e);
  },
  vn = (t, e, n) => {
    Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: n });
  },
  jc = (t) => {
    const e = parseFloat(t);
    return isNaN(e) ? t : e;
  };
let eo;
const ks = () =>
  eo ||
  (eo =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function Lr(t) {
  if (H(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const r = t[n],
        o = ye(r) ? Gc(r) : Lr(r);
      if (o) for (const s in o) e[s] = o[s];
    }
    return e;
  } else if (ye(t) || _e(t)) return t;
}
const Uc = /;(?![^(]*\))/g,
  Vc = /:([^]+)/,
  Hc = /\/\*[^]*?\*\//g;
function Gc(t) {
  const e = {};
  return (
    t
      .replace(Hc, "")
      .split(Uc)
      .forEach((n) => {
        if (n) {
          const r = n.split(Vc);
          r.length > 1 && (e[r[0].trim()] = r[1].trim());
        }
      }),
    e
  );
}
function Yt(t) {
  let e = "";
  if (ye(t)) e = t;
  else if (H(t))
    for (let n = 0; n < t.length; n++) {
      const r = Yt(t[n]);
      r && (e += r + " ");
    }
  else if (_e(t)) for (const n in t) t[n] && (e += n + " ");
  return e.trim();
}
const Wc =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Zc = qr(Wc);
function ys(t) {
  return !!t || t === "";
}
const be = (t) =>
    ye(t)
      ? t
      : t == null
      ? ""
      : H(t) || (_e(t) && (t.toString === bs || !K(t.toString)))
      ? JSON.stringify(t, Cs, 2)
      : String(t),
  Cs = (t, e) =>
    e && e.__v_isRef
      ? Cs(t, e.value)
      : Rt(e)
      ? {
          [`Map(${e.size})`]: [...e.entries()].reduce(
            (n, [r, o], s) => ((n[Jn(r, s) + " =>"] = o), n),
            {}
          ),
        }
      : ms(e)
      ? { [`Set(${e.size})`]: [...e.values()].map((n) => Jn(n)) }
      : Nt(e)
      ? Jn(e)
      : _e(e) && !H(e) && !vs(e)
      ? String(e)
      : e,
  Jn = (t, e = "") => {
    var n;
    return Nt(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t;
  };
/**
 * @vue/reactivity v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Ve;
class Kc {
  constructor(e = !1) {
    (this.detached = e),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ve),
      !e && Ve && (this.index = (Ve.scopes || (Ve.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const n = Ve;
      try {
        return (Ve = this), e();
      } finally {
        Ve = n;
      }
    }
  }
  on() {
    Ve = this;
  }
  off() {
    Ve = this.parent;
  }
  stop(e) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !e) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Jc(t, e = Ve) {
  e && e.active && e.effects.push(t);
}
function Yc() {
  return Ve;
}
let yt;
class Ir {
  constructor(e, n, r, o) {
    (this.fn = e),
      (this.trigger = n),
      (this.scheduler = r),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 2),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      Jc(this, o);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      At();
      for (let e = 0; e < this._depsLength; e++) {
        const n = this.deps[e];
        if (n.computed && (Qc(n.computed), this._dirtyLevel >= 2)) break;
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), Et();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(e) {
    this._dirtyLevel = e ? 2 : 0;
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn();
    let e = pt,
      n = yt;
    try {
      return (pt = !0), (yt = this), this._runnings++, to(this), this.fn();
    } finally {
      no(this), this._runnings--, (yt = n), (pt = e);
    }
  }
  stop() {
    var e;
    this.active &&
      (to(this),
      no(this),
      (e = this.onStop) == null || e.call(this),
      (this.active = !1));
  }
}
function Qc(t) {
  return t.value;
}
function to(t) {
  t._trackId++, (t._depsLength = 0);
}
function no(t) {
  if (t.deps && t.deps.length > t._depsLength) {
    for (let e = t._depsLength; e < t.deps.length; e++) ws(t.deps[e], t);
    t.deps.length = t._depsLength;
  }
}
function ws(t, e) {
  const n = t.get(e);
  n !== void 0 &&
    e._trackId !== n &&
    (t.delete(e), t.size === 0 && t.cleanup());
}
let pt = !0,
  mr = 0;
const As = [];
function At() {
  As.push(pt), (pt = !1);
}
function Et() {
  const t = As.pop();
  pt = t === void 0 ? !0 : t;
}
function zr() {
  mr++;
}
function Pr() {
  for (mr--; !mr && _r.length; ) _r.shift()();
}
function Es(t, e, n) {
  if (e.get(t) !== t._trackId) {
    e.set(t, t._trackId);
    const r = t.deps[t._depsLength];
    r !== e ? (r && ws(r, t), (t.deps[t._depsLength++] = e)) : t._depsLength++;
  }
}
const _r = [];
function Ss(t, e, n) {
  zr();
  for (const r of t.keys())
    if (r._dirtyLevel < e && t.get(r) === r._trackId) {
      const o = r._dirtyLevel;
      (r._dirtyLevel = e), o === 0 && ((r._shouldSchedule = !0), r.trigger());
    }
  Ds(t), Pr();
}
function Ds(t) {
  for (const e of t.keys())
    e.scheduler &&
      e._shouldSchedule &&
      (!e._runnings || e.allowRecurse) &&
      t.get(e) === e._trackId &&
      ((e._shouldSchedule = !1), _r.push(e.scheduler));
}
const qs = (t, e) => {
    const n = new Map();
    return (n.cleanup = t), (n.computed = e), n;
  },
  br = new WeakMap(),
  Ct = Symbol(""),
  vr = Symbol("");
function ze(t, e, n) {
  if (pt && yt) {
    let r = br.get(t);
    r || br.set(t, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = qs(() => r.delete(n)))), Es(yt, o);
  }
}
function ot(t, e, n, r, o, s) {
  const c = br.get(t);
  if (!c) return;
  let i = [];
  if (e === "clear") i = [...c.values()];
  else if (n === "length" && H(t)) {
    const l = Number(r);
    c.forEach((a, u) => {
      (u === "length" || (!Nt(u) && u >= l)) && i.push(a);
    });
  } else
    switch ((n !== void 0 && i.push(c.get(n)), e)) {
      case "add":
        H(t)
          ? Rr(n) && i.push(c.get("length"))
          : (i.push(c.get(Ct)), Rt(t) && i.push(c.get(vr)));
        break;
      case "delete":
        H(t) || (i.push(c.get(Ct)), Rt(t) && i.push(c.get(vr)));
        break;
      case "set":
        Rt(t) && i.push(c.get(Ct));
        break;
    }
  zr();
  for (const l of i) l && Ss(l, 2);
  Pr();
}
const Xc = qr("__proto__,__v_isRef,__isVue"),
  Ts = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((t) => t !== "arguments" && t !== "caller")
      .map((t) => Symbol[t])
      .filter(Nt)
  ),
  ro = ei();
function ei() {
  const t = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
      t[e] = function (...n) {
        const r = ie(this);
        for (let s = 0, c = this.length; s < c; s++) ze(r, "get", s + "");
        const o = r[e](...n);
        return o === -1 || o === !1 ? r[e](...n.map(ie)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
      t[e] = function (...n) {
        At(), zr();
        const r = ie(this)[e].apply(this, n);
        return Pr(), Et(), r;
      };
    }),
    t
  );
}
function ti(t) {
  const e = ie(this);
  return ze(e, "has", t), e.hasOwnProperty(t);
}
class Fs {
  constructor(e = !1, n = !1) {
    (this._isReadonly = e), (this._shallow = n);
  }
  get(e, n, r) {
    const o = this._isReadonly,
      s = this._shallow;
    if (n === "__v_isReactive") return !o;
    if (n === "__v_isReadonly") return o;
    if (n === "__v_isShallow") return s;
    if (n === "__v_raw")
      return r === (o ? (s ? di : zs) : s ? Is : Ls).get(e) ||
        Object.getPrototypeOf(e) === Object.getPrototypeOf(r)
        ? e
        : void 0;
    const c = H(e);
    if (!o) {
      if (c && se(ro, n)) return Reflect.get(ro, n, r);
      if (n === "hasOwnProperty") return ti;
    }
    const i = Reflect.get(e, n, r);
    return (Nt(n) ? Ts.has(n) : Xc(n)) || (o || ze(e, "get", n), s)
      ? i
      : Pe(i)
      ? c && Rr(n)
        ? i
        : i.value
      : _e(i)
      ? o
        ? Ps(i)
        : Or(i)
      : i;
  }
}
class Rs extends Fs {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, r, o) {
    let s = e[n];
    if (!this._shallow) {
      const l = Pt(s);
      if (
        (!xn(r) && !Pt(r) && ((s = ie(s)), (r = ie(r))),
        !H(e) && Pe(s) && !Pe(r))
      )
        return l ? !1 : ((s.value = r), !0);
    }
    const c = H(e) && Rr(n) ? Number(n) < e.length : se(e, n),
      i = Reflect.set(e, n, r, o);
    return (
      e === ie(o) && (c ? dt(r, s) && ot(e, "set", n, r) : ot(e, "add", n, r)),
      i
    );
  }
  deleteProperty(e, n) {
    const r = se(e, n);
    e[n];
    const o = Reflect.deleteProperty(e, n);
    return o && r && ot(e, "delete", n, void 0), o;
  }
  has(e, n) {
    const r = Reflect.has(e, n);
    return (!Nt(n) || !Ts.has(n)) && ze(e, "has", n), r;
  }
  ownKeys(e) {
    return ze(e, "iterate", H(e) ? "length" : Ct), Reflect.ownKeys(e);
  }
}
class ni extends Fs {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const ri = new Rs(),
  oi = new ni(),
  si = new Rs(!0),
  Mr = (t) => t,
  Rn = (t) => Reflect.getPrototypeOf(t);
function sn(t, e, n = !1, r = !1) {
  t = t.__v_raw;
  const o = ie(t),
    s = ie(e);
  n || (dt(e, s) && ze(o, "get", e), ze(o, "get", s));
  const { has: c } = Rn(o),
    i = r ? Mr : n ? $r : Qt;
  if (c.call(o, e)) return i(t.get(e));
  if (c.call(o, s)) return i(t.get(s));
  t !== o && t.get(e);
}
function cn(t, e = !1) {
  const n = this.__v_raw,
    r = ie(n),
    o = ie(t);
  return (
    e || (dt(t, o) && ze(r, "has", t), ze(r, "has", o)),
    t === o ? n.has(t) : n.has(t) || n.has(o)
  );
}
function ln(t, e = !1) {
  return (
    (t = t.__v_raw), !e && ze(ie(t), "iterate", Ct), Reflect.get(t, "size", t)
  );
}
function oo(t) {
  t = ie(t);
  const e = ie(this);
  return Rn(e).has.call(e, t) || (e.add(t), ot(e, "add", t, t)), this;
}
function so(t, e) {
  e = ie(e);
  const n = ie(this),
    { has: r, get: o } = Rn(n);
  let s = r.call(n, t);
  s || ((t = ie(t)), (s = r.call(n, t)));
  const c = o.call(n, t);
  return (
    n.set(t, e), s ? dt(e, c) && ot(n, "set", t, e) : ot(n, "add", t, e), this
  );
}
function co(t) {
  const e = ie(this),
    { has: n, get: r } = Rn(e);
  let o = n.call(e, t);
  o || ((t = ie(t)), (o = n.call(e, t))), r && r.call(e, t);
  const s = e.delete(t);
  return o && ot(e, "delete", t, void 0), s;
}
function io() {
  const t = ie(this),
    e = t.size !== 0,
    n = t.clear();
  return e && ot(t, "clear", void 0, void 0), n;
}
function an(t, e) {
  return function (r, o) {
    const s = this,
      c = s.__v_raw,
      i = ie(c),
      l = e ? Mr : t ? $r : Qt;
    return (
      !t && ze(i, "iterate", Ct), c.forEach((a, u) => r.call(o, l(a), l(u), s))
    );
  };
}
function un(t, e, n) {
  return function (...r) {
    const o = this.__v_raw,
      s = ie(o),
      c = Rt(s),
      i = t === "entries" || (t === Symbol.iterator && c),
      l = t === "keys" && c,
      a = o[t](...r),
      u = n ? Mr : e ? $r : Qt;
    return (
      !e && ze(s, "iterate", l ? vr : Ct),
      {
        next() {
          const { value: f, done: h } = a.next();
          return h
            ? { value: f, done: h }
            : { value: i ? [u(f[0]), u(f[1])] : u(f), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function lt(t) {
  return function (...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function ci() {
  const t = {
      get(s) {
        return sn(this, s);
      },
      get size() {
        return ln(this);
      },
      has: cn,
      add: oo,
      set: so,
      delete: co,
      clear: io,
      forEach: an(!1, !1),
    },
    e = {
      get(s) {
        return sn(this, s, !1, !0);
      },
      get size() {
        return ln(this);
      },
      has: cn,
      add: oo,
      set: so,
      delete: co,
      clear: io,
      forEach: an(!1, !0),
    },
    n = {
      get(s) {
        return sn(this, s, !0);
      },
      get size() {
        return ln(this, !0);
      },
      has(s) {
        return cn.call(this, s, !0);
      },
      add: lt("add"),
      set: lt("set"),
      delete: lt("delete"),
      clear: lt("clear"),
      forEach: an(!0, !1),
    },
    r = {
      get(s) {
        return sn(this, s, !0, !0);
      },
      get size() {
        return ln(this, !0);
      },
      has(s) {
        return cn.call(this, s, !0);
      },
      add: lt("add"),
      set: lt("set"),
      delete: lt("delete"),
      clear: lt("clear"),
      forEach: an(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (t[s] = un(s, !1, !1)),
        (n[s] = un(s, !0, !1)),
        (e[s] = un(s, !1, !0)),
        (r[s] = un(s, !0, !0));
    }),
    [t, n, e, r]
  );
}
const [ii, li, ai, ui] = ci();
function Nr(t, e) {
  const n = e ? (t ? ui : ai) : t ? li : ii;
  return (r, o, s) =>
    o === "__v_isReactive"
      ? !t
      : o === "__v_isReadonly"
      ? t
      : o === "__v_raw"
      ? r
      : Reflect.get(se(n, o) && o in r ? n : r, o, s);
}
const fi = { get: Nr(!1, !1) },
  pi = { get: Nr(!1, !0) },
  hi = { get: Nr(!0, !1) },
  Ls = new WeakMap(),
  Is = new WeakMap(),
  zs = new WeakMap(),
  di = new WeakMap();
function gi(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function mi(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : gi(Oc(t));
}
function Or(t) {
  return Pt(t) ? t : Br(t, !1, ri, fi, Ls);
}
function _i(t) {
  return Br(t, !1, si, pi, Is);
}
function Ps(t) {
  return Br(t, !0, oi, hi, zs);
}
function Br(t, e, n, r, o) {
  if (!_e(t) || (t.__v_raw && !(e && t.__v_isReactive))) return t;
  const s = o.get(t);
  if (s) return s;
  const c = mi(t);
  if (c === 0) return t;
  const i = new Proxy(t, c === 2 ? r : n);
  return o.set(t, i), i;
}
function Lt(t) {
  return Pt(t) ? Lt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Pt(t) {
  return !!(t && t.__v_isReadonly);
}
function xn(t) {
  return !!(t && t.__v_isShallow);
}
function Ms(t) {
  return Lt(t) || Pt(t);
}
function ie(t) {
  const e = t && t.__v_raw;
  return e ? ie(e) : t;
}
function Ns(t) {
  return vn(t, "__v_skip", !0), t;
}
const Qt = (t) => (_e(t) ? Or(t) : t),
  $r = (t) => (_e(t) ? Ps(t) : t);
class Os {
  constructor(e, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new Ir(
        () => e(this._value),
        () => mn(this, 1),
        () => this.dep && Ds(this.dep)
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const e = ie(this);
    return (
      (!e._cacheable || e.effect.dirty) &&
        dt(e._value, (e._value = e.effect.run())) &&
        mn(e, 2),
      Bs(e),
      e.effect._dirtyLevel >= 1 && mn(e, 1),
      e._value
    );
  }
  set value(e) {
    this._setter(e);
  }
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(e) {
    this.effect.dirty = e;
  }
}
function bi(t, e, n = !1) {
  let r, o;
  const s = K(t);
  return (
    s ? ((r = t), (o = $e)) : ((r = t.get), (o = t.set)),
    new Os(r, o, s || !o, n)
  );
}
function Bs(t) {
  pt &&
    yt &&
    ((t = ie(t)),
    Es(
      yt,
      t.dep ||
        (t.dep = qs(() => (t.dep = void 0), t instanceof Os ? t : void 0))
    ));
}
function mn(t, e = 2, n) {
  t = ie(t);
  const r = t.dep;
  r && Ss(r, e);
}
function Pe(t) {
  return !!(t && t.__v_isRef === !0);
}
function $s(t) {
  return vi(t, !1);
}
function vi(t, e) {
  return Pe(t) ? t : new xi(t, e);
}
class xi {
  constructor(e, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? e : ie(e)),
      (this._value = n ? e : Qt(e));
  }
  get value() {
    return Bs(this), this._value;
  }
  set value(e) {
    const n = this.__v_isShallow || xn(e) || Pt(e);
    (e = n ? e : ie(e)),
      dt(e, this._rawValue) &&
        ((this._rawValue = e), (this._value = n ? e : Qt(e)), mn(this, 2));
  }
}
function Je(t) {
  return Pe(t) ? t.value : t;
}
const ki = {
  get: (t, e, n) => Je(Reflect.get(t, e, n)),
  set: (t, e, n, r) => {
    const o = t[e];
    return Pe(o) && !Pe(n) ? ((o.value = n), !0) : Reflect.set(t, e, n, r);
  },
};
function js(t) {
  return Lt(t) ? t : new Proxy(t, ki);
}
/**
 * @vue/runtime-core v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function ht(t, e, n, r) {
  let o;
  try {
    o = r ? t(...r) : t();
  } catch (s) {
    Ln(s, e, n);
  }
  return o;
}
function Ge(t, e, n, r) {
  if (K(t)) {
    const s = ht(t, e, n, r);
    return (
      s &&
        _s(s) &&
        s.catch((c) => {
          Ln(c, e, n);
        }),
      s
    );
  }
  const o = [];
  for (let s = 0; s < t.length; s++) o.push(Ge(t[s], e, n, r));
  return o;
}
function Ln(t, e, n, r = !0) {
  const o = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const c = e.proxy,
      i = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; s; ) {
      const a = s.ec;
      if (a) {
        for (let u = 0; u < a.length; u++) if (a[u](t, c, i) === !1) return;
      }
      s = s.parent;
    }
    const l = e.appContext.config.errorHandler;
    if (l) {
      ht(l, null, 10, [t, c, i]);
      return;
    }
  }
  yi(t, n, o, r);
}
function yi(t, e, n, r = !0) {
  console.error(t);
}
let Xt = !1,
  xr = !1;
const De = [];
let Qe = 0;
const It = [];
let at = null,
  xt = 0;
const Us = Promise.resolve();
let jr = null;
function Ci(t) {
  const e = jr || Us;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function wi(t) {
  let e = Qe + 1,
    n = De.length;
  for (; e < n; ) {
    const r = (e + n) >>> 1,
      o = De[r],
      s = en(o);
    s < t || (s === t && o.pre) ? (e = r + 1) : (n = r);
  }
  return e;
}
function Ur(t) {
  (!De.length || !De.includes(t, Xt && t.allowRecurse ? Qe + 1 : Qe)) &&
    (t.id == null ? De.push(t) : De.splice(wi(t.id), 0, t), Vs());
}
function Vs() {
  !Xt && !xr && ((xr = !0), (jr = Us.then(Gs)));
}
function Ai(t) {
  const e = De.indexOf(t);
  e > Qe && De.splice(e, 1);
}
function Ei(t) {
  H(t)
    ? It.push(...t)
    : (!at || !at.includes(t, t.allowRecurse ? xt + 1 : xt)) && It.push(t),
    Vs();
}
function lo(t, e, n = Xt ? Qe + 1 : 0) {
  for (; n < De.length; n++) {
    const r = De[n];
    if (r && r.pre) {
      if (t && r.id !== t.uid) continue;
      De.splice(n, 1), n--, r();
    }
  }
}
function Hs(t) {
  if (It.length) {
    const e = [...new Set(It)].sort((n, r) => en(n) - en(r));
    if (((It.length = 0), at)) {
      at.push(...e);
      return;
    }
    for (at = e, xt = 0; xt < at.length; xt++) at[xt]();
    (at = null), (xt = 0);
  }
}
const en = (t) => (t.id == null ? 1 / 0 : t.id),
  Si = (t, e) => {
    const n = en(t) - en(e);
    if (n === 0) {
      if (t.pre && !e.pre) return -1;
      if (e.pre && !t.pre) return 1;
    }
    return n;
  };
function Gs(t) {
  (xr = !1), (Xt = !0), De.sort(Si);
  try {
    for (Qe = 0; Qe < De.length; Qe++) {
      const e = De[Qe];
      e && e.active !== !1 && ht(e, null, 14);
    }
  } finally {
    (Qe = 0),
      (De.length = 0),
      Hs(),
      (Xt = !1),
      (jr = null),
      (De.length || It.length) && Gs();
  }
}
function Di(t, e, ...n) {
  if (t.isUnmounted) return;
  const r = t.vnode.props || me;
  let o = n;
  const s = e.startsWith("update:"),
    c = s && e.slice(7);
  if (c && c in r) {
    const u = `${c === "modelValue" ? "model" : c}Modifiers`,
      { number: f, trim: h } = r[u] || me;
    h && (o = n.map((d) => (ye(d) ? d.trim() : d))), f && (o = n.map(jc));
  }
  let i,
    l = r[(i = Zn(e))] || r[(i = Zn(zt(e)))];
  !l && s && (l = r[(i = Zn(Ot(e)))]), l && Ge(l, t, 6, o);
  const a = r[i + "Once"];
  if (a) {
    if (!t.emitted) t.emitted = {};
    else if (t.emitted[i]) return;
    (t.emitted[i] = !0), Ge(a, t, 6, o);
  }
}
function Ws(t, e, n = !1) {
  const r = e.emitsCache,
    o = r.get(t);
  if (o !== void 0) return o;
  const s = t.emits;
  let c = {},
    i = !1;
  if (!K(t)) {
    const l = (a) => {
      const u = Ws(a, e, !0);
      u && ((i = !0), Ae(c, u));
    };
    !n && e.mixins.length && e.mixins.forEach(l),
      t.extends && l(t.extends),
      t.mixins && t.mixins.forEach(l);
  }
  return !s && !i
    ? (_e(t) && r.set(t, null), null)
    : (H(s) ? s.forEach((l) => (c[l] = null)) : Ae(c, s),
      _e(t) && r.set(t, c),
      c);
}
function In(t, e) {
  return !t || !qn(e)
    ? !1
    : ((e = e.slice(2).replace(/Once$/, "")),
      se(t, e[0].toLowerCase() + e.slice(1)) || se(t, Ot(e)) || se(t, e));
}
let Ie = null,
  Zs = null;
function kn(t) {
  const e = Ie;
  return (Ie = t), (Zs = (t && t.type.__scopeId) || null), e;
}
function Ks(t, e = Ie, n) {
  if (!e || t._n) return t;
  const r = (...o) => {
    r._d && xo(-1);
    const s = kn(e);
    let c;
    try {
      c = t(...o);
    } finally {
      kn(s), r._d && xo(1);
    }
    return c;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Yn(t) {
  const {
    type: e,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: s,
    propsOptions: [c],
    slots: i,
    attrs: l,
    emit: a,
    render: u,
    renderCache: f,
    data: h,
    setupState: d,
    ctx: _,
    inheritAttrs: b,
  } = t;
  let C, E;
  const w = kn(t);
  try {
    if (n.shapeFlag & 4) {
      const I = o || r,
        B = I;
      (C = Ye(u.call(B, I, f, s, d, h, _))), (E = l);
    } else {
      const I = e;
      (C = Ye(
        I.length > 1 ? I(s, { attrs: l, slots: i, emit: a }) : I(s, null)
      )),
        (E = e.props ? l : qi(l));
    }
  } catch (I) {
    (Kt.length = 0), Ln(I, t, 1), (C = we(gt));
  }
  let A = C;
  if (E && b !== !1) {
    const I = Object.keys(E),
      { shapeFlag: B } = A;
    I.length && B & 7 && (c && I.some(Tr) && (E = Ti(E, c)), (A = Mt(A, E)));
  }
  return (
    n.dirs && ((A = Mt(A)), (A.dirs = A.dirs ? A.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (A.transition = n.transition),
    (C = A),
    kn(w),
    C
  );
}
const qi = (t) => {
    let e;
    for (const n in t)
      (n === "class" || n === "style" || qn(n)) && ((e || (e = {}))[n] = t[n]);
    return e;
  },
  Ti = (t, e) => {
    const n = {};
    for (const r in t) (!Tr(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
    return n;
  };
function Fi(t, e, n) {
  const { props: r, children: o, component: s } = t,
    { props: c, children: i, patchFlag: l } = e,
    a = s.emitsOptions;
  if (e.dirs || e.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? ao(r, c, a) : !!c;
    if (l & 8) {
      const u = e.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const h = u[f];
        if (c[h] !== r[h] && !In(a, h)) return !0;
      }
    }
  } else
    return (o || i) && (!i || !i.$stable)
      ? !0
      : r === c
      ? !1
      : r
      ? c
        ? ao(r, c, a)
        : !0
      : !!c;
  return !1;
}
function ao(t, e, n) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(t).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    if (e[s] !== t[s] && !In(n, s)) return !0;
  }
  return !1;
}
function Ri({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const r = e.subTree;
    if ((r.suspense && r.suspense.activeBranch === t && (r.el = t.el), r === t))
      ((t = e.vnode).el = n), (e = e.parent);
    else break;
  }
}
const Li = Symbol.for("v-ndc"),
  Ii = (t) => t.__isSuspense;
function zi(t, e) {
  e && e.pendingBranch
    ? H(t)
      ? e.effects.push(...t)
      : e.effects.push(t)
    : Ei(t);
}
const Pi = Symbol.for("v-scx"),
  Mi = () => _n(Pi),
  fn = {};
function Qn(t, e, n) {
  return Js(t, e, n);
}
function Js(
  t,
  e,
  { immediate: n, deep: r, flush: o, once: s, onTrack: c, onTrigger: i } = me
) {
  if (e && s) {
    const k = e;
    e = (...U) => {
      k(...U), B();
    };
  }
  const l = Fe,
    a = (k) => (r === !0 ? k : Tt(k, r === !1 ? 1 : void 0));
  let u,
    f = !1,
    h = !1;
  if (
    (Pe(t)
      ? ((u = () => t.value), (f = xn(t)))
      : Lt(t)
      ? ((u = () => a(t)), (f = !0))
      : H(t)
      ? ((h = !0),
        (f = t.some((k) => Lt(k) || xn(k))),
        (u = () =>
          t.map((k) => {
            if (Pe(k)) return k.value;
            if (Lt(k)) return a(k);
            if (K(k)) return ht(k, l, 2);
          })))
      : K(t)
      ? e
        ? (u = () => ht(t, l, 2))
        : (u = () => (d && d(), Ge(t, l, 3, [_])))
      : (u = $e),
    e && r)
  ) {
    const k = u;
    u = () => Tt(k());
  }
  let d,
    _ = (k) => {
      d = A.onStop = () => {
        ht(k, l, 4), (d = A.onStop = void 0);
      };
    },
    b;
  if (Nn)
    if (
      ((_ = $e),
      e ? n && Ge(e, l, 3, [u(), h ? [] : void 0, _]) : u(),
      o === "sync")
    ) {
      const k = Mi();
      b = k.__watcherHandles || (k.__watcherHandles = []);
    } else return $e;
  let C = h ? new Array(t.length).fill(fn) : fn;
  const E = () => {
    if (!(!A.active || !A.dirty))
      if (e) {
        const k = A.run();
        (r || f || (h ? k.some((U, X) => dt(U, C[X])) : dt(k, C))) &&
          (d && d(),
          Ge(e, l, 3, [k, C === fn ? void 0 : h && C[0] === fn ? [] : C, _]),
          (C = k));
      } else A.run();
  };
  E.allowRecurse = !!e;
  let w;
  o === "sync"
    ? (w = E)
    : o === "post"
    ? (w = () => Le(E, l && l.suspense))
    : ((E.pre = !0), l && (E.id = l.uid), (w = () => Ur(E)));
  const A = new Ir(u, $e, w),
    I = Yc(),
    B = () => {
      A.stop(), I && Fr(I.effects, A);
    };
  return (
    e
      ? n
        ? E()
        : (C = A.run())
      : o === "post"
      ? Le(A.run.bind(A), l && l.suspense)
      : A.run(),
    b && b.push(B),
    B
  );
}
function Ni(t, e, n) {
  const r = this.proxy,
    o = ye(t) ? (t.includes(".") ? Ys(r, t) : () => r[t]) : t.bind(r, r);
  let s;
  K(e) ? (s = e) : ((s = e.handler), (n = e));
  const c = nn(this),
    i = Js(o, s.bind(r), n);
  return c(), i;
}
function Ys(t, e) {
  const n = e.split(".");
  return () => {
    let r = t;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function Tt(t, e, n = 0, r) {
  if (!_e(t) || t.__v_skip) return t;
  if (e && e > 0) {
    if (n >= e) return t;
    n++;
  }
  if (((r = r || new Set()), r.has(t))) return t;
  if ((r.add(t), Pe(t))) Tt(t.value, e, n, r);
  else if (H(t)) for (let o = 0; o < t.length; o++) Tt(t[o], e, n, r);
  else if (ms(t) || Rt(t))
    t.forEach((o) => {
      Tt(o, e, n, r);
    });
  else if (vs(t)) for (const o in t) Tt(t[o], e, n, r);
  return t;
}
function _t(t, e, n, r) {
  const o = t.dirs,
    s = e && e.dirs;
  for (let c = 0; c < o.length; c++) {
    const i = o[c];
    s && (i.oldValue = s[c].value);
    let l = i.dir[r];
    l && (At(), Ge(l, n, 8, [t.el, i, t, e]), Et());
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function Oi(t, e) {
  return K(t) ? Ae({ name: t.name }, e, { setup: t }) : t;
}
const Wt = (t) => !!t.type.__asyncLoader,
  Qs = (t) => t.type.__isKeepAlive;
function Bi(t, e) {
  Xs(t, "a", e);
}
function $i(t, e) {
  Xs(t, "da", e);
}
function Xs(t, e, n = Fe) {
  const r =
    t.__wdc ||
    (t.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return t();
    });
  if ((zn(e, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      Qs(o.parent.vnode) && ji(r, e, n, o), (o = o.parent);
  }
}
function ji(t, e, n, r) {
  const o = zn(e, t, r, !0);
  tc(() => {
    Fr(r[e], o);
  }, n);
}
function zn(t, e, n = Fe, r = !1) {
  if (n) {
    const o = n[t] || (n[t] = []),
      s =
        e.__weh ||
        (e.__weh = (...c) => {
          if (n.isUnmounted) return;
          At();
          const i = nn(n),
            l = Ge(e, n, t, c);
          return i(), Et(), l;
        });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
const st =
    (t) =>
    (e, n = Fe) =>
      (!Nn || t === "sp") && zn(t, (...r) => e(...r), n),
  Ui = st("bm"),
  ec = st("m"),
  Vi = st("bu"),
  Hi = st("u"),
  Gi = st("bum"),
  tc = st("um"),
  Wi = st("sp"),
  Zi = st("rtg"),
  Ki = st("rtc");
function Ji(t, e = Fe) {
  zn("ec", t, e);
}
function Ne(t, e, n, r) {
  let o;
  const s = n && n[r];
  if (H(t) || ye(t)) {
    o = new Array(t.length);
    for (let c = 0, i = t.length; c < i; c++)
      o[c] = e(t[c], c, void 0, s && s[c]);
  } else if (typeof t == "number") {
    o = new Array(t);
    for (let c = 0; c < t; c++) o[c] = e(c + 1, c, void 0, s && s[c]);
  } else if (_e(t))
    if (t[Symbol.iterator])
      o = Array.from(t, (c, i) => e(c, i, void 0, s && s[i]));
    else {
      const c = Object.keys(t);
      o = new Array(c.length);
      for (let i = 0, l = c.length; i < l; i++) {
        const a = c[i];
        o[i] = e(t[a], a, i, s && s[i]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
function uo(t, e, n = {}, r, o) {
  if (Ie.isCE || (Ie.parent && Wt(Ie.parent) && Ie.parent.isCE))
    return e !== "default" && (n.name = e), we("slot", n, r && r());
  let s = t[e];
  s && s._c && (s._d = !1), Z();
  const c = s && nc(s(n)),
    i = wn(
      ge,
      { key: n.key || (c && c.key) || `_${e}` },
      c || (r ? r() : []),
      c && t._ === 1 ? 64 : -2
    );
  return (
    !o && i.scopeId && (i.slotScopeIds = [i.scopeId + "-s"]),
    s && s._c && (s._d = !0),
    i
  );
}
function nc(t) {
  return t.some((e) =>
    An(e) ? !(e.type === gt || (e.type === ge && !nc(e.children))) : !0
  )
    ? t
    : null;
}
const kr = (t) => (t ? (gc(t) ? Wr(t) || t.proxy : kr(t.parent)) : null),
  Zt = Ae(Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => kr(t.parent),
    $root: (t) => kr(t.root),
    $emit: (t) => t.emit,
    $options: (t) => Vr(t),
    $forceUpdate: (t) =>
      t.f ||
      (t.f = () => {
        (t.effect.dirty = !0), Ur(t.update);
      }),
    $nextTick: (t) => t.n || (t.n = Ci.bind(t.proxy)),
    $watch: (t) => Ni.bind(t),
  }),
  Xn = (t, e) => t !== me && !t.__isScriptSetup && se(t, e),
  Yi = {
    get({ _: t }, e) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: s,
        accessCache: c,
        type: i,
        appContext: l,
      } = t;
      let a;
      if (e[0] !== "$") {
        const d = c[e];
        if (d !== void 0)
          switch (d) {
            case 1:
              return r[e];
            case 2:
              return o[e];
            case 4:
              return n[e];
            case 3:
              return s[e];
          }
        else {
          if (Xn(r, e)) return (c[e] = 1), r[e];
          if (o !== me && se(o, e)) return (c[e] = 2), o[e];
          if ((a = t.propsOptions[0]) && se(a, e)) return (c[e] = 3), s[e];
          if (n !== me && se(n, e)) return (c[e] = 4), n[e];
          yr && (c[e] = 0);
        }
      }
      const u = Zt[e];
      let f, h;
      if (u) return e === "$attrs" && ze(t, "get", e), u(t);
      if ((f = i.__cssModules) && (f = f[e])) return f;
      if (n !== me && se(n, e)) return (c[e] = 4), n[e];
      if (((h = l.config.globalProperties), se(h, e))) return h[e];
    },
    set({ _: t }, e, n) {
      const { data: r, setupState: o, ctx: s } = t;
      return Xn(o, e)
        ? ((o[e] = n), !0)
        : r !== me && se(r, e)
        ? ((r[e] = n), !0)
        : se(t.props, e) || (e[0] === "$" && e.slice(1) in t)
        ? !1
        : ((s[e] = n), !0);
    },
    has(
      {
        _: {
          data: t,
          setupState: e,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: s,
        },
      },
      c
    ) {
      let i;
      return (
        !!n[c] ||
        (t !== me && se(t, c)) ||
        Xn(e, c) ||
        ((i = s[0]) && se(i, c)) ||
        se(r, c) ||
        se(Zt, c) ||
        se(o.config.globalProperties, c)
      );
    },
    defineProperty(t, e, n) {
      return (
        n.get != null
          ? (t._.accessCache[e] = 0)
          : se(n, "value") && this.set(t, e, n.value, null),
        Reflect.defineProperty(t, e, n)
      );
    },
  };
function fo(t) {
  return H(t) ? t.reduce((e, n) => ((e[n] = null), e), {}) : t;
}
let yr = !0;
function Qi(t) {
  const e = Vr(t),
    n = t.proxy,
    r = t.ctx;
  (yr = !1), e.beforeCreate && po(e.beforeCreate, t, "bc");
  const {
    data: o,
    computed: s,
    methods: c,
    watch: i,
    provide: l,
    inject: a,
    created: u,
    beforeMount: f,
    mounted: h,
    beforeUpdate: d,
    updated: _,
    activated: b,
    deactivated: C,
    beforeDestroy: E,
    beforeUnmount: w,
    destroyed: A,
    unmounted: I,
    render: B,
    renderTracked: k,
    renderTriggered: U,
    errorCaptured: X,
    serverPrefetch: Ee,
    expose: G,
    inheritAttrs: ee,
    components: qe,
    directives: Me,
    filters: F,
  } = e;
  if ((a && Xi(a, r, null), c))
    for (const Y in c) {
      const T = c[Y];
      K(T) && (r[Y] = T.bind(n));
    }
  if (o) {
    const Y = o.call(n, n);
    _e(Y) && (t.data = Or(Y));
  }
  if (((yr = !0), s))
    for (const Y in s) {
      const T = s[Y],
        P = K(T) ? T.bind(n, n) : K(T.get) ? T.get.bind(n, n) : $e,
        W = !K(T) && K(T.set) ? T.set.bind(n) : $e,
        ue = _c({ get: P, set: W });
      Object.defineProperty(r, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => ue.value,
        set: (re) => (ue.value = re),
      });
    }
  if (i) for (const Y in i) rc(i[Y], r, n, Y);
  if (l) {
    const Y = K(l) ? l.call(n) : l;
    Reflect.ownKeys(Y).forEach((T) => {
      sl(T, Y[T]);
    });
  }
  u && po(u, t, "c");
  function $(Y, T) {
    H(T) ? T.forEach((P) => Y(P.bind(n))) : T && Y(T.bind(n));
  }
  if (
    ($(Ui, f),
    $(ec, h),
    $(Vi, d),
    $(Hi, _),
    $(Bi, b),
    $($i, C),
    $(Ji, X),
    $(Ki, k),
    $(Zi, U),
    $(Gi, w),
    $(tc, I),
    $(Wi, Ee),
    H(G))
  )
    if (G.length) {
      const Y = t.exposed || (t.exposed = {});
      G.forEach((T) => {
        Object.defineProperty(Y, T, {
          get: () => n[T],
          set: (P) => (n[T] = P),
        });
      });
    } else t.exposed || (t.exposed = {});
  B && t.render === $e && (t.render = B),
    ee != null && (t.inheritAttrs = ee),
    qe && (t.components = qe),
    Me && (t.directives = Me);
}
function Xi(t, e, n = $e) {
  H(t) && (t = Cr(t));
  for (const r in t) {
    const o = t[r];
    let s;
    _e(o)
      ? "default" in o
        ? (s = _n(o.from || r, o.default, !0))
        : (s = _n(o.from || r))
      : (s = _n(o)),
      Pe(s)
        ? Object.defineProperty(e, r, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (c) => (s.value = c),
          })
        : (e[r] = s);
  }
}
function po(t, e, n) {
  Ge(H(t) ? t.map((r) => r.bind(e.proxy)) : t.bind(e.proxy), e, n);
}
function rc(t, e, n, r) {
  const o = r.includes(".") ? Ys(n, r) : () => n[r];
  if (ye(t)) {
    const s = e[t];
    K(s) && Qn(o, s);
  } else if (K(t)) Qn(o, t.bind(n));
  else if (_e(t))
    if (H(t)) t.forEach((s) => rc(s, e, n, r));
    else {
      const s = K(t.handler) ? t.handler.bind(n) : e[t.handler];
      K(s) && Qn(o, s, t);
    }
}
function Vr(t) {
  const e = t.type,
    { mixins: n, extends: r } = e,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: c },
    } = t.appContext,
    i = s.get(e);
  let l;
  return (
    i
      ? (l = i)
      : !o.length && !n && !r
      ? (l = e)
      : ((l = {}), o.length && o.forEach((a) => yn(l, a, c, !0)), yn(l, e, c)),
    _e(e) && s.set(e, l),
    l
  );
}
function yn(t, e, n, r = !1) {
  const { mixins: o, extends: s } = e;
  s && yn(t, s, n, !0), o && o.forEach((c) => yn(t, c, n, !0));
  for (const c in e)
    if (!(r && c === "expose")) {
      const i = el[c] || (n && n[c]);
      t[c] = i ? i(t[c], e[c]) : e[c];
    }
  return t;
}
const el = {
  data: ho,
  props: go,
  emits: go,
  methods: Gt,
  computed: Gt,
  beforeCreate: Te,
  created: Te,
  beforeMount: Te,
  mounted: Te,
  beforeUpdate: Te,
  updated: Te,
  beforeDestroy: Te,
  beforeUnmount: Te,
  destroyed: Te,
  unmounted: Te,
  activated: Te,
  deactivated: Te,
  errorCaptured: Te,
  serverPrefetch: Te,
  components: Gt,
  directives: Gt,
  watch: nl,
  provide: ho,
  inject: tl,
};
function ho(t, e) {
  return e
    ? t
      ? function () {
          return Ae(
            K(t) ? t.call(this, this) : t,
            K(e) ? e.call(this, this) : e
          );
        }
      : e
    : t;
}
function tl(t, e) {
  return Gt(Cr(t), Cr(e));
}
function Cr(t) {
  if (H(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Te(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Gt(t, e) {
  return t ? Ae(Object.create(null), t, e) : e;
}
function go(t, e) {
  return t
    ? H(t) && H(e)
      ? [...new Set([...t, ...e])]
      : Ae(Object.create(null), fo(t), fo(e ?? {}))
    : e;
}
function nl(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = Ae(Object.create(null), t);
  for (const r in e) n[r] = Te(t[r], e[r]);
  return n;
}
function oc() {
  return {
    app: null,
    config: {
      isNativeTag: Mc,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let rl = 0;
function ol(t, e) {
  return function (r, o = null) {
    K(r) || (r = Ae({}, r)), o != null && !_e(o) && (o = null);
    const s = oc(),
      c = new WeakSet();
    let i = !1;
    const l = (s.app = {
      _uid: rl++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: ql,
      get config() {
        return s.config;
      },
      set config(a) {},
      use(a, ...u) {
        return (
          c.has(a) ||
            (a && K(a.install)
              ? (c.add(a), a.install(l, ...u))
              : K(a) && (c.add(a), a(l, ...u))),
          l
        );
      },
      mixin(a) {
        return s.mixins.includes(a) || s.mixins.push(a), l;
      },
      component(a, u) {
        return u ? ((s.components[a] = u), l) : s.components[a];
      },
      directive(a, u) {
        return u ? ((s.directives[a] = u), l) : s.directives[a];
      },
      mount(a, u, f) {
        if (!i) {
          const h = we(r, o);
          return (
            (h.appContext = s),
            f === !0 ? (f = "svg") : f === !1 && (f = void 0),
            u && e ? e(h, a) : t(h, a, f),
            (i = !0),
            (l._container = a),
            (a.__vue_app__ = l),
            Wr(h.component) || h.component.proxy
          );
        }
      },
      unmount() {
        i && (t(null, l._container), delete l._container.__vue_app__);
      },
      provide(a, u) {
        return (s.provides[a] = u), l;
      },
      runWithContext(a) {
        Cn = l;
        try {
          return a();
        } finally {
          Cn = null;
        }
      },
    });
    return l;
  };
}
let Cn = null;
function sl(t, e) {
  if (Fe) {
    let n = Fe.provides;
    const r = Fe.parent && Fe.parent.provides;
    r === n && (n = Fe.provides = Object.create(r)), (n[t] = e);
  }
}
function _n(t, e, n = !1) {
  const r = Fe || Ie;
  if (r || Cn) {
    const o = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Cn._context.provides;
    if (o && t in o) return o[t];
    if (arguments.length > 1) return n && K(e) ? e.call(r && r.proxy) : e;
  }
}
function cl(t, e, n, r = !1) {
  const o = {},
    s = {};
  vn(s, Mn, 1), (t.propsDefaults = Object.create(null)), sc(t, e, o, s);
  for (const c in t.propsOptions[0]) c in o || (o[c] = void 0);
  n ? (t.props = r ? o : _i(o)) : t.type.props ? (t.props = o) : (t.props = s),
    (t.attrs = s);
}
function il(t, e, n, r) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: c },
    } = t,
    i = ie(o),
    [l] = t.propsOptions;
  let a = !1;
  if ((r || c > 0) && !(c & 16)) {
    if (c & 8) {
      const u = t.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let h = u[f];
        if (In(t.emitsOptions, h)) continue;
        const d = e[h];
        if (l)
          if (se(s, h)) d !== s[h] && ((s[h] = d), (a = !0));
          else {
            const _ = zt(h);
            o[_] = wr(l, i, _, d, t, !1);
          }
        else d !== s[h] && ((s[h] = d), (a = !0));
      }
    }
  } else {
    sc(t, e, o, s) && (a = !0);
    let u;
    for (const f in i)
      (!e || (!se(e, f) && ((u = Ot(f)) === f || !se(e, u)))) &&
        (l
          ? n &&
            (n[f] !== void 0 || n[u] !== void 0) &&
            (o[f] = wr(l, i, f, void 0, t, !0))
          : delete o[f]);
    if (s !== i)
      for (const f in s) (!e || !se(e, f)) && (delete s[f], (a = !0));
  }
  a && ot(t, "set", "$attrs");
}
function sc(t, e, n, r) {
  const [o, s] = t.propsOptions;
  let c = !1,
    i;
  if (e)
    for (let l in e) {
      if (gn(l)) continue;
      const a = e[l];
      let u;
      o && se(o, (u = zt(l)))
        ? !s || !s.includes(u)
          ? (n[u] = a)
          : ((i || (i = {}))[u] = a)
        : In(t.emitsOptions, l) ||
          ((!(l in r) || a !== r[l]) && ((r[l] = a), (c = !0)));
    }
  if (s) {
    const l = ie(n),
      a = i || me;
    for (let u = 0; u < s.length; u++) {
      const f = s[u];
      n[f] = wr(o, l, f, a[f], t, !se(a, f));
    }
  }
  return c;
}
function wr(t, e, n, r, o, s) {
  const c = t[n];
  if (c != null) {
    const i = se(c, "default");
    if (i && r === void 0) {
      const l = c.default;
      if (c.type !== Function && !c.skipFactory && K(l)) {
        const { propsDefaults: a } = o;
        if (n in a) r = a[n];
        else {
          const u = nn(o);
          (r = a[n] = l.call(null, e)), u();
        }
      } else r = l;
    }
    c[0] &&
      (s && !i ? (r = !1) : c[1] && (r === "" || r === Ot(n)) && (r = !0));
  }
  return r;
}
function cc(t, e, n = !1) {
  const r = e.propsCache,
    o = r.get(t);
  if (o) return o;
  const s = t.props,
    c = {},
    i = [];
  let l = !1;
  if (!K(t)) {
    const u = (f) => {
      l = !0;
      const [h, d] = cc(f, e, !0);
      Ae(c, h), d && i.push(...d);
    };
    !n && e.mixins.length && e.mixins.forEach(u),
      t.extends && u(t.extends),
      t.mixins && t.mixins.forEach(u);
  }
  if (!s && !l) return _e(t) && r.set(t, Ft), Ft;
  if (H(s))
    for (let u = 0; u < s.length; u++) {
      const f = zt(s[u]);
      mo(f) && (c[f] = me);
    }
  else if (s)
    for (const u in s) {
      const f = zt(u);
      if (mo(f)) {
        const h = s[u],
          d = (c[f] = H(h) || K(h) ? { type: h } : Ae({}, h));
        if (d) {
          const _ = vo(Boolean, d.type),
            b = vo(String, d.type);
          (d[0] = _ > -1),
            (d[1] = b < 0 || _ < b),
            (_ > -1 || se(d, "default")) && i.push(f);
        }
      }
    }
  const a = [c, i];
  return _e(t) && r.set(t, a), a;
}
function mo(t) {
  return t[0] !== "$";
}
function _o(t) {
  const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : t === null ? "null" : "";
}
function bo(t, e) {
  return _o(t) === _o(e);
}
function vo(t, e) {
  return H(e) ? e.findIndex((n) => bo(n, t)) : K(e) && bo(e, t) ? 0 : -1;
}
const ic = (t) => t[0] === "_" || t === "$stable",
  Hr = (t) => (H(t) ? t.map(Ye) : [Ye(t)]),
  ll = (t, e, n) => {
    if (e._n) return e;
    const r = Ks((...o) => Hr(e(...o)), n);
    return (r._c = !1), r;
  },
  lc = (t, e, n) => {
    const r = t._ctx;
    for (const o in t) {
      if (ic(o)) continue;
      const s = t[o];
      if (K(s)) e[o] = ll(o, s, r);
      else if (s != null) {
        const c = Hr(s);
        e[o] = () => c;
      }
    }
  },
  ac = (t, e) => {
    const n = Hr(e);
    t.slots.default = () => n;
  },
  al = (t, e) => {
    if (t.vnode.shapeFlag & 32) {
      const n = e._;
      n ? ((t.slots = ie(e)), vn(e, "_", n)) : lc(e, (t.slots = {}));
    } else (t.slots = {}), e && ac(t, e);
    vn(t.slots, Mn, 1);
  },
  ul = (t, e, n) => {
    const { vnode: r, slots: o } = t;
    let s = !0,
      c = me;
    if (r.shapeFlag & 32) {
      const i = e._;
      i
        ? n && i === 1
          ? (s = !1)
          : (Ae(o, e), !n && i === 1 && delete o._)
        : ((s = !e.$stable), lc(e, o)),
        (c = e);
    } else e && (ac(t, e), (c = { default: 1 }));
    if (s) for (const i in o) !ic(i) && c[i] == null && delete o[i];
  };
function Ar(t, e, n, r, o = !1) {
  if (H(t)) {
    t.forEach((h, d) => Ar(h, e && (H(e) ? e[d] : e), n, r, o));
    return;
  }
  if (Wt(r) && !o) return;
  const s = r.shapeFlag & 4 ? Wr(r.component) || r.component.proxy : r.el,
    c = o ? null : s,
    { i, r: l } = t,
    a = e && e.r,
    u = i.refs === me ? (i.refs = {}) : i.refs,
    f = i.setupState;
  if (
    (a != null &&
      a !== l &&
      (ye(a)
        ? ((u[a] = null), se(f, a) && (f[a] = null))
        : Pe(a) && (a.value = null)),
    K(l))
  )
    ht(l, i, 12, [c, u]);
  else {
    const h = ye(l),
      d = Pe(l),
      _ = t.f;
    if (h || d) {
      const b = () => {
        if (_) {
          const C = h ? (se(f, l) ? f[l] : u[l]) : l.value;
          o
            ? H(C) && Fr(C, s)
            : H(C)
            ? C.includes(s) || C.push(s)
            : h
            ? ((u[l] = [s]), se(f, l) && (f[l] = u[l]))
            : ((l.value = [s]), t.k && (u[t.k] = l.value));
        } else
          h
            ? ((u[l] = c), se(f, l) && (f[l] = c))
            : d && ((l.value = c), t.k && (u[t.k] = c));
      };
      o || _ ? b() : ((b.id = -1), Le(b, n));
    }
  }
}
const Le = zi;
function fl(t) {
  return pl(t);
}
function pl(t, e) {
  const n = ks();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: s,
      createElement: c,
      createText: i,
      createComment: l,
      setText: a,
      setElementText: u,
      parentNode: f,
      nextSibling: h,
      setScopeId: d = $e,
      insertStaticContent: _,
    } = t,
    b = (
      p,
      g,
      m,
      v = null,
      x = null,
      q = null,
      L = void 0,
      D = null,
      S = !!g.dynamicChildren
    ) => {
      if (p === g) return;
      p && !Ht(p, g) && ((v = Ce(p)), re(p, x, q, !0), (p = null)),
        g.patchFlag === -2 && ((S = !1), (g.dynamicChildren = null));
      const { type: y, ref: z, shapeFlag: O } = g;
      switch (y) {
        case Pn:
          C(p, g, m, v);
          break;
        case gt:
          E(p, g, m, v);
          break;
        case tr:
          p == null && w(g, m, v, L);
          break;
        case ge:
          qe(p, g, m, v, x, q, L, D, S);
          break;
        default:
          O & 1
            ? B(p, g, m, v, x, q, L, D, S)
            : O & 6
            ? Me(p, g, m, v, x, q, L, D, S)
            : (O & 64 || O & 128) && y.process(p, g, m, v, x, q, L, D, S, ct);
      }
      z != null && x && Ar(z, p && p.ref, q, g || p, !g);
    },
    C = (p, g, m, v) => {
      if (p == null) r((g.el = i(g.children)), m, v);
      else {
        const x = (g.el = p.el);
        g.children !== p.children && a(x, g.children);
      }
    },
    E = (p, g, m, v) => {
      p == null ? r((g.el = l(g.children || "")), m, v) : (g.el = p.el);
    },
    w = (p, g, m, v) => {
      [p.el, p.anchor] = _(p.children, g, m, v, p.el, p.anchor);
    },
    A = ({ el: p, anchor: g }, m, v) => {
      let x;
      for (; p && p !== g; ) (x = h(p)), r(p, m, v), (p = x);
      r(g, m, v);
    },
    I = ({ el: p, anchor: g }) => {
      let m;
      for (; p && p !== g; ) (m = h(p)), o(p), (p = m);
      o(g);
    },
    B = (p, g, m, v, x, q, L, D, S) => {
      g.type === "svg" ? (L = "svg") : g.type === "math" && (L = "mathml"),
        p == null ? k(g, m, v, x, q, L, D, S) : Ee(p, g, x, q, L, D, S);
    },
    k = (p, g, m, v, x, q, L, D) => {
      let S, y;
      const { props: z, shapeFlag: O, transition: M, dirs: j } = p;
      if (
        ((S = p.el = c(p.type, q, z && z.is, z)),
        O & 8
          ? u(S, p.children)
          : O & 16 && X(p.children, S, null, v, x, er(p, q), L, D),
        j && _t(p, null, v, "created"),
        U(S, p, p.scopeId, L, v),
        z)
      ) {
        for (const ne in z)
          ne !== "value" &&
            !gn(ne) &&
            s(S, ne, null, z[ne], q, p.children, v, x, oe);
        "value" in z && s(S, "value", null, z.value, q),
          (y = z.onVnodeBeforeMount) && Ke(y, v, p);
      }
      j && _t(p, null, v, "beforeMount");
      const J = hl(x, M);
      J && M.beforeEnter(S),
        r(S, g, m),
        ((y = z && z.onVnodeMounted) || J || j) &&
          Le(() => {
            y && Ke(y, v, p), J && M.enter(S), j && _t(p, null, v, "mounted");
          }, x);
    },
    U = (p, g, m, v, x) => {
      if ((m && d(p, m), v)) for (let q = 0; q < v.length; q++) d(p, v[q]);
      if (x) {
        let q = x.subTree;
        if (g === q) {
          const L = x.vnode;
          U(p, L, L.scopeId, L.slotScopeIds, x.parent);
        }
      }
    },
    X = (p, g, m, v, x, q, L, D, S = 0) => {
      for (let y = S; y < p.length; y++) {
        const z = (p[y] = D ? ut(p[y]) : Ye(p[y]));
        b(null, z, g, m, v, x, q, L, D);
      }
    },
    Ee = (p, g, m, v, x, q, L) => {
      const D = (g.el = p.el);
      let { patchFlag: S, dynamicChildren: y, dirs: z } = g;
      S |= p.patchFlag & 16;
      const O = p.props || me,
        M = g.props || me;
      let j;
      if (
        (m && bt(m, !1),
        (j = M.onVnodeBeforeUpdate) && Ke(j, m, g, p),
        z && _t(g, p, m, "beforeUpdate"),
        m && bt(m, !0),
        y
          ? G(p.dynamicChildren, y, D, m, v, er(g, x), q)
          : L || T(p, g, D, null, m, v, er(g, x), q, !1),
        S > 0)
      ) {
        if (S & 16) ee(D, g, O, M, m, v, x);
        else if (
          (S & 2 && O.class !== M.class && s(D, "class", null, M.class, x),
          S & 4 && s(D, "style", O.style, M.style, x),
          S & 8)
        ) {
          const J = g.dynamicProps;
          for (let ne = 0; ne < J.length; ne++) {
            const he = J[ne],
              xe = O[he],
              Se = M[he];
            (Se !== xe || he === "value") &&
              s(D, he, xe, Se, x, p.children, m, v, oe);
          }
        }
        S & 1 && p.children !== g.children && u(D, g.children);
      } else !L && y == null && ee(D, g, O, M, m, v, x);
      ((j = M.onVnodeUpdated) || z) &&
        Le(() => {
          j && Ke(j, m, g, p), z && _t(g, p, m, "updated");
        }, v);
    },
    G = (p, g, m, v, x, q, L) => {
      for (let D = 0; D < g.length; D++) {
        const S = p[D],
          y = g[D],
          z =
            S.el && (S.type === ge || !Ht(S, y) || S.shapeFlag & 70)
              ? f(S.el)
              : m;
        b(S, y, z, null, v, x, q, L, !0);
      }
    },
    ee = (p, g, m, v, x, q, L) => {
      if (m !== v) {
        if (m !== me)
          for (const D in m)
            !gn(D) && !(D in v) && s(p, D, m[D], null, L, g.children, x, q, oe);
        for (const D in v) {
          if (gn(D)) continue;
          const S = v[D],
            y = m[D];
          S !== y && D !== "value" && s(p, D, y, S, L, g.children, x, q, oe);
        }
        "value" in v && s(p, "value", m.value, v.value, L);
      }
    },
    qe = (p, g, m, v, x, q, L, D, S) => {
      const y = (g.el = p ? p.el : i("")),
        z = (g.anchor = p ? p.anchor : i(""));
      let { patchFlag: O, dynamicChildren: M, slotScopeIds: j } = g;
      j && (D = D ? D.concat(j) : j),
        p == null
          ? (r(y, m, v), r(z, m, v), X(g.children || [], m, z, x, q, L, D, S))
          : O > 0 && O & 64 && M && p.dynamicChildren
          ? (G(p.dynamicChildren, M, m, x, q, L, D),
            (g.key != null || (x && g === x.subTree)) && uc(p, g, !0))
          : T(p, g, m, z, x, q, L, D, S);
    },
    Me = (p, g, m, v, x, q, L, D, S) => {
      (g.slotScopeIds = D),
        p == null
          ? g.shapeFlag & 512
            ? x.ctx.activate(g, m, v, L, S)
            : F(g, m, v, x, q, L, S)
          : fe(p, g, S);
    },
    F = (p, g, m, v, x, q, L) => {
      const D = (p.component = yl(p, v, x));
      if ((Qs(p) && (D.ctx.renderer = ct), Cl(D), D.asyncDep)) {
        if ((x && x.registerDep(D, $), !p.el)) {
          const S = (D.subTree = we(gt));
          E(null, S, g, m);
        }
      } else $(D, p, g, m, x, q, L);
    },
    fe = (p, g, m) => {
      const v = (g.component = p.component);
      if (Fi(p, g, m))
        if (v.asyncDep && !v.asyncResolved) {
          Y(v, g, m);
          return;
        } else (v.next = g), Ai(v.update), (v.effect.dirty = !0), v.update();
      else (g.el = p.el), (v.vnode = g);
    },
    $ = (p, g, m, v, x, q, L) => {
      const D = () => {
          if (p.isMounted) {
            let { next: z, bu: O, u: M, parent: j, vnode: J } = p;
            {
              const R = fc(p);
              if (R) {
                z && ((z.el = J.el), Y(p, z, L)),
                  R.asyncDep.then(() => {
                    p.isUnmounted || D();
                  });
                return;
              }
            }
            let ne = z,
              he;
            bt(p, !1),
              z ? ((z.el = J.el), Y(p, z, L)) : (z = J),
              O && Kn(O),
              (he = z.props && z.props.onVnodeBeforeUpdate) && Ke(he, j, z, J),
              bt(p, !0);
            const xe = Yn(p),
              Se = p.subTree;
            (p.subTree = xe),
              b(Se, xe, f(Se.el), Ce(Se), p, x, q),
              (z.el = xe.el),
              ne === null && Ri(p, xe.el),
              M && Le(M, x),
              (he = z.props && z.props.onVnodeUpdated) &&
                Le(() => Ke(he, j, z, J), x);
          } else {
            let z;
            const { el: O, props: M } = g,
              { bm: j, m: J, parent: ne } = p,
              he = Wt(g);
            if (
              (bt(p, !1),
              j && Kn(j),
              !he && (z = M && M.onVnodeBeforeMount) && Ke(z, ne, g),
              bt(p, !0),
              O && Vt)
            ) {
              const xe = () => {
                (p.subTree = Yn(p)), Vt(O, p.subTree, p, x, null);
              };
              he
                ? g.type.__asyncLoader().then(() => !p.isUnmounted && xe())
                : xe();
            } else {
              const xe = (p.subTree = Yn(p));
              b(null, xe, m, v, p, x, q), (g.el = xe.el);
            }
            if ((J && Le(J, x), !he && (z = M && M.onVnodeMounted))) {
              const xe = g;
              Le(() => Ke(z, ne, xe), x);
            }
            (g.shapeFlag & 256 ||
              (ne && Wt(ne.vnode) && ne.vnode.shapeFlag & 256)) &&
              p.a &&
              Le(p.a, x),
              (p.isMounted = !0),
              (g = m = v = null);
          }
        },
        S = (p.effect = new Ir(D, $e, () => Ur(y), p.scope)),
        y = (p.update = () => {
          S.dirty && S.run();
        });
      (y.id = p.uid), bt(p, !0), y();
    },
    Y = (p, g, m) => {
      g.component = p;
      const v = p.vnode.props;
      (p.vnode = g),
        (p.next = null),
        il(p, g.props, v, m),
        ul(p, g.children, m),
        At(),
        lo(p),
        Et();
    },
    T = (p, g, m, v, x, q, L, D, S = !1) => {
      const y = p && p.children,
        z = p ? p.shapeFlag : 0,
        O = g.children,
        { patchFlag: M, shapeFlag: j } = g;
      if (M > 0) {
        if (M & 128) {
          W(y, O, m, v, x, q, L, D, S);
          return;
        } else if (M & 256) {
          P(y, O, m, v, x, q, L, D, S);
          return;
        }
      }
      j & 8
        ? (z & 16 && oe(y, x, q), O !== y && u(m, O))
        : z & 16
        ? j & 16
          ? W(y, O, m, v, x, q, L, D, S)
          : oe(y, x, q, !0)
        : (z & 8 && u(m, ""), j & 16 && X(O, m, v, x, q, L, D, S));
    },
    P = (p, g, m, v, x, q, L, D, S) => {
      (p = p || Ft), (g = g || Ft);
      const y = p.length,
        z = g.length,
        O = Math.min(y, z);
      let M;
      for (M = 0; M < O; M++) {
        const j = (g[M] = S ? ut(g[M]) : Ye(g[M]));
        b(p[M], j, m, null, x, q, L, D, S);
      }
      y > z ? oe(p, x, q, !0, !1, O) : X(g, m, v, x, q, L, D, S, O);
    },
    W = (p, g, m, v, x, q, L, D, S) => {
      let y = 0;
      const z = g.length;
      let O = p.length - 1,
        M = z - 1;
      for (; y <= O && y <= M; ) {
        const j = p[y],
          J = (g[y] = S ? ut(g[y]) : Ye(g[y]));
        if (Ht(j, J)) b(j, J, m, null, x, q, L, D, S);
        else break;
        y++;
      }
      for (; y <= O && y <= M; ) {
        const j = p[O],
          J = (g[M] = S ? ut(g[M]) : Ye(g[M]));
        if (Ht(j, J)) b(j, J, m, null, x, q, L, D, S);
        else break;
        O--, M--;
      }
      if (y > O) {
        if (y <= M) {
          const j = M + 1,
            J = j < z ? g[j].el : v;
          for (; y <= M; )
            b(null, (g[y] = S ? ut(g[y]) : Ye(g[y])), m, J, x, q, L, D, S), y++;
        }
      } else if (y > M) for (; y <= O; ) re(p[y], x, q, !0), y++;
      else {
        const j = y,
          J = y,
          ne = new Map();
        for (y = J; y <= M; y++) {
          const ae = (g[y] = S ? ut(g[y]) : Ye(g[y]));
          ae.key != null && ne.set(ae.key, y);
        }
        let he,
          xe = 0;
        const Se = M - J + 1;
        let R = !1,
          V = 0;
        const ce = new Array(Se);
        for (y = 0; y < Se; y++) ce[y] = 0;
        for (y = j; y <= O; y++) {
          const ae = p[y];
          if (xe >= Se) {
            re(ae, x, q, !0);
            continue;
          }
          let de;
          if (ae.key != null) de = ne.get(ae.key);
          else
            for (he = J; he <= M; he++)
              if (ce[he - J] === 0 && Ht(ae, g[he])) {
                de = he;
                break;
              }
          de === void 0
            ? re(ae, x, q, !0)
            : ((ce[de - J] = y + 1),
              de >= V ? (V = de) : (R = !0),
              b(ae, g[de], m, null, x, q, L, D, S),
              xe++);
        }
        const ke = R ? dl(ce) : Ft;
        for (he = ke.length - 1, y = Se - 1; y >= 0; y--) {
          const ae = J + y,
            de = g[ae],
            Oe = ae + 1 < z ? g[ae + 1].el : v;
          ce[y] === 0
            ? b(null, de, m, Oe, x, q, L, D, S)
            : R && (he < 0 || y !== ke[he] ? ue(de, m, Oe, 2) : he--);
        }
      }
    },
    ue = (p, g, m, v, x = null) => {
      const { el: q, type: L, transition: D, children: S, shapeFlag: y } = p;
      if (y & 6) {
        ue(p.component.subTree, g, m, v);
        return;
      }
      if (y & 128) {
        p.suspense.move(g, m, v);
        return;
      }
      if (y & 64) {
        L.move(p, g, m, ct);
        return;
      }
      if (L === ge) {
        r(q, g, m);
        for (let O = 0; O < S.length; O++) ue(S[O], g, m, v);
        r(p.anchor, g, m);
        return;
      }
      if (L === tr) {
        A(p, g, m);
        return;
      }
      if (v !== 2 && y & 1 && D)
        if (v === 0) D.beforeEnter(q), r(q, g, m), Le(() => D.enter(q), x);
        else {
          const { leave: O, delayLeave: M, afterLeave: j } = D,
            J = () => r(q, g, m),
            ne = () => {
              O(q, () => {
                J(), j && j();
              });
            };
          M ? M(q, J, ne) : ne();
        }
      else r(q, g, m);
    },
    re = (p, g, m, v = !1, x = !1) => {
      const {
        type: q,
        props: L,
        ref: D,
        children: S,
        dynamicChildren: y,
        shapeFlag: z,
        patchFlag: O,
        dirs: M,
      } = p;
      if ((D != null && Ar(D, null, m, p, !0), z & 256)) {
        g.ctx.deactivate(p);
        return;
      }
      const j = z & 1 && M,
        J = !Wt(p);
      let ne;
      if ((J && (ne = L && L.onVnodeBeforeUnmount) && Ke(ne, g, p), z & 6))
        pe(p.component, m, v);
      else {
        if (z & 128) {
          p.suspense.unmount(m, v);
          return;
        }
        j && _t(p, null, g, "beforeUnmount"),
          z & 64
            ? p.type.remove(p, g, m, x, ct, v)
            : y && (q !== ge || (O > 0 && O & 64))
            ? oe(y, g, m, !1, !0)
            : ((q === ge && O & 384) || (!x && z & 16)) && oe(S, g, m),
          v && te(p);
      }
      ((J && (ne = L && L.onVnodeUnmounted)) || j) &&
        Le(() => {
          ne && Ke(ne, g, p), j && _t(p, null, g, "unmounted");
        }, m);
    },
    te = (p) => {
      const { type: g, el: m, anchor: v, transition: x } = p;
      if (g === ge) {
        ve(m, v);
        return;
      }
      if (g === tr) {
        I(p);
        return;
      }
      const q = () => {
        o(m), x && !x.persisted && x.afterLeave && x.afterLeave();
      };
      if (p.shapeFlag & 1 && x && !x.persisted) {
        const { leave: L, delayLeave: D } = x,
          S = () => L(m, q);
        D ? D(p.el, q, S) : S();
      } else q();
    },
    ve = (p, g) => {
      let m;
      for (; p !== g; ) (m = h(p)), o(p), (p = m);
      o(g);
    },
    pe = (p, g, m) => {
      const { bum: v, scope: x, update: q, subTree: L, um: D } = p;
      v && Kn(v),
        x.stop(),
        q && ((q.active = !1), re(L, p, g, m)),
        D && Le(D, g),
        Le(() => {
          p.isUnmounted = !0;
        }, g),
        g &&
          g.pendingBranch &&
          !g.isUnmounted &&
          p.asyncDep &&
          !p.asyncResolved &&
          p.suspenseId === g.pendingId &&
          (g.deps--, g.deps === 0 && g.resolve());
    },
    oe = (p, g, m, v = !1, x = !1, q = 0) => {
      for (let L = q; L < p.length; L++) re(p[L], g, m, v, x);
    },
    Ce = (p) =>
      p.shapeFlag & 6
        ? Ce(p.component.subTree)
        : p.shapeFlag & 128
        ? p.suspense.next()
        : h(p.anchor || p.el);
  let Re = !1;
  const Ze = (p, g, m) => {
      p == null
        ? g._vnode && re(g._vnode, null, null, !0)
        : b(g._vnode || null, p, g, null, null, null, m),
        Re || ((Re = !0), lo(), Hs(), (Re = !1)),
        (g._vnode = p);
    },
    ct = {
      p: b,
      um: re,
      m: ue,
      r: te,
      mt: F,
      mc: X,
      pc: T,
      pbc: G,
      n: Ce,
      o: t,
    };
  let Ut, Vt;
  return (
    e && ([Ut, Vt] = e(ct)), { render: Ze, hydrate: Ut, createApp: ol(Ze, Ut) }
  );
}
function er({ type: t, props: e }, n) {
  return (n === "svg" && t === "foreignObject") ||
    (n === "mathml" &&
      t === "annotation-xml" &&
      e &&
      e.encoding &&
      e.encoding.includes("html"))
    ? void 0
    : n;
}
function bt({ effect: t, update: e }, n) {
  t.allowRecurse = e.allowRecurse = n;
}
function hl(t, e) {
  return (!t || (t && !t.pendingBranch)) && e && !e.persisted;
}
function uc(t, e, n = !1) {
  const r = t.children,
    o = e.children;
  if (H(r) && H(o))
    for (let s = 0; s < r.length; s++) {
      const c = r[s];
      let i = o[s];
      i.shapeFlag & 1 &&
        !i.dynamicChildren &&
        ((i.patchFlag <= 0 || i.patchFlag === 32) &&
          ((i = o[s] = ut(o[s])), (i.el = c.el)),
        n || uc(c, i)),
        i.type === Pn && (i.el = c.el);
    }
}
function dl(t) {
  const e = t.slice(),
    n = [0];
  let r, o, s, c, i;
  const l = t.length;
  for (r = 0; r < l; r++) {
    const a = t[r];
    if (a !== 0) {
      if (((o = n[n.length - 1]), t[o] < a)) {
        (e[r] = o), n.push(r);
        continue;
      }
      for (s = 0, c = n.length - 1; s < c; )
        (i = (s + c) >> 1), t[n[i]] < a ? (s = i + 1) : (c = i);
      a < t[n[s]] && (s > 0 && (e[r] = n[s - 1]), (n[s] = r));
    }
  }
  for (s = n.length, c = n[s - 1]; s-- > 0; ) (n[s] = c), (c = e[c]);
  return n;
}
function fc(t) {
  const e = t.subTree.component;
  if (e) return e.asyncDep && !e.asyncResolved ? e : fc(e);
}
const gl = (t) => t.__isTeleport,
  ge = Symbol.for("v-fgt"),
  Pn = Symbol.for("v-txt"),
  gt = Symbol.for("v-cmt"),
  tr = Symbol.for("v-stc"),
  Kt = [];
let He = null;
function Z(t = !1) {
  Kt.push((He = t ? null : []));
}
function ml() {
  Kt.pop(), (He = Kt[Kt.length - 1] || null);
}
let tn = 1;
function xo(t) {
  tn += t;
}
function pc(t) {
  return (
    (t.dynamicChildren = tn > 0 ? He || Ft : null),
    ml(),
    tn > 0 && He && He.push(t),
    t
  );
}
function Q(t, e, n, r, o, s) {
  return pc(N(t, e, n, r, o, s, !0));
}
function wn(t, e, n, r, o) {
  return pc(we(t, e, n, r, o, !0));
}
function An(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Ht(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Mn = "__vInternal",
  hc = ({ key: t }) => t ?? null,
  bn = ({ ref: t, ref_key: e, ref_for: n }) => (
    typeof t == "number" && (t = "" + t),
    t != null
      ? ye(t) || Pe(t) || K(t)
        ? { i: Ie, r: t, k: e, f: !!n }
        : t
      : null
  );
function N(
  t,
  e = null,
  n = null,
  r = 0,
  o = null,
  s = t === ge ? 0 : 1,
  c = !1,
  i = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && hc(e),
    ref: e && bn(e),
    scopeId: Zs,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ie,
  };
  return (
    i
      ? (Gr(l, n), s & 128 && t.normalize(l))
      : n && (l.shapeFlag |= ye(n) ? 8 : 16),
    tn > 0 &&
      !c &&
      He &&
      (l.patchFlag > 0 || s & 6) &&
      l.patchFlag !== 32 &&
      He.push(l),
    l
  );
}
const we = _l;
function _l(t, e = null, n = null, r = 0, o = null, s = !1) {
  if (((!t || t === Li) && (t = gt), An(t))) {
    const i = Mt(t, e, !0);
    return (
      n && Gr(i, n),
      tn > 0 &&
        !s &&
        He &&
        (i.shapeFlag & 6 ? (He[He.indexOf(t)] = i) : He.push(i)),
      (i.patchFlag |= -2),
      i
    );
  }
  if ((Sl(t) && (t = t.__vccOpts), e)) {
    e = bl(e);
    let { class: i, style: l } = e;
    i && !ye(i) && (e.class = Yt(i)),
      _e(l) && (Ms(l) && !H(l) && (l = Ae({}, l)), (e.style = Lr(l)));
  }
  const c = ye(t) ? 1 : Ii(t) ? 128 : gl(t) ? 64 : _e(t) ? 4 : K(t) ? 2 : 0;
  return N(t, e, n, r, o, c, s, !0);
}
function bl(t) {
  return t ? (Ms(t) || Mn in t ? Ae({}, t) : t) : null;
}
function Mt(t, e, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: c } = t,
    i = e ? vl(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: i,
    key: i && hc(i),
    ref:
      e && e.ref ? (n && o ? (H(o) ? o.concat(bn(e)) : [o, bn(e)]) : bn(e)) : o,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: c,
    target: t.target,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    patchFlag: e && t.type !== ge ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: t.transition,
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && Mt(t.ssContent),
    ssFallback: t.ssFallback && Mt(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce,
  };
}
function dc(t = " ", e = 0) {
  return we(Pn, null, t, e);
}
function rt(t = "", e = !1) {
  return e ? (Z(), wn(gt, null, t)) : we(gt, null, t);
}
function Ye(t) {
  return t == null || typeof t == "boolean"
    ? we(gt)
    : H(t)
    ? we(ge, null, t.slice())
    : typeof t == "object"
    ? ut(t)
    : we(Pn, null, String(t));
}
function ut(t) {
  return (t.el === null && t.patchFlag !== -1) || t.memo ? t : Mt(t);
}
function Gr(t, e) {
  let n = 0;
  const { shapeFlag: r } = t;
  if (e == null) e = null;
  else if (H(e)) n = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const o = e.default;
      o && (o._c && (o._d = !1), Gr(t, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = e._;
      !o && !(Mn in e)
        ? (e._ctx = Ie)
        : o === 3 &&
          Ie &&
          (Ie.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (t.patchFlag |= 1024)));
    }
  else
    K(e)
      ? ((e = { default: e, _ctx: Ie }), (n = 32))
      : ((e = String(e)), r & 64 ? ((n = 16), (e = [dc(e)])) : (n = 8));
  (t.children = e), (t.shapeFlag |= n);
}
function vl(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    for (const o in r)
      if (o === "class")
        e.class !== r.class && (e.class = Yt([e.class, r.class]));
      else if (o === "style") e.style = Lr([e.style, r.style]);
      else if (qn(o)) {
        const s = e[o],
          c = r[o];
        c &&
          s !== c &&
          !(H(s) && s.includes(c)) &&
          (e[o] = s ? [].concat(s, c) : c);
      } else o !== "" && (e[o] = r[o]);
  }
  return e;
}
function Ke(t, e, n, r = null) {
  Ge(t, e, 7, [n, r]);
}
const xl = oc();
let kl = 0;
function yl(t, e, n) {
  const r = t.type,
    o = (e ? e.appContext : t.appContext) || xl,
    s = {
      uid: kl++,
      vnode: t,
      type: r,
      parent: e,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Kc(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e ? e.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: cc(r, o),
      emitsOptions: Ws(r, o),
      emit: null,
      emitted: null,
      propsDefaults: me,
      inheritAttrs: r.inheritAttrs,
      ctx: me,
      data: me,
      props: me,
      attrs: me,
      slots: me,
      refs: me,
      setupState: me,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = e ? e.root : s),
    (s.emit = Di.bind(null, s)),
    t.ce && t.ce(s),
    s
  );
}
let Fe = null,
  En,
  Er;
{
  const t = ks(),
    e = (n, r) => {
      let o;
      return (
        (o = t[n]) || (o = t[n] = []),
        o.push(r),
        (s) => {
          o.length > 1 ? o.forEach((c) => c(s)) : o[0](s);
        }
      );
    };
  (En = e("__VUE_INSTANCE_SETTERS__", (n) => (Fe = n))),
    (Er = e("__VUE_SSR_SETTERS__", (n) => (Nn = n)));
}
const nn = (t) => {
    const e = Fe;
    return (
      En(t),
      t.scope.on(),
      () => {
        t.scope.off(), En(e);
      }
    );
  },
  ko = () => {
    Fe && Fe.scope.off(), En(null);
  };
function gc(t) {
  return t.vnode.shapeFlag & 4;
}
let Nn = !1;
function Cl(t, e = !1) {
  e && Er(e);
  const { props: n, children: r } = t.vnode,
    o = gc(t);
  cl(t, n, o, e), al(t, r);
  const s = o ? wl(t, e) : void 0;
  return e && Er(!1), s;
}
function wl(t, e) {
  const n = t.type;
  (t.accessCache = Object.create(null)), (t.proxy = Ns(new Proxy(t.ctx, Yi)));
  const { setup: r } = n;
  if (r) {
    const o = (t.setupContext = r.length > 1 ? El(t) : null),
      s = nn(t);
    At();
    const c = ht(r, t, 0, [t.props, o]);
    if ((Et(), s(), _s(c))) {
      if ((c.then(ko, ko), e))
        return c
          .then((i) => {
            yo(t, i, e);
          })
          .catch((i) => {
            Ln(i, t, 0);
          });
      t.asyncDep = c;
    } else yo(t, c, e);
  } else mc(t, e);
}
function yo(t, e, n) {
  K(e)
    ? t.type.__ssrInlineRender
      ? (t.ssrRender = e)
      : (t.render = e)
    : _e(e) && (t.setupState = js(e)),
    mc(t, n);
}
let Co;
function mc(t, e, n) {
  const r = t.type;
  if (!t.render) {
    if (!e && Co && !r.render) {
      const o = r.template || Vr(t).template;
      if (o) {
        const { isCustomElement: s, compilerOptions: c } = t.appContext.config,
          { delimiters: i, compilerOptions: l } = r,
          a = Ae(Ae({ isCustomElement: s, delimiters: i }, c), l);
        r.render = Co(o, a);
      }
    }
    t.render = r.render || $e;
  }
  {
    const o = nn(t);
    At();
    try {
      Qi(t);
    } finally {
      Et(), o();
    }
  }
}
function Al(t) {
  return (
    t.attrsProxy ||
    (t.attrsProxy = new Proxy(t.attrs, {
      get(e, n) {
        return ze(t, "get", "$attrs"), e[n];
      },
    }))
  );
}
function El(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    get attrs() {
      return Al(t);
    },
    slots: t.slots,
    emit: t.emit,
    expose: e,
  };
}
function Wr(t) {
  if (t.exposed)
    return (
      t.exposeProxy ||
      (t.exposeProxy = new Proxy(js(Ns(t.exposed)), {
        get(e, n) {
          if (n in e) return e[n];
          if (n in Zt) return Zt[n](t);
        },
        has(e, n) {
          return n in e || n in Zt;
        },
      }))
    );
}
function Sl(t) {
  return K(t) && "__vccOpts" in t;
}
const _c = (t, e) => bi(t, e, Nn);
function Dl(t, e, n) {
  const r = arguments.length;
  return r === 2
    ? _e(e) && !H(e)
      ? An(e)
        ? we(t, null, [e])
        : we(t, e)
      : we(t, null, e)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && An(n) && (n = [n]),
      we(t, e, n));
}
const ql = "3.4.15";
/**
 * @vue/runtime-dom v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ const Tl = "http://www.w3.org/2000/svg",
  Fl = "http://www.w3.org/1998/Math/MathML",
  ft = typeof document < "u" ? document : null,
  wo = ft && ft.createElement("template"),
  Rl = {
    insert: (t, e, n) => {
      e.insertBefore(t, n || null);
    },
    remove: (t) => {
      const e = t.parentNode;
      e && e.removeChild(t);
    },
    createElement: (t, e, n, r) => {
      const o =
        e === "svg"
          ? ft.createElementNS(Tl, t)
          : e === "mathml"
          ? ft.createElementNS(Fl, t)
          : ft.createElement(t, n ? { is: n } : void 0);
      return (
        t === "select" &&
          r &&
          r.multiple != null &&
          o.setAttribute("multiple", r.multiple),
        o
      );
    },
    createText: (t) => ft.createTextNode(t),
    createComment: (t) => ft.createComment(t),
    setText: (t, e) => {
      t.nodeValue = e;
    },
    setElementText: (t, e) => {
      t.textContent = e;
    },
    parentNode: (t) => t.parentNode,
    nextSibling: (t) => t.nextSibling,
    querySelector: (t) => ft.querySelector(t),
    setScopeId(t, e) {
      t.setAttribute(e, "");
    },
    insertStaticContent(t, e, n, r, o, s) {
      const c = n ? n.previousSibling : e.lastChild;
      if (o && (o === s || o.nextSibling))
        for (
          ;
          e.insertBefore(o.cloneNode(!0), n),
            !(o === s || !(o = o.nextSibling));

        );
      else {
        wo.innerHTML =
          r === "svg"
            ? `<svg>${t}</svg>`
            : r === "mathml"
            ? `<math>${t}</math>`
            : t;
        const i = wo.content;
        if (r === "svg" || r === "mathml") {
          const l = i.firstChild;
          for (; l.firstChild; ) i.appendChild(l.firstChild);
          i.removeChild(l);
        }
        e.insertBefore(i, n);
      }
      return [
        c ? c.nextSibling : e.firstChild,
        n ? n.previousSibling : e.lastChild,
      ];
    },
  },
  Ll = Symbol("_vtc");
function Il(t, e, n) {
  const r = t[Ll];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")),
    e == null
      ? t.removeAttribute("class")
      : n
      ? t.setAttribute("class", e)
      : (t.className = e);
}
const zl = Symbol("_vod"),
  Pl = Symbol("");
function Ml(t, e, n) {
  const r = t.style,
    o = r.display,
    s = ye(n);
  if (n && !s) {
    if (e && !ye(e)) for (const c in e) n[c] == null && Sr(r, c, "");
    for (const c in n) Sr(r, c, n[c]);
  } else if (s) {
    if (e !== n) {
      const c = r[Pl];
      c && (n += ";" + c), (r.cssText = n);
    }
  } else e && t.removeAttribute("style");
  zl in t && (r.display = o);
}
const Ao = /\s*!important$/;
function Sr(t, e, n) {
  if (H(n)) n.forEach((r) => Sr(t, e, r));
  else if ((n == null && (n = ""), e.startsWith("--"))) t.setProperty(e, n);
  else {
    const r = Nl(t, e);
    Ao.test(n)
      ? t.setProperty(Ot(r), n.replace(Ao, ""), "important")
      : (t[r] = n);
  }
}
const Eo = ["Webkit", "Moz", "ms"],
  nr = {};
function Nl(t, e) {
  const n = nr[e];
  if (n) return n;
  let r = zt(e);
  if (r !== "filter" && r in t) return (nr[e] = r);
  r = xs(r);
  for (let o = 0; o < Eo.length; o++) {
    const s = Eo[o] + r;
    if (s in t) return (nr[e] = s);
  }
  return e;
}
const So = "http://www.w3.org/1999/xlink";
function Ol(t, e, n, r, o) {
  if (r && e.startsWith("xlink:"))
    n == null
      ? t.removeAttributeNS(So, e.slice(6, e.length))
      : t.setAttributeNS(So, e, n);
  else {
    const s = Zc(e);
    n == null || (s && !ys(n))
      ? t.removeAttribute(e)
      : t.setAttribute(e, s ? "" : n);
  }
}
function Bl(t, e, n, r, o, s, c) {
  if (e === "innerHTML" || e === "textContent") {
    r && c(r, o, s), (t[e] = n ?? "");
    return;
  }
  const i = t.tagName;
  if (e === "value" && i !== "PROGRESS" && !i.includes("-")) {
    t._value = n;
    const a = i === "OPTION" ? t.getAttribute("value") : t.value,
      u = n ?? "";
    a !== u && (t.value = u), n == null && t.removeAttribute(e);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof t[e];
    a === "boolean"
      ? (n = ys(n))
      : n == null && a === "string"
      ? ((n = ""), (l = !0))
      : a === "number" && ((n = 0), (l = !0));
  }
  try {
    t[e] = n;
  } catch {}
  l && t.removeAttribute(e);
}
function $l(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function jl(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
const Do = Symbol("_vei");
function Ul(t, e, n, r, o = null) {
  const s = t[Do] || (t[Do] = {}),
    c = s[e];
  if (r && c) c.value = r;
  else {
    const [i, l] = Vl(e);
    if (r) {
      const a = (s[e] = Wl(r, o));
      $l(t, i, a, l);
    } else c && (jl(t, i, c, l), (s[e] = void 0));
  }
}
const qo = /(?:Once|Passive|Capture)$/;
function Vl(t) {
  let e;
  if (qo.test(t)) {
    e = {};
    let r;
    for (; (r = t.match(qo)); )
      (t = t.slice(0, t.length - r[0].length)), (e[r[0].toLowerCase()] = !0);
  }
  return [t[2] === ":" ? t.slice(3) : Ot(t.slice(2)), e];
}
let rr = 0;
const Hl = Promise.resolve(),
  Gl = () => rr || (Hl.then(() => (rr = 0)), (rr = Date.now()));
function Wl(t, e) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Ge(Zl(r, n.value), e, 5, [r]);
  };
  return (n.value = t), (n.attached = Gl()), n;
}
function Zl(t, e) {
  if (H(e)) {
    const n = t.stopImmediatePropagation;
    return (
      (t.stopImmediatePropagation = () => {
        n.call(t), (t._stopped = !0);
      }),
      e.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return e;
}
const To = (t) =>
    t.charCodeAt(0) === 111 &&
    t.charCodeAt(1) === 110 &&
    t.charCodeAt(2) > 96 &&
    t.charCodeAt(2) < 123,
  Kl = (t, e, n, r, o, s, c, i, l) => {
    const a = o === "svg";
    e === "class"
      ? Il(t, r, a)
      : e === "style"
      ? Ml(t, n, r)
      : qn(e)
      ? Tr(e) || Ul(t, e, n, r, c)
      : (
          e[0] === "."
            ? ((e = e.slice(1)), !0)
            : e[0] === "^"
            ? ((e = e.slice(1)), !1)
            : Jl(t, e, r, a)
        )
      ? Bl(t, e, r, s, c, i, l)
      : (e === "true-value"
          ? (t._trueValue = r)
          : e === "false-value" && (t._falseValue = r),
        Ol(t, e, r, a));
  };
function Jl(t, e, n, r) {
  if (r)
    return !!(
      e === "innerHTML" ||
      e === "textContent" ||
      (e in t && To(e) && K(n))
    );
  if (
    e === "spellcheck" ||
    e === "draggable" ||
    e === "translate" ||
    e === "form" ||
    (e === "list" && t.tagName === "INPUT") ||
    (e === "type" && t.tagName === "TEXTAREA")
  )
    return !1;
  if (e === "width" || e === "height") {
    const o = t.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return To(e) && ye(n) ? !1 : e in t;
}
const Yl = Ae({ patchProp: Kl }, Rl);
let Fo;
function Ql() {
  return Fo || (Fo = fl(Yl));
}
const Xl = (...t) => {
  const e = Ql().createApp(...t),
    { mount: n } = e;
  return (
    (e.mount = (r) => {
      const o = ta(r);
      if (!o) return;
      const s = e._component;
      !K(s) && !s.render && !s.template && (s.template = o.innerHTML),
        (o.innerHTML = "");
      const c = n(o, !1, ea(o));
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        c
      );
    }),
    e
  );
};
function ea(t) {
  if (t instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function ta(t) {
  return ye(t) ? document.querySelector(t) : t;
}
const Dt = {
  name: "Joost Hobma",
  image: "./assets/img/jossafossa.jpg",
  linksLabel: "Portfolio:",
  links: [
    { url: "https://www.jossafossa.nl", label: "jossafossa.nl" },
    { url: "https://codepen.io/Jossafossa", label: "codepen.io" },
  ],
  contactInfo: [
    { label: "Email", value: "joosthobma@gmail.com" },
    { label: "Telefoon", value: "+31 612631823" },
    { label: "Adres", value: "Groningen" },
  ],
  footer: { label: "Gemaakt met VueJS" },
  sections: [
    {
      type: "content",
      title: "Over mij",
      content: `
Hoi, ik ben Joost, een **full stack** developer uit Friesland, maar gehuisvest in Groningen. Ik ben al sinds 2016 werkzaam bij verschillende bedrijven in webdevelopment land. Ik heb veel ervaring met het bouwen van custom **WordPress** Thema's van frontend tot backend, van statische content tot **Webshops**, **Configurators**, **API-koppelingen** en **Plug-ins** bouwen. Dit is niet alleen WordPress specifieke kennis, maar ook veel **JavaScript** (custom, **VueJS**, **React**), **SCSS**, **PHP** en **HTML**. Als ik thuis ben, slinger ik meestal meteen de computer aan om thuis verder te werken aan mijn eigen projecten. Ik raak niet snel uitgekeken op het webdevelopment vak en ben altijd op zoek naar nieuwe dingen om te bouwen.

Naast webdevelopment ben ik ook een groot fan van **pixel art** en **game development**. Ik heb laatst mijn eerste pack met game assets uitgebracht op [itch.io](https://jossafossa.itch.io/mansion-indoor-tileset). Ook heb ik meegedaan aan meerdere **Hackathons** en **Game Jams**. Tijdens gamejams heb ik mijn skills kunnen uitbreiden met **pixel art**, **3D Modeling** en **Game Development**. Tijdens gamejams moet je werken met een strakke deadline en dat is een goede manier te leren werken onder druk, knopen door te hakken en snel te schakelen.`,
    },
    {
      type: "content",
      title: "Dit vind ik belangrijk",
      content:
        "\n- Ik houd van **Leesbare code**. Zelfs zonder documentatie moet de code duidelijk zijn.\n- Ik houd van **modulaire en herbruikbare code**. Waar mogelijk maak ik gebruik van **componenten**.\n- Ik houd van **atomic functies** met 1 simpele functie.\n- Ik houd van **lightweight** oplossingen. Voor webdevelopment zoek ik eerst de oplossing in HTML dan CSS en dan JavaScript.\n- Ik houd van **early return** boven nested if statements.\n- Ik houd van veilige code. \n- Ik houd van **semantisch kloppende HTML en CSS**.\n- Ik houd van duidelijke **coding standards**.\n- Ik houd van `var()`, `flexbox`, `grid`, `gaps`, `:has()`, `:where()`, `<dialog>`, `async`, `await`, `import()`, `Promises`, `?.`, `...` & `const`. \n- Ik houd van een efficiënte en consistente workflow.\n- Ik houd van consistente user interfaces.\n- Ik houd een **gebruiksvriendelijke** backend. \n- Ik houd van andere **mensen helpen** en **kennis delen**.\n- Ik houd van duidelijke **efficiënt communicatie**.\n\n",
    },
    {
      type: "educations",
      title: "Werkervaring",
      educations: [
        {
          title: "B2DESIGN",
          attributes: { Functie: "Full-stack Developer", locatie: "Groningen" },
          time: "Aug `20 - heden",
        },
        {
          title: "Nordique",
          attributes: { Functie: "Front-end Developer", locatie: "Groningen" },
          time: "Sep `19 - Mar `20",
        },
        {
          title: "MediaSoep",
          attributes: { Functie: "Front-end Developer", locatie: "Joure" },
          time: "Aug `16 - Jan `17",
        },
        {
          title: "ZZP",
          attributes: {
            Bedrijf: "JossaFossa",
            werkzaamheden: "Webdesign & graphic design",
          },
          time: "`22 - heden",
        },
      ],
    },
    {
      type: "educations",
      title: "Opleidingen",
      educations: [
        {
          title: "HBO-ICT",
          attributes: {
            School: "Hanze Hogeschool Groningen",
            locatie: "Groningen",
            specialisatie: "Software Engineering",
          },
          time: "sep `17 - aug `20",
        },
        {
          title: "Mediavormgeving",
          attributes: {
            School: "Friesland College",
            locatie: "Heerenveen",
            specialisatie: "Interactief",
            niveau: "MBO 4",
          },
          time: "Feb `14 - Juli `17",
        },
      ],
    },
    {
      type: "projects",
      title: "Projecten",
      projects: [
        {
          title: "GeA Fairplay",
          url: "https://www.gea-fairplay.nl",
          tags: ["Wordpress"],
          image: "gea-fairplay.png",
        },
        {
          title: "Compact CSS Grid",
          url: "https://codepen.io/Jossafossa/pen/QWrdaaj",
          image: "css-grid.png",
          tags: ["CSS", "SCSS"],
          description:
            "Een compact / flexibel CSS grid systeem. Maak veel gebruik van `css var` en `calc`. Heeft zelfde functionaliteit als **Boostrap**",
        },
      ],
    },
    {
      type: "attributes",
      qualities: {
        title: "Kwaliteiten",
        items: [
          { label: "Creatief", icon: "fa fa-paint-brush" },
          { label: "Optimistisch", icon: "fa fa-smile-o" },
          { label: "Enthousiast", icon: "fa fa-thumbs-o-up" },
          { label: "Zelfstandig", icon: "fa fa-user" },
          { label: "Perfectionistisch", icon: "fa fa-check" },
          { label: "Innovatief", icon: "fa fa-lightbulb-o" },
        ],
      },
      interests: {
        title: "Interesses",
        items: [
          { label: "Webdevelopment", icon: "fa fa-code" },
          { label: "Graphic Design", icon: "fa fa-paint-brush" },
          { label: "Game development", icon: "fa fa-gamepad" },
          { label: "Pixelart", icon: "fa fa-paint-brush" },
          { label: "Audio apparatuur", icon: "fa fa-microphone" },
          { label: "Bas, gitaar & drum", icon: "fa fa-music" },
        ],
      },
      skills: {
        title: "Skills",
        skills: [
          {
            title: "Frontend",
            items: [
              { label: "HTML5", rating: 5, suffix: "Geavanceerd" },
              { label: "CSS/SCSS", rating: 5, suffix: "Geavanceerd" },
              { label: "JavaScript", rating: 5, suffix: "Geavanceerd" },
              { label: "VueJS", rating: 4, suffix: "Goed" },
              { label: "React", rating: 4, suffix: "Goed" },
              { label: "Webpack/Vite", rating: 3, suffix: "Gemiddeld" },
            ],
          },
          {
            title: "Backend",
            items: [
              { label: "PHP", rating: 5, suffix: "Geavanceerd" },
              { label: "Wordpress", rating: 5, suffix: "Geavanceerd" },
              { label: "MySQL", rating: 3, suffix: "Gemiddeld" },
              { label: "Python", rating: 3, suffix: "Gemiddeld" },
              { label: "Unity", rating: 3, suffix: "Gemiddeld" },
            ],
          },
          {
            title: "Frameworks",
            items: [
              { label: "Bootstrap", rating: 5, suffix: "Geavanceerd" },
              { label: "Foundation", rating: 5, suffix: "Goed" },
            ],
          },
          {
            title: "Tools",
            items: [
              { label: "VSCode", rating: 5, suffix: "Geavanceerd" },
              { label: "Git/Bitbucket", rating: 4, suffix: "Goed" },
              { label: "Illustrator", rating: 5, suffix: "Geavanceerd" },
              { label: "Figma", rating: 4, suffix: "Goed" },
              { label: "Premiere Pro", rating: 4, suffix: "Goed" },
              { label: "After Effects", rating: 4, suffix: "Goed" },
              { label: "Photoshop", rating: 3, suffix: "Gemiddeld" },
              { label: "Blender", rating: 3, suffix: "Gemiddeld" },
            ],
          },
          {
            title: "Talen",
            items: [
              { label: "Nederlands", rating: 5, suffix: "Moedertaal" },
              { label: "Engels", rating: 4, suffix: "Good" },
              { label: "Fries", rating: 2, suffix: "Begrinzgje" },
            ],
          },
        ],
      },
    },
  ],
};
var le = {};
const na = "Á",
  ra = "á",
  oa = "Ă",
  sa = "ă",
  ca = "∾",
  ia = "∿",
  la = "∾̳",
  aa = "Â",
  ua = "â",
  fa = "´",
  pa = "А",
  ha = "а",
  da = "Æ",
  ga = "æ",
  ma = "⁡",
  _a = "𝔄",
  ba = "𝔞",
  va = "À",
  xa = "à",
  ka = "ℵ",
  ya = "ℵ",
  Ca = "Α",
  wa = "α",
  Aa = "Ā",
  Ea = "ā",
  Sa = "⨿",
  Da = "&",
  qa = "&",
  Ta = "⩕",
  Fa = "⩓",
  Ra = "∧",
  La = "⩜",
  Ia = "⩘",
  za = "⩚",
  Pa = "∠",
  Ma = "⦤",
  Na = "∠",
  Oa = "⦨",
  Ba = "⦩",
  $a = "⦪",
  ja = "⦫",
  Ua = "⦬",
  Va = "⦭",
  Ha = "⦮",
  Ga = "⦯",
  Wa = "∡",
  Za = "∟",
  Ka = "⊾",
  Ja = "⦝",
  Ya = "∢",
  Qa = "Å",
  Xa = "⍼",
  eu = "Ą",
  tu = "ą",
  nu = "𝔸",
  ru = "𝕒",
  ou = "⩯",
  su = "≈",
  cu = "⩰",
  iu = "≊",
  lu = "≋",
  au = "'",
  uu = "⁡",
  fu = "≈",
  pu = "≊",
  hu = "Å",
  du = "å",
  gu = "𝒜",
  mu = "𝒶",
  _u = "≔",
  bu = "*",
  vu = "≈",
  xu = "≍",
  ku = "Ã",
  yu = "ã",
  Cu = "Ä",
  wu = "ä",
  Au = "∳",
  Eu = "⨑",
  Su = "≌",
  Du = "϶",
  qu = "‵",
  Tu = "∽",
  Fu = "⋍",
  Ru = "∖",
  Lu = "⫧",
  Iu = "⊽",
  zu = "⌅",
  Pu = "⌆",
  Mu = "⌅",
  Nu = "⎵",
  Ou = "⎶",
  Bu = "≌",
  $u = "Б",
  ju = "б",
  Uu = "„",
  Vu = "∵",
  Hu = "∵",
  Gu = "∵",
  Wu = "⦰",
  Zu = "϶",
  Ku = "ℬ",
  Ju = "ℬ",
  Yu = "Β",
  Qu = "β",
  Xu = "ℶ",
  ef = "≬",
  tf = "𝔅",
  nf = "𝔟",
  rf = "⋂",
  of = "◯",
  sf = "⋃",
  cf = "⨀",
  lf = "⨁",
  af = "⨂",
  uf = "⨆",
  ff = "★",
  pf = "▽",
  hf = "△",
  df = "⨄",
  gf = "⋁",
  mf = "⋀",
  _f = "⤍",
  bf = "⧫",
  vf = "▪",
  xf = "▴",
  kf = "▾",
  yf = "◂",
  Cf = "▸",
  wf = "␣",
  Af = "▒",
  Ef = "░",
  Sf = "▓",
  Df = "█",
  qf = "=⃥",
  Tf = "≡⃥",
  Ff = "⫭",
  Rf = "⌐",
  Lf = "𝔹",
  If = "𝕓",
  zf = "⊥",
  Pf = "⊥",
  Mf = "⋈",
  Nf = "⧉",
  Of = "┐",
  Bf = "╕",
  $f = "╖",
  jf = "╗",
  Uf = "┌",
  Vf = "╒",
  Hf = "╓",
  Gf = "╔",
  Wf = "─",
  Zf = "═",
  Kf = "┬",
  Jf = "╤",
  Yf = "╥",
  Qf = "╦",
  Xf = "┴",
  ep = "╧",
  tp = "╨",
  np = "╩",
  rp = "⊟",
  op = "⊞",
  sp = "⊠",
  cp = "┘",
  ip = "╛",
  lp = "╜",
  ap = "╝",
  up = "└",
  fp = "╘",
  pp = "╙",
  hp = "╚",
  dp = "│",
  gp = "║",
  mp = "┼",
  _p = "╪",
  bp = "╫",
  vp = "╬",
  xp = "┤",
  kp = "╡",
  yp = "╢",
  Cp = "╣",
  wp = "├",
  Ap = "╞",
  Ep = "╟",
  Sp = "╠",
  Dp = "‵",
  qp = "˘",
  Tp = "˘",
  Fp = "¦",
  Rp = "𝒷",
  Lp = "ℬ",
  Ip = "⁏",
  zp = "∽",
  Pp = "⋍",
  Mp = "⧅",
  Np = "\\",
  Op = "⟈",
  Bp = "•",
  $p = "•",
  jp = "≎",
  Up = "⪮",
  Vp = "≏",
  Hp = "≎",
  Gp = "≏",
  Wp = "Ć",
  Zp = "ć",
  Kp = "⩄",
  Jp = "⩉",
  Yp = "⩋",
  Qp = "∩",
  Xp = "⋒",
  eh = "⩇",
  th = "⩀",
  nh = "ⅅ",
  rh = "∩︀",
  oh = "⁁",
  sh = "ˇ",
  ch = "ℭ",
  ih = "⩍",
  lh = "Č",
  ah = "č",
  uh = "Ç",
  fh = "ç",
  ph = "Ĉ",
  hh = "ĉ",
  dh = "∰",
  gh = "⩌",
  mh = "⩐",
  _h = "Ċ",
  bh = "ċ",
  vh = "¸",
  xh = "¸",
  kh = "⦲",
  yh = "¢",
  Ch = "·",
  wh = "·",
  Ah = "𝔠",
  Eh = "ℭ",
  Sh = "Ч",
  Dh = "ч",
  qh = "✓",
  Th = "✓",
  Fh = "Χ",
  Rh = "χ",
  Lh = "ˆ",
  Ih = "≗",
  zh = "↺",
  Ph = "↻",
  Mh = "⊛",
  Nh = "⊚",
  Oh = "⊝",
  Bh = "⊙",
  $h = "®",
  jh = "Ⓢ",
  Uh = "⊖",
  Vh = "⊕",
  Hh = "⊗",
  Gh = "○",
  Wh = "⧃",
  Zh = "≗",
  Kh = "⨐",
  Jh = "⫯",
  Yh = "⧂",
  Qh = "∲",
  Xh = "”",
  ed = "’",
  td = "♣",
  nd = "♣",
  rd = ":",
  od = "∷",
  sd = "⩴",
  cd = "≔",
  id = "≔",
  ld = ",",
  ad = "@",
  ud = "∁",
  fd = "∘",
  pd = "∁",
  hd = "ℂ",
  dd = "≅",
  gd = "⩭",
  md = "≡",
  _d = "∮",
  bd = "∯",
  vd = "∮",
  xd = "𝕔",
  kd = "ℂ",
  yd = "∐",
  Cd = "∐",
  wd = "©",
  Ad = "©",
  Ed = "℗",
  Sd = "∳",
  Dd = "↵",
  qd = "✗",
  Td = "⨯",
  Fd = "𝒞",
  Rd = "𝒸",
  Ld = "⫏",
  Id = "⫑",
  zd = "⫐",
  Pd = "⫒",
  Md = "⋯",
  Nd = "⤸",
  Od = "⤵",
  Bd = "⋞",
  $d = "⋟",
  jd = "↶",
  Ud = "⤽",
  Vd = "⩈",
  Hd = "⩆",
  Gd = "≍",
  Wd = "∪",
  Zd = "⋓",
  Kd = "⩊",
  Jd = "⊍",
  Yd = "⩅",
  Qd = "∪︀",
  Xd = "↷",
  eg = "⤼",
  tg = "⋞",
  ng = "⋟",
  rg = "⋎",
  og = "⋏",
  sg = "¤",
  cg = "↶",
  ig = "↷",
  lg = "⋎",
  ag = "⋏",
  ug = "∲",
  fg = "∱",
  pg = "⌭",
  hg = "†",
  dg = "‡",
  gg = "ℸ",
  mg = "↓",
  _g = "↡",
  bg = "⇓",
  vg = "‐",
  xg = "⫤",
  kg = "⊣",
  yg = "⤏",
  Cg = "˝",
  wg = "Ď",
  Ag = "ď",
  Eg = "Д",
  Sg = "д",
  Dg = "‡",
  qg = "⇊",
  Tg = "ⅅ",
  Fg = "ⅆ",
  Rg = "⤑",
  Lg = "⩷",
  Ig = "°",
  zg = "∇",
  Pg = "Δ",
  Mg = "δ",
  Ng = "⦱",
  Og = "⥿",
  Bg = "𝔇",
  $g = "𝔡",
  jg = "⥥",
  Ug = "⇃",
  Vg = "⇂",
  Hg = "´",
  Gg = "˙",
  Wg = "˝",
  Zg = "`",
  Kg = "˜",
  Jg = "⋄",
  Yg = "⋄",
  Qg = "⋄",
  Xg = "♦",
  em = "♦",
  tm = "¨",
  nm = "ⅆ",
  rm = "ϝ",
  om = "⋲",
  sm = "÷",
  cm = "÷",
  im = "⋇",
  lm = "⋇",
  am = "Ђ",
  um = "ђ",
  fm = "⌞",
  pm = "⌍",
  hm = "$",
  dm = "𝔻",
  gm = "𝕕",
  mm = "¨",
  _m = "˙",
  bm = "⃜",
  vm = "≐",
  xm = "≑",
  km = "≐",
  ym = "∸",
  Cm = "∔",
  wm = "⊡",
  Am = "⌆",
  Em = "∯",
  Sm = "¨",
  Dm = "⇓",
  qm = "⇐",
  Tm = "⇔",
  Fm = "⫤",
  Rm = "⟸",
  Lm = "⟺",
  Im = "⟹",
  zm = "⇒",
  Pm = "⊨",
  Mm = "⇑",
  Nm = "⇕",
  Om = "∥",
  Bm = "⤓",
  $m = "↓",
  jm = "↓",
  Um = "⇓",
  Vm = "⇵",
  Hm = "̑",
  Gm = "⇊",
  Wm = "⇃",
  Zm = "⇂",
  Km = "⥐",
  Jm = "⥞",
  Ym = "⥖",
  Qm = "↽",
  Xm = "⥟",
  e_ = "⥗",
  t_ = "⇁",
  n_ = "↧",
  r_ = "⊤",
  o_ = "⤐",
  s_ = "⌟",
  c_ = "⌌",
  i_ = "𝒟",
  l_ = "𝒹",
  a_ = "Ѕ",
  u_ = "ѕ",
  f_ = "⧶",
  p_ = "Đ",
  h_ = "đ",
  d_ = "⋱",
  g_ = "▿",
  m_ = "▾",
  __ = "⇵",
  b_ = "⥯",
  v_ = "⦦",
  x_ = "Џ",
  k_ = "џ",
  y_ = "⟿",
  C_ = "É",
  w_ = "é",
  A_ = "⩮",
  E_ = "Ě",
  S_ = "ě",
  D_ = "Ê",
  q_ = "ê",
  T_ = "≖",
  F_ = "≕",
  R_ = "Э",
  L_ = "э",
  I_ = "⩷",
  z_ = "Ė",
  P_ = "ė",
  M_ = "≑",
  N_ = "ⅇ",
  O_ = "≒",
  B_ = "𝔈",
  $_ = "𝔢",
  j_ = "⪚",
  U_ = "È",
  V_ = "è",
  H_ = "⪖",
  G_ = "⪘",
  W_ = "⪙",
  Z_ = "∈",
  K_ = "⏧",
  J_ = "ℓ",
  Y_ = "⪕",
  Q_ = "⪗",
  X_ = "Ē",
  eb = "ē",
  tb = "∅",
  nb = "∅",
  rb = "◻",
  ob = "∅",
  sb = "▫",
  cb = " ",
  ib = " ",
  lb = " ",
  ab = "Ŋ",
  ub = "ŋ",
  fb = " ",
  pb = "Ę",
  hb = "ę",
  db = "𝔼",
  gb = "𝕖",
  mb = "⋕",
  _b = "⧣",
  bb = "⩱",
  vb = "ε",
  xb = "Ε",
  kb = "ε",
  yb = "ϵ",
  Cb = "≖",
  wb = "≕",
  Ab = "≂",
  Eb = "⪖",
  Sb = "⪕",
  Db = "⩵",
  qb = "=",
  Tb = "≂",
  Fb = "≟",
  Rb = "⇌",
  Lb = "≡",
  Ib = "⩸",
  zb = "⧥",
  Pb = "⥱",
  Mb = "≓",
  Nb = "ℯ",
  Ob = "ℰ",
  Bb = "≐",
  $b = "⩳",
  jb = "≂",
  Ub = "Η",
  Vb = "η",
  Hb = "Ð",
  Gb = "ð",
  Wb = "Ë",
  Zb = "ë",
  Kb = "€",
  Jb = "!",
  Yb = "∃",
  Qb = "∃",
  Xb = "ℰ",
  e0 = "ⅇ",
  t0 = "ⅇ",
  n0 = "≒",
  r0 = "Ф",
  o0 = "ф",
  s0 = "♀",
  c0 = "ﬃ",
  i0 = "ﬀ",
  l0 = "ﬄ",
  a0 = "𝔉",
  u0 = "𝔣",
  f0 = "ﬁ",
  p0 = "◼",
  h0 = "▪",
  d0 = "fj",
  g0 = "♭",
  m0 = "ﬂ",
  _0 = "▱",
  b0 = "ƒ",
  v0 = "𝔽",
  x0 = "𝕗",
  k0 = "∀",
  y0 = "∀",
  C0 = "⋔",
  w0 = "⫙",
  A0 = "ℱ",
  E0 = "⨍",
  S0 = "½",
  D0 = "⅓",
  q0 = "¼",
  T0 = "⅕",
  F0 = "⅙",
  R0 = "⅛",
  L0 = "⅔",
  I0 = "⅖",
  z0 = "¾",
  P0 = "⅗",
  M0 = "⅜",
  N0 = "⅘",
  O0 = "⅚",
  B0 = "⅝",
  $0 = "⅞",
  j0 = "⁄",
  U0 = "⌢",
  V0 = "𝒻",
  H0 = "ℱ",
  G0 = "ǵ",
  W0 = "Γ",
  Z0 = "γ",
  K0 = "Ϝ",
  J0 = "ϝ",
  Y0 = "⪆",
  Q0 = "Ğ",
  X0 = "ğ",
  ev = "Ģ",
  tv = "Ĝ",
  nv = "ĝ",
  rv = "Г",
  ov = "г",
  sv = "Ġ",
  cv = "ġ",
  iv = "≥",
  lv = "≧",
  av = "⪌",
  uv = "⋛",
  fv = "≥",
  pv = "≧",
  hv = "⩾",
  dv = "⪩",
  gv = "⩾",
  mv = "⪀",
  _v = "⪂",
  bv = "⪄",
  vv = "⋛︀",
  xv = "⪔",
  kv = "𝔊",
  yv = "𝔤",
  Cv = "≫",
  wv = "⋙",
  Av = "⋙",
  Ev = "ℷ",
  Sv = "Ѓ",
  Dv = "ѓ",
  qv = "⪥",
  Tv = "≷",
  Fv = "⪒",
  Rv = "⪤",
  Lv = "⪊",
  Iv = "⪊",
  zv = "⪈",
  Pv = "≩",
  Mv = "⪈",
  Nv = "≩",
  Ov = "⋧",
  Bv = "𝔾",
  $v = "𝕘",
  jv = "`",
  Uv = "≥",
  Vv = "⋛",
  Hv = "≧",
  Gv = "⪢",
  Wv = "≷",
  Zv = "⩾",
  Kv = "≳",
  Jv = "𝒢",
  Yv = "ℊ",
  Qv = "≳",
  Xv = "⪎",
  ex = "⪐",
  tx = "⪧",
  nx = "⩺",
  rx = ">",
  ox = ">",
  sx = "≫",
  cx = "⋗",
  ix = "⦕",
  lx = "⩼",
  ax = "⪆",
  ux = "⥸",
  fx = "⋗",
  px = "⋛",
  hx = "⪌",
  dx = "≷",
  gx = "≳",
  mx = "≩︀",
  _x = "≩︀",
  bx = "ˇ",
  vx = " ",
  xx = "½",
  kx = "ℋ",
  yx = "Ъ",
  Cx = "ъ",
  wx = "⥈",
  Ax = "↔",
  Ex = "⇔",
  Sx = "↭",
  Dx = "^",
  qx = "ℏ",
  Tx = "Ĥ",
  Fx = "ĥ",
  Rx = "♥",
  Lx = "♥",
  Ix = "…",
  zx = "⊹",
  Px = "𝔥",
  Mx = "ℌ",
  Nx = "ℋ",
  Ox = "⤥",
  Bx = "⤦",
  $x = "⇿",
  jx = "∻",
  Ux = "↩",
  Vx = "↪",
  Hx = "𝕙",
  Gx = "ℍ",
  Wx = "―",
  Zx = "─",
  Kx = "𝒽",
  Jx = "ℋ",
  Yx = "ℏ",
  Qx = "Ħ",
  Xx = "ħ",
  ek = "≎",
  tk = "≏",
  nk = "⁃",
  rk = "‐",
  ok = "Í",
  sk = "í",
  ck = "⁣",
  ik = "Î",
  lk = "î",
  ak = "И",
  uk = "и",
  fk = "İ",
  pk = "Е",
  hk = "е",
  dk = "¡",
  gk = "⇔",
  mk = "𝔦",
  _k = "ℑ",
  bk = "Ì",
  vk = "ì",
  xk = "ⅈ",
  kk = "⨌",
  yk = "∭",
  Ck = "⧜",
  wk = "℩",
  Ak = "Ĳ",
  Ek = "ĳ",
  Sk = "Ī",
  Dk = "ī",
  qk = "ℑ",
  Tk = "ⅈ",
  Fk = "ℐ",
  Rk = "ℑ",
  Lk = "ı",
  Ik = "ℑ",
  zk = "⊷",
  Pk = "Ƶ",
  Mk = "⇒",
  Nk = "℅",
  Ok = "∞",
  Bk = "⧝",
  $k = "ı",
  jk = "⊺",
  Uk = "∫",
  Vk = "∬",
  Hk = "ℤ",
  Gk = "∫",
  Wk = "⊺",
  Zk = "⋂",
  Kk = "⨗",
  Jk = "⨼",
  Yk = "⁣",
  Qk = "⁢",
  Xk = "Ё",
  ey = "ё",
  ty = "Į",
  ny = "į",
  ry = "𝕀",
  oy = "𝕚",
  sy = "Ι",
  cy = "ι",
  iy = "⨼",
  ly = "¿",
  ay = "𝒾",
  uy = "ℐ",
  fy = "∈",
  py = "⋵",
  hy = "⋹",
  dy = "⋴",
  gy = "⋳",
  my = "∈",
  _y = "⁢",
  by = "Ĩ",
  vy = "ĩ",
  xy = "І",
  ky = "і",
  yy = "Ï",
  Cy = "ï",
  wy = "Ĵ",
  Ay = "ĵ",
  Ey = "Й",
  Sy = "й",
  Dy = "𝔍",
  qy = "𝔧",
  Ty = "ȷ",
  Fy = "𝕁",
  Ry = "𝕛",
  Ly = "𝒥",
  Iy = "𝒿",
  zy = "Ј",
  Py = "ј",
  My = "Є",
  Ny = "є",
  Oy = "Κ",
  By = "κ",
  $y = "ϰ",
  jy = "Ķ",
  Uy = "ķ",
  Vy = "К",
  Hy = "к",
  Gy = "𝔎",
  Wy = "𝔨",
  Zy = "ĸ",
  Ky = "Х",
  Jy = "х",
  Yy = "Ќ",
  Qy = "ќ",
  Xy = "𝕂",
  eC = "𝕜",
  tC = "𝒦",
  nC = "𝓀",
  rC = "⇚",
  oC = "Ĺ",
  sC = "ĺ",
  cC = "⦴",
  iC = "ℒ",
  lC = "Λ",
  aC = "λ",
  uC = "⟨",
  fC = "⟪",
  pC = "⦑",
  hC = "⟨",
  dC = "⪅",
  gC = "ℒ",
  mC = "«",
  _C = "⇤",
  bC = "⤟",
  vC = "←",
  xC = "↞",
  kC = "⇐",
  yC = "⤝",
  CC = "↩",
  wC = "↫",
  AC = "⤹",
  EC = "⥳",
  SC = "↢",
  DC = "⤙",
  qC = "⤛",
  TC = "⪫",
  FC = "⪭",
  RC = "⪭︀",
  LC = "⤌",
  IC = "⤎",
  zC = "❲",
  PC = "{",
  MC = "[",
  NC = "⦋",
  OC = "⦏",
  BC = "⦍",
  $C = "Ľ",
  jC = "ľ",
  UC = "Ļ",
  VC = "ļ",
  HC = "⌈",
  GC = "{",
  WC = "Л",
  ZC = "л",
  KC = "⤶",
  JC = "“",
  YC = "„",
  QC = "⥧",
  XC = "⥋",
  e1 = "↲",
  t1 = "≤",
  n1 = "≦",
  r1 = "⟨",
  o1 = "⇤",
  s1 = "←",
  c1 = "←",
  i1 = "⇐",
  l1 = "⇆",
  a1 = "↢",
  u1 = "⌈",
  f1 = "⟦",
  p1 = "⥡",
  h1 = "⥙",
  d1 = "⇃",
  g1 = "⌊",
  m1 = "↽",
  _1 = "↼",
  b1 = "⇇",
  v1 = "↔",
  x1 = "↔",
  k1 = "⇔",
  y1 = "⇆",
  C1 = "⇋",
  w1 = "↭",
  A1 = "⥎",
  E1 = "↤",
  S1 = "⊣",
  D1 = "⥚",
  q1 = "⋋",
  T1 = "⧏",
  F1 = "⊲",
  R1 = "⊴",
  L1 = "⥑",
  I1 = "⥠",
  z1 = "⥘",
  P1 = "↿",
  M1 = "⥒",
  N1 = "↼",
  O1 = "⪋",
  B1 = "⋚",
  $1 = "≤",
  j1 = "≦",
  U1 = "⩽",
  V1 = "⪨",
  H1 = "⩽",
  G1 = "⩿",
  W1 = "⪁",
  Z1 = "⪃",
  K1 = "⋚︀",
  J1 = "⪓",
  Y1 = "⪅",
  Q1 = "⋖",
  X1 = "⋚",
  ew = "⪋",
  tw = "⋚",
  nw = "≦",
  rw = "≶",
  ow = "≶",
  sw = "⪡",
  cw = "≲",
  iw = "⩽",
  lw = "≲",
  aw = "⥼",
  uw = "⌊",
  fw = "𝔏",
  pw = "𝔩",
  hw = "≶",
  dw = "⪑",
  gw = "⥢",
  mw = "↽",
  _w = "↼",
  bw = "⥪",
  vw = "▄",
  xw = "Љ",
  kw = "љ",
  yw = "⇇",
  Cw = "≪",
  ww = "⋘",
  Aw = "⌞",
  Ew = "⇚",
  Sw = "⥫",
  Dw = "◺",
  qw = "Ŀ",
  Tw = "ŀ",
  Fw = "⎰",
  Rw = "⎰",
  Lw = "⪉",
  Iw = "⪉",
  zw = "⪇",
  Pw = "≨",
  Mw = "⪇",
  Nw = "≨",
  Ow = "⋦",
  Bw = "⟬",
  $w = "⇽",
  jw = "⟦",
  Uw = "⟵",
  Vw = "⟵",
  Hw = "⟸",
  Gw = "⟷",
  Ww = "⟷",
  Zw = "⟺",
  Kw = "⟼",
  Jw = "⟶",
  Yw = "⟶",
  Qw = "⟹",
  Xw = "↫",
  eA = "↬",
  tA = "⦅",
  nA = "𝕃",
  rA = "𝕝",
  oA = "⨭",
  sA = "⨴",
  cA = "∗",
  iA = "_",
  lA = "↙",
  aA = "↘",
  uA = "◊",
  fA = "◊",
  pA = "⧫",
  hA = "(",
  dA = "⦓",
  gA = "⇆",
  mA = "⌟",
  _A = "⇋",
  bA = "⥭",
  vA = "‎",
  xA = "⊿",
  kA = "‹",
  yA = "𝓁",
  CA = "ℒ",
  wA = "↰",
  AA = "↰",
  EA = "≲",
  SA = "⪍",
  DA = "⪏",
  qA = "[",
  TA = "‘",
  FA = "‚",
  RA = "Ł",
  LA = "ł",
  IA = "⪦",
  zA = "⩹",
  PA = "<",
  MA = "<",
  NA = "≪",
  OA = "⋖",
  BA = "⋋",
  $A = "⋉",
  jA = "⥶",
  UA = "⩻",
  VA = "◃",
  HA = "⊴",
  GA = "◂",
  WA = "⦖",
  ZA = "⥊",
  KA = "⥦",
  JA = "≨︀",
  YA = "≨︀",
  QA = "¯",
  XA = "♂",
  eE = "✠",
  tE = "✠",
  nE = "↦",
  rE = "↦",
  oE = "↧",
  sE = "↤",
  cE = "↥",
  iE = "▮",
  lE = "⨩",
  aE = "М",
  uE = "м",
  fE = "—",
  pE = "∺",
  hE = "∡",
  dE = " ",
  gE = "ℳ",
  mE = "𝔐",
  _E = "𝔪",
  bE = "℧",
  vE = "µ",
  xE = "*",
  kE = "⫰",
  yE = "∣",
  CE = "·",
  wE = "⊟",
  AE = "−",
  EE = "∸",
  SE = "⨪",
  DE = "∓",
  qE = "⫛",
  TE = "…",
  FE = "∓",
  RE = "⊧",
  LE = "𝕄",
  IE = "𝕞",
  zE = "∓",
  PE = "𝓂",
  ME = "ℳ",
  NE = "∾",
  OE = "Μ",
  BE = "μ",
  $E = "⊸",
  jE = "⊸",
  UE = "∇",
  VE = "Ń",
  HE = "ń",
  GE = "∠⃒",
  WE = "≉",
  ZE = "⩰̸",
  KE = "≋̸",
  JE = "ŉ",
  YE = "≉",
  QE = "♮",
  XE = "ℕ",
  eS = "♮",
  tS = " ",
  nS = "≎̸",
  rS = "≏̸",
  oS = "⩃",
  sS = "Ň",
  cS = "ň",
  iS = "Ņ",
  lS = "ņ",
  aS = "≇",
  uS = "⩭̸",
  fS = "⩂",
  pS = "Н",
  hS = "н",
  dS = "–",
  gS = "⤤",
  mS = "↗",
  _S = "⇗",
  bS = "↗",
  vS = "≠",
  xS = "≐̸",
  kS = "​",
  yS = "​",
  CS = "​",
  wS = "​",
  AS = "≢",
  ES = "⤨",
  SS = "≂̸",
  DS = "≫",
  qS = "≪",
  TS = `
`,
  FS = "∄",
  RS = "∄",
  LS = "𝔑",
  IS = "𝔫",
  zS = "≧̸",
  PS = "≱",
  MS = "≱",
  NS = "≧̸",
  OS = "⩾̸",
  BS = "⩾̸",
  $S = "⋙̸",
  jS = "≵",
  US = "≫⃒",
  VS = "≯",
  HS = "≯",
  GS = "≫̸",
  WS = "↮",
  ZS = "⇎",
  KS = "⫲",
  JS = "∋",
  YS = "⋼",
  QS = "⋺",
  XS = "∋",
  eD = "Њ",
  tD = "њ",
  nD = "↚",
  rD = "⇍",
  oD = "‥",
  sD = "≦̸",
  cD = "≰",
  iD = "↚",
  lD = "⇍",
  aD = "↮",
  uD = "⇎",
  fD = "≰",
  pD = "≦̸",
  hD = "⩽̸",
  dD = "⩽̸",
  gD = "≮",
  mD = "⋘̸",
  _D = "≴",
  bD = "≪⃒",
  vD = "≮",
  xD = "⋪",
  kD = "⋬",
  yD = "≪̸",
  CD = "∤",
  wD = "⁠",
  AD = " ",
  ED = "𝕟",
  SD = "ℕ",
  DD = "⫬",
  qD = "¬",
  TD = "≢",
  FD = "≭",
  RD = "∦",
  LD = "∉",
  ID = "≠",
  zD = "≂̸",
  PD = "∄",
  MD = "≯",
  ND = "≱",
  OD = "≧̸",
  BD = "≫̸",
  $D = "≹",
  jD = "⩾̸",
  UD = "≵",
  VD = "≎̸",
  HD = "≏̸",
  GD = "∉",
  WD = "⋵̸",
  ZD = "⋹̸",
  KD = "∉",
  JD = "⋷",
  YD = "⋶",
  QD = "⧏̸",
  XD = "⋪",
  eq = "⋬",
  tq = "≮",
  nq = "≰",
  rq = "≸",
  oq = "≪̸",
  sq = "⩽̸",
  cq = "≴",
  iq = "⪢̸",
  lq = "⪡̸",
  aq = "∌",
  uq = "∌",
  fq = "⋾",
  pq = "⋽",
  hq = "⊀",
  dq = "⪯̸",
  gq = "⋠",
  mq = "∌",
  _q = "⧐̸",
  bq = "⋫",
  vq = "⋭",
  xq = "⊏̸",
  kq = "⋢",
  yq = "⊐̸",
  Cq = "⋣",
  wq = "⊂⃒",
  Aq = "⊈",
  Eq = "⊁",
  Sq = "⪰̸",
  Dq = "⋡",
  qq = "≿̸",
  Tq = "⊃⃒",
  Fq = "⊉",
  Rq = "≁",
  Lq = "≄",
  Iq = "≇",
  zq = "≉",
  Pq = "∤",
  Mq = "∦",
  Nq = "∦",
  Oq = "⫽⃥",
  Bq = "∂̸",
  $q = "⨔",
  jq = "⊀",
  Uq = "⋠",
  Vq = "⊀",
  Hq = "⪯̸",
  Gq = "⪯̸",
  Wq = "⤳̸",
  Zq = "↛",
  Kq = "⇏",
  Jq = "↝̸",
  Yq = "↛",
  Qq = "⇏",
  Xq = "⋫",
  eT = "⋭",
  tT = "⊁",
  nT = "⋡",
  rT = "⪰̸",
  oT = "𝒩",
  sT = "𝓃",
  cT = "∤",
  iT = "∦",
  lT = "≁",
  aT = "≄",
  uT = "≄",
  fT = "∤",
  pT = "∦",
  hT = "⋢",
  dT = "⋣",
  gT = "⊄",
  mT = "⫅̸",
  _T = "⊈",
  bT = "⊂⃒",
  vT = "⊈",
  xT = "⫅̸",
  kT = "⊁",
  yT = "⪰̸",
  CT = "⊅",
  wT = "⫆̸",
  AT = "⊉",
  ET = "⊃⃒",
  ST = "⊉",
  DT = "⫆̸",
  qT = "≹",
  TT = "Ñ",
  FT = "ñ",
  RT = "≸",
  LT = "⋪",
  IT = "⋬",
  zT = "⋫",
  PT = "⋭",
  MT = "Ν",
  NT = "ν",
  OT = "#",
  BT = "№",
  $T = " ",
  jT = "≍⃒",
  UT = "⊬",
  VT = "⊭",
  HT = "⊮",
  GT = "⊯",
  WT = "≥⃒",
  ZT = ">⃒",
  KT = "⤄",
  JT = "⧞",
  YT = "⤂",
  QT = "≤⃒",
  XT = "<⃒",
  eF = "⊴⃒",
  tF = "⤃",
  nF = "⊵⃒",
  rF = "∼⃒",
  oF = "⤣",
  sF = "↖",
  cF = "⇖",
  iF = "↖",
  lF = "⤧",
  aF = "Ó",
  uF = "ó",
  fF = "⊛",
  pF = "Ô",
  hF = "ô",
  dF = "⊚",
  gF = "О",
  mF = "о",
  _F = "⊝",
  bF = "Ő",
  vF = "ő",
  xF = "⨸",
  kF = "⊙",
  yF = "⦼",
  CF = "Œ",
  wF = "œ",
  AF = "⦿",
  EF = "𝔒",
  SF = "𝔬",
  DF = "˛",
  qF = "Ò",
  TF = "ò",
  FF = "⧁",
  RF = "⦵",
  LF = "Ω",
  IF = "∮",
  zF = "↺",
  PF = "⦾",
  MF = "⦻",
  NF = "‾",
  OF = "⧀",
  BF = "Ō",
  $F = "ō",
  jF = "Ω",
  UF = "ω",
  VF = "Ο",
  HF = "ο",
  GF = "⦶",
  WF = "⊖",
  ZF = "𝕆",
  KF = "𝕠",
  JF = "⦷",
  YF = "“",
  QF = "‘",
  XF = "⦹",
  eR = "⊕",
  tR = "↻",
  nR = "⩔",
  rR = "∨",
  oR = "⩝",
  sR = "ℴ",
  cR = "ℴ",
  iR = "ª",
  lR = "º",
  aR = "⊶",
  uR = "⩖",
  fR = "⩗",
  pR = "⩛",
  hR = "Ⓢ",
  dR = "𝒪",
  gR = "ℴ",
  mR = "Ø",
  _R = "ø",
  bR = "⊘",
  vR = "Õ",
  xR = "õ",
  kR = "⨶",
  yR = "⨷",
  CR = "⊗",
  wR = "Ö",
  AR = "ö",
  ER = "⌽",
  SR = "‾",
  DR = "⏞",
  qR = "⎴",
  TR = "⏜",
  FR = "¶",
  RR = "∥",
  LR = "∥",
  IR = "⫳",
  zR = "⫽",
  PR = "∂",
  MR = "∂",
  NR = "П",
  OR = "п",
  BR = "%",
  $R = ".",
  jR = "‰",
  UR = "⊥",
  VR = "‱",
  HR = "𝔓",
  GR = "𝔭",
  WR = "Φ",
  ZR = "φ",
  KR = "ϕ",
  JR = "ℳ",
  YR = "☎",
  QR = "Π",
  XR = "π",
  eL = "⋔",
  tL = "ϖ",
  nL = "ℏ",
  rL = "ℎ",
  oL = "ℏ",
  sL = "⨣",
  cL = "⊞",
  iL = "⨢",
  lL = "+",
  aL = "∔",
  uL = "⨥",
  fL = "⩲",
  pL = "±",
  hL = "±",
  dL = "⨦",
  gL = "⨧",
  mL = "±",
  _L = "ℌ",
  bL = "⨕",
  vL = "𝕡",
  xL = "ℙ",
  kL = "£",
  yL = "⪷",
  CL = "⪻",
  wL = "≺",
  AL = "≼",
  EL = "⪷",
  SL = "≺",
  DL = "≼",
  qL = "≺",
  TL = "⪯",
  FL = "≼",
  RL = "≾",
  LL = "⪯",
  IL = "⪹",
  zL = "⪵",
  PL = "⋨",
  ML = "⪯",
  NL = "⪳",
  OL = "≾",
  BL = "′",
  $L = "″",
  jL = "ℙ",
  UL = "⪹",
  VL = "⪵",
  HL = "⋨",
  GL = "∏",
  WL = "∏",
  ZL = "⌮",
  KL = "⌒",
  JL = "⌓",
  YL = "∝",
  QL = "∝",
  XL = "∷",
  eI = "∝",
  tI = "≾",
  nI = "⊰",
  rI = "𝒫",
  oI = "𝓅",
  sI = "Ψ",
  cI = "ψ",
  iI = " ",
  lI = "𝔔",
  aI = "𝔮",
  uI = "⨌",
  fI = "𝕢",
  pI = "ℚ",
  hI = "⁗",
  dI = "𝒬",
  gI = "𝓆",
  mI = "ℍ",
  _I = "⨖",
  bI = "?",
  vI = "≟",
  xI = '"',
  kI = '"',
  yI = "⇛",
  CI = "∽̱",
  wI = "Ŕ",
  AI = "ŕ",
  EI = "√",
  SI = "⦳",
  DI = "⟩",
  qI = "⟫",
  TI = "⦒",
  FI = "⦥",
  RI = "⟩",
  LI = "»",
  II = "⥵",
  zI = "⇥",
  PI = "⤠",
  MI = "⤳",
  NI = "→",
  OI = "↠",
  BI = "⇒",
  $I = "⤞",
  jI = "↪",
  UI = "↬",
  VI = "⥅",
  HI = "⥴",
  GI = "⤖",
  WI = "↣",
  ZI = "↝",
  KI = "⤚",
  JI = "⤜",
  YI = "∶",
  QI = "ℚ",
  XI = "⤍",
  ez = "⤏",
  tz = "⤐",
  nz = "❳",
  rz = "}",
  oz = "]",
  sz = "⦌",
  cz = "⦎",
  iz = "⦐",
  lz = "Ř",
  az = "ř",
  uz = "Ŗ",
  fz = "ŗ",
  pz = "⌉",
  hz = "}",
  dz = "Р",
  gz = "р",
  mz = "⤷",
  _z = "⥩",
  bz = "”",
  vz = "”",
  xz = "↳",
  kz = "ℜ",
  yz = "ℛ",
  Cz = "ℜ",
  wz = "ℝ",
  Az = "ℜ",
  Ez = "▭",
  Sz = "®",
  Dz = "®",
  qz = "∋",
  Tz = "⇋",
  Fz = "⥯",
  Rz = "⥽",
  Lz = "⌋",
  Iz = "𝔯",
  zz = "ℜ",
  Pz = "⥤",
  Mz = "⇁",
  Nz = "⇀",
  Oz = "⥬",
  Bz = "Ρ",
  $z = "ρ",
  jz = "ϱ",
  Uz = "⟩",
  Vz = "⇥",
  Hz = "→",
  Gz = "→",
  Wz = "⇒",
  Zz = "⇄",
  Kz = "↣",
  Jz = "⌉",
  Yz = "⟧",
  Qz = "⥝",
  Xz = "⥕",
  e2 = "⇂",
  t2 = "⌋",
  n2 = "⇁",
  r2 = "⇀",
  o2 = "⇄",
  s2 = "⇌",
  c2 = "⇉",
  i2 = "↝",
  l2 = "↦",
  a2 = "⊢",
  u2 = "⥛",
  f2 = "⋌",
  p2 = "⧐",
  h2 = "⊳",
  d2 = "⊵",
  g2 = "⥏",
  m2 = "⥜",
  _2 = "⥔",
  b2 = "↾",
  v2 = "⥓",
  x2 = "⇀",
  k2 = "˚",
  y2 = "≓",
  C2 = "⇄",
  w2 = "⇌",
  A2 = "‏",
  E2 = "⎱",
  S2 = "⎱",
  D2 = "⫮",
  q2 = "⟭",
  T2 = "⇾",
  F2 = "⟧",
  R2 = "⦆",
  L2 = "𝕣",
  I2 = "ℝ",
  z2 = "⨮",
  P2 = "⨵",
  M2 = "⥰",
  N2 = ")",
  O2 = "⦔",
  B2 = "⨒",
  $2 = "⇉",
  j2 = "⇛",
  U2 = "›",
  V2 = "𝓇",
  H2 = "ℛ",
  G2 = "↱",
  W2 = "↱",
  Z2 = "]",
  K2 = "’",
  J2 = "’",
  Y2 = "⋌",
  Q2 = "⋊",
  X2 = "▹",
  eP = "⊵",
  tP = "▸",
  nP = "⧎",
  rP = "⧴",
  oP = "⥨",
  sP = "℞",
  cP = "Ś",
  iP = "ś",
  lP = "‚",
  aP = "⪸",
  uP = "Š",
  fP = "š",
  pP = "⪼",
  hP = "≻",
  dP = "≽",
  gP = "⪰",
  mP = "⪴",
  _P = "Ş",
  bP = "ş",
  vP = "Ŝ",
  xP = "ŝ",
  kP = "⪺",
  yP = "⪶",
  CP = "⋩",
  wP = "⨓",
  AP = "≿",
  EP = "С",
  SP = "с",
  DP = "⊡",
  qP = "⋅",
  TP = "⩦",
  FP = "⤥",
  RP = "↘",
  LP = "⇘",
  IP = "↘",
  zP = "§",
  PP = ";",
  MP = "⤩",
  NP = "∖",
  OP = "∖",
  BP = "✶",
  $P = "𝔖",
  jP = "𝔰",
  UP = "⌢",
  VP = "♯",
  HP = "Щ",
  GP = "щ",
  WP = "Ш",
  ZP = "ш",
  KP = "↓",
  JP = "←",
  YP = "∣",
  QP = "∥",
  XP = "→",
  eM = "↑",
  tM = "­",
  nM = "Σ",
  rM = "σ",
  oM = "ς",
  sM = "ς",
  cM = "∼",
  iM = "⩪",
  lM = "≃",
  aM = "≃",
  uM = "⪞",
  fM = "⪠",
  pM = "⪝",
  hM = "⪟",
  dM = "≆",
  gM = "⨤",
  mM = "⥲",
  _M = "←",
  bM = "∘",
  vM = "∖",
  xM = "⨳",
  kM = "⧤",
  yM = "∣",
  CM = "⌣",
  wM = "⪪",
  AM = "⪬",
  EM = "⪬︀",
  SM = "Ь",
  DM = "ь",
  qM = "⌿",
  TM = "⧄",
  FM = "/",
  RM = "𝕊",
  LM = "𝕤",
  IM = "♠",
  zM = "♠",
  PM = "∥",
  MM = "⊓",
  NM = "⊓︀",
  OM = "⊔",
  BM = "⊔︀",
  $M = "√",
  jM = "⊏",
  UM = "⊑",
  VM = "⊏",
  HM = "⊑",
  GM = "⊐",
  WM = "⊒",
  ZM = "⊐",
  KM = "⊒",
  JM = "□",
  YM = "□",
  QM = "⊓",
  XM = "⊏",
  eN = "⊑",
  tN = "⊐",
  nN = "⊒",
  rN = "⊔",
  oN = "▪",
  sN = "□",
  cN = "▪",
  iN = "→",
  lN = "𝒮",
  aN = "𝓈",
  uN = "∖",
  fN = "⌣",
  pN = "⋆",
  hN = "⋆",
  dN = "☆",
  gN = "★",
  mN = "ϵ",
  _N = "ϕ",
  bN = "¯",
  vN = "⊂",
  xN = "⋐",
  kN = "⪽",
  yN = "⫅",
  CN = "⊆",
  wN = "⫃",
  AN = "⫁",
  EN = "⫋",
  SN = "⊊",
  DN = "⪿",
  qN = "⥹",
  TN = "⊂",
  FN = "⋐",
  RN = "⊆",
  LN = "⫅",
  IN = "⊆",
  zN = "⊊",
  PN = "⫋",
  MN = "⫇",
  NN = "⫕",
  ON = "⫓",
  BN = "⪸",
  $N = "≻",
  jN = "≽",
  UN = "≻",
  VN = "⪰",
  HN = "≽",
  GN = "≿",
  WN = "⪰",
  ZN = "⪺",
  KN = "⪶",
  JN = "⋩",
  YN = "≿",
  QN = "∋",
  XN = "∑",
  eO = "∑",
  tO = "♪",
  nO = "¹",
  rO = "²",
  oO = "³",
  sO = "⊃",
  cO = "⋑",
  iO = "⪾",
  lO = "⫘",
  aO = "⫆",
  uO = "⊇",
  fO = "⫄",
  pO = "⊃",
  hO = "⊇",
  dO = "⟉",
  gO = "⫗",
  mO = "⥻",
  _O = "⫂",
  bO = "⫌",
  vO = "⊋",
  xO = "⫀",
  kO = "⊃",
  yO = "⋑",
  CO = "⊇",
  wO = "⫆",
  AO = "⊋",
  EO = "⫌",
  SO = "⫈",
  DO = "⫔",
  qO = "⫖",
  TO = "⤦",
  FO = "↙",
  RO = "⇙",
  LO = "↙",
  IO = "⤪",
  zO = "ß",
  PO = "	",
  MO = "⌖",
  NO = "Τ",
  OO = "τ",
  BO = "⎴",
  $O = "Ť",
  jO = "ť",
  UO = "Ţ",
  VO = "ţ",
  HO = "Т",
  GO = "т",
  WO = "⃛",
  ZO = "⌕",
  KO = "𝔗",
  JO = "𝔱",
  YO = "∴",
  QO = "∴",
  XO = "∴",
  eB = "Θ",
  tB = "θ",
  nB = "ϑ",
  rB = "ϑ",
  oB = "≈",
  sB = "∼",
  cB = "  ",
  iB = " ",
  lB = " ",
  aB = "≈",
  uB = "∼",
  fB = "Þ",
  pB = "þ",
  hB = "˜",
  dB = "∼",
  gB = "≃",
  mB = "≅",
  _B = "≈",
  bB = "⨱",
  vB = "⊠",
  xB = "×",
  kB = "⨰",
  yB = "∭",
  CB = "⤨",
  wB = "⌶",
  AB = "⫱",
  EB = "⊤",
  SB = "𝕋",
  DB = "𝕥",
  qB = "⫚",
  TB = "⤩",
  FB = "‴",
  RB = "™",
  LB = "™",
  IB = "▵",
  zB = "▿",
  PB = "◃",
  MB = "⊴",
  NB = "≜",
  OB = "▹",
  BB = "⊵",
  $B = "◬",
  jB = "≜",
  UB = "⨺",
  VB = "⃛",
  HB = "⨹",
  GB = "⧍",
  WB = "⨻",
  ZB = "⏢",
  KB = "𝒯",
  JB = "𝓉",
  YB = "Ц",
  QB = "ц",
  XB = "Ћ",
  e3 = "ћ",
  t3 = "Ŧ",
  n3 = "ŧ",
  r3 = "≬",
  o3 = "↞",
  s3 = "↠",
  c3 = "Ú",
  i3 = "ú",
  l3 = "↑",
  a3 = "↟",
  u3 = "⇑",
  f3 = "⥉",
  p3 = "Ў",
  h3 = "ў",
  d3 = "Ŭ",
  g3 = "ŭ",
  m3 = "Û",
  _3 = "û",
  b3 = "У",
  v3 = "у",
  x3 = "⇅",
  k3 = "Ű",
  y3 = "ű",
  C3 = "⥮",
  w3 = "⥾",
  A3 = "𝔘",
  E3 = "𝔲",
  S3 = "Ù",
  D3 = "ù",
  q3 = "⥣",
  T3 = "↿",
  F3 = "↾",
  R3 = "▀",
  L3 = "⌜",
  I3 = "⌜",
  z3 = "⌏",
  P3 = "◸",
  M3 = "Ū",
  N3 = "ū",
  O3 = "¨",
  B3 = "_",
  $3 = "⏟",
  j3 = "⎵",
  U3 = "⏝",
  V3 = "⋃",
  H3 = "⊎",
  G3 = "Ų",
  W3 = "ų",
  Z3 = "𝕌",
  K3 = "𝕦",
  J3 = "⤒",
  Y3 = "↑",
  Q3 = "↑",
  X3 = "⇑",
  e$ = "⇅",
  t$ = "↕",
  n$ = "↕",
  r$ = "⇕",
  o$ = "⥮",
  s$ = "↿",
  c$ = "↾",
  i$ = "⊎",
  l$ = "↖",
  a$ = "↗",
  u$ = "υ",
  f$ = "ϒ",
  p$ = "ϒ",
  h$ = "Υ",
  d$ = "υ",
  g$ = "↥",
  m$ = "⊥",
  _$ = "⇈",
  b$ = "⌝",
  v$ = "⌝",
  x$ = "⌎",
  k$ = "Ů",
  y$ = "ů",
  C$ = "◹",
  w$ = "𝒰",
  A$ = "𝓊",
  E$ = "⋰",
  S$ = "Ũ",
  D$ = "ũ",
  q$ = "▵",
  T$ = "▴",
  F$ = "⇈",
  R$ = "Ü",
  L$ = "ü",
  I$ = "⦧",
  z$ = "⦜",
  P$ = "ϵ",
  M$ = "ϰ",
  N$ = "∅",
  O$ = "ϕ",
  B$ = "ϖ",
  $$ = "∝",
  j$ = "↕",
  U$ = "⇕",
  V$ = "ϱ",
  H$ = "ς",
  G$ = "⊊︀",
  W$ = "⫋︀",
  Z$ = "⊋︀",
  K$ = "⫌︀",
  J$ = "ϑ",
  Y$ = "⊲",
  Q$ = "⊳",
  X$ = "⫨",
  ej = "⫫",
  tj = "⫩",
  nj = "В",
  rj = "в",
  oj = "⊢",
  sj = "⊨",
  cj = "⊩",
  ij = "⊫",
  lj = "⫦",
  aj = "⊻",
  uj = "∨",
  fj = "⋁",
  pj = "≚",
  hj = "⋮",
  dj = "|",
  gj = "‖",
  mj = "|",
  _j = "‖",
  bj = "∣",
  vj = "|",
  xj = "❘",
  kj = "≀",
  yj = " ",
  Cj = "𝔙",
  wj = "𝔳",
  Aj = "⊲",
  Ej = "⊂⃒",
  Sj = "⊃⃒",
  Dj = "𝕍",
  qj = "𝕧",
  Tj = "∝",
  Fj = "⊳",
  Rj = "𝒱",
  Lj = "𝓋",
  Ij = "⫋︀",
  zj = "⊊︀",
  Pj = "⫌︀",
  Mj = "⊋︀",
  Nj = "⊪",
  Oj = "⦚",
  Bj = "Ŵ",
  $j = "ŵ",
  jj = "⩟",
  Uj = "∧",
  Vj = "⋀",
  Hj = "≙",
  Gj = "℘",
  Wj = "𝔚",
  Zj = "𝔴",
  Kj = "𝕎",
  Jj = "𝕨",
  Yj = "℘",
  Qj = "≀",
  Xj = "≀",
  eU = "𝒲",
  tU = "𝓌",
  nU = "⋂",
  rU = "◯",
  oU = "⋃",
  sU = "▽",
  cU = "𝔛",
  iU = "𝔵",
  lU = "⟷",
  aU = "⟺",
  uU = "Ξ",
  fU = "ξ",
  pU = "⟵",
  hU = "⟸",
  dU = "⟼",
  gU = "⋻",
  mU = "⨀",
  _U = "𝕏",
  bU = "𝕩",
  vU = "⨁",
  xU = "⨂",
  kU = "⟶",
  yU = "⟹",
  CU = "𝒳",
  wU = "𝓍",
  AU = "⨆",
  EU = "⨄",
  SU = "△",
  DU = "⋁",
  qU = "⋀",
  TU = "Ý",
  FU = "ý",
  RU = "Я",
  LU = "я",
  IU = "Ŷ",
  zU = "ŷ",
  PU = "Ы",
  MU = "ы",
  NU = "¥",
  OU = "𝔜",
  BU = "𝔶",
  $U = "Ї",
  jU = "ї",
  UU = "𝕐",
  VU = "𝕪",
  HU = "𝒴",
  GU = "𝓎",
  WU = "Ю",
  ZU = "ю",
  KU = "ÿ",
  JU = "Ÿ",
  YU = "Ź",
  QU = "ź",
  XU = "Ž",
  e6 = "ž",
  t6 = "З",
  n6 = "з",
  r6 = "Ż",
  o6 = "ż",
  s6 = "ℨ",
  c6 = "​",
  i6 = "Ζ",
  l6 = "ζ",
  a6 = "𝔷",
  u6 = "ℨ",
  f6 = "Ж",
  p6 = "ж",
  h6 = "⇝",
  d6 = "𝕫",
  g6 = "ℤ",
  m6 = "𝒵",
  _6 = "𝓏",
  b6 = "‍",
  v6 = "‌",
  x6 = {
    Aacute: na,
    aacute: ra,
    Abreve: oa,
    abreve: sa,
    ac: ca,
    acd: ia,
    acE: la,
    Acirc: aa,
    acirc: ua,
    acute: fa,
    Acy: pa,
    acy: ha,
    AElig: da,
    aelig: ga,
    af: ma,
    Afr: _a,
    afr: ba,
    Agrave: va,
    agrave: xa,
    alefsym: ka,
    aleph: ya,
    Alpha: Ca,
    alpha: wa,
    Amacr: Aa,
    amacr: Ea,
    amalg: Sa,
    amp: Da,
    AMP: qa,
    andand: Ta,
    And: Fa,
    and: Ra,
    andd: La,
    andslope: Ia,
    andv: za,
    ang: Pa,
    ange: Ma,
    angle: Na,
    angmsdaa: Oa,
    angmsdab: Ba,
    angmsdac: $a,
    angmsdad: ja,
    angmsdae: Ua,
    angmsdaf: Va,
    angmsdag: Ha,
    angmsdah: Ga,
    angmsd: Wa,
    angrt: Za,
    angrtvb: Ka,
    angrtvbd: Ja,
    angsph: Ya,
    angst: Qa,
    angzarr: Xa,
    Aogon: eu,
    aogon: tu,
    Aopf: nu,
    aopf: ru,
    apacir: ou,
    ap: su,
    apE: cu,
    ape: iu,
    apid: lu,
    apos: au,
    ApplyFunction: uu,
    approx: fu,
    approxeq: pu,
    Aring: hu,
    aring: du,
    Ascr: gu,
    ascr: mu,
    Assign: _u,
    ast: bu,
    asymp: vu,
    asympeq: xu,
    Atilde: ku,
    atilde: yu,
    Auml: Cu,
    auml: wu,
    awconint: Au,
    awint: Eu,
    backcong: Su,
    backepsilon: Du,
    backprime: qu,
    backsim: Tu,
    backsimeq: Fu,
    Backslash: Ru,
    Barv: Lu,
    barvee: Iu,
    barwed: zu,
    Barwed: Pu,
    barwedge: Mu,
    bbrk: Nu,
    bbrktbrk: Ou,
    bcong: Bu,
    Bcy: $u,
    bcy: ju,
    bdquo: Uu,
    becaus: Vu,
    because: Hu,
    Because: Gu,
    bemptyv: Wu,
    bepsi: Zu,
    bernou: Ku,
    Bernoullis: Ju,
    Beta: Yu,
    beta: Qu,
    beth: Xu,
    between: ef,
    Bfr: tf,
    bfr: nf,
    bigcap: rf,
    bigcirc: of,
    bigcup: sf,
    bigodot: cf,
    bigoplus: lf,
    bigotimes: af,
    bigsqcup: uf,
    bigstar: ff,
    bigtriangledown: pf,
    bigtriangleup: hf,
    biguplus: df,
    bigvee: gf,
    bigwedge: mf,
    bkarow: _f,
    blacklozenge: bf,
    blacksquare: vf,
    blacktriangle: xf,
    blacktriangledown: kf,
    blacktriangleleft: yf,
    blacktriangleright: Cf,
    blank: wf,
    blk12: Af,
    blk14: Ef,
    blk34: Sf,
    block: Df,
    bne: qf,
    bnequiv: Tf,
    bNot: Ff,
    bnot: Rf,
    Bopf: Lf,
    bopf: If,
    bot: zf,
    bottom: Pf,
    bowtie: Mf,
    boxbox: Nf,
    boxdl: Of,
    boxdL: Bf,
    boxDl: $f,
    boxDL: jf,
    boxdr: Uf,
    boxdR: Vf,
    boxDr: Hf,
    boxDR: Gf,
    boxh: Wf,
    boxH: Zf,
    boxhd: Kf,
    boxHd: Jf,
    boxhD: Yf,
    boxHD: Qf,
    boxhu: Xf,
    boxHu: ep,
    boxhU: tp,
    boxHU: np,
    boxminus: rp,
    boxplus: op,
    boxtimes: sp,
    boxul: cp,
    boxuL: ip,
    boxUl: lp,
    boxUL: ap,
    boxur: up,
    boxuR: fp,
    boxUr: pp,
    boxUR: hp,
    boxv: dp,
    boxV: gp,
    boxvh: mp,
    boxvH: _p,
    boxVh: bp,
    boxVH: vp,
    boxvl: xp,
    boxvL: kp,
    boxVl: yp,
    boxVL: Cp,
    boxvr: wp,
    boxvR: Ap,
    boxVr: Ep,
    boxVR: Sp,
    bprime: Dp,
    breve: qp,
    Breve: Tp,
    brvbar: Fp,
    bscr: Rp,
    Bscr: Lp,
    bsemi: Ip,
    bsim: zp,
    bsime: Pp,
    bsolb: Mp,
    bsol: Np,
    bsolhsub: Op,
    bull: Bp,
    bullet: $p,
    bump: jp,
    bumpE: Up,
    bumpe: Vp,
    Bumpeq: Hp,
    bumpeq: Gp,
    Cacute: Wp,
    cacute: Zp,
    capand: Kp,
    capbrcup: Jp,
    capcap: Yp,
    cap: Qp,
    Cap: Xp,
    capcup: eh,
    capdot: th,
    CapitalDifferentialD: nh,
    caps: rh,
    caret: oh,
    caron: sh,
    Cayleys: ch,
    ccaps: ih,
    Ccaron: lh,
    ccaron: ah,
    Ccedil: uh,
    ccedil: fh,
    Ccirc: ph,
    ccirc: hh,
    Cconint: dh,
    ccups: gh,
    ccupssm: mh,
    Cdot: _h,
    cdot: bh,
    cedil: vh,
    Cedilla: xh,
    cemptyv: kh,
    cent: yh,
    centerdot: Ch,
    CenterDot: wh,
    cfr: Ah,
    Cfr: Eh,
    CHcy: Sh,
    chcy: Dh,
    check: qh,
    checkmark: Th,
    Chi: Fh,
    chi: Rh,
    circ: Lh,
    circeq: Ih,
    circlearrowleft: zh,
    circlearrowright: Ph,
    circledast: Mh,
    circledcirc: Nh,
    circleddash: Oh,
    CircleDot: Bh,
    circledR: $h,
    circledS: jh,
    CircleMinus: Uh,
    CirclePlus: Vh,
    CircleTimes: Hh,
    cir: Gh,
    cirE: Wh,
    cire: Zh,
    cirfnint: Kh,
    cirmid: Jh,
    cirscir: Yh,
    ClockwiseContourIntegral: Qh,
    CloseCurlyDoubleQuote: Xh,
    CloseCurlyQuote: ed,
    clubs: td,
    clubsuit: nd,
    colon: rd,
    Colon: od,
    Colone: sd,
    colone: cd,
    coloneq: id,
    comma: ld,
    commat: ad,
    comp: ud,
    compfn: fd,
    complement: pd,
    complexes: hd,
    cong: dd,
    congdot: gd,
    Congruent: md,
    conint: _d,
    Conint: bd,
    ContourIntegral: vd,
    copf: xd,
    Copf: kd,
    coprod: yd,
    Coproduct: Cd,
    copy: wd,
    COPY: Ad,
    copysr: Ed,
    CounterClockwiseContourIntegral: Sd,
    crarr: Dd,
    cross: qd,
    Cross: Td,
    Cscr: Fd,
    cscr: Rd,
    csub: Ld,
    csube: Id,
    csup: zd,
    csupe: Pd,
    ctdot: Md,
    cudarrl: Nd,
    cudarrr: Od,
    cuepr: Bd,
    cuesc: $d,
    cularr: jd,
    cularrp: Ud,
    cupbrcap: Vd,
    cupcap: Hd,
    CupCap: Gd,
    cup: Wd,
    Cup: Zd,
    cupcup: Kd,
    cupdot: Jd,
    cupor: Yd,
    cups: Qd,
    curarr: Xd,
    curarrm: eg,
    curlyeqprec: tg,
    curlyeqsucc: ng,
    curlyvee: rg,
    curlywedge: og,
    curren: sg,
    curvearrowleft: cg,
    curvearrowright: ig,
    cuvee: lg,
    cuwed: ag,
    cwconint: ug,
    cwint: fg,
    cylcty: pg,
    dagger: hg,
    Dagger: dg,
    daleth: gg,
    darr: mg,
    Darr: _g,
    dArr: bg,
    dash: vg,
    Dashv: xg,
    dashv: kg,
    dbkarow: yg,
    dblac: Cg,
    Dcaron: wg,
    dcaron: Ag,
    Dcy: Eg,
    dcy: Sg,
    ddagger: Dg,
    ddarr: qg,
    DD: Tg,
    dd: Fg,
    DDotrahd: Rg,
    ddotseq: Lg,
    deg: Ig,
    Del: zg,
    Delta: Pg,
    delta: Mg,
    demptyv: Ng,
    dfisht: Og,
    Dfr: Bg,
    dfr: $g,
    dHar: jg,
    dharl: Ug,
    dharr: Vg,
    DiacriticalAcute: Hg,
    DiacriticalDot: Gg,
    DiacriticalDoubleAcute: Wg,
    DiacriticalGrave: Zg,
    DiacriticalTilde: Kg,
    diam: Jg,
    diamond: Yg,
    Diamond: Qg,
    diamondsuit: Xg,
    diams: em,
    die: tm,
    DifferentialD: nm,
    digamma: rm,
    disin: om,
    div: sm,
    divide: cm,
    divideontimes: im,
    divonx: lm,
    DJcy: am,
    djcy: um,
    dlcorn: fm,
    dlcrop: pm,
    dollar: hm,
    Dopf: dm,
    dopf: gm,
    Dot: mm,
    dot: _m,
    DotDot: bm,
    doteq: vm,
    doteqdot: xm,
    DotEqual: km,
    dotminus: ym,
    dotplus: Cm,
    dotsquare: wm,
    doublebarwedge: Am,
    DoubleContourIntegral: Em,
    DoubleDot: Sm,
    DoubleDownArrow: Dm,
    DoubleLeftArrow: qm,
    DoubleLeftRightArrow: Tm,
    DoubleLeftTee: Fm,
    DoubleLongLeftArrow: Rm,
    DoubleLongLeftRightArrow: Lm,
    DoubleLongRightArrow: Im,
    DoubleRightArrow: zm,
    DoubleRightTee: Pm,
    DoubleUpArrow: Mm,
    DoubleUpDownArrow: Nm,
    DoubleVerticalBar: Om,
    DownArrowBar: Bm,
    downarrow: $m,
    DownArrow: jm,
    Downarrow: Um,
    DownArrowUpArrow: Vm,
    DownBreve: Hm,
    downdownarrows: Gm,
    downharpoonleft: Wm,
    downharpoonright: Zm,
    DownLeftRightVector: Km,
    DownLeftTeeVector: Jm,
    DownLeftVectorBar: Ym,
    DownLeftVector: Qm,
    DownRightTeeVector: Xm,
    DownRightVectorBar: e_,
    DownRightVector: t_,
    DownTeeArrow: n_,
    DownTee: r_,
    drbkarow: o_,
    drcorn: s_,
    drcrop: c_,
    Dscr: i_,
    dscr: l_,
    DScy: a_,
    dscy: u_,
    dsol: f_,
    Dstrok: p_,
    dstrok: h_,
    dtdot: d_,
    dtri: g_,
    dtrif: m_,
    duarr: __,
    duhar: b_,
    dwangle: v_,
    DZcy: x_,
    dzcy: k_,
    dzigrarr: y_,
    Eacute: C_,
    eacute: w_,
    easter: A_,
    Ecaron: E_,
    ecaron: S_,
    Ecirc: D_,
    ecirc: q_,
    ecir: T_,
    ecolon: F_,
    Ecy: R_,
    ecy: L_,
    eDDot: I_,
    Edot: z_,
    edot: P_,
    eDot: M_,
    ee: N_,
    efDot: O_,
    Efr: B_,
    efr: $_,
    eg: j_,
    Egrave: U_,
    egrave: V_,
    egs: H_,
    egsdot: G_,
    el: W_,
    Element: Z_,
    elinters: K_,
    ell: J_,
    els: Y_,
    elsdot: Q_,
    Emacr: X_,
    emacr: eb,
    empty: tb,
    emptyset: nb,
    EmptySmallSquare: rb,
    emptyv: ob,
    EmptyVerySmallSquare: sb,
    emsp13: cb,
    emsp14: ib,
    emsp: lb,
    ENG: ab,
    eng: ub,
    ensp: fb,
    Eogon: pb,
    eogon: hb,
    Eopf: db,
    eopf: gb,
    epar: mb,
    eparsl: _b,
    eplus: bb,
    epsi: vb,
    Epsilon: xb,
    epsilon: kb,
    epsiv: yb,
    eqcirc: Cb,
    eqcolon: wb,
    eqsim: Ab,
    eqslantgtr: Eb,
    eqslantless: Sb,
    Equal: Db,
    equals: qb,
    EqualTilde: Tb,
    equest: Fb,
    Equilibrium: Rb,
    equiv: Lb,
    equivDD: Ib,
    eqvparsl: zb,
    erarr: Pb,
    erDot: Mb,
    escr: Nb,
    Escr: Ob,
    esdot: Bb,
    Esim: $b,
    esim: jb,
    Eta: Ub,
    eta: Vb,
    ETH: Hb,
    eth: Gb,
    Euml: Wb,
    euml: Zb,
    euro: Kb,
    excl: Jb,
    exist: Yb,
    Exists: Qb,
    expectation: Xb,
    exponentiale: e0,
    ExponentialE: t0,
    fallingdotseq: n0,
    Fcy: r0,
    fcy: o0,
    female: s0,
    ffilig: c0,
    fflig: i0,
    ffllig: l0,
    Ffr: a0,
    ffr: u0,
    filig: f0,
    FilledSmallSquare: p0,
    FilledVerySmallSquare: h0,
    fjlig: d0,
    flat: g0,
    fllig: m0,
    fltns: _0,
    fnof: b0,
    Fopf: v0,
    fopf: x0,
    forall: k0,
    ForAll: y0,
    fork: C0,
    forkv: w0,
    Fouriertrf: A0,
    fpartint: E0,
    frac12: S0,
    frac13: D0,
    frac14: q0,
    frac15: T0,
    frac16: F0,
    frac18: R0,
    frac23: L0,
    frac25: I0,
    frac34: z0,
    frac35: P0,
    frac38: M0,
    frac45: N0,
    frac56: O0,
    frac58: B0,
    frac78: $0,
    frasl: j0,
    frown: U0,
    fscr: V0,
    Fscr: H0,
    gacute: G0,
    Gamma: W0,
    gamma: Z0,
    Gammad: K0,
    gammad: J0,
    gap: Y0,
    Gbreve: Q0,
    gbreve: X0,
    Gcedil: ev,
    Gcirc: tv,
    gcirc: nv,
    Gcy: rv,
    gcy: ov,
    Gdot: sv,
    gdot: cv,
    ge: iv,
    gE: lv,
    gEl: av,
    gel: uv,
    geq: fv,
    geqq: pv,
    geqslant: hv,
    gescc: dv,
    ges: gv,
    gesdot: mv,
    gesdoto: _v,
    gesdotol: bv,
    gesl: vv,
    gesles: xv,
    Gfr: kv,
    gfr: yv,
    gg: Cv,
    Gg: wv,
    ggg: Av,
    gimel: Ev,
    GJcy: Sv,
    gjcy: Dv,
    gla: qv,
    gl: Tv,
    glE: Fv,
    glj: Rv,
    gnap: Lv,
    gnapprox: Iv,
    gne: zv,
    gnE: Pv,
    gneq: Mv,
    gneqq: Nv,
    gnsim: Ov,
    Gopf: Bv,
    gopf: $v,
    grave: jv,
    GreaterEqual: Uv,
    GreaterEqualLess: Vv,
    GreaterFullEqual: Hv,
    GreaterGreater: Gv,
    GreaterLess: Wv,
    GreaterSlantEqual: Zv,
    GreaterTilde: Kv,
    Gscr: Jv,
    gscr: Yv,
    gsim: Qv,
    gsime: Xv,
    gsiml: ex,
    gtcc: tx,
    gtcir: nx,
    gt: rx,
    GT: ox,
    Gt: sx,
    gtdot: cx,
    gtlPar: ix,
    gtquest: lx,
    gtrapprox: ax,
    gtrarr: ux,
    gtrdot: fx,
    gtreqless: px,
    gtreqqless: hx,
    gtrless: dx,
    gtrsim: gx,
    gvertneqq: mx,
    gvnE: _x,
    Hacek: bx,
    hairsp: vx,
    half: xx,
    hamilt: kx,
    HARDcy: yx,
    hardcy: Cx,
    harrcir: wx,
    harr: Ax,
    hArr: Ex,
    harrw: Sx,
    Hat: Dx,
    hbar: qx,
    Hcirc: Tx,
    hcirc: Fx,
    hearts: Rx,
    heartsuit: Lx,
    hellip: Ix,
    hercon: zx,
    hfr: Px,
    Hfr: Mx,
    HilbertSpace: Nx,
    hksearow: Ox,
    hkswarow: Bx,
    hoarr: $x,
    homtht: jx,
    hookleftarrow: Ux,
    hookrightarrow: Vx,
    hopf: Hx,
    Hopf: Gx,
    horbar: Wx,
    HorizontalLine: Zx,
    hscr: Kx,
    Hscr: Jx,
    hslash: Yx,
    Hstrok: Qx,
    hstrok: Xx,
    HumpDownHump: ek,
    HumpEqual: tk,
    hybull: nk,
    hyphen: rk,
    Iacute: ok,
    iacute: sk,
    ic: ck,
    Icirc: ik,
    icirc: lk,
    Icy: ak,
    icy: uk,
    Idot: fk,
    IEcy: pk,
    iecy: hk,
    iexcl: dk,
    iff: gk,
    ifr: mk,
    Ifr: _k,
    Igrave: bk,
    igrave: vk,
    ii: xk,
    iiiint: kk,
    iiint: yk,
    iinfin: Ck,
    iiota: wk,
    IJlig: Ak,
    ijlig: Ek,
    Imacr: Sk,
    imacr: Dk,
    image: qk,
    ImaginaryI: Tk,
    imagline: Fk,
    imagpart: Rk,
    imath: Lk,
    Im: Ik,
    imof: zk,
    imped: Pk,
    Implies: Mk,
    incare: Nk,
    in: "∈",
    infin: Ok,
    infintie: Bk,
    inodot: $k,
    intcal: jk,
    int: Uk,
    Int: Vk,
    integers: Hk,
    Integral: Gk,
    intercal: Wk,
    Intersection: Zk,
    intlarhk: Kk,
    intprod: Jk,
    InvisibleComma: Yk,
    InvisibleTimes: Qk,
    IOcy: Xk,
    iocy: ey,
    Iogon: ty,
    iogon: ny,
    Iopf: ry,
    iopf: oy,
    Iota: sy,
    iota: cy,
    iprod: iy,
    iquest: ly,
    iscr: ay,
    Iscr: uy,
    isin: fy,
    isindot: py,
    isinE: hy,
    isins: dy,
    isinsv: gy,
    isinv: my,
    it: _y,
    Itilde: by,
    itilde: vy,
    Iukcy: xy,
    iukcy: ky,
    Iuml: yy,
    iuml: Cy,
    Jcirc: wy,
    jcirc: Ay,
    Jcy: Ey,
    jcy: Sy,
    Jfr: Dy,
    jfr: qy,
    jmath: Ty,
    Jopf: Fy,
    jopf: Ry,
    Jscr: Ly,
    jscr: Iy,
    Jsercy: zy,
    jsercy: Py,
    Jukcy: My,
    jukcy: Ny,
    Kappa: Oy,
    kappa: By,
    kappav: $y,
    Kcedil: jy,
    kcedil: Uy,
    Kcy: Vy,
    kcy: Hy,
    Kfr: Gy,
    kfr: Wy,
    kgreen: Zy,
    KHcy: Ky,
    khcy: Jy,
    KJcy: Yy,
    kjcy: Qy,
    Kopf: Xy,
    kopf: eC,
    Kscr: tC,
    kscr: nC,
    lAarr: rC,
    Lacute: oC,
    lacute: sC,
    laemptyv: cC,
    lagran: iC,
    Lambda: lC,
    lambda: aC,
    lang: uC,
    Lang: fC,
    langd: pC,
    langle: hC,
    lap: dC,
    Laplacetrf: gC,
    laquo: mC,
    larrb: _C,
    larrbfs: bC,
    larr: vC,
    Larr: xC,
    lArr: kC,
    larrfs: yC,
    larrhk: CC,
    larrlp: wC,
    larrpl: AC,
    larrsim: EC,
    larrtl: SC,
    latail: DC,
    lAtail: qC,
    lat: TC,
    late: FC,
    lates: RC,
    lbarr: LC,
    lBarr: IC,
    lbbrk: zC,
    lbrace: PC,
    lbrack: MC,
    lbrke: NC,
    lbrksld: OC,
    lbrkslu: BC,
    Lcaron: $C,
    lcaron: jC,
    Lcedil: UC,
    lcedil: VC,
    lceil: HC,
    lcub: GC,
    Lcy: WC,
    lcy: ZC,
    ldca: KC,
    ldquo: JC,
    ldquor: YC,
    ldrdhar: QC,
    ldrushar: XC,
    ldsh: e1,
    le: t1,
    lE: n1,
    LeftAngleBracket: r1,
    LeftArrowBar: o1,
    leftarrow: s1,
    LeftArrow: c1,
    Leftarrow: i1,
    LeftArrowRightArrow: l1,
    leftarrowtail: a1,
    LeftCeiling: u1,
    LeftDoubleBracket: f1,
    LeftDownTeeVector: p1,
    LeftDownVectorBar: h1,
    LeftDownVector: d1,
    LeftFloor: g1,
    leftharpoondown: m1,
    leftharpoonup: _1,
    leftleftarrows: b1,
    leftrightarrow: v1,
    LeftRightArrow: x1,
    Leftrightarrow: k1,
    leftrightarrows: y1,
    leftrightharpoons: C1,
    leftrightsquigarrow: w1,
    LeftRightVector: A1,
    LeftTeeArrow: E1,
    LeftTee: S1,
    LeftTeeVector: D1,
    leftthreetimes: q1,
    LeftTriangleBar: T1,
    LeftTriangle: F1,
    LeftTriangleEqual: R1,
    LeftUpDownVector: L1,
    LeftUpTeeVector: I1,
    LeftUpVectorBar: z1,
    LeftUpVector: P1,
    LeftVectorBar: M1,
    LeftVector: N1,
    lEg: O1,
    leg: B1,
    leq: $1,
    leqq: j1,
    leqslant: U1,
    lescc: V1,
    les: H1,
    lesdot: G1,
    lesdoto: W1,
    lesdotor: Z1,
    lesg: K1,
    lesges: J1,
    lessapprox: Y1,
    lessdot: Q1,
    lesseqgtr: X1,
    lesseqqgtr: ew,
    LessEqualGreater: tw,
    LessFullEqual: nw,
    LessGreater: rw,
    lessgtr: ow,
    LessLess: sw,
    lesssim: cw,
    LessSlantEqual: iw,
    LessTilde: lw,
    lfisht: aw,
    lfloor: uw,
    Lfr: fw,
    lfr: pw,
    lg: hw,
    lgE: dw,
    lHar: gw,
    lhard: mw,
    lharu: _w,
    lharul: bw,
    lhblk: vw,
    LJcy: xw,
    ljcy: kw,
    llarr: yw,
    ll: Cw,
    Ll: ww,
    llcorner: Aw,
    Lleftarrow: Ew,
    llhard: Sw,
    lltri: Dw,
    Lmidot: qw,
    lmidot: Tw,
    lmoustache: Fw,
    lmoust: Rw,
    lnap: Lw,
    lnapprox: Iw,
    lne: zw,
    lnE: Pw,
    lneq: Mw,
    lneqq: Nw,
    lnsim: Ow,
    loang: Bw,
    loarr: $w,
    lobrk: jw,
    longleftarrow: Uw,
    LongLeftArrow: Vw,
    Longleftarrow: Hw,
    longleftrightarrow: Gw,
    LongLeftRightArrow: Ww,
    Longleftrightarrow: Zw,
    longmapsto: Kw,
    longrightarrow: Jw,
    LongRightArrow: Yw,
    Longrightarrow: Qw,
    looparrowleft: Xw,
    looparrowright: eA,
    lopar: tA,
    Lopf: nA,
    lopf: rA,
    loplus: oA,
    lotimes: sA,
    lowast: cA,
    lowbar: iA,
    LowerLeftArrow: lA,
    LowerRightArrow: aA,
    loz: uA,
    lozenge: fA,
    lozf: pA,
    lpar: hA,
    lparlt: dA,
    lrarr: gA,
    lrcorner: mA,
    lrhar: _A,
    lrhard: bA,
    lrm: vA,
    lrtri: xA,
    lsaquo: kA,
    lscr: yA,
    Lscr: CA,
    lsh: wA,
    Lsh: AA,
    lsim: EA,
    lsime: SA,
    lsimg: DA,
    lsqb: qA,
    lsquo: TA,
    lsquor: FA,
    Lstrok: RA,
    lstrok: LA,
    ltcc: IA,
    ltcir: zA,
    lt: PA,
    LT: MA,
    Lt: NA,
    ltdot: OA,
    lthree: BA,
    ltimes: $A,
    ltlarr: jA,
    ltquest: UA,
    ltri: VA,
    ltrie: HA,
    ltrif: GA,
    ltrPar: WA,
    lurdshar: ZA,
    luruhar: KA,
    lvertneqq: JA,
    lvnE: YA,
    macr: QA,
    male: XA,
    malt: eE,
    maltese: tE,
    Map: "⤅",
    map: nE,
    mapsto: rE,
    mapstodown: oE,
    mapstoleft: sE,
    mapstoup: cE,
    marker: iE,
    mcomma: lE,
    Mcy: aE,
    mcy: uE,
    mdash: fE,
    mDDot: pE,
    measuredangle: hE,
    MediumSpace: dE,
    Mellintrf: gE,
    Mfr: mE,
    mfr: _E,
    mho: bE,
    micro: vE,
    midast: xE,
    midcir: kE,
    mid: yE,
    middot: CE,
    minusb: wE,
    minus: AE,
    minusd: EE,
    minusdu: SE,
    MinusPlus: DE,
    mlcp: qE,
    mldr: TE,
    mnplus: FE,
    models: RE,
    Mopf: LE,
    mopf: IE,
    mp: zE,
    mscr: PE,
    Mscr: ME,
    mstpos: NE,
    Mu: OE,
    mu: BE,
    multimap: $E,
    mumap: jE,
    nabla: UE,
    Nacute: VE,
    nacute: HE,
    nang: GE,
    nap: WE,
    napE: ZE,
    napid: KE,
    napos: JE,
    napprox: YE,
    natural: QE,
    naturals: XE,
    natur: eS,
    nbsp: tS,
    nbump: nS,
    nbumpe: rS,
    ncap: oS,
    Ncaron: sS,
    ncaron: cS,
    Ncedil: iS,
    ncedil: lS,
    ncong: aS,
    ncongdot: uS,
    ncup: fS,
    Ncy: pS,
    ncy: hS,
    ndash: dS,
    nearhk: gS,
    nearr: mS,
    neArr: _S,
    nearrow: bS,
    ne: vS,
    nedot: xS,
    NegativeMediumSpace: kS,
    NegativeThickSpace: yS,
    NegativeThinSpace: CS,
    NegativeVeryThinSpace: wS,
    nequiv: AS,
    nesear: ES,
    nesim: SS,
    NestedGreaterGreater: DS,
    NestedLessLess: qS,
    NewLine: TS,
    nexist: FS,
    nexists: RS,
    Nfr: LS,
    nfr: IS,
    ngE: zS,
    nge: PS,
    ngeq: MS,
    ngeqq: NS,
    ngeqslant: OS,
    nges: BS,
    nGg: $S,
    ngsim: jS,
    nGt: US,
    ngt: VS,
    ngtr: HS,
    nGtv: GS,
    nharr: WS,
    nhArr: ZS,
    nhpar: KS,
    ni: JS,
    nis: YS,
    nisd: QS,
    niv: XS,
    NJcy: eD,
    njcy: tD,
    nlarr: nD,
    nlArr: rD,
    nldr: oD,
    nlE: sD,
    nle: cD,
    nleftarrow: iD,
    nLeftarrow: lD,
    nleftrightarrow: aD,
    nLeftrightarrow: uD,
    nleq: fD,
    nleqq: pD,
    nleqslant: hD,
    nles: dD,
    nless: gD,
    nLl: mD,
    nlsim: _D,
    nLt: bD,
    nlt: vD,
    nltri: xD,
    nltrie: kD,
    nLtv: yD,
    nmid: CD,
    NoBreak: wD,
    NonBreakingSpace: AD,
    nopf: ED,
    Nopf: SD,
    Not: DD,
    not: qD,
    NotCongruent: TD,
    NotCupCap: FD,
    NotDoubleVerticalBar: RD,
    NotElement: LD,
    NotEqual: ID,
    NotEqualTilde: zD,
    NotExists: PD,
    NotGreater: MD,
    NotGreaterEqual: ND,
    NotGreaterFullEqual: OD,
    NotGreaterGreater: BD,
    NotGreaterLess: $D,
    NotGreaterSlantEqual: jD,
    NotGreaterTilde: UD,
    NotHumpDownHump: VD,
    NotHumpEqual: HD,
    notin: GD,
    notindot: WD,
    notinE: ZD,
    notinva: KD,
    notinvb: JD,
    notinvc: YD,
    NotLeftTriangleBar: QD,
    NotLeftTriangle: XD,
    NotLeftTriangleEqual: eq,
    NotLess: tq,
    NotLessEqual: nq,
    NotLessGreater: rq,
    NotLessLess: oq,
    NotLessSlantEqual: sq,
    NotLessTilde: cq,
    NotNestedGreaterGreater: iq,
    NotNestedLessLess: lq,
    notni: aq,
    notniva: uq,
    notnivb: fq,
    notnivc: pq,
    NotPrecedes: hq,
    NotPrecedesEqual: dq,
    NotPrecedesSlantEqual: gq,
    NotReverseElement: mq,
    NotRightTriangleBar: _q,
    NotRightTriangle: bq,
    NotRightTriangleEqual: vq,
    NotSquareSubset: xq,
    NotSquareSubsetEqual: kq,
    NotSquareSuperset: yq,
    NotSquareSupersetEqual: Cq,
    NotSubset: wq,
    NotSubsetEqual: Aq,
    NotSucceeds: Eq,
    NotSucceedsEqual: Sq,
    NotSucceedsSlantEqual: Dq,
    NotSucceedsTilde: qq,
    NotSuperset: Tq,
    NotSupersetEqual: Fq,
    NotTilde: Rq,
    NotTildeEqual: Lq,
    NotTildeFullEqual: Iq,
    NotTildeTilde: zq,
    NotVerticalBar: Pq,
    nparallel: Mq,
    npar: Nq,
    nparsl: Oq,
    npart: Bq,
    npolint: $q,
    npr: jq,
    nprcue: Uq,
    nprec: Vq,
    npreceq: Hq,
    npre: Gq,
    nrarrc: Wq,
    nrarr: Zq,
    nrArr: Kq,
    nrarrw: Jq,
    nrightarrow: Yq,
    nRightarrow: Qq,
    nrtri: Xq,
    nrtrie: eT,
    nsc: tT,
    nsccue: nT,
    nsce: rT,
    Nscr: oT,
    nscr: sT,
    nshortmid: cT,
    nshortparallel: iT,
    nsim: lT,
    nsime: aT,
    nsimeq: uT,
    nsmid: fT,
    nspar: pT,
    nsqsube: hT,
    nsqsupe: dT,
    nsub: gT,
    nsubE: mT,
    nsube: _T,
    nsubset: bT,
    nsubseteq: vT,
    nsubseteqq: xT,
    nsucc: kT,
    nsucceq: yT,
    nsup: CT,
    nsupE: wT,
    nsupe: AT,
    nsupset: ET,
    nsupseteq: ST,
    nsupseteqq: DT,
    ntgl: qT,
    Ntilde: TT,
    ntilde: FT,
    ntlg: RT,
    ntriangleleft: LT,
    ntrianglelefteq: IT,
    ntriangleright: zT,
    ntrianglerighteq: PT,
    Nu: MT,
    nu: NT,
    num: OT,
    numero: BT,
    numsp: $T,
    nvap: jT,
    nvdash: UT,
    nvDash: VT,
    nVdash: HT,
    nVDash: GT,
    nvge: WT,
    nvgt: ZT,
    nvHarr: KT,
    nvinfin: JT,
    nvlArr: YT,
    nvle: QT,
    nvlt: XT,
    nvltrie: eF,
    nvrArr: tF,
    nvrtrie: nF,
    nvsim: rF,
    nwarhk: oF,
    nwarr: sF,
    nwArr: cF,
    nwarrow: iF,
    nwnear: lF,
    Oacute: aF,
    oacute: uF,
    oast: fF,
    Ocirc: pF,
    ocirc: hF,
    ocir: dF,
    Ocy: gF,
    ocy: mF,
    odash: _F,
    Odblac: bF,
    odblac: vF,
    odiv: xF,
    odot: kF,
    odsold: yF,
    OElig: CF,
    oelig: wF,
    ofcir: AF,
    Ofr: EF,
    ofr: SF,
    ogon: DF,
    Ograve: qF,
    ograve: TF,
    ogt: FF,
    ohbar: RF,
    ohm: LF,
    oint: IF,
    olarr: zF,
    olcir: PF,
    olcross: MF,
    oline: NF,
    olt: OF,
    Omacr: BF,
    omacr: $F,
    Omega: jF,
    omega: UF,
    Omicron: VF,
    omicron: HF,
    omid: GF,
    ominus: WF,
    Oopf: ZF,
    oopf: KF,
    opar: JF,
    OpenCurlyDoubleQuote: YF,
    OpenCurlyQuote: QF,
    operp: XF,
    oplus: eR,
    orarr: tR,
    Or: nR,
    or: rR,
    ord: oR,
    order: sR,
    orderof: cR,
    ordf: iR,
    ordm: lR,
    origof: aR,
    oror: uR,
    orslope: fR,
    orv: pR,
    oS: hR,
    Oscr: dR,
    oscr: gR,
    Oslash: mR,
    oslash: _R,
    osol: bR,
    Otilde: vR,
    otilde: xR,
    otimesas: kR,
    Otimes: yR,
    otimes: CR,
    Ouml: wR,
    ouml: AR,
    ovbar: ER,
    OverBar: SR,
    OverBrace: DR,
    OverBracket: qR,
    OverParenthesis: TR,
    para: FR,
    parallel: RR,
    par: LR,
    parsim: IR,
    parsl: zR,
    part: PR,
    PartialD: MR,
    Pcy: NR,
    pcy: OR,
    percnt: BR,
    period: $R,
    permil: jR,
    perp: UR,
    pertenk: VR,
    Pfr: HR,
    pfr: GR,
    Phi: WR,
    phi: ZR,
    phiv: KR,
    phmmat: JR,
    phone: YR,
    Pi: QR,
    pi: XR,
    pitchfork: eL,
    piv: tL,
    planck: nL,
    planckh: rL,
    plankv: oL,
    plusacir: sL,
    plusb: cL,
    pluscir: iL,
    plus: lL,
    plusdo: aL,
    plusdu: uL,
    pluse: fL,
    PlusMinus: pL,
    plusmn: hL,
    plussim: dL,
    plustwo: gL,
    pm: mL,
    Poincareplane: _L,
    pointint: bL,
    popf: vL,
    Popf: xL,
    pound: kL,
    prap: yL,
    Pr: CL,
    pr: wL,
    prcue: AL,
    precapprox: EL,
    prec: SL,
    preccurlyeq: DL,
    Precedes: qL,
    PrecedesEqual: TL,
    PrecedesSlantEqual: FL,
    PrecedesTilde: RL,
    preceq: LL,
    precnapprox: IL,
    precneqq: zL,
    precnsim: PL,
    pre: ML,
    prE: NL,
    precsim: OL,
    prime: BL,
    Prime: $L,
    primes: jL,
    prnap: UL,
    prnE: VL,
    prnsim: HL,
    prod: GL,
    Product: WL,
    profalar: ZL,
    profline: KL,
    profsurf: JL,
    prop: YL,
    Proportional: QL,
    Proportion: XL,
    propto: eI,
    prsim: tI,
    prurel: nI,
    Pscr: rI,
    pscr: oI,
    Psi: sI,
    psi: cI,
    puncsp: iI,
    Qfr: lI,
    qfr: aI,
    qint: uI,
    qopf: fI,
    Qopf: pI,
    qprime: hI,
    Qscr: dI,
    qscr: gI,
    quaternions: mI,
    quatint: _I,
    quest: bI,
    questeq: vI,
    quot: xI,
    QUOT: kI,
    rAarr: yI,
    race: CI,
    Racute: wI,
    racute: AI,
    radic: EI,
    raemptyv: SI,
    rang: DI,
    Rang: qI,
    rangd: TI,
    range: FI,
    rangle: RI,
    raquo: LI,
    rarrap: II,
    rarrb: zI,
    rarrbfs: PI,
    rarrc: MI,
    rarr: NI,
    Rarr: OI,
    rArr: BI,
    rarrfs: $I,
    rarrhk: jI,
    rarrlp: UI,
    rarrpl: VI,
    rarrsim: HI,
    Rarrtl: GI,
    rarrtl: WI,
    rarrw: ZI,
    ratail: KI,
    rAtail: JI,
    ratio: YI,
    rationals: QI,
    rbarr: XI,
    rBarr: ez,
    RBarr: tz,
    rbbrk: nz,
    rbrace: rz,
    rbrack: oz,
    rbrke: sz,
    rbrksld: cz,
    rbrkslu: iz,
    Rcaron: lz,
    rcaron: az,
    Rcedil: uz,
    rcedil: fz,
    rceil: pz,
    rcub: hz,
    Rcy: dz,
    rcy: gz,
    rdca: mz,
    rdldhar: _z,
    rdquo: bz,
    rdquor: vz,
    rdsh: xz,
    real: kz,
    realine: yz,
    realpart: Cz,
    reals: wz,
    Re: Az,
    rect: Ez,
    reg: Sz,
    REG: Dz,
    ReverseElement: qz,
    ReverseEquilibrium: Tz,
    ReverseUpEquilibrium: Fz,
    rfisht: Rz,
    rfloor: Lz,
    rfr: Iz,
    Rfr: zz,
    rHar: Pz,
    rhard: Mz,
    rharu: Nz,
    rharul: Oz,
    Rho: Bz,
    rho: $z,
    rhov: jz,
    RightAngleBracket: Uz,
    RightArrowBar: Vz,
    rightarrow: Hz,
    RightArrow: Gz,
    Rightarrow: Wz,
    RightArrowLeftArrow: Zz,
    rightarrowtail: Kz,
    RightCeiling: Jz,
    RightDoubleBracket: Yz,
    RightDownTeeVector: Qz,
    RightDownVectorBar: Xz,
    RightDownVector: e2,
    RightFloor: t2,
    rightharpoondown: n2,
    rightharpoonup: r2,
    rightleftarrows: o2,
    rightleftharpoons: s2,
    rightrightarrows: c2,
    rightsquigarrow: i2,
    RightTeeArrow: l2,
    RightTee: a2,
    RightTeeVector: u2,
    rightthreetimes: f2,
    RightTriangleBar: p2,
    RightTriangle: h2,
    RightTriangleEqual: d2,
    RightUpDownVector: g2,
    RightUpTeeVector: m2,
    RightUpVectorBar: _2,
    RightUpVector: b2,
    RightVectorBar: v2,
    RightVector: x2,
    ring: k2,
    risingdotseq: y2,
    rlarr: C2,
    rlhar: w2,
    rlm: A2,
    rmoustache: E2,
    rmoust: S2,
    rnmid: D2,
    roang: q2,
    roarr: T2,
    robrk: F2,
    ropar: R2,
    ropf: L2,
    Ropf: I2,
    roplus: z2,
    rotimes: P2,
    RoundImplies: M2,
    rpar: N2,
    rpargt: O2,
    rppolint: B2,
    rrarr: $2,
    Rrightarrow: j2,
    rsaquo: U2,
    rscr: V2,
    Rscr: H2,
    rsh: G2,
    Rsh: W2,
    rsqb: Z2,
    rsquo: K2,
    rsquor: J2,
    rthree: Y2,
    rtimes: Q2,
    rtri: X2,
    rtrie: eP,
    rtrif: tP,
    rtriltri: nP,
    RuleDelayed: rP,
    ruluhar: oP,
    rx: sP,
    Sacute: cP,
    sacute: iP,
    sbquo: lP,
    scap: aP,
    Scaron: uP,
    scaron: fP,
    Sc: pP,
    sc: hP,
    sccue: dP,
    sce: gP,
    scE: mP,
    Scedil: _P,
    scedil: bP,
    Scirc: vP,
    scirc: xP,
    scnap: kP,
    scnE: yP,
    scnsim: CP,
    scpolint: wP,
    scsim: AP,
    Scy: EP,
    scy: SP,
    sdotb: DP,
    sdot: qP,
    sdote: TP,
    searhk: FP,
    searr: RP,
    seArr: LP,
    searrow: IP,
    sect: zP,
    semi: PP,
    seswar: MP,
    setminus: NP,
    setmn: OP,
    sext: BP,
    Sfr: $P,
    sfr: jP,
    sfrown: UP,
    sharp: VP,
    SHCHcy: HP,
    shchcy: GP,
    SHcy: WP,
    shcy: ZP,
    ShortDownArrow: KP,
    ShortLeftArrow: JP,
    shortmid: YP,
    shortparallel: QP,
    ShortRightArrow: XP,
    ShortUpArrow: eM,
    shy: tM,
    Sigma: nM,
    sigma: rM,
    sigmaf: oM,
    sigmav: sM,
    sim: cM,
    simdot: iM,
    sime: lM,
    simeq: aM,
    simg: uM,
    simgE: fM,
    siml: pM,
    simlE: hM,
    simne: dM,
    simplus: gM,
    simrarr: mM,
    slarr: _M,
    SmallCircle: bM,
    smallsetminus: vM,
    smashp: xM,
    smeparsl: kM,
    smid: yM,
    smile: CM,
    smt: wM,
    smte: AM,
    smtes: EM,
    SOFTcy: SM,
    softcy: DM,
    solbar: qM,
    solb: TM,
    sol: FM,
    Sopf: RM,
    sopf: LM,
    spades: IM,
    spadesuit: zM,
    spar: PM,
    sqcap: MM,
    sqcaps: NM,
    sqcup: OM,
    sqcups: BM,
    Sqrt: $M,
    sqsub: jM,
    sqsube: UM,
    sqsubset: VM,
    sqsubseteq: HM,
    sqsup: GM,
    sqsupe: WM,
    sqsupset: ZM,
    sqsupseteq: KM,
    square: JM,
    Square: YM,
    SquareIntersection: QM,
    SquareSubset: XM,
    SquareSubsetEqual: eN,
    SquareSuperset: tN,
    SquareSupersetEqual: nN,
    SquareUnion: rN,
    squarf: oN,
    squ: sN,
    squf: cN,
    srarr: iN,
    Sscr: lN,
    sscr: aN,
    ssetmn: uN,
    ssmile: fN,
    sstarf: pN,
    Star: hN,
    star: dN,
    starf: gN,
    straightepsilon: mN,
    straightphi: _N,
    strns: bN,
    sub: vN,
    Sub: xN,
    subdot: kN,
    subE: yN,
    sube: CN,
    subedot: wN,
    submult: AN,
    subnE: EN,
    subne: SN,
    subplus: DN,
    subrarr: qN,
    subset: TN,
    Subset: FN,
    subseteq: RN,
    subseteqq: LN,
    SubsetEqual: IN,
    subsetneq: zN,
    subsetneqq: PN,
    subsim: MN,
    subsub: NN,
    subsup: ON,
    succapprox: BN,
    succ: $N,
    succcurlyeq: jN,
    Succeeds: UN,
    SucceedsEqual: VN,
    SucceedsSlantEqual: HN,
    SucceedsTilde: GN,
    succeq: WN,
    succnapprox: ZN,
    succneqq: KN,
    succnsim: JN,
    succsim: YN,
    SuchThat: QN,
    sum: XN,
    Sum: eO,
    sung: tO,
    sup1: nO,
    sup2: rO,
    sup3: oO,
    sup: sO,
    Sup: cO,
    supdot: iO,
    supdsub: lO,
    supE: aO,
    supe: uO,
    supedot: fO,
    Superset: pO,
    SupersetEqual: hO,
    suphsol: dO,
    suphsub: gO,
    suplarr: mO,
    supmult: _O,
    supnE: bO,
    supne: vO,
    supplus: xO,
    supset: kO,
    Supset: yO,
    supseteq: CO,
    supseteqq: wO,
    supsetneq: AO,
    supsetneqq: EO,
    supsim: SO,
    supsub: DO,
    supsup: qO,
    swarhk: TO,
    swarr: FO,
    swArr: RO,
    swarrow: LO,
    swnwar: IO,
    szlig: zO,
    Tab: PO,
    target: MO,
    Tau: NO,
    tau: OO,
    tbrk: BO,
    Tcaron: $O,
    tcaron: jO,
    Tcedil: UO,
    tcedil: VO,
    Tcy: HO,
    tcy: GO,
    tdot: WO,
    telrec: ZO,
    Tfr: KO,
    tfr: JO,
    there4: YO,
    therefore: QO,
    Therefore: XO,
    Theta: eB,
    theta: tB,
    thetasym: nB,
    thetav: rB,
    thickapprox: oB,
    thicksim: sB,
    ThickSpace: cB,
    ThinSpace: iB,
    thinsp: lB,
    thkap: aB,
    thksim: uB,
    THORN: fB,
    thorn: pB,
    tilde: hB,
    Tilde: dB,
    TildeEqual: gB,
    TildeFullEqual: mB,
    TildeTilde: _B,
    timesbar: bB,
    timesb: vB,
    times: xB,
    timesd: kB,
    tint: yB,
    toea: CB,
    topbot: wB,
    topcir: AB,
    top: EB,
    Topf: SB,
    topf: DB,
    topfork: qB,
    tosa: TB,
    tprime: FB,
    trade: RB,
    TRADE: LB,
    triangle: IB,
    triangledown: zB,
    triangleleft: PB,
    trianglelefteq: MB,
    triangleq: NB,
    triangleright: OB,
    trianglerighteq: BB,
    tridot: $B,
    trie: jB,
    triminus: UB,
    TripleDot: VB,
    triplus: HB,
    trisb: GB,
    tritime: WB,
    trpezium: ZB,
    Tscr: KB,
    tscr: JB,
    TScy: YB,
    tscy: QB,
    TSHcy: XB,
    tshcy: e3,
    Tstrok: t3,
    tstrok: n3,
    twixt: r3,
    twoheadleftarrow: o3,
    twoheadrightarrow: s3,
    Uacute: c3,
    uacute: i3,
    uarr: l3,
    Uarr: a3,
    uArr: u3,
    Uarrocir: f3,
    Ubrcy: p3,
    ubrcy: h3,
    Ubreve: d3,
    ubreve: g3,
    Ucirc: m3,
    ucirc: _3,
    Ucy: b3,
    ucy: v3,
    udarr: x3,
    Udblac: k3,
    udblac: y3,
    udhar: C3,
    ufisht: w3,
    Ufr: A3,
    ufr: E3,
    Ugrave: S3,
    ugrave: D3,
    uHar: q3,
    uharl: T3,
    uharr: F3,
    uhblk: R3,
    ulcorn: L3,
    ulcorner: I3,
    ulcrop: z3,
    ultri: P3,
    Umacr: M3,
    umacr: N3,
    uml: O3,
    UnderBar: B3,
    UnderBrace: $3,
    UnderBracket: j3,
    UnderParenthesis: U3,
    Union: V3,
    UnionPlus: H3,
    Uogon: G3,
    uogon: W3,
    Uopf: Z3,
    uopf: K3,
    UpArrowBar: J3,
    uparrow: Y3,
    UpArrow: Q3,
    Uparrow: X3,
    UpArrowDownArrow: e$,
    updownarrow: t$,
    UpDownArrow: n$,
    Updownarrow: r$,
    UpEquilibrium: o$,
    upharpoonleft: s$,
    upharpoonright: c$,
    uplus: i$,
    UpperLeftArrow: l$,
    UpperRightArrow: a$,
    upsi: u$,
    Upsi: f$,
    upsih: p$,
    Upsilon: h$,
    upsilon: d$,
    UpTeeArrow: g$,
    UpTee: m$,
    upuparrows: _$,
    urcorn: b$,
    urcorner: v$,
    urcrop: x$,
    Uring: k$,
    uring: y$,
    urtri: C$,
    Uscr: w$,
    uscr: A$,
    utdot: E$,
    Utilde: S$,
    utilde: D$,
    utri: q$,
    utrif: T$,
    uuarr: F$,
    Uuml: R$,
    uuml: L$,
    uwangle: I$,
    vangrt: z$,
    varepsilon: P$,
    varkappa: M$,
    varnothing: N$,
    varphi: O$,
    varpi: B$,
    varpropto: $$,
    varr: j$,
    vArr: U$,
    varrho: V$,
    varsigma: H$,
    varsubsetneq: G$,
    varsubsetneqq: W$,
    varsupsetneq: Z$,
    varsupsetneqq: K$,
    vartheta: J$,
    vartriangleleft: Y$,
    vartriangleright: Q$,
    vBar: X$,
    Vbar: ej,
    vBarv: tj,
    Vcy: nj,
    vcy: rj,
    vdash: oj,
    vDash: sj,
    Vdash: cj,
    VDash: ij,
    Vdashl: lj,
    veebar: aj,
    vee: uj,
    Vee: fj,
    veeeq: pj,
    vellip: hj,
    verbar: dj,
    Verbar: gj,
    vert: mj,
    Vert: _j,
    VerticalBar: bj,
    VerticalLine: vj,
    VerticalSeparator: xj,
    VerticalTilde: kj,
    VeryThinSpace: yj,
    Vfr: Cj,
    vfr: wj,
    vltri: Aj,
    vnsub: Ej,
    vnsup: Sj,
    Vopf: Dj,
    vopf: qj,
    vprop: Tj,
    vrtri: Fj,
    Vscr: Rj,
    vscr: Lj,
    vsubnE: Ij,
    vsubne: zj,
    vsupnE: Pj,
    vsupne: Mj,
    Vvdash: Nj,
    vzigzag: Oj,
    Wcirc: Bj,
    wcirc: $j,
    wedbar: jj,
    wedge: Uj,
    Wedge: Vj,
    wedgeq: Hj,
    weierp: Gj,
    Wfr: Wj,
    wfr: Zj,
    Wopf: Kj,
    wopf: Jj,
    wp: Yj,
    wr: Qj,
    wreath: Xj,
    Wscr: eU,
    wscr: tU,
    xcap: nU,
    xcirc: rU,
    xcup: oU,
    xdtri: sU,
    Xfr: cU,
    xfr: iU,
    xharr: lU,
    xhArr: aU,
    Xi: uU,
    xi: fU,
    xlarr: pU,
    xlArr: hU,
    xmap: dU,
    xnis: gU,
    xodot: mU,
    Xopf: _U,
    xopf: bU,
    xoplus: vU,
    xotime: xU,
    xrarr: kU,
    xrArr: yU,
    Xscr: CU,
    xscr: wU,
    xsqcup: AU,
    xuplus: EU,
    xutri: SU,
    xvee: DU,
    xwedge: qU,
    Yacute: TU,
    yacute: FU,
    YAcy: RU,
    yacy: LU,
    Ycirc: IU,
    ycirc: zU,
    Ycy: PU,
    ycy: MU,
    yen: NU,
    Yfr: OU,
    yfr: BU,
    YIcy: $U,
    yicy: jU,
    Yopf: UU,
    yopf: VU,
    Yscr: HU,
    yscr: GU,
    YUcy: WU,
    yucy: ZU,
    yuml: KU,
    Yuml: JU,
    Zacute: YU,
    zacute: QU,
    Zcaron: XU,
    zcaron: e6,
    Zcy: t6,
    zcy: n6,
    Zdot: r6,
    zdot: o6,
    zeetrf: s6,
    ZeroWidthSpace: c6,
    Zeta: i6,
    zeta: l6,
    zfr: a6,
    Zfr: u6,
    ZHcy: f6,
    zhcy: p6,
    zigrarr: h6,
    zopf: d6,
    Zopf: g6,
    Zscr: m6,
    zscr: _6,
    zwj: b6,
    zwnj: v6,
  };
var bc = x6,
  Zr =
    /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,
  Bt = {},
  Ro = {};
function k6(t) {
  var e,
    n,
    r = Ro[t];
  if (r) return r;
  for (r = Ro[t] = [], e = 0; e < 128; e++)
    (n = String.fromCharCode(e)),
      /^[0-9a-z]$/i.test(n)
        ? r.push(n)
        : r.push("%" + ("0" + e.toString(16).toUpperCase()).slice(-2));
  for (e = 0; e < t.length; e++) r[t.charCodeAt(e)] = t[e];
  return r;
}
function On(t, e, n) {
  var r,
    o,
    s,
    c,
    i,
    l = "";
  for (
    typeof e != "string" && ((n = e), (e = On.defaultChars)),
      typeof n > "u" && (n = !0),
      i = k6(e),
      r = 0,
      o = t.length;
    r < o;
    r++
  ) {
    if (
      ((s = t.charCodeAt(r)),
      n &&
        s === 37 &&
        r + 2 < o &&
        /^[0-9a-f]{2}$/i.test(t.slice(r + 1, r + 3)))
    ) {
      (l += t.slice(r, r + 3)), (r += 2);
      continue;
    }
    if (s < 128) {
      l += i[s];
      continue;
    }
    if (s >= 55296 && s <= 57343) {
      if (
        s >= 55296 &&
        s <= 56319 &&
        r + 1 < o &&
        ((c = t.charCodeAt(r + 1)), c >= 56320 && c <= 57343)
      ) {
        (l += encodeURIComponent(t[r] + t[r + 1])), r++;
        continue;
      }
      l += "%EF%BF%BD";
      continue;
    }
    l += encodeURIComponent(t[r]);
  }
  return l;
}
On.defaultChars = ";/?:@&=+$,-_.!~*'()#";
On.componentChars = "-_.!~*'()";
var y6 = On,
  Lo = {};
function C6(t) {
  var e,
    n,
    r = Lo[t];
  if (r) return r;
  for (r = Lo[t] = [], e = 0; e < 128; e++)
    (n = String.fromCharCode(e)), r.push(n);
  for (e = 0; e < t.length; e++)
    (n = t.charCodeAt(e)),
      (r[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2));
  return r;
}
function Bn(t, e) {
  var n;
  return (
    typeof e != "string" && (e = Bn.defaultChars),
    (n = C6(e)),
    t.replace(/(%[a-f0-9]{2})+/gi, function (r) {
      var o,
        s,
        c,
        i,
        l,
        a,
        u,
        f = "";
      for (o = 0, s = r.length; o < s; o += 3) {
        if (((c = parseInt(r.slice(o + 1, o + 3), 16)), c < 128)) {
          f += n[c];
          continue;
        }
        if (
          (c & 224) === 192 &&
          o + 3 < s &&
          ((i = parseInt(r.slice(o + 4, o + 6), 16)), (i & 192) === 128)
        ) {
          (u = ((c << 6) & 1984) | (i & 63)),
            u < 128 ? (f += "��") : (f += String.fromCharCode(u)),
            (o += 3);
          continue;
        }
        if (
          (c & 240) === 224 &&
          o + 6 < s &&
          ((i = parseInt(r.slice(o + 4, o + 6), 16)),
          (l = parseInt(r.slice(o + 7, o + 9), 16)),
          (i & 192) === 128 && (l & 192) === 128)
        ) {
          (u = ((c << 12) & 61440) | ((i << 6) & 4032) | (l & 63)),
            u < 2048 || (u >= 55296 && u <= 57343)
              ? (f += "���")
              : (f += String.fromCharCode(u)),
            (o += 6);
          continue;
        }
        if (
          (c & 248) === 240 &&
          o + 9 < s &&
          ((i = parseInt(r.slice(o + 4, o + 6), 16)),
          (l = parseInt(r.slice(o + 7, o + 9), 16)),
          (a = parseInt(r.slice(o + 10, o + 12), 16)),
          (i & 192) === 128 && (l & 192) === 128 && (a & 192) === 128)
        ) {
          (u =
            ((c << 18) & 1835008) |
            ((i << 12) & 258048) |
            ((l << 6) & 4032) |
            (a & 63)),
            u < 65536 || u > 1114111
              ? (f += "����")
              : ((u -= 65536),
                (f += String.fromCharCode(
                  55296 + (u >> 10),
                  56320 + (u & 1023)
                ))),
            (o += 9);
          continue;
        }
        f += "�";
      }
      return f;
    })
  );
}
Bn.defaultChars = ";/?:@&=+$,#";
Bn.componentChars = "";
var w6 = Bn,
  A6 = function (e) {
    var n = "";
    return (
      (n += e.protocol || ""),
      (n += e.slashes ? "//" : ""),
      (n += e.auth ? e.auth + "@" : ""),
      e.hostname && e.hostname.indexOf(":") !== -1
        ? (n += "[" + e.hostname + "]")
        : (n += e.hostname || ""),
      (n += e.port ? ":" + e.port : ""),
      (n += e.pathname || ""),
      (n += e.search || ""),
      (n += e.hash || ""),
      n
    );
  };
function Sn() {
  (this.protocol = null),
    (this.slashes = null),
    (this.auth = null),
    (this.port = null),
    (this.hostname = null),
    (this.hash = null),
    (this.search = null),
    (this.pathname = null);
}
var E6 = /^([a-z0-9.+-]+:)/i,
  S6 = /:[0-9]*$/,
  D6 = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
  q6 = [
    "<",
    ">",
    '"',
    "`",
    " ",
    "\r",
    `
`,
    "	",
  ],
  T6 = ["{", "}", "|", "\\", "^", "`"].concat(q6),
  F6 = ["'"].concat(T6),
  Io = ["%", "/", "?", ";", "#"].concat(F6),
  zo = ["/", "?", "#"],
  R6 = 255,
  Po = /^[+a-z0-9A-Z_-]{0,63}$/,
  L6 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  Mo = { javascript: !0, "javascript:": !0 },
  No = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0,
  };
function I6(t, e) {
  if (t && t instanceof Sn) return t;
  var n = new Sn();
  return n.parse(t, e), n;
}
Sn.prototype.parse = function (t, e) {
  var n,
    r,
    o,
    s,
    c,
    i = t;
  if (((i = i.trim()), !e && t.split("#").length === 1)) {
    var l = D6.exec(i);
    if (l) return (this.pathname = l[1]), l[2] && (this.search = l[2]), this;
  }
  var a = E6.exec(i);
  if (
    (a &&
      ((a = a[0]),
      (o = a.toLowerCase()),
      (this.protocol = a),
      (i = i.substr(a.length))),
    (e || a || i.match(/^\/\/[^@\/]+@[^@\/]+/)) &&
      ((c = i.substr(0, 2) === "//"),
      c && !(a && Mo[a]) && ((i = i.substr(2)), (this.slashes = !0))),
    !Mo[a] && (c || (a && !No[a])))
  ) {
    var u = -1;
    for (n = 0; n < zo.length; n++)
      (s = i.indexOf(zo[n])), s !== -1 && (u === -1 || s < u) && (u = s);
    var f, h;
    for (
      u === -1 ? (h = i.lastIndexOf("@")) : (h = i.lastIndexOf("@", u)),
        h !== -1 &&
          ((f = i.slice(0, h)), (i = i.slice(h + 1)), (this.auth = f)),
        u = -1,
        n = 0;
      n < Io.length;
      n++
    )
      (s = i.indexOf(Io[n])), s !== -1 && (u === -1 || s < u) && (u = s);
    u === -1 && (u = i.length), i[u - 1] === ":" && u--;
    var d = i.slice(0, u);
    (i = i.slice(u)), this.parseHost(d), (this.hostname = this.hostname || "");
    var _ =
      this.hostname[0] === "[" &&
      this.hostname[this.hostname.length - 1] === "]";
    if (!_) {
      var b = this.hostname.split(/\./);
      for (n = 0, r = b.length; n < r; n++) {
        var C = b[n];
        if (C && !C.match(Po)) {
          for (var E = "", w = 0, A = C.length; w < A; w++)
            C.charCodeAt(w) > 127 ? (E += "x") : (E += C[w]);
          if (!E.match(Po)) {
            var I = b.slice(0, n),
              B = b.slice(n + 1),
              k = C.match(L6);
            k && (I.push(k[1]), B.unshift(k[2])),
              B.length && (i = B.join(".") + i),
              (this.hostname = I.join("."));
            break;
          }
        }
      }
    }
    this.hostname.length > R6 && (this.hostname = ""),
      _ && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  var U = i.indexOf("#");
  U !== -1 && ((this.hash = i.substr(U)), (i = i.slice(0, U)));
  var X = i.indexOf("?");
  return (
    X !== -1 && ((this.search = i.substr(X)), (i = i.slice(0, X))),
    i && (this.pathname = i),
    No[o] && this.hostname && !this.pathname && (this.pathname = ""),
    this
  );
};
Sn.prototype.parseHost = function (t) {
  var e = S6.exec(t);
  e &&
    ((e = e[0]),
    e !== ":" && (this.port = e.substr(1)),
    (t = t.substr(0, t.length - e.length))),
    t && (this.hostname = t);
};
var z6 = I6;
Bt.encode = y6;
Bt.decode = w6;
Bt.format = A6;
Bt.parse = z6;
var vt = {},
  or,
  Oo;
function vc() {
  return (
    Oo ||
      ((Oo = 1),
      (or =
        /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/)),
    or
  );
}
var sr, Bo;
function xc() {
  return Bo || ((Bo = 1), (sr = /[\0-\x1F\x7F-\x9F]/)), sr;
}
var cr, $o;
function P6() {
  return (
    $o ||
      (($o = 1),
      (cr =
        /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/)),
    cr
  );
}
var ir, jo;
function kc() {
  return (
    jo ||
      ((jo = 1),
      (ir = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/)),
    ir
  );
}
var Uo;
function M6() {
  return (
    Uo ||
      ((Uo = 1),
      (vt.Any = vc()),
      (vt.Cc = xc()),
      (vt.Cf = P6()),
      (vt.P = Zr),
      (vt.Z = kc())),
    vt
  );
}
(function (t) {
  function e(F) {
    return Object.prototype.toString.call(F);
  }
  function n(F) {
    return e(F) === "[object String]";
  }
  var r = Object.prototype.hasOwnProperty;
  function o(F, fe) {
    return r.call(F, fe);
  }
  function s(F) {
    var fe = Array.prototype.slice.call(arguments, 1);
    return (
      fe.forEach(function ($) {
        if ($) {
          if (typeof $ != "object") throw new TypeError($ + "must be object");
          Object.keys($).forEach(function (Y) {
            F[Y] = $[Y];
          });
        }
      }),
      F
    );
  }
  function c(F, fe, $) {
    return [].concat(F.slice(0, fe), $, F.slice(fe + 1));
  }
  function i(F) {
    return !(
      (F >= 55296 && F <= 57343) ||
      (F >= 64976 && F <= 65007) ||
      (F & 65535) === 65535 ||
      (F & 65535) === 65534 ||
      (F >= 0 && F <= 8) ||
      F === 11 ||
      (F >= 14 && F <= 31) ||
      (F >= 127 && F <= 159) ||
      F > 1114111
    );
  }
  function l(F) {
    if (F > 65535) {
      F -= 65536;
      var fe = 55296 + (F >> 10),
        $ = 56320 + (F & 1023);
      return String.fromCharCode(fe, $);
    }
    return String.fromCharCode(F);
  }
  var a = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,
    u = /&([a-z#][a-z0-9]{1,31});/gi,
    f = new RegExp(a.source + "|" + u.source, "gi"),
    h = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,
    d = bc;
  function _(F, fe) {
    var $ = 0;
    return o(d, fe)
      ? d[fe]
      : fe.charCodeAt(0) === 35 &&
        h.test(fe) &&
        (($ =
          fe[1].toLowerCase() === "x"
            ? parseInt(fe.slice(2), 16)
            : parseInt(fe.slice(1), 10)),
        i($))
      ? l($)
      : F;
  }
  function b(F) {
    return F.indexOf("\\") < 0 ? F : F.replace(a, "$1");
  }
  function C(F) {
    return F.indexOf("\\") < 0 && F.indexOf("&") < 0
      ? F
      : F.replace(f, function (fe, $, Y) {
          return $ || _(fe, Y);
        });
  }
  var E = /[&<>"]/,
    w = /[&<>"]/g,
    A = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  function I(F) {
    return A[F];
  }
  function B(F) {
    return E.test(F) ? F.replace(w, I) : F;
  }
  var k = /[.?*+^$[\]\\(){}|-]/g;
  function U(F) {
    return F.replace(k, "\\$&");
  }
  function X(F) {
    switch (F) {
      case 9:
      case 32:
        return !0;
    }
    return !1;
  }
  function Ee(F) {
    if (F >= 8192 && F <= 8202) return !0;
    switch (F) {
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return !0;
    }
    return !1;
  }
  var G = Zr;
  function ee(F) {
    return G.test(F);
  }
  function qe(F) {
    switch (F) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return !0;
      default:
        return !1;
    }
  }
  function Me(F) {
    return (
      (F = F.trim().replace(/\s+/g, " ")),
      "ẞ".toLowerCase() === "Ṿ" && (F = F.replace(/ẞ/g, "ß")),
      F.toLowerCase().toUpperCase()
    );
  }
  (t.lib = {}),
    (t.lib.mdurl = Bt),
    (t.lib.ucmicro = M6()),
    (t.assign = s),
    (t.isString = n),
    (t.has = o),
    (t.unescapeMd = b),
    (t.unescapeAll = C),
    (t.isValidEntityCode = i),
    (t.fromCodePoint = l),
    (t.escapeHtml = B),
    (t.arrayReplaceAt = c),
    (t.isSpace = X),
    (t.isWhiteSpace = Ee),
    (t.isMdAsciiPunct = qe),
    (t.isPunctChar = ee),
    (t.escapeRE = U),
    (t.normalizeReference = Me);
})(le);
var $n = {},
  N6 = function (e, n, r) {
    var o,
      s,
      c,
      i,
      l = -1,
      a = e.posMax,
      u = e.pos;
    for (e.pos = n + 1, o = 1; e.pos < a; ) {
      if (((c = e.src.charCodeAt(e.pos)), c === 93 && (o--, o === 0))) {
        s = !0;
        break;
      }
      if (((i = e.pos), e.md.inline.skipToken(e), c === 91)) {
        if (i === e.pos - 1) o++;
        else if (r) return (e.pos = u), -1;
      }
    }
    return s && (l = e.pos), (e.pos = u), l;
  },
  Vo = le.unescapeAll,
  O6 = function (e, n, r) {
    var o,
      s,
      c = 0,
      i = n,
      l = { ok: !1, pos: 0, lines: 0, str: "" };
    if (e.charCodeAt(n) === 60) {
      for (n++; n < r; ) {
        if (((o = e.charCodeAt(n)), o === 10 || o === 60)) return l;
        if (o === 62)
          return (
            (l.pos = n + 1), (l.str = Vo(e.slice(i + 1, n))), (l.ok = !0), l
          );
        if (o === 92 && n + 1 < r) {
          n += 2;
          continue;
        }
        n++;
      }
      return l;
    }
    for (
      s = 0;
      n < r && ((o = e.charCodeAt(n)), !(o === 32 || o < 32 || o === 127));

    ) {
      if (o === 92 && n + 1 < r) {
        if (e.charCodeAt(n + 1) === 32) break;
        n += 2;
        continue;
      }
      if (o === 40 && (s++, s > 32)) return l;
      if (o === 41) {
        if (s === 0) break;
        s--;
      }
      n++;
    }
    return (
      i === n ||
        s !== 0 ||
        ((l.str = Vo(e.slice(i, n))), (l.lines = c), (l.pos = n), (l.ok = !0)),
      l
    );
  },
  B6 = le.unescapeAll,
  $6 = function (e, n, r) {
    var o,
      s,
      c = 0,
      i = n,
      l = { ok: !1, pos: 0, lines: 0, str: "" };
    if (n >= r || ((s = e.charCodeAt(n)), s !== 34 && s !== 39 && s !== 40))
      return l;
    for (n++, s === 40 && (s = 41); n < r; ) {
      if (((o = e.charCodeAt(n)), o === s))
        return (
          (l.pos = n + 1),
          (l.lines = c),
          (l.str = B6(e.slice(i + 1, n))),
          (l.ok = !0),
          l
        );
      if (o === 40 && s === 41) return l;
      o === 10
        ? c++
        : o === 92 && n + 1 < r && (n++, e.charCodeAt(n) === 10 && c++),
        n++;
    }
    return l;
  };
$n.parseLinkLabel = N6;
$n.parseLinkDestination = O6;
$n.parseLinkTitle = $6;
var j6 = le.assign,
  U6 = le.unescapeAll,
  wt = le.escapeHtml,
  Xe = {};
Xe.code_inline = function (t, e, n, r, o) {
  var s = t[e];
  return "<code" + o.renderAttrs(s) + ">" + wt(t[e].content) + "</code>";
};
Xe.code_block = function (t, e, n, r, o) {
  var s = t[e];
  return (
    "<pre" +
    o.renderAttrs(s) +
    "><code>" +
    wt(t[e].content) +
    `</code></pre>
`
  );
};
Xe.fence = function (t, e, n, r, o) {
  var s = t[e],
    c = s.info ? U6(s.info).trim() : "",
    i = "",
    l = "",
    a,
    u,
    f,
    h,
    d;
  return (
    c && ((f = c.split(/(\s+)/g)), (i = f[0]), (l = f.slice(2).join(""))),
    n.highlight
      ? (a = n.highlight(s.content, i, l) || wt(s.content))
      : (a = wt(s.content)),
    a.indexOf("<pre") === 0
      ? a +
        `
`
      : c
      ? ((u = s.attrIndex("class")),
        (h = s.attrs ? s.attrs.slice() : []),
        u < 0
          ? h.push(["class", n.langPrefix + i])
          : ((h[u] = h[u].slice()), (h[u][1] += " " + n.langPrefix + i)),
        (d = { attrs: h }),
        "<pre><code" +
          o.renderAttrs(d) +
          ">" +
          a +
          `</code></pre>
`)
      : "<pre><code" +
        o.renderAttrs(s) +
        ">" +
        a +
        `</code></pre>
`
  );
};
Xe.image = function (t, e, n, r, o) {
  var s = t[e];
  return (
    (s.attrs[s.attrIndex("alt")][1] = o.renderInlineAsText(s.children, n, r)),
    o.renderToken(t, e, n)
  );
};
Xe.hardbreak = function (t, e, n) {
  return n.xhtmlOut
    ? `<br />
`
    : `<br>
`;
};
Xe.softbreak = function (t, e, n) {
  return n.breaks
    ? n.xhtmlOut
      ? `<br />
`
      : `<br>
`
    : `
`;
};
Xe.text = function (t, e) {
  return wt(t[e].content);
};
Xe.html_block = function (t, e) {
  return t[e].content;
};
Xe.html_inline = function (t, e) {
  return t[e].content;
};
function $t() {
  this.rules = j6({}, Xe);
}
$t.prototype.renderAttrs = function (e) {
  var n, r, o;
  if (!e.attrs) return "";
  for (o = "", n = 0, r = e.attrs.length; n < r; n++)
    o += " " + wt(e.attrs[n][0]) + '="' + wt(e.attrs[n][1]) + '"';
  return o;
};
$t.prototype.renderToken = function (e, n, r) {
  var o,
    s = "",
    c = !1,
    i = e[n];
  return i.hidden
    ? ""
    : (i.block &&
        i.nesting !== -1 &&
        n &&
        e[n - 1].hidden &&
        (s += `
`),
      (s += (i.nesting === -1 ? "</" : "<") + i.tag),
      (s += this.renderAttrs(i)),
      i.nesting === 0 && r.xhtmlOut && (s += " /"),
      i.block &&
        ((c = !0),
        i.nesting === 1 &&
          n + 1 < e.length &&
          ((o = e[n + 1]),
          (o.type === "inline" ||
            o.hidden ||
            (o.nesting === -1 && o.tag === i.tag)) &&
            (c = !1))),
      (s += c
        ? `>
`
        : ">"),
      s);
};
$t.prototype.renderInline = function (t, e, n) {
  for (var r, o = "", s = this.rules, c = 0, i = t.length; c < i; c++)
    (r = t[c].type),
      typeof s[r] < "u"
        ? (o += s[r](t, c, e, n, this))
        : (o += this.renderToken(t, c, e));
  return o;
};
$t.prototype.renderInlineAsText = function (t, e, n) {
  for (var r = "", o = 0, s = t.length; o < s; o++)
    t[o].type === "text"
      ? (r += t[o].content)
      : t[o].type === "image"
      ? (r += this.renderInlineAsText(t[o].children, e, n))
      : t[o].type === "softbreak" &&
        (r += `
`);
  return r;
};
$t.prototype.render = function (t, e, n) {
  var r,
    o,
    s,
    c = "",
    i = this.rules;
  for (r = 0, o = t.length; r < o; r++)
    (s = t[r].type),
      s === "inline"
        ? (c += this.renderInline(t[r].children, e, n))
        : typeof i[s] < "u"
        ? (c += i[t[r].type](t, r, e, n, this))
        : (c += this.renderToken(t, r, e, n));
  return c;
};
var V6 = $t;
function We() {
  (this.__rules__ = []), (this.__cache__ = null);
}
We.prototype.__find__ = function (t) {
  for (var e = 0; e < this.__rules__.length; e++)
    if (this.__rules__[e].name === t) return e;
  return -1;
};
We.prototype.__compile__ = function () {
  var t = this,
    e = [""];
  t.__rules__.forEach(function (n) {
    n.enabled &&
      n.alt.forEach(function (r) {
        e.indexOf(r) < 0 && e.push(r);
      });
  }),
    (t.__cache__ = {}),
    e.forEach(function (n) {
      (t.__cache__[n] = []),
        t.__rules__.forEach(function (r) {
          r.enabled &&
            ((n && r.alt.indexOf(n) < 0) || t.__cache__[n].push(r.fn));
        });
    });
};
We.prototype.at = function (t, e, n) {
  var r = this.__find__(t),
    o = n || {};
  if (r === -1) throw new Error("Parser rule not found: " + t);
  (this.__rules__[r].fn = e),
    (this.__rules__[r].alt = o.alt || []),
    (this.__cache__ = null);
};
We.prototype.before = function (t, e, n, r) {
  var o = this.__find__(t),
    s = r || {};
  if (o === -1) throw new Error("Parser rule not found: " + t);
  this.__rules__.splice(o, 0, {
    name: e,
    enabled: !0,
    fn: n,
    alt: s.alt || [],
  }),
    (this.__cache__ = null);
};
We.prototype.after = function (t, e, n, r) {
  var o = this.__find__(t),
    s = r || {};
  if (o === -1) throw new Error("Parser rule not found: " + t);
  this.__rules__.splice(o + 1, 0, {
    name: e,
    enabled: !0,
    fn: n,
    alt: s.alt || [],
  }),
    (this.__cache__ = null);
};
We.prototype.push = function (t, e, n) {
  var r = n || {};
  this.__rules__.push({ name: t, enabled: !0, fn: e, alt: r.alt || [] }),
    (this.__cache__ = null);
};
We.prototype.enable = function (t, e) {
  Array.isArray(t) || (t = [t]);
  var n = [];
  return (
    t.forEach(function (r) {
      var o = this.__find__(r);
      if (o < 0) {
        if (e) return;
        throw new Error("Rules manager: invalid rule name " + r);
      }
      (this.__rules__[o].enabled = !0), n.push(r);
    }, this),
    (this.__cache__ = null),
    n
  );
};
We.prototype.enableOnly = function (t, e) {
  Array.isArray(t) || (t = [t]),
    this.__rules__.forEach(function (n) {
      n.enabled = !1;
    }),
    this.enable(t, e);
};
We.prototype.disable = function (t, e) {
  Array.isArray(t) || (t = [t]);
  var n = [];
  return (
    t.forEach(function (r) {
      var o = this.__find__(r);
      if (o < 0) {
        if (e) return;
        throw new Error("Rules manager: invalid rule name " + r);
      }
      (this.__rules__[o].enabled = !1), n.push(r);
    }, this),
    (this.__cache__ = null),
    n
  );
};
We.prototype.getRules = function (t) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[t] || [];
};
var Kr = We,
  H6 = /\r\n?|\n/g,
  G6 = /\0/g,
  W6 = function (e) {
    var n;
    (n = e.src.replace(
      H6,
      `
`
    )),
      (n = n.replace(G6, "�")),
      (e.src = n);
  },
  Z6 = function (e) {
    var n;
    e.inlineMode
      ? ((n = new e.Token("inline", "", 0)),
        (n.content = e.src),
        (n.map = [0, 1]),
        (n.children = []),
        e.tokens.push(n))
      : e.md.block.parse(e.src, e.md, e.env, e.tokens);
  },
  K6 = function (e) {
    var n = e.tokens,
      r,
      o,
      s;
    for (o = 0, s = n.length; o < s; o++)
      (r = n[o]),
        r.type === "inline" &&
          e.md.inline.parse(r.content, e.md, e.env, r.children);
  },
  J6 = le.arrayReplaceAt;
function Y6(t) {
  return /^<a[>\s]/i.test(t);
}
function Q6(t) {
  return /^<\/a\s*>/i.test(t);
}
var X6 = function (e) {
    var n,
      r,
      o,
      s,
      c,
      i,
      l,
      a,
      u,
      f,
      h,
      d,
      _,
      b,
      C,
      E,
      w = e.tokens,
      A;
    if (e.md.options.linkify) {
      for (r = 0, o = w.length; r < o; r++)
        if (!(w[r].type !== "inline" || !e.md.linkify.pretest(w[r].content)))
          for (s = w[r].children, _ = 0, n = s.length - 1; n >= 0; n--) {
            if (((i = s[n]), i.type === "link_close")) {
              for (n--; s[n].level !== i.level && s[n].type !== "link_open"; )
                n--;
              continue;
            }
            if (
              (i.type === "html_inline" &&
                (Y6(i.content) && _ > 0 && _--, Q6(i.content) && _++),
              !(_ > 0) && i.type === "text" && e.md.linkify.test(i.content))
            ) {
              for (
                u = i.content,
                  A = e.md.linkify.match(u),
                  l = [],
                  d = i.level,
                  h = 0,
                  a = 0;
                a < A.length;
                a++
              )
                (b = A[a].url),
                  (C = e.md.normalizeLink(b)),
                  e.md.validateLink(C) &&
                    ((E = A[a].text),
                    A[a].schema
                      ? A[a].schema === "mailto:" && !/^mailto:/i.test(E)
                        ? (E = e.md
                            .normalizeLinkText("mailto:" + E)
                            .replace(/^mailto:/, ""))
                        : (E = e.md.normalizeLinkText(E))
                      : (E = e.md
                          .normalizeLinkText("http://" + E)
                          .replace(/^http:\/\//, "")),
                    (f = A[a].index),
                    f > h &&
                      ((c = new e.Token("text", "", 0)),
                      (c.content = u.slice(h, f)),
                      (c.level = d),
                      l.push(c)),
                    (c = new e.Token("link_open", "a", 1)),
                    (c.attrs = [["href", C]]),
                    (c.level = d++),
                    (c.markup = "linkify"),
                    (c.info = "auto"),
                    l.push(c),
                    (c = new e.Token("text", "", 0)),
                    (c.content = E),
                    (c.level = d),
                    l.push(c),
                    (c = new e.Token("link_close", "a", -1)),
                    (c.level = --d),
                    (c.markup = "linkify"),
                    (c.info = "auto"),
                    l.push(c),
                    (h = A[a].lastIndex));
              h < u.length &&
                ((c = new e.Token("text", "", 0)),
                (c.content = u.slice(h)),
                (c.level = d),
                l.push(c)),
                (w[r].children = s = J6(s, n, l));
            }
          }
    }
  },
  yc = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
  eV = /\((c|tm|r|p)\)/i,
  tV = /\((c|tm|r|p)\)/gi,
  nV = { c: "©", r: "®", p: "§", tm: "™" };
function rV(t, e) {
  return nV[e.toLowerCase()];
}
function oV(t) {
  var e,
    n,
    r = 0;
  for (e = t.length - 1; e >= 0; e--)
    (n = t[e]),
      n.type === "text" && !r && (n.content = n.content.replace(tV, rV)),
      n.type === "link_open" && n.info === "auto" && r--,
      n.type === "link_close" && n.info === "auto" && r++;
}
function sV(t) {
  var e,
    n,
    r = 0;
  for (e = t.length - 1; e >= 0; e--)
    (n = t[e]),
      n.type === "text" &&
        !r &&
        yc.test(n.content) &&
        (n.content = n.content
          .replace(/\+-/g, "±")
          .replace(/\.{2,}/g, "…")
          .replace(/([?!])…/g, "$1..")
          .replace(/([?!]){4,}/g, "$1$1$1")
          .replace(/,{2,}/g, ",")
          .replace(/(^|[^-])---(?=[^-]|$)/gm, "$1—")
          .replace(/(^|\s)--(?=\s|$)/gm, "$1–")
          .replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1–")),
      n.type === "link_open" && n.info === "auto" && r--,
      n.type === "link_close" && n.info === "auto" && r++;
}
var cV = function (e) {
    var n;
    if (e.md.options.typographer)
      for (n = e.tokens.length - 1; n >= 0; n--)
        e.tokens[n].type === "inline" &&
          (eV.test(e.tokens[n].content) && oV(e.tokens[n].children),
          yc.test(e.tokens[n].content) && sV(e.tokens[n].children));
  },
  Ho = le.isWhiteSpace,
  Go = le.isPunctChar,
  Wo = le.isMdAsciiPunct,
  iV = /['"]/,
  Zo = /['"]/g,
  Ko = "’";
function pn(t, e, n) {
  return t.substr(0, e) + n + t.substr(e + 1);
}
function lV(t, e) {
  var n, r, o, s, c, i, l, a, u, f, h, d, _, b, C, E, w, A, I, B, k;
  for (I = [], n = 0; n < t.length; n++) {
    for (
      r = t[n], l = t[n].level, w = I.length - 1;
      w >= 0 && !(I[w].level <= l);
      w--
    );
    if (((I.length = w + 1), r.type === "text")) {
      (o = r.content), (c = 0), (i = o.length);
      e: for (; c < i && ((Zo.lastIndex = c), (s = Zo.exec(o)), !!s); ) {
        if (
          ((C = E = !0),
          (c = s.index + 1),
          (A = s[0] === "'"),
          (u = 32),
          s.index - 1 >= 0)
        )
          u = o.charCodeAt(s.index - 1);
        else
          for (
            w = n - 1;
            w >= 0 && !(t[w].type === "softbreak" || t[w].type === "hardbreak");
            w--
          )
            if (t[w].content) {
              u = t[w].content.charCodeAt(t[w].content.length - 1);
              break;
            }
        if (((f = 32), c < i)) f = o.charCodeAt(c);
        else
          for (
            w = n + 1;
            w < t.length &&
            !(t[w].type === "softbreak" || t[w].type === "hardbreak");
            w++
          )
            if (t[w].content) {
              f = t[w].content.charCodeAt(0);
              break;
            }
        if (
          ((h = Wo(u) || Go(String.fromCharCode(u))),
          (d = Wo(f) || Go(String.fromCharCode(f))),
          (_ = Ho(u)),
          (b = Ho(f)),
          b ? (C = !1) : d && (_ || h || (C = !1)),
          _ ? (E = !1) : h && (b || d || (E = !1)),
          f === 34 && s[0] === '"' && u >= 48 && u <= 57 && (E = C = !1),
          C && E && ((C = h), (E = d)),
          !C && !E)
        ) {
          A && (r.content = pn(r.content, s.index, Ko));
          continue;
        }
        if (E) {
          for (w = I.length - 1; w >= 0 && ((a = I[w]), !(I[w].level < l)); w--)
            if (a.single === A && I[w].level === l) {
              (a = I[w]),
                A
                  ? ((B = e.md.options.quotes[2]), (k = e.md.options.quotes[3]))
                  : ((B = e.md.options.quotes[0]),
                    (k = e.md.options.quotes[1])),
                (r.content = pn(r.content, s.index, k)),
                (t[a.token].content = pn(t[a.token].content, a.pos, B)),
                (c += k.length - 1),
                a.token === n && (c += B.length - 1),
                (o = r.content),
                (i = o.length),
                (I.length = w);
              continue e;
            }
        }
        C
          ? I.push({ token: n, pos: s.index, single: A, level: l })
          : E && A && (r.content = pn(r.content, s.index, Ko));
      }
    }
  }
}
var aV = function (e) {
  var n;
  if (e.md.options.typographer)
    for (n = e.tokens.length - 1; n >= 0; n--)
      e.tokens[n].type !== "inline" ||
        !iV.test(e.tokens[n].content) ||
        lV(e.tokens[n].children, e);
};
function jt(t, e, n) {
  (this.type = t),
    (this.tag = e),
    (this.attrs = null),
    (this.map = null),
    (this.nesting = n),
    (this.level = 0),
    (this.children = null),
    (this.content = ""),
    (this.markup = ""),
    (this.info = ""),
    (this.meta = null),
    (this.block = !1),
    (this.hidden = !1);
}
jt.prototype.attrIndex = function (e) {
  var n, r, o;
  if (!this.attrs) return -1;
  for (n = this.attrs, r = 0, o = n.length; r < o; r++)
    if (n[r][0] === e) return r;
  return -1;
};
jt.prototype.attrPush = function (e) {
  this.attrs ? this.attrs.push(e) : (this.attrs = [e]);
};
jt.prototype.attrSet = function (e, n) {
  var r = this.attrIndex(e),
    o = [e, n];
  r < 0 ? this.attrPush(o) : (this.attrs[r] = o);
};
jt.prototype.attrGet = function (e) {
  var n = this.attrIndex(e),
    r = null;
  return n >= 0 && (r = this.attrs[n][1]), r;
};
jt.prototype.attrJoin = function (e, n) {
  var r = this.attrIndex(e);
  r < 0
    ? this.attrPush([e, n])
    : (this.attrs[r][1] = this.attrs[r][1] + " " + n);
};
var Jr = jt,
  uV = Jr;
function Cc(t, e, n) {
  (this.src = t),
    (this.env = n),
    (this.tokens = []),
    (this.inlineMode = !1),
    (this.md = e);
}
Cc.prototype.Token = uV;
var fV = Cc,
  pV = Kr,
  lr = [
    ["normalize", W6],
    ["block", Z6],
    ["inline", K6],
    ["linkify", X6],
    ["replacements", cV],
    ["smartquotes", aV],
  ];
function Yr() {
  this.ruler = new pV();
  for (var t = 0; t < lr.length; t++) this.ruler.push(lr[t][0], lr[t][1]);
}
Yr.prototype.process = function (t) {
  var e, n, r;
  for (r = this.ruler.getRules(""), e = 0, n = r.length; e < n; e++) r[e](t);
};
Yr.prototype.State = fV;
var hV = Yr,
  ar = le.isSpace;
function ur(t, e) {
  var n = t.bMarks[e] + t.tShift[e],
    r = t.eMarks[e];
  return t.src.substr(n, r - n);
}
function Jo(t) {
  var e = [],
    n = 0,
    r = t.length,
    o,
    s = !1,
    c = 0,
    i = "";
  for (o = t.charCodeAt(n); n < r; )
    o === 124 &&
      (s
        ? ((i += t.substring(c, n - 1)), (c = n))
        : (e.push(i + t.substring(c, n)), (i = ""), (c = n + 1))),
      (s = o === 92),
      n++,
      (o = t.charCodeAt(n));
  return e.push(i + t.substring(c)), e;
}
var dV = function (e, n, r, o) {
    var s, c, i, l, a, u, f, h, d, _, b, C, E, w, A, I, B, k;
    if (
      n + 2 > r ||
      ((u = n + 1), e.sCount[u] < e.blkIndent) ||
      e.sCount[u] - e.blkIndent >= 4 ||
      ((i = e.bMarks[u] + e.tShift[u]), i >= e.eMarks[u]) ||
      ((B = e.src.charCodeAt(i++)), B !== 124 && B !== 45 && B !== 58) ||
      i >= e.eMarks[u] ||
      ((k = e.src.charCodeAt(i++)),
      k !== 124 && k !== 45 && k !== 58 && !ar(k)) ||
      (B === 45 && ar(k))
    )
      return !1;
    for (; i < e.eMarks[u]; ) {
      if (
        ((s = e.src.charCodeAt(i)), s !== 124 && s !== 45 && s !== 58 && !ar(s))
      )
        return !1;
      i++;
    }
    for (c = ur(e, n + 1), f = c.split("|"), _ = [], l = 0; l < f.length; l++) {
      if (((b = f[l].trim()), !b)) {
        if (l === 0 || l === f.length - 1) continue;
        return !1;
      }
      if (!/^:?-+:?$/.test(b)) return !1;
      b.charCodeAt(b.length - 1) === 58
        ? _.push(b.charCodeAt(0) === 58 ? "center" : "right")
        : b.charCodeAt(0) === 58
        ? _.push("left")
        : _.push("");
    }
    if (
      ((c = ur(e, n).trim()),
      c.indexOf("|") === -1 ||
        e.sCount[n] - e.blkIndent >= 4 ||
        ((f = Jo(c)),
        f.length && f[0] === "" && f.shift(),
        f.length && f[f.length - 1] === "" && f.pop(),
        (h = f.length),
        h === 0 || h !== _.length))
    )
      return !1;
    if (o) return !0;
    for (
      w = e.parentType,
        e.parentType = "table",
        I = e.md.block.ruler.getRules("blockquote"),
        d = e.push("table_open", "table", 1),
        d.map = C = [n, 0],
        d = e.push("thead_open", "thead", 1),
        d.map = [n, n + 1],
        d = e.push("tr_open", "tr", 1),
        d.map = [n, n + 1],
        l = 0;
      l < f.length;
      l++
    )
      (d = e.push("th_open", "th", 1)),
        _[l] && (d.attrs = [["style", "text-align:" + _[l]]]),
        (d = e.push("inline", "", 0)),
        (d.content = f[l].trim()),
        (d.children = []),
        (d = e.push("th_close", "th", -1));
    for (
      d = e.push("tr_close", "tr", -1),
        d = e.push("thead_close", "thead", -1),
        u = n + 2;
      u < r && !(e.sCount[u] < e.blkIndent);
      u++
    ) {
      for (A = !1, l = 0, a = I.length; l < a; l++)
        if (I[l](e, u, r, !0)) {
          A = !0;
          break;
        }
      if (A || ((c = ur(e, u).trim()), !c) || e.sCount[u] - e.blkIndent >= 4)
        break;
      for (
        f = Jo(c),
          f.length && f[0] === "" && f.shift(),
          f.length && f[f.length - 1] === "" && f.pop(),
          u === n + 2 &&
            ((d = e.push("tbody_open", "tbody", 1)), (d.map = E = [n + 2, 0])),
          d = e.push("tr_open", "tr", 1),
          d.map = [u, u + 1],
          l = 0;
        l < h;
        l++
      )
        (d = e.push("td_open", "td", 1)),
          _[l] && (d.attrs = [["style", "text-align:" + _[l]]]),
          (d = e.push("inline", "", 0)),
          (d.content = f[l] ? f[l].trim() : ""),
          (d.children = []),
          (d = e.push("td_close", "td", -1));
      d = e.push("tr_close", "tr", -1);
    }
    return (
      E && ((d = e.push("tbody_close", "tbody", -1)), (E[1] = u)),
      (d = e.push("table_close", "table", -1)),
      (C[1] = u),
      (e.parentType = w),
      (e.line = u),
      !0
    );
  },
  gV = function (e, n, r) {
    var o, s, c;
    if (e.sCount[n] - e.blkIndent < 4) return !1;
    for (s = o = n + 1; o < r; ) {
      if (e.isEmpty(o)) {
        o++;
        continue;
      }
      if (e.sCount[o] - e.blkIndent >= 4) {
        o++, (s = o);
        continue;
      }
      break;
    }
    return (
      (e.line = s),
      (c = e.push("code_block", "code", 0)),
      (c.content =
        e.getLines(n, s, 4 + e.blkIndent, !1) +
        `
`),
      (c.map = [n, e.line]),
      !0
    );
  },
  mV = function (e, n, r, o) {
    var s,
      c,
      i,
      l,
      a,
      u,
      f,
      h = !1,
      d = e.bMarks[n] + e.tShift[n],
      _ = e.eMarks[n];
    if (
      e.sCount[n] - e.blkIndent >= 4 ||
      d + 3 > _ ||
      ((s = e.src.charCodeAt(d)), s !== 126 && s !== 96) ||
      ((a = d), (d = e.skipChars(d, s)), (c = d - a), c < 3) ||
      ((f = e.src.slice(a, d)),
      (i = e.src.slice(d, _)),
      s === 96 && i.indexOf(String.fromCharCode(s)) >= 0)
    )
      return !1;
    if (o) return !0;
    for (
      l = n;
      l++,
        !(
          l >= r ||
          ((d = a = e.bMarks[l] + e.tShift[l]),
          (_ = e.eMarks[l]),
          d < _ && e.sCount[l] < e.blkIndent)
        );

    )
      if (
        e.src.charCodeAt(d) === s &&
        !(e.sCount[l] - e.blkIndent >= 4) &&
        ((d = e.skipChars(d, s)),
        !(d - a < c) && ((d = e.skipSpaces(d)), !(d < _)))
      ) {
        h = !0;
        break;
      }
    return (
      (c = e.sCount[n]),
      (e.line = l + (h ? 1 : 0)),
      (u = e.push("fence", "code", 0)),
      (u.info = i),
      (u.content = e.getLines(n + 1, l, c, !0)),
      (u.markup = f),
      (u.map = [n, e.line]),
      !0
    );
  },
  Yo = le.isSpace,
  _V = function (e, n, r, o) {
    var s,
      c,
      i,
      l,
      a,
      u,
      f,
      h,
      d,
      _,
      b,
      C,
      E,
      w,
      A,
      I,
      B,
      k,
      U,
      X,
      Ee = e.lineMax,
      G = e.bMarks[n] + e.tShift[n],
      ee = e.eMarks[n];
    if (e.sCount[n] - e.blkIndent >= 4 || e.src.charCodeAt(G++) !== 62)
      return !1;
    if (o) return !0;
    for (
      l = d = e.sCount[n] + 1,
        e.src.charCodeAt(G) === 32
          ? (G++, l++, d++, (s = !1), (I = !0))
          : e.src.charCodeAt(G) === 9
          ? ((I = !0),
            (e.bsCount[n] + d) % 4 === 3 ? (G++, l++, d++, (s = !1)) : (s = !0))
          : (I = !1),
        _ = [e.bMarks[n]],
        e.bMarks[n] = G;
      G < ee && ((c = e.src.charCodeAt(G)), Yo(c));

    ) {
      c === 9 ? (d += 4 - ((d + e.bsCount[n] + (s ? 1 : 0)) % 4)) : d++;
      G++;
    }
    for (
      b = [e.bsCount[n]],
        e.bsCount[n] = e.sCount[n] + 1 + (I ? 1 : 0),
        u = G >= ee,
        w = [e.sCount[n]],
        e.sCount[n] = d - l,
        A = [e.tShift[n]],
        e.tShift[n] = G - e.bMarks[n],
        k = e.md.block.ruler.getRules("blockquote"),
        E = e.parentType,
        e.parentType = "blockquote",
        h = n + 1;
      h < r &&
      ((X = e.sCount[h] < e.blkIndent),
      (G = e.bMarks[h] + e.tShift[h]),
      (ee = e.eMarks[h]),
      !(G >= ee));
      h++
    ) {
      if (e.src.charCodeAt(G++) === 62 && !X) {
        for (
          l = d = e.sCount[h] + 1,
            e.src.charCodeAt(G) === 32
              ? (G++, l++, d++, (s = !1), (I = !0))
              : e.src.charCodeAt(G) === 9
              ? ((I = !0),
                (e.bsCount[h] + d) % 4 === 3
                  ? (G++, l++, d++, (s = !1))
                  : (s = !0))
              : (I = !1),
            _.push(e.bMarks[h]),
            e.bMarks[h] = G;
          G < ee && ((c = e.src.charCodeAt(G)), Yo(c));

        ) {
          c === 9 ? (d += 4 - ((d + e.bsCount[h] + (s ? 1 : 0)) % 4)) : d++;
          G++;
        }
        (u = G >= ee),
          b.push(e.bsCount[h]),
          (e.bsCount[h] = e.sCount[h] + 1 + (I ? 1 : 0)),
          w.push(e.sCount[h]),
          (e.sCount[h] = d - l),
          A.push(e.tShift[h]),
          (e.tShift[h] = G - e.bMarks[h]);
        continue;
      }
      if (u) break;
      for (B = !1, i = 0, a = k.length; i < a; i++)
        if (k[i](e, h, r, !0)) {
          B = !0;
          break;
        }
      if (B) {
        (e.lineMax = h),
          e.blkIndent !== 0 &&
            (_.push(e.bMarks[h]),
            b.push(e.bsCount[h]),
            A.push(e.tShift[h]),
            w.push(e.sCount[h]),
            (e.sCount[h] -= e.blkIndent));
        break;
      }
      _.push(e.bMarks[h]),
        b.push(e.bsCount[h]),
        A.push(e.tShift[h]),
        w.push(e.sCount[h]),
        (e.sCount[h] = -1);
    }
    for (
      C = e.blkIndent,
        e.blkIndent = 0,
        U = e.push("blockquote_open", "blockquote", 1),
        U.markup = ">",
        U.map = f = [n, 0],
        e.md.block.tokenize(e, n, h),
        U = e.push("blockquote_close", "blockquote", -1),
        U.markup = ">",
        e.lineMax = Ee,
        e.parentType = E,
        f[1] = e.line,
        i = 0;
      i < A.length;
      i++
    )
      (e.bMarks[i + n] = _[i]),
        (e.tShift[i + n] = A[i]),
        (e.sCount[i + n] = w[i]),
        (e.bsCount[i + n] = b[i]);
    return (e.blkIndent = C), !0;
  },
  bV = le.isSpace,
  vV = function (e, n, r, o) {
    var s,
      c,
      i,
      l,
      a = e.bMarks[n] + e.tShift[n],
      u = e.eMarks[n];
    if (
      e.sCount[n] - e.blkIndent >= 4 ||
      ((s = e.src.charCodeAt(a++)), s !== 42 && s !== 45 && s !== 95)
    )
      return !1;
    for (c = 1; a < u; ) {
      if (((i = e.src.charCodeAt(a++)), i !== s && !bV(i))) return !1;
      i === s && c++;
    }
    return c < 3
      ? !1
      : (o ||
          ((e.line = n + 1),
          (l = e.push("hr", "hr", 0)),
          (l.map = [n, e.line]),
          (l.markup = Array(c + 1).join(String.fromCharCode(s)))),
        !0);
  },
  wc = le.isSpace;
function Qo(t, e) {
  var n, r, o, s;
  return (
    (r = t.bMarks[e] + t.tShift[e]),
    (o = t.eMarks[e]),
    (n = t.src.charCodeAt(r++)),
    (n !== 42 && n !== 45 && n !== 43) ||
    (r < o && ((s = t.src.charCodeAt(r)), !wc(s)))
      ? -1
      : r
  );
}
function Xo(t, e) {
  var n,
    r = t.bMarks[e] + t.tShift[e],
    o = r,
    s = t.eMarks[e];
  if (o + 1 >= s || ((n = t.src.charCodeAt(o++)), n < 48 || n > 57)) return -1;
  for (;;) {
    if (o >= s) return -1;
    if (((n = t.src.charCodeAt(o++)), n >= 48 && n <= 57)) {
      if (o - r >= 10) return -1;
      continue;
    }
    if (n === 41 || n === 46) break;
    return -1;
  }
  return o < s && ((n = t.src.charCodeAt(o)), !wc(n)) ? -1 : o;
}
function xV(t, e) {
  var n,
    r,
    o = t.level + 2;
  for (n = e + 2, r = t.tokens.length - 2; n < r; n++)
    t.tokens[n].level === o &&
      t.tokens[n].type === "paragraph_open" &&
      ((t.tokens[n + 2].hidden = !0), (t.tokens[n].hidden = !0), (n += 2));
}
var kV = function (e, n, r, o) {
    var s,
      c,
      i,
      l,
      a,
      u,
      f,
      h,
      d,
      _,
      b,
      C,
      E,
      w,
      A,
      I,
      B,
      k,
      U,
      X,
      Ee,
      G,
      ee,
      qe,
      Me,
      F,
      fe,
      $,
      Y = !1,
      T = !0;
    if (
      e.sCount[n] - e.blkIndent >= 4 ||
      (e.listIndent >= 0 &&
        e.sCount[n] - e.listIndent >= 4 &&
        e.sCount[n] < e.blkIndent)
    )
      return !1;
    if (
      (o &&
        e.parentType === "paragraph" &&
        e.sCount[n] >= e.blkIndent &&
        (Y = !0),
      (ee = Xo(e, n)) >= 0)
    ) {
      if (
        ((f = !0),
        (Me = e.bMarks[n] + e.tShift[n]),
        (E = Number(e.src.slice(Me, ee - 1))),
        Y && E !== 1)
      )
        return !1;
    } else if ((ee = Qo(e, n)) >= 0) f = !1;
    else return !1;
    if (Y && e.skipSpaces(ee) >= e.eMarks[n]) return !1;
    if (((C = e.src.charCodeAt(ee - 1)), o)) return !0;
    for (
      b = e.tokens.length,
        f
          ? (($ = e.push("ordered_list_open", "ol", 1)),
            E !== 1 && ($.attrs = [["start", E]]))
          : ($ = e.push("bullet_list_open", "ul", 1)),
        $.map = _ = [n, 0],
        $.markup = String.fromCharCode(C),
        A = n,
        qe = !1,
        fe = e.md.block.ruler.getRules("list"),
        k = e.parentType,
        e.parentType = "list";
      A < r;

    ) {
      for (
        G = ee,
          w = e.eMarks[A],
          u = I = e.sCount[A] + ee - (e.bMarks[n] + e.tShift[n]);
        G < w;

      ) {
        if (((s = e.src.charCodeAt(G)), s === 9))
          I += 4 - ((I + e.bsCount[A]) % 4);
        else if (s === 32) I++;
        else break;
        G++;
      }
      if (
        ((c = G),
        c >= w ? (a = 1) : (a = I - u),
        a > 4 && (a = 1),
        (l = u + a),
        ($ = e.push("list_item_open", "li", 1)),
        ($.markup = String.fromCharCode(C)),
        ($.map = h = [n, 0]),
        f && ($.info = e.src.slice(Me, ee - 1)),
        (Ee = e.tight),
        (X = e.tShift[n]),
        (U = e.sCount[n]),
        (B = e.listIndent),
        (e.listIndent = e.blkIndent),
        (e.blkIndent = l),
        (e.tight = !0),
        (e.tShift[n] = c - e.bMarks[n]),
        (e.sCount[n] = I),
        c >= w && e.isEmpty(n + 1)
          ? (e.line = Math.min(e.line + 2, r))
          : e.md.block.tokenize(e, n, r, !0),
        (!e.tight || qe) && (T = !1),
        (qe = e.line - n > 1 && e.isEmpty(e.line - 1)),
        (e.blkIndent = e.listIndent),
        (e.listIndent = B),
        (e.tShift[n] = X),
        (e.sCount[n] = U),
        (e.tight = Ee),
        ($ = e.push("list_item_close", "li", -1)),
        ($.markup = String.fromCharCode(C)),
        (A = n = e.line),
        (h[1] = A),
        (c = e.bMarks[n]),
        A >= r || e.sCount[A] < e.blkIndent || e.sCount[n] - e.blkIndent >= 4)
      )
        break;
      for (F = !1, i = 0, d = fe.length; i < d; i++)
        if (fe[i](e, A, r, !0)) {
          F = !0;
          break;
        }
      if (F) break;
      if (f) {
        if (((ee = Xo(e, A)), ee < 0)) break;
        Me = e.bMarks[A] + e.tShift[A];
      } else if (((ee = Qo(e, A)), ee < 0)) break;
      if (C !== e.src.charCodeAt(ee - 1)) break;
    }
    return (
      f
        ? ($ = e.push("ordered_list_close", "ol", -1))
        : ($ = e.push("bullet_list_close", "ul", -1)),
      ($.markup = String.fromCharCode(C)),
      (_[1] = A),
      (e.line = A),
      (e.parentType = k),
      T && xV(e, b),
      !0
    );
  },
  yV = le.normalizeReference,
  hn = le.isSpace,
  CV = function (e, n, r, o) {
    var s,
      c,
      i,
      l,
      a,
      u,
      f,
      h,
      d,
      _,
      b,
      C,
      E,
      w,
      A,
      I,
      B = 0,
      k = e.bMarks[n] + e.tShift[n],
      U = e.eMarks[n],
      X = n + 1;
    if (e.sCount[n] - e.blkIndent >= 4 || e.src.charCodeAt(k) !== 91) return !1;
    for (; ++k < U; )
      if (e.src.charCodeAt(k) === 93 && e.src.charCodeAt(k - 1) !== 92) {
        if (k + 1 === U || e.src.charCodeAt(k + 1) !== 58) return !1;
        break;
      }
    for (
      l = e.lineMax,
        A = e.md.block.ruler.getRules("reference"),
        _ = e.parentType,
        e.parentType = "reference";
      X < l && !e.isEmpty(X);
      X++
    )
      if (!(e.sCount[X] - e.blkIndent > 3) && !(e.sCount[X] < 0)) {
        for (w = !1, u = 0, f = A.length; u < f; u++)
          if (A[u](e, X, l, !0)) {
            w = !0;
            break;
          }
        if (w) break;
      }
    for (
      E = e.getLines(n, X, e.blkIndent, !1).trim(), U = E.length, k = 1;
      k < U;
      k++
    ) {
      if (((s = E.charCodeAt(k)), s === 91)) return !1;
      if (s === 93) {
        d = k;
        break;
      } else
        s === 10
          ? B++
          : s === 92 && (k++, k < U && E.charCodeAt(k) === 10 && B++);
    }
    if (d < 0 || E.charCodeAt(d + 1) !== 58) return !1;
    for (k = d + 2; k < U; k++)
      if (((s = E.charCodeAt(k)), s === 10)) B++;
      else if (!hn(s)) break;
    if (
      ((b = e.md.helpers.parseLinkDestination(E, k, U)),
      !b.ok || ((a = e.md.normalizeLink(b.str)), !e.md.validateLink(a)))
    )
      return !1;
    for (k = b.pos, B += b.lines, c = k, i = B, C = k; k < U; k++)
      if (((s = E.charCodeAt(k)), s === 10)) B++;
      else if (!hn(s)) break;
    for (
      b = e.md.helpers.parseLinkTitle(E, k, U),
        k < U && C !== k && b.ok
          ? ((I = b.str), (k = b.pos), (B += b.lines))
          : ((I = ""), (k = c), (B = i));
      k < U && ((s = E.charCodeAt(k)), !!hn(s));

    )
      k++;
    if (k < U && E.charCodeAt(k) !== 10 && I)
      for (I = "", k = c, B = i; k < U && ((s = E.charCodeAt(k)), !!hn(s)); )
        k++;
    return (k < U && E.charCodeAt(k) !== 10) || ((h = yV(E.slice(1, d))), !h)
      ? !1
      : (o ||
          (typeof e.env.references > "u" && (e.env.references = {}),
          typeof e.env.references[h] > "u" &&
            (e.env.references[h] = { title: I, href: a }),
          (e.parentType = _),
          (e.line = n + B + 1)),
        !0);
  },
  wV = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "section",
    "source",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul",
  ],
  jn = {},
  AV = "[a-zA-Z_:][a-zA-Z0-9:._-]*",
  EV = "[^\"'=<>`\\x00-\\x20]+",
  SV = "'[^']*'",
  DV = '"[^"]*"',
  qV = "(?:" + EV + "|" + SV + "|" + DV + ")",
  TV = "(?:\\s+" + AV + "(?:\\s*=\\s*" + qV + ")?)",
  Ac = "<[A-Za-z][A-Za-z0-9\\-]*" + TV + "*\\s*\\/?>",
  Ec = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",
  FV = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->",
  RV = "<[?][\\s\\S]*?[?]>",
  LV = "<![A-Z]+\\s+[^>]*>",
  IV = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  zV = new RegExp(
    "^(?:" + Ac + "|" + Ec + "|" + FV + "|" + RV + "|" + LV + "|" + IV + ")"
  ),
  PV = new RegExp("^(?:" + Ac + "|" + Ec + ")");
jn.HTML_TAG_RE = zV;
jn.HTML_OPEN_CLOSE_TAG_RE = PV;
var MV = wV,
  NV = jn.HTML_OPEN_CLOSE_TAG_RE,
  qt = [
    [
      /^<(script|pre|style|textarea)(?=(\s|>|$))/i,
      /<\/(script|pre|style|textarea)>/i,
      !0,
    ],
    [/^<!--/, /-->/, !0],
    [/^<\?/, /\?>/, !0],
    [/^<![A-Z]/, />/, !0],
    [/^<!\[CDATA\[/, /\]\]>/, !0],
    [new RegExp("^</?(" + MV.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
    [new RegExp(NV.source + "\\s*$"), /^$/, !1],
  ],
  OV = function (e, n, r, o) {
    var s,
      c,
      i,
      l,
      a = e.bMarks[n] + e.tShift[n],
      u = e.eMarks[n];
    if (
      e.sCount[n] - e.blkIndent >= 4 ||
      !e.md.options.html ||
      e.src.charCodeAt(a) !== 60
    )
      return !1;
    for (l = e.src.slice(a, u), s = 0; s < qt.length && !qt[s][0].test(l); s++);
    if (s === qt.length) return !1;
    if (o) return qt[s][2];
    if (((c = n + 1), !qt[s][1].test(l))) {
      for (; c < r && !(e.sCount[c] < e.blkIndent); c++)
        if (
          ((a = e.bMarks[c] + e.tShift[c]),
          (u = e.eMarks[c]),
          (l = e.src.slice(a, u)),
          qt[s][1].test(l))
        ) {
          l.length !== 0 && c++;
          break;
        }
    }
    return (
      (e.line = c),
      (i = e.push("html_block", "", 0)),
      (i.map = [n, c]),
      (i.content = e.getLines(n, c, e.blkIndent, !0)),
      !0
    );
  },
  es = le.isSpace,
  BV = function (e, n, r, o) {
    var s,
      c,
      i,
      l,
      a = e.bMarks[n] + e.tShift[n],
      u = e.eMarks[n];
    if (
      e.sCount[n] - e.blkIndent >= 4 ||
      ((s = e.src.charCodeAt(a)), s !== 35 || a >= u)
    )
      return !1;
    for (c = 1, s = e.src.charCodeAt(++a); s === 35 && a < u && c <= 6; )
      c++, (s = e.src.charCodeAt(++a));
    return c > 6 || (a < u && !es(s))
      ? !1
      : (o ||
          ((u = e.skipSpacesBack(u, a)),
          (i = e.skipCharsBack(u, 35, a)),
          i > a && es(e.src.charCodeAt(i - 1)) && (u = i),
          (e.line = n + 1),
          (l = e.push("heading_open", "h" + String(c), 1)),
          (l.markup = "########".slice(0, c)),
          (l.map = [n, e.line]),
          (l = e.push("inline", "", 0)),
          (l.content = e.src.slice(a, u).trim()),
          (l.map = [n, e.line]),
          (l.children = []),
          (l = e.push("heading_close", "h" + String(c), -1)),
          (l.markup = "########".slice(0, c))),
        !0);
  },
  $V = function (e, n, r) {
    var o,
      s,
      c,
      i,
      l,
      a,
      u,
      f,
      h,
      d = n + 1,
      _,
      b = e.md.block.ruler.getRules("paragraph");
    if (e.sCount[n] - e.blkIndent >= 4) return !1;
    for (
      _ = e.parentType, e.parentType = "paragraph";
      d < r && !e.isEmpty(d);
      d++
    )
      if (!(e.sCount[d] - e.blkIndent > 3)) {
        if (
          e.sCount[d] >= e.blkIndent &&
          ((a = e.bMarks[d] + e.tShift[d]),
          (u = e.eMarks[d]),
          a < u &&
            ((h = e.src.charCodeAt(a)),
            (h === 45 || h === 61) &&
              ((a = e.skipChars(a, h)), (a = e.skipSpaces(a)), a >= u)))
        ) {
          f = h === 61 ? 1 : 2;
          break;
        }
        if (!(e.sCount[d] < 0)) {
          for (s = !1, c = 0, i = b.length; c < i; c++)
            if (b[c](e, d, r, !0)) {
              s = !0;
              break;
            }
          if (s) break;
        }
      }
    return f
      ? ((o = e.getLines(n, d, e.blkIndent, !1).trim()),
        (e.line = d + 1),
        (l = e.push("heading_open", "h" + String(f), 1)),
        (l.markup = String.fromCharCode(h)),
        (l.map = [n, e.line]),
        (l = e.push("inline", "", 0)),
        (l.content = o),
        (l.map = [n, e.line - 1]),
        (l.children = []),
        (l = e.push("heading_close", "h" + String(f), -1)),
        (l.markup = String.fromCharCode(h)),
        (e.parentType = _),
        !0)
      : !1;
  },
  jV = function (e, n) {
    var r,
      o,
      s,
      c,
      i,
      l,
      a = n + 1,
      u = e.md.block.ruler.getRules("paragraph"),
      f = e.lineMax;
    for (
      l = e.parentType, e.parentType = "paragraph";
      a < f && !e.isEmpty(a);
      a++
    )
      if (!(e.sCount[a] - e.blkIndent > 3) && !(e.sCount[a] < 0)) {
        for (o = !1, s = 0, c = u.length; s < c; s++)
          if (u[s](e, a, f, !0)) {
            o = !0;
            break;
          }
        if (o) break;
      }
    return (
      (r = e.getLines(n, a, e.blkIndent, !1).trim()),
      (e.line = a),
      (i = e.push("paragraph_open", "p", 1)),
      (i.map = [n, e.line]),
      (i = e.push("inline", "", 0)),
      (i.content = r),
      (i.map = [n, e.line]),
      (i.children = []),
      (i = e.push("paragraph_close", "p", -1)),
      (e.parentType = l),
      !0
    );
  },
  Sc = Jr,
  Un = le.isSpace;
function et(t, e, n, r) {
  var o, s, c, i, l, a, u, f;
  for (
    this.src = t,
      this.md = e,
      this.env = n,
      this.tokens = r,
      this.bMarks = [],
      this.eMarks = [],
      this.tShift = [],
      this.sCount = [],
      this.bsCount = [],
      this.blkIndent = 0,
      this.line = 0,
      this.lineMax = 0,
      this.tight = !1,
      this.ddIndent = -1,
      this.listIndent = -1,
      this.parentType = "root",
      this.level = 0,
      this.result = "",
      s = this.src,
      f = !1,
      c = i = a = u = 0,
      l = s.length;
    i < l;
    i++
  ) {
    if (((o = s.charCodeAt(i)), !f))
      if (Un(o)) {
        a++, o === 9 ? (u += 4 - (u % 4)) : u++;
        continue;
      } else f = !0;
    (o === 10 || i === l - 1) &&
      (o !== 10 && i++,
      this.bMarks.push(c),
      this.eMarks.push(i),
      this.tShift.push(a),
      this.sCount.push(u),
      this.bsCount.push(0),
      (f = !1),
      (a = 0),
      (u = 0),
      (c = i + 1));
  }
  this.bMarks.push(s.length),
    this.eMarks.push(s.length),
    this.tShift.push(0),
    this.sCount.push(0),
    this.bsCount.push(0),
    (this.lineMax = this.bMarks.length - 1);
}
et.prototype.push = function (t, e, n) {
  var r = new Sc(t, e, n);
  return (
    (r.block = !0),
    n < 0 && this.level--,
    (r.level = this.level),
    n > 0 && this.level++,
    this.tokens.push(r),
    r
  );
};
et.prototype.isEmpty = function (e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
et.prototype.skipEmptyLines = function (e) {
  for (
    var n = this.lineMax;
    e < n && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]);
    e++
  );
  return e;
};
et.prototype.skipSpaces = function (e) {
  for (
    var n, r = this.src.length;
    e < r && ((n = this.src.charCodeAt(e)), !!Un(n));
    e++
  );
  return e;
};
et.prototype.skipSpacesBack = function (e, n) {
  if (e <= n) return e;
  for (; e > n; ) if (!Un(this.src.charCodeAt(--e))) return e + 1;
  return e;
};
et.prototype.skipChars = function (e, n) {
  for (var r = this.src.length; e < r && this.src.charCodeAt(e) === n; e++);
  return e;
};
et.prototype.skipCharsBack = function (e, n, r) {
  if (e <= r) return e;
  for (; e > r; ) if (n !== this.src.charCodeAt(--e)) return e + 1;
  return e;
};
et.prototype.getLines = function (e, n, r, o) {
  var s,
    c,
    i,
    l,
    a,
    u,
    f,
    h = e;
  if (e >= n) return "";
  for (u = new Array(n - e), s = 0; h < n; h++, s++) {
    for (
      c = 0,
        f = l = this.bMarks[h],
        h + 1 < n || o ? (a = this.eMarks[h] + 1) : (a = this.eMarks[h]);
      l < a && c < r;

    ) {
      if (((i = this.src.charCodeAt(l)), Un(i)))
        i === 9 ? (c += 4 - ((c + this.bsCount[h]) % 4)) : c++;
      else if (l - f < this.tShift[h]) c++;
      else break;
      l++;
    }
    c > r
      ? (u[s] = new Array(c - r + 1).join(" ") + this.src.slice(l, a))
      : (u[s] = this.src.slice(l, a));
  }
  return u.join("");
};
et.prototype.Token = Sc;
var UV = et,
  VV = Kr,
  dn = [
    ["table", dV, ["paragraph", "reference"]],
    ["code", gV],
    ["fence", mV, ["paragraph", "reference", "blockquote", "list"]],
    ["blockquote", _V, ["paragraph", "reference", "blockquote", "list"]],
    ["hr", vV, ["paragraph", "reference", "blockquote", "list"]],
    ["list", kV, ["paragraph", "reference", "blockquote"]],
    ["reference", CV],
    ["html_block", OV, ["paragraph", "reference", "blockquote"]],
    ["heading", BV, ["paragraph", "reference", "blockquote"]],
    ["lheading", $V],
    ["paragraph", jV],
  ];
function Vn() {
  this.ruler = new VV();
  for (var t = 0; t < dn.length; t++)
    this.ruler.push(dn[t][0], dn[t][1], { alt: (dn[t][2] || []).slice() });
}
Vn.prototype.tokenize = function (t, e, n) {
  for (
    var r,
      o,
      s = this.ruler.getRules(""),
      c = s.length,
      i = e,
      l = !1,
      a = t.md.options.maxNesting;
    i < n &&
    ((t.line = i = t.skipEmptyLines(i)),
    !(i >= n || t.sCount[i] < t.blkIndent));

  ) {
    if (t.level >= a) {
      t.line = n;
      break;
    }
    for (o = 0; o < c && ((r = s[o](t, i, n, !1)), !r); o++);
    (t.tight = !l),
      t.isEmpty(t.line - 1) && (l = !0),
      (i = t.line),
      i < n && t.isEmpty(i) && ((l = !0), i++, (t.line = i));
  }
};
Vn.prototype.parse = function (t, e, n, r) {
  var o;
  t && ((o = new this.State(t, e, n, r)), this.tokenize(o, o.line, o.lineMax));
};
Vn.prototype.State = UV;
var HV = Vn;
function GV(t) {
  switch (t) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
var WV = function (e, n) {
    for (var r = e.pos; r < e.posMax && !GV(e.src.charCodeAt(r)); ) r++;
    return r === e.pos
      ? !1
      : (n || (e.pending += e.src.slice(e.pos, r)), (e.pos = r), !0);
  },
  ZV = le.isSpace,
  KV = function (e, n) {
    var r,
      o,
      s,
      c = e.pos;
    if (e.src.charCodeAt(c) !== 10) return !1;
    if (((r = e.pending.length - 1), (o = e.posMax), !n))
      if (r >= 0 && e.pending.charCodeAt(r) === 32)
        if (r >= 1 && e.pending.charCodeAt(r - 1) === 32) {
          for (s = r - 1; s >= 1 && e.pending.charCodeAt(s - 1) === 32; ) s--;
          (e.pending = e.pending.slice(0, s)), e.push("hardbreak", "br", 0);
        } else
          (e.pending = e.pending.slice(0, -1)), e.push("softbreak", "br", 0);
      else e.push("softbreak", "br", 0);
    for (c++; c < o && ZV(e.src.charCodeAt(c)); ) c++;
    return (e.pos = c), !0;
  },
  JV = le.isSpace,
  Qr = [];
for (var ts = 0; ts < 256; ts++) Qr.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (t) {
  Qr[t.charCodeAt(0)] = 1;
});
var YV = function (e, n) {
    var r,
      o = e.pos,
      s = e.posMax;
    if (e.src.charCodeAt(o) !== 92) return !1;
    if ((o++, o < s)) {
      if (((r = e.src.charCodeAt(o)), r < 256 && Qr[r] !== 0))
        return n || (e.pending += e.src[o]), (e.pos += 2), !0;
      if (r === 10) {
        for (
          n || e.push("hardbreak", "br", 0), o++;
          o < s && ((r = e.src.charCodeAt(o)), !!JV(r));

        )
          o++;
        return (e.pos = o), !0;
      }
    }
    return n || (e.pending += "\\"), e.pos++, !0;
  },
  QV = function (e, n) {
    var r,
      o,
      s,
      c,
      i,
      l,
      a,
      u,
      f = e.pos,
      h = e.src.charCodeAt(f);
    if (h !== 96) return !1;
    for (r = f, f++, o = e.posMax; f < o && e.src.charCodeAt(f) === 96; ) f++;
    if (
      ((s = e.src.slice(r, f)),
      (a = s.length),
      e.backticksScanned && (e.backticks[a] || 0) <= r)
    )
      return n || (e.pending += s), (e.pos += a), !0;
    for (i = l = f; (i = e.src.indexOf("`", l)) !== -1; ) {
      for (l = i + 1; l < o && e.src.charCodeAt(l) === 96; ) l++;
      if (((u = l - i), u === a))
        return (
          n ||
            ((c = e.push("code_inline", "code", 0)),
            (c.markup = s),
            (c.content = e.src
              .slice(f, i)
              .replace(/\n/g, " ")
              .replace(/^ (.+) $/, "$1"))),
          (e.pos = l),
          !0
        );
      e.backticks[u] = i;
    }
    return (e.backticksScanned = !0), n || (e.pending += s), (e.pos += a), !0;
  },
  Hn = {};
Hn.tokenize = function (e, n) {
  var r,
    o,
    s,
    c,
    i,
    l = e.pos,
    a = e.src.charCodeAt(l);
  if (
    n ||
    a !== 126 ||
    ((o = e.scanDelims(e.pos, !0)),
    (c = o.length),
    (i = String.fromCharCode(a)),
    c < 2)
  )
    return !1;
  for (
    c % 2 && ((s = e.push("text", "", 0)), (s.content = i), c--), r = 0;
    r < c;
    r += 2
  )
    (s = e.push("text", "", 0)),
      (s.content = i + i),
      e.delimiters.push({
        marker: a,
        length: 0,
        token: e.tokens.length - 1,
        end: -1,
        open: o.can_open,
        close: o.can_close,
      });
  return (e.pos += o.length), !0;
};
function ns(t, e) {
  var n,
    r,
    o,
    s,
    c,
    i = [],
    l = e.length;
  for (n = 0; n < l; n++)
    (o = e[n]),
      o.marker === 126 &&
        o.end !== -1 &&
        ((s = e[o.end]),
        (c = t.tokens[o.token]),
        (c.type = "s_open"),
        (c.tag = "s"),
        (c.nesting = 1),
        (c.markup = "~~"),
        (c.content = ""),
        (c = t.tokens[s.token]),
        (c.type = "s_close"),
        (c.tag = "s"),
        (c.nesting = -1),
        (c.markup = "~~"),
        (c.content = ""),
        t.tokens[s.token - 1].type === "text" &&
          t.tokens[s.token - 1].content === "~" &&
          i.push(s.token - 1));
  for (; i.length; ) {
    for (
      n = i.pop(), r = n + 1;
      r < t.tokens.length && t.tokens[r].type === "s_close";

    )
      r++;
    r--,
      n !== r &&
        ((c = t.tokens[r]), (t.tokens[r] = t.tokens[n]), (t.tokens[n] = c));
  }
}
Hn.postProcess = function (e) {
  var n,
    r = e.tokens_meta,
    o = e.tokens_meta.length;
  for (ns(e, e.delimiters), n = 0; n < o; n++)
    r[n] && r[n].delimiters && ns(e, r[n].delimiters);
};
var Gn = {};
Gn.tokenize = function (e, n) {
  var r,
    o,
    s,
    c = e.pos,
    i = e.src.charCodeAt(c);
  if (n || (i !== 95 && i !== 42)) return !1;
  for (o = e.scanDelims(e.pos, i === 42), r = 0; r < o.length; r++)
    (s = e.push("text", "", 0)),
      (s.content = String.fromCharCode(i)),
      e.delimiters.push({
        marker: i,
        length: o.length,
        token: e.tokens.length - 1,
        end: -1,
        open: o.can_open,
        close: o.can_close,
      });
  return (e.pos += o.length), !0;
};
function rs(t, e) {
  var n,
    r,
    o,
    s,
    c,
    i,
    l = e.length;
  for (n = l - 1; n >= 0; n--)
    (r = e[n]),
      !(r.marker !== 95 && r.marker !== 42) &&
        r.end !== -1 &&
        ((o = e[r.end]),
        (i =
          n > 0 &&
          e[n - 1].end === r.end + 1 &&
          e[n - 1].marker === r.marker &&
          e[n - 1].token === r.token - 1 &&
          e[r.end + 1].token === o.token + 1),
        (c = String.fromCharCode(r.marker)),
        (s = t.tokens[r.token]),
        (s.type = i ? "strong_open" : "em_open"),
        (s.tag = i ? "strong" : "em"),
        (s.nesting = 1),
        (s.markup = i ? c + c : c),
        (s.content = ""),
        (s = t.tokens[o.token]),
        (s.type = i ? "strong_close" : "em_close"),
        (s.tag = i ? "strong" : "em"),
        (s.nesting = -1),
        (s.markup = i ? c + c : c),
        (s.content = ""),
        i &&
          ((t.tokens[e[n - 1].token].content = ""),
          (t.tokens[e[r.end + 1].token].content = ""),
          n--));
}
Gn.postProcess = function (e) {
  var n,
    r = e.tokens_meta,
    o = e.tokens_meta.length;
  for (rs(e, e.delimiters), n = 0; n < o; n++)
    r[n] && r[n].delimiters && rs(e, r[n].delimiters);
};
var XV = le.normalizeReference,
  fr = le.isSpace,
  e5 = function (e, n) {
    var r,
      o,
      s,
      c,
      i,
      l,
      a,
      u,
      f,
      h = "",
      d = "",
      _ = e.pos,
      b = e.posMax,
      C = e.pos,
      E = !0;
    if (
      e.src.charCodeAt(e.pos) !== 91 ||
      ((i = e.pos + 1), (c = e.md.helpers.parseLinkLabel(e, e.pos, !0)), c < 0)
    )
      return !1;
    if (((l = c + 1), l < b && e.src.charCodeAt(l) === 40)) {
      for (
        E = !1, l++;
        l < b && ((o = e.src.charCodeAt(l)), !(!fr(o) && o !== 10));
        l++
      );
      if (l >= b) return !1;
      if (
        ((C = l),
        (a = e.md.helpers.parseLinkDestination(e.src, l, e.posMax)),
        a.ok)
      ) {
        for (
          h = e.md.normalizeLink(a.str),
            e.md.validateLink(h) ? (l = a.pos) : (h = ""),
            C = l;
          l < b && ((o = e.src.charCodeAt(l)), !(!fr(o) && o !== 10));
          l++
        );
        if (
          ((a = e.md.helpers.parseLinkTitle(e.src, l, e.posMax)),
          l < b && C !== l && a.ok)
        )
          for (
            d = a.str, l = a.pos;
            l < b && ((o = e.src.charCodeAt(l)), !(!fr(o) && o !== 10));
            l++
          );
      }
      (l >= b || e.src.charCodeAt(l) !== 41) && (E = !0), l++;
    }
    if (E) {
      if (typeof e.env.references > "u") return !1;
      if (
        (l < b && e.src.charCodeAt(l) === 91
          ? ((C = l + 1),
            (l = e.md.helpers.parseLinkLabel(e, l)),
            l >= 0 ? (s = e.src.slice(C, l++)) : (l = c + 1))
          : (l = c + 1),
        s || (s = e.src.slice(i, c)),
        (u = e.env.references[XV(s)]),
        !u)
      )
        return (e.pos = _), !1;
      (h = u.href), (d = u.title);
    }
    return (
      n ||
        ((e.pos = i),
        (e.posMax = c),
        (f = e.push("link_open", "a", 1)),
        (f.attrs = r = [["href", h]]),
        d && r.push(["title", d]),
        e.md.inline.tokenize(e),
        (f = e.push("link_close", "a", -1))),
      (e.pos = l),
      (e.posMax = b),
      !0
    );
  },
  t5 = le.normalizeReference,
  pr = le.isSpace,
  n5 = function (e, n) {
    var r,
      o,
      s,
      c,
      i,
      l,
      a,
      u,
      f,
      h,
      d,
      _,
      b,
      C = "",
      E = e.pos,
      w = e.posMax;
    if (
      e.src.charCodeAt(e.pos) !== 33 ||
      e.src.charCodeAt(e.pos + 1) !== 91 ||
      ((l = e.pos + 2),
      (i = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1)),
      i < 0)
    )
      return !1;
    if (((a = i + 1), a < w && e.src.charCodeAt(a) === 40)) {
      for (
        a++;
        a < w && ((o = e.src.charCodeAt(a)), !(!pr(o) && o !== 10));
        a++
      );
      if (a >= w) return !1;
      for (
        b = a,
          f = e.md.helpers.parseLinkDestination(e.src, a, e.posMax),
          f.ok &&
            ((C = e.md.normalizeLink(f.str)),
            e.md.validateLink(C) ? (a = f.pos) : (C = "")),
          b = a;
        a < w && ((o = e.src.charCodeAt(a)), !(!pr(o) && o !== 10));
        a++
      );
      if (
        ((f = e.md.helpers.parseLinkTitle(e.src, a, e.posMax)),
        a < w && b !== a && f.ok)
      )
        for (
          h = f.str, a = f.pos;
          a < w && ((o = e.src.charCodeAt(a)), !(!pr(o) && o !== 10));
          a++
        );
      else h = "";
      if (a >= w || e.src.charCodeAt(a) !== 41) return (e.pos = E), !1;
      a++;
    } else {
      if (typeof e.env.references > "u") return !1;
      if (
        (a < w && e.src.charCodeAt(a) === 91
          ? ((b = a + 1),
            (a = e.md.helpers.parseLinkLabel(e, a)),
            a >= 0 ? (c = e.src.slice(b, a++)) : (a = i + 1))
          : (a = i + 1),
        c || (c = e.src.slice(l, i)),
        (u = e.env.references[t5(c)]),
        !u)
      )
        return (e.pos = E), !1;
      (C = u.href), (h = u.title);
    }
    return (
      n ||
        ((s = e.src.slice(l, i)),
        e.md.inline.parse(s, e.md, e.env, (_ = [])),
        (d = e.push("image", "img", 0)),
        (d.attrs = r =
          [
            ["src", C],
            ["alt", ""],
          ]),
        (d.children = _),
        (d.content = s),
        h && r.push(["title", h])),
      (e.pos = a),
      (e.posMax = w),
      !0
    );
  },
  r5 =
    /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,
  o5 = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/,
  s5 = function (e, n) {
    var r,
      o,
      s,
      c,
      i,
      l,
      a = e.pos;
    if (e.src.charCodeAt(a) !== 60) return !1;
    for (i = e.pos, l = e.posMax; ; ) {
      if (++a >= l || ((c = e.src.charCodeAt(a)), c === 60)) return !1;
      if (c === 62) break;
    }
    return (
      (r = e.src.slice(i + 1, a)),
      o5.test(r)
        ? ((o = e.md.normalizeLink(r)),
          e.md.validateLink(o)
            ? (n ||
                ((s = e.push("link_open", "a", 1)),
                (s.attrs = [["href", o]]),
                (s.markup = "autolink"),
                (s.info = "auto"),
                (s = e.push("text", "", 0)),
                (s.content = e.md.normalizeLinkText(r)),
                (s = e.push("link_close", "a", -1)),
                (s.markup = "autolink"),
                (s.info = "auto")),
              (e.pos += r.length + 2),
              !0)
            : !1)
        : r5.test(r)
        ? ((o = e.md.normalizeLink("mailto:" + r)),
          e.md.validateLink(o)
            ? (n ||
                ((s = e.push("link_open", "a", 1)),
                (s.attrs = [["href", o]]),
                (s.markup = "autolink"),
                (s.info = "auto"),
                (s = e.push("text", "", 0)),
                (s.content = e.md.normalizeLinkText(r)),
                (s = e.push("link_close", "a", -1)),
                (s.markup = "autolink"),
                (s.info = "auto")),
              (e.pos += r.length + 2),
              !0)
            : !1)
        : !1
    );
  },
  c5 = jn.HTML_TAG_RE;
function i5(t) {
  var e = t | 32;
  return e >= 97 && e <= 122;
}
var l5 = function (e, n) {
    var r,
      o,
      s,
      c,
      i = e.pos;
    return !e.md.options.html ||
      ((s = e.posMax), e.src.charCodeAt(i) !== 60 || i + 2 >= s) ||
      ((r = e.src.charCodeAt(i + 1)),
      r !== 33 && r !== 63 && r !== 47 && !i5(r)) ||
      ((o = e.src.slice(i).match(c5)), !o)
      ? !1
      : (n ||
          ((c = e.push("html_inline", "", 0)),
          (c.content = e.src.slice(i, i + o[0].length))),
        (e.pos += o[0].length),
        !0);
  },
  os = bc,
  a5 = le.has,
  u5 = le.isValidEntityCode,
  ss = le.fromCodePoint,
  f5 = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,
  p5 = /^&([a-z][a-z0-9]{1,31});/i,
  h5 = function (e, n) {
    var r,
      o,
      s,
      c = e.pos,
      i = e.posMax;
    if (e.src.charCodeAt(c) !== 38) return !1;
    if (c + 1 < i) {
      if (((r = e.src.charCodeAt(c + 1)), r === 35)) {
        if (((s = e.src.slice(c).match(f5)), s))
          return (
            n ||
              ((o =
                s[1][0].toLowerCase() === "x"
                  ? parseInt(s[1].slice(1), 16)
                  : parseInt(s[1], 10)),
              (e.pending += u5(o) ? ss(o) : ss(65533))),
            (e.pos += s[0].length),
            !0
          );
      } else if (((s = e.src.slice(c).match(p5)), s && a5(os, s[1])))
        return n || (e.pending += os[s[1]]), (e.pos += s[0].length), !0;
    }
    return n || (e.pending += "&"), e.pos++, !0;
  };
function cs(t, e) {
  var n,
    r,
    o,
    s,
    c,
    i,
    l,
    a,
    u = {},
    f = e.length;
  if (f) {
    var h = 0,
      d = -2,
      _ = [];
    for (n = 0; n < f; n++)
      if (
        ((o = e[n]),
        _.push(0),
        (e[h].marker !== o.marker || d !== o.token - 1) && (h = n),
        (d = o.token),
        (o.length = o.length || 0),
        !!o.close)
      ) {
        for (
          u.hasOwnProperty(o.marker) ||
            (u[o.marker] = [-1, -1, -1, -1, -1, -1]),
            c = u[o.marker][(o.open ? 3 : 0) + (o.length % 3)],
            r = h - _[h] - 1,
            i = r;
          r > c;
          r -= _[r] + 1
        )
          if (
            ((s = e[r]),
            s.marker === o.marker &&
              s.open &&
              s.end < 0 &&
              ((l = !1),
              (s.close || o.open) &&
                (s.length + o.length) % 3 === 0 &&
                (s.length % 3 !== 0 || o.length % 3 !== 0) &&
                (l = !0),
              !l))
          ) {
            (a = r > 0 && !e[r - 1].open ? _[r - 1] + 1 : 0),
              (_[n] = n - r + a),
              (_[r] = a),
              (o.open = !1),
              (s.end = n),
              (s.close = !1),
              (i = -1),
              (d = -2);
            break;
          }
        i !== -1 && (u[o.marker][(o.open ? 3 : 0) + ((o.length || 0) % 3)] = i);
      }
  }
}
var d5 = function (e) {
    var n,
      r = e.tokens_meta,
      o = e.tokens_meta.length;
    for (cs(e, e.delimiters), n = 0; n < o; n++)
      r[n] && r[n].delimiters && cs(e, r[n].delimiters);
  },
  g5 = function (e) {
    var n,
      r,
      o = 0,
      s = e.tokens,
      c = e.tokens.length;
    for (n = r = 0; n < c; n++)
      s[n].nesting < 0 && o--,
        (s[n].level = o),
        s[n].nesting > 0 && o++,
        s[n].type === "text" && n + 1 < c && s[n + 1].type === "text"
          ? (s[n + 1].content = s[n].content + s[n + 1].content)
          : (n !== r && (s[r] = s[n]), r++);
    n !== r && (s.length = r);
  },
  Xr = Jr,
  is = le.isWhiteSpace,
  ls = le.isPunctChar,
  as = le.isMdAsciiPunct;
function rn(t, e, n, r) {
  (this.src = t),
    (this.env = n),
    (this.md = e),
    (this.tokens = r),
    (this.tokens_meta = Array(r.length)),
    (this.pos = 0),
    (this.posMax = this.src.length),
    (this.level = 0),
    (this.pending = ""),
    (this.pendingLevel = 0),
    (this.cache = {}),
    (this.delimiters = []),
    (this._prev_delimiters = []),
    (this.backticks = {}),
    (this.backticksScanned = !1);
}
rn.prototype.pushPending = function () {
  var t = new Xr("text", "", 0);
  return (
    (t.content = this.pending),
    (t.level = this.pendingLevel),
    this.tokens.push(t),
    (this.pending = ""),
    t
  );
};
rn.prototype.push = function (t, e, n) {
  this.pending && this.pushPending();
  var r = new Xr(t, e, n),
    o = null;
  return (
    n < 0 && (this.level--, (this.delimiters = this._prev_delimiters.pop())),
    (r.level = this.level),
    n > 0 &&
      (this.level++,
      this._prev_delimiters.push(this.delimiters),
      (this.delimiters = []),
      (o = { delimiters: this.delimiters })),
    (this.pendingLevel = this.level),
    this.tokens.push(r),
    this.tokens_meta.push(o),
    r
  );
};
rn.prototype.scanDelims = function (t, e) {
  var n = t,
    r,
    o,
    s,
    c,
    i,
    l,
    a,
    u,
    f,
    h = !0,
    d = !0,
    _ = this.posMax,
    b = this.src.charCodeAt(t);
  for (
    r = t > 0 ? this.src.charCodeAt(t - 1) : 32;
    n < _ && this.src.charCodeAt(n) === b;

  )
    n++;
  return (
    (s = n - t),
    (o = n < _ ? this.src.charCodeAt(n) : 32),
    (a = as(r) || ls(String.fromCharCode(r))),
    (f = as(o) || ls(String.fromCharCode(o))),
    (l = is(r)),
    (u = is(o)),
    u ? (h = !1) : f && (l || a || (h = !1)),
    l ? (d = !1) : a && (u || f || (d = !1)),
    e ? ((c = h), (i = d)) : ((c = h && (!d || a)), (i = d && (!h || f))),
    { can_open: c, can_close: i, length: s }
  );
};
rn.prototype.Token = Xr;
var m5 = rn,
  us = Kr,
  hr = [
    ["text", WV],
    ["newline", KV],
    ["escape", YV],
    ["backticks", QV],
    ["strikethrough", Hn.tokenize],
    ["emphasis", Gn.tokenize],
    ["link", e5],
    ["image", n5],
    ["autolink", s5],
    ["html_inline", l5],
    ["entity", h5],
  ],
  dr = [
    ["balance_pairs", d5],
    ["strikethrough", Hn.postProcess],
    ["emphasis", Gn.postProcess],
    ["text_collapse", g5],
  ];
function on() {
  var t;
  for (this.ruler = new us(), t = 0; t < hr.length; t++)
    this.ruler.push(hr[t][0], hr[t][1]);
  for (this.ruler2 = new us(), t = 0; t < dr.length; t++)
    this.ruler2.push(dr[t][0], dr[t][1]);
}
on.prototype.skipToken = function (t) {
  var e,
    n,
    r = t.pos,
    o = this.ruler.getRules(""),
    s = o.length,
    c = t.md.options.maxNesting,
    i = t.cache;
  if (typeof i[r] < "u") {
    t.pos = i[r];
    return;
  }
  if (t.level < c)
    for (n = 0; n < s && (t.level++, (e = o[n](t, !0)), t.level--, !e); n++);
  else t.pos = t.posMax;
  e || t.pos++, (i[r] = t.pos);
};
on.prototype.tokenize = function (t) {
  for (
    var e,
      n,
      r = this.ruler.getRules(""),
      o = r.length,
      s = t.posMax,
      c = t.md.options.maxNesting;
    t.pos < s;

  ) {
    if (t.level < c) for (n = 0; n < o && ((e = r[n](t, !1)), !e); n++);
    if (e) {
      if (t.pos >= s) break;
      continue;
    }
    t.pending += t.src[t.pos++];
  }
  t.pending && t.pushPending();
};
on.prototype.parse = function (t, e, n, r) {
  var o,
    s,
    c,
    i = new this.State(t, e, n, r);
  for (
    this.tokenize(i), s = this.ruler2.getRules(""), c = s.length, o = 0;
    o < c;
    o++
  )
    s[o](i);
};
on.prototype.State = m5;
var _5 = on,
  gr,
  fs;
function b5() {
  return (
    fs ||
      ((fs = 1),
      (gr = function (t) {
        var e = {};
        (e.src_Any = vc().source),
          (e.src_Cc = xc().source),
          (e.src_Z = kc().source),
          (e.src_P = Zr.source),
          (e.src_ZPCc = [e.src_Z, e.src_P, e.src_Cc].join("|")),
          (e.src_ZCc = [e.src_Z, e.src_Cc].join("|"));
        var n = "[><｜]";
        return (
          (e.src_pseudo_letter =
            "(?:(?!" + n + "|" + e.src_ZPCc + ")" + e.src_Any + ")"),
          (e.src_ip4 =
            "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"),
          (e.src_auth = "(?:(?:(?!" + e.src_ZCc + "|[@/\\[\\]()]).)+@)?"),
          (e.src_port =
            "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?"),
          (e.src_host_terminator =
            "(?=$|" +
            n +
            "|" +
            e.src_ZPCc +
            ")(?!-|_|:\\d|\\.-|\\.(?!$|" +
            e.src_ZPCc +
            "))"),
          (e.src_path =
            "(?:[/?#](?:(?!" +
            e.src_ZCc +
            "|" +
            n +
            `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` +
            e.src_ZCc +
            "|\\]).)*\\]|\\((?:(?!" +
            e.src_ZCc +
            "|[)]).)*\\)|\\{(?:(?!" +
            e.src_ZCc +
            '|[}]).)*\\}|\\"(?:(?!' +
            e.src_ZCc +
            `|["]).)+\\"|\\'(?:(?!` +
            e.src_ZCc +
            "|[']).)+\\'|\\'(?=" +
            e.src_pseudo_letter +
            "|[-]).|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" +
            e.src_ZCc +
            "|[.]).|" +
            (t && t["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") +
            ",(?!" +
            e.src_ZCc +
            ").|;(?!" +
            e.src_ZCc +
            ").|\\!+(?!" +
            e.src_ZCc +
            "|[!]).|\\?(?!" +
            e.src_ZCc +
            "|[?]).)+|\\/)?"),
          (e.src_email_name =
            '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*'),
          (e.src_xn = "xn--[a-z0-9\\-]{1,59}"),
          (e.src_domain_root =
            "(?:" + e.src_xn + "|" + e.src_pseudo_letter + "{1,63})"),
          (e.src_domain =
            "(?:" +
            e.src_xn +
            "|(?:" +
            e.src_pseudo_letter +
            ")|(?:" +
            e.src_pseudo_letter +
            "(?:-|" +
            e.src_pseudo_letter +
            "){0,61}" +
            e.src_pseudo_letter +
            "))"),
          (e.src_host =
            "(?:(?:(?:(?:" + e.src_domain + ")\\.)*" + e.src_domain + "))"),
          (e.tpl_host_fuzzy =
            "(?:" +
            e.src_ip4 +
            "|(?:(?:(?:" +
            e.src_domain +
            ")\\.)+(?:%TLDS%)))"),
          (e.tpl_host_no_ip_fuzzy =
            "(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%))"),
          (e.src_host_strict = e.src_host + e.src_host_terminator),
          (e.tpl_host_fuzzy_strict = e.tpl_host_fuzzy + e.src_host_terminator),
          (e.src_host_port_strict =
            e.src_host + e.src_port + e.src_host_terminator),
          (e.tpl_host_port_fuzzy_strict =
            e.tpl_host_fuzzy + e.src_port + e.src_host_terminator),
          (e.tpl_host_port_no_ip_fuzzy_strict =
            e.tpl_host_no_ip_fuzzy + e.src_port + e.src_host_terminator),
          (e.tpl_host_fuzzy_test =
            "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" +
            e.src_ZPCc +
            "|>|$))"),
          (e.tpl_email_fuzzy =
            "(^|" +
            n +
            '|"|\\(|' +
            e.src_ZCc +
            ")(" +
            e.src_email_name +
            "@" +
            e.tpl_host_fuzzy_strict +
            ")"),
          (e.tpl_link_fuzzy =
            "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" +
            e.src_ZPCc +
            "))((?![$+<=>^`|｜])" +
            e.tpl_host_port_fuzzy_strict +
            e.src_path +
            ")"),
          (e.tpl_link_no_ip_fuzzy =
            "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" +
            e.src_ZPCc +
            "))((?![$+<=>^`|｜])" +
            e.tpl_host_port_no_ip_fuzzy_strict +
            e.src_path +
            ")"),
          e
        );
      })),
    gr
  );
}
function Dr(t) {
  var e = Array.prototype.slice.call(arguments, 1);
  return (
    e.forEach(function (n) {
      n &&
        Object.keys(n).forEach(function (r) {
          t[r] = n[r];
        });
    }),
    t
  );
}
function Wn(t) {
  return Object.prototype.toString.call(t);
}
function v5(t) {
  return Wn(t) === "[object String]";
}
function x5(t) {
  return Wn(t) === "[object Object]";
}
function k5(t) {
  return Wn(t) === "[object RegExp]";
}
function ps(t) {
  return Wn(t) === "[object Function]";
}
function y5(t) {
  return t.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
var Dc = { fuzzyLink: !0, fuzzyEmail: !0, fuzzyIP: !1 };
function C5(t) {
  return Object.keys(t || {}).reduce(function (e, n) {
    return e || Dc.hasOwnProperty(n);
  }, !1);
}
var w5 = {
    "http:": {
      validate: function (t, e, n) {
        var r = t.slice(e);
        return (
          n.re.http ||
            (n.re.http = new RegExp(
              "^\\/\\/" +
                n.re.src_auth +
                n.re.src_host_port_strict +
                n.re.src_path,
              "i"
            )),
          n.re.http.test(r) ? r.match(n.re.http)[0].length : 0
        );
      },
    },
    "https:": "http:",
    "ftp:": "http:",
    "//": {
      validate: function (t, e, n) {
        var r = t.slice(e);
        return (
          n.re.no_http ||
            (n.re.no_http = new RegExp(
              "^" +
                n.re.src_auth +
                "(?:localhost|(?:(?:" +
                n.re.src_domain +
                ")\\.)+" +
                n.re.src_domain_root +
                ")" +
                n.re.src_port +
                n.re.src_host_terminator +
                n.re.src_path,
              "i"
            )),
          n.re.no_http.test(r)
            ? (e >= 3 && t[e - 3] === ":") || (e >= 3 && t[e - 3] === "/")
              ? 0
              : r.match(n.re.no_http)[0].length
            : 0
        );
      },
    },
    "mailto:": {
      validate: function (t, e, n) {
        var r = t.slice(e);
        return (
          n.re.mailto ||
            (n.re.mailto = new RegExp(
              "^" + n.re.src_email_name + "@" + n.re.src_host_strict,
              "i"
            )),
          n.re.mailto.test(r) ? r.match(n.re.mailto)[0].length : 0
        );
      },
    },
  },
  A5 =
    "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",
  E5 =
    "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split(
      "|"
    );
function S5(t) {
  (t.__index__ = -1), (t.__text_cache__ = "");
}
function D5(t) {
  return function (e, n) {
    var r = e.slice(n);
    return t.test(r) ? r.match(t)[0].length : 0;
  };
}
function hs() {
  return function (t, e) {
    e.normalize(t);
  };
}
function Dn(t) {
  var e = (t.re = b5()(t.__opts__)),
    n = t.__tlds__.slice();
  t.onCompile(),
    t.__tlds_replaced__ || n.push(A5),
    n.push(e.src_xn),
    (e.src_tlds = n.join("|"));
  function r(i) {
    return i.replace("%TLDS%", e.src_tlds);
  }
  (e.email_fuzzy = RegExp(r(e.tpl_email_fuzzy), "i")),
    (e.link_fuzzy = RegExp(r(e.tpl_link_fuzzy), "i")),
    (e.link_no_ip_fuzzy = RegExp(r(e.tpl_link_no_ip_fuzzy), "i")),
    (e.host_fuzzy_test = RegExp(r(e.tpl_host_fuzzy_test), "i"));
  var o = [];
  t.__compiled__ = {};
  function s(i, l) {
    throw new Error('(LinkifyIt) Invalid schema "' + i + '": ' + l);
  }
  Object.keys(t.__schemas__).forEach(function (i) {
    var l = t.__schemas__[i];
    if (l !== null) {
      var a = { validate: null, link: null };
      if (((t.__compiled__[i] = a), x5(l))) {
        k5(l.validate)
          ? (a.validate = D5(l.validate))
          : ps(l.validate)
          ? (a.validate = l.validate)
          : s(i, l),
          ps(l.normalize)
            ? (a.normalize = l.normalize)
            : l.normalize
            ? s(i, l)
            : (a.normalize = hs());
        return;
      }
      if (v5(l)) {
        o.push(i);
        return;
      }
      s(i, l);
    }
  }),
    o.forEach(function (i) {
      t.__compiled__[t.__schemas__[i]] &&
        ((t.__compiled__[i].validate =
          t.__compiled__[t.__schemas__[i]].validate),
        (t.__compiled__[i].normalize =
          t.__compiled__[t.__schemas__[i]].normalize));
    }),
    (t.__compiled__[""] = { validate: null, normalize: hs() });
  var c = Object.keys(t.__compiled__)
    .filter(function (i) {
      return i.length > 0 && t.__compiled__[i];
    })
    .map(y5)
    .join("|");
  (t.re.schema_test = RegExp(
    "(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + c + ")",
    "i"
  )),
    (t.re.schema_search = RegExp(
      "(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + c + ")",
      "ig"
    )),
    (t.re.pretest = RegExp(
      "(" +
        t.re.schema_test.source +
        ")|(" +
        t.re.host_fuzzy_test.source +
        ")|@",
      "i"
    )),
    S5(t);
}
function q5(t, e) {
  var n = t.__index__,
    r = t.__last_index__,
    o = t.__text_cache__.slice(n, r);
  (this.schema = t.__schema__.toLowerCase()),
    (this.index = n + e),
    (this.lastIndex = r + e),
    (this.raw = o),
    (this.text = o),
    (this.url = o);
}
function ds(t, e) {
  var n = new q5(t, e);
  return t.__compiled__[n.schema].normalize(n, t), n;
}
function je(t, e) {
  if (!(this instanceof je)) return new je(t, e);
  e || (C5(t) && ((e = t), (t = {}))),
    (this.__opts__ = Dr({}, Dc, e)),
    (this.__index__ = -1),
    (this.__last_index__ = -1),
    (this.__schema__ = ""),
    (this.__text_cache__ = ""),
    (this.__schemas__ = Dr({}, w5, t)),
    (this.__compiled__ = {}),
    (this.__tlds__ = E5),
    (this.__tlds_replaced__ = !1),
    (this.re = {}),
    Dn(this);
}
je.prototype.add = function (e, n) {
  return (this.__schemas__[e] = n), Dn(this), this;
};
je.prototype.set = function (e) {
  return (this.__opts__ = Dr(this.__opts__, e)), this;
};
je.prototype.test = function (e) {
  if (((this.__text_cache__ = e), (this.__index__ = -1), !e.length)) return !1;
  var n, r, o, s, c, i, l, a, u;
  if (this.re.schema_test.test(e)) {
    for (l = this.re.schema_search, l.lastIndex = 0; (n = l.exec(e)) !== null; )
      if (((s = this.testSchemaAt(e, n[2], l.lastIndex)), s)) {
        (this.__schema__ = n[2]),
          (this.__index__ = n.index + n[1].length),
          (this.__last_index__ = n.index + n[0].length + s);
        break;
      }
  }
  return (
    this.__opts__.fuzzyLink &&
      this.__compiled__["http:"] &&
      ((a = e.search(this.re.host_fuzzy_test)),
      a >= 0 &&
        (this.__index__ < 0 || a < this.__index__) &&
        (r = e.match(
          this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy
        )) !== null &&
        ((c = r.index + r[1].length),
        (this.__index__ < 0 || c < this.__index__) &&
          ((this.__schema__ = ""),
          (this.__index__ = c),
          (this.__last_index__ = r.index + r[0].length)))),
    this.__opts__.fuzzyEmail &&
      this.__compiled__["mailto:"] &&
      ((u = e.indexOf("@")),
      u >= 0 &&
        (o = e.match(this.re.email_fuzzy)) !== null &&
        ((c = o.index + o[1].length),
        (i = o.index + o[0].length),
        (this.__index__ < 0 ||
          c < this.__index__ ||
          (c === this.__index__ && i > this.__last_index__)) &&
          ((this.__schema__ = "mailto:"),
          (this.__index__ = c),
          (this.__last_index__ = i)))),
    this.__index__ >= 0
  );
};
je.prototype.pretest = function (e) {
  return this.re.pretest.test(e);
};
je.prototype.testSchemaAt = function (e, n, r) {
  return this.__compiled__[n.toLowerCase()]
    ? this.__compiled__[n.toLowerCase()].validate(e, r, this)
    : 0;
};
je.prototype.match = function (e) {
  var n = 0,
    r = [];
  this.__index__ >= 0 &&
    this.__text_cache__ === e &&
    (r.push(ds(this, n)), (n = this.__last_index__));
  for (var o = n ? e.slice(n) : e; this.test(o); )
    r.push(ds(this, n)),
      (o = o.slice(this.__last_index__)),
      (n += this.__last_index__);
  return r.length ? r : null;
};
je.prototype.tlds = function (e, n) {
  return (
    (e = Array.isArray(e) ? e : [e]),
    n
      ? ((this.__tlds__ = this.__tlds__
          .concat(e)
          .sort()
          .filter(function (r, o, s) {
            return r !== s[o - 1];
          })
          .reverse()),
        Dn(this),
        this)
      : ((this.__tlds__ = e.slice()),
        (this.__tlds_replaced__ = !0),
        Dn(this),
        this)
  );
};
je.prototype.normalize = function (e) {
  e.schema || (e.url = "http://" + e.url),
    e.schema === "mailto:" &&
      !/^mailto:/i.test(e.url) &&
      (e.url = "mailto:" + e.url);
};
je.prototype.onCompile = function () {};
var T5 = je;
const F5 = {},
  R5 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: F5 },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  L5 = Ic(R5);
var I5 = {
    options: {
      html: !1,
      xhtmlOut: !1,
      breaks: !1,
      langPrefix: "language-",
      linkify: !1,
      typographer: !1,
      quotes: "“”‘’",
      highlight: null,
      maxNesting: 100,
    },
    components: { core: {}, block: {}, inline: {} },
  },
  z5 = {
    options: {
      html: !1,
      xhtmlOut: !1,
      breaks: !1,
      langPrefix: "language-",
      linkify: !1,
      typographer: !1,
      quotes: "“”‘’",
      highlight: null,
      maxNesting: 20,
    },
    components: {
      core: { rules: ["normalize", "block", "inline"] },
      block: { rules: ["paragraph"] },
      inline: { rules: ["text"], rules2: ["balance_pairs", "text_collapse"] },
    },
  },
  P5 = {
    options: {
      html: !0,
      xhtmlOut: !0,
      breaks: !1,
      langPrefix: "language-",
      linkify: !1,
      typographer: !1,
      quotes: "“”‘’",
      highlight: null,
      maxNesting: 20,
    },
    components: {
      core: { rules: ["normalize", "block", "inline"] },
      block: {
        rules: [
          "blockquote",
          "code",
          "fence",
          "heading",
          "hr",
          "html_block",
          "lheading",
          "list",
          "reference",
          "paragraph",
        ],
      },
      inline: {
        rules: [
          "autolink",
          "backticks",
          "emphasis",
          "entity",
          "escape",
          "html_inline",
          "image",
          "link",
          "newline",
          "text",
        ],
        rules2: ["balance_pairs", "emphasis", "text_collapse"],
      },
    },
  },
  Jt = le,
  M5 = $n,
  N5 = V6,
  O5 = hV,
  B5 = HV,
  $5 = _5,
  j5 = T5,
  kt = Bt,
  qc = L5,
  U5 = { default: I5, zero: z5, commonmark: P5 },
  V5 = /^(vbscript|javascript|file|data):/,
  H5 = /^data:image\/(gif|png|jpeg|webp);/;
function G5(t) {
  var e = t.trim().toLowerCase();
  return V5.test(e) ? !!H5.test(e) : !0;
}
var Tc = ["http:", "https:", "mailto:"];
function W5(t) {
  var e = kt.parse(t, !0);
  if (e.hostname && (!e.protocol || Tc.indexOf(e.protocol) >= 0))
    try {
      e.hostname = qc.toASCII(e.hostname);
    } catch {}
  return kt.encode(kt.format(e));
}
function Z5(t) {
  var e = kt.parse(t, !0);
  if (e.hostname && (!e.protocol || Tc.indexOf(e.protocol) >= 0))
    try {
      e.hostname = qc.toUnicode(e.hostname);
    } catch {}
  return kt.decode(kt.format(e), kt.decode.defaultChars + "%");
}
function Ue(t, e) {
  if (!(this instanceof Ue)) return new Ue(t, e);
  e || Jt.isString(t) || ((e = t || {}), (t = "default")),
    (this.inline = new $5()),
    (this.block = new B5()),
    (this.core = new O5()),
    (this.renderer = new N5()),
    (this.linkify = new j5()),
    (this.validateLink = G5),
    (this.normalizeLink = W5),
    (this.normalizeLinkText = Z5),
    (this.utils = Jt),
    (this.helpers = Jt.assign({}, M5)),
    (this.options = {}),
    this.configure(t),
    e && this.set(e);
}
Ue.prototype.set = function (t) {
  return Jt.assign(this.options, t), this;
};
Ue.prototype.configure = function (t) {
  var e = this,
    n;
  if (Jt.isString(t) && ((n = t), (t = U5[n]), !t))
    throw new Error('Wrong `markdown-it` preset "' + n + '", check name');
  if (!t) throw new Error("Wrong `markdown-it` preset, can't be empty");
  return (
    t.options && e.set(t.options),
    t.components &&
      Object.keys(t.components).forEach(function (r) {
        t.components[r].rules && e[r].ruler.enableOnly(t.components[r].rules),
          t.components[r].rules2 &&
            e[r].ruler2.enableOnly(t.components[r].rules2);
      }),
    this
  );
};
Ue.prototype.enable = function (t, e) {
  var n = [];
  Array.isArray(t) || (t = [t]),
    ["core", "block", "inline"].forEach(function (o) {
      n = n.concat(this[o].ruler.enable(t, !0));
    }, this),
    (n = n.concat(this.inline.ruler2.enable(t, !0)));
  var r = t.filter(function (o) {
    return n.indexOf(o) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
  return this;
};
Ue.prototype.disable = function (t, e) {
  var n = [];
  Array.isArray(t) || (t = [t]),
    ["core", "block", "inline"].forEach(function (o) {
      n = n.concat(this[o].ruler.disable(t, !0));
    }, this),
    (n = n.concat(this.inline.ruler2.disable(t, !0)));
  var r = t.filter(function (o) {
    return n.indexOf(o) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
  return this;
};
Ue.prototype.use = function (t) {
  var e = [this].concat(Array.prototype.slice.call(arguments, 1));
  return t.apply(t, e), this;
};
Ue.prototype.parse = function (t, e) {
  if (typeof t != "string") throw new Error("Input data should be a String");
  var n = new this.core.State(t, this, e);
  return this.core.process(n), n.tokens;
};
Ue.prototype.render = function (t, e) {
  return (e = e || {}), this.renderer.render(this.parse(t, e), this.options, e);
};
Ue.prototype.parseInline = function (t, e) {
  var n = new this.core.State(t, this, e);
  return (n.inlineMode = !0), this.core.process(n), n.tokens;
};
Ue.prototype.renderInline = function (t, e) {
  return (
    (e = e || {}), this.renderer.render(this.parseInline(t, e), this.options, e)
  );
};
var K5 = Ue,
  J5 = K5;
const Y5 = Lc(J5);
var Q5 = Oi({
  name: "VueMarkdown",
  props: {
    source: { type: String, required: !0 },
    options: { type: Object, required: !1 },
    plugins: { type: Array, required: !1 },
  },
  setup: function (t) {
    for (
      var e,
        n,
        r = $s(new Y5((e = t.options) !== null && e !== void 0 ? e : {})),
        o = 0,
        s = (n = t.plugins) !== null && n !== void 0 ? n : [];
      o < s.length;
      o++
    ) {
      var c = s[o];
      r.value.use(c);
    }
    var i = _c(function () {
      return r.value.render(t.source);
    });
    return function () {
      return Dl("div", { innerHTML: i.value });
    };
  },
});
const Fc = Q5,
  X5 = ["href"],
  e4 = {
    __name: "optionalLink",
    props: { href: String },
    setup(t) {
      return (e, n) =>
        t.href
          ? (Z(),
            Q("a", { key: 0, href: t.href }, [uo(e.$slots, "default")], 8, X5))
          : uo(e.$slots, "default", { key: 1 });
    },
  },
  t4 = ["srcset", "type"],
  n4 = ["src", "alt"],
  Rc = {
    __name: "ResponsiveImage",
    props: { src: String, alt: String },
    setup(t) {
      const e = t,
        n = [
          { width: 200, height: 200, suffix: "-200x200" },
          { width: 400, height: 400, suffix: "-400x400" },
          { width: 800, height: 800, suffix: "-800x800" },
          { width: 1500, height: 1500, suffix: "-1500x1500" },
          { width: 2e3, height: 2e3, suffix: "-2000x2000" },
        ];
      let r = `/img/${e.name}.jpg?url`,
        o = ["webp"];
      const s = async (i) => {
          let [l, a] = i.split("."),
            u = [];
          for (let f of [...o, a]) {
            let h = [];
            for (let d of n) {
              `${l}${d.suffix}${f}`;
              let _ = `/img/${l}${d.suffix}.${f}`;
              console.log(_.default), h.push(`${_} ${d.width}w`);
            }
            u.push({ srcset: h.join(", "), format: `image/${f}` });
          }
          return console.log(u), u;
        },
        c = $s("");
      return (
        ec(async () => {
          c.value = await s(e.src);
        }),
        (i, l) => (
          Z(),
          Q(
            ge,
            null,
            [
              (Z(!0),
              Q(
                ge,
                null,
                Ne(
                  c.value,
                  (a) => (
                    Z(),
                    Q(
                      "source",
                      {
                        srcset: a.srcset,
                        type: a.format,
                        "data-sizes": "auto",
                      },
                      null,
                      8,
                      t4
                    )
                  )
                ),
                256
              )),
              N("img", { src: Je(r), alt: i.name }, null, 8, n4),
            ],
            64
          )
        )
      );
    },
  },
  r4 = { class: "card-project vstack g-1" },
  o4 = { key: 0 },
  s4 = { class: "ratio-wide" },
  c4 = { class: "vstack g-half" },
  i4 = { key: 0 },
  l4 = { key: 2, class: "hstack g-half" },
  a4 = { class: "tag" },
  u4 = {
    __name: "cardProject",
    props: { project: Object },
    setup(t) {
      return (e, n) => (
        Z(),
        wn(
          e4,
          { href: t.project.url },
          {
            default: Ks(() => [
              N("article", r4, [
                t.project.image
                  ? (Z(),
                    Q("header", o4, [
                      N("picture", s4, [
                        we(Rc, { src: t.project.image }, null, 8, ["src"]),
                      ]),
                    ]))
                  : rt("", !0),
                N("section", c4, [
                  t.project.title
                    ? (Z(), Q("h2", i4, be(t.project.title), 1))
                    : rt("", !0),
                  t.project.description
                    ? (Z(),
                      wn(
                        Je(Fc),
                        { key: 1, source: t.project.description },
                        null,
                        8,
                        ["source"]
                      ))
                    : rt("", !0),
                  t.project.tags
                    ? (Z(),
                      Q("div", l4, [
                        (Z(!0),
                        Q(
                          ge,
                          null,
                          Ne(
                            t.project.tags,
                            (r) => (Z(), Q("span", a4, be(r), 1))
                          ),
                          256
                        )),
                      ]))
                    : rt("", !0),
                ]),
              ]),
            ]),
            _: 1,
          },
          8,
          ["href"]
        )
      );
    },
  },
  f4 = { style: { "overflow-x": "hidden" } },
  p4 = { class: "header" },
  h4 = { class: "container header__inner" },
  d4 = { class: "header__left" },
  g4 = { class: "header__photo" },
  m4 = { class: "header__content hor-center" },
  _4 = { class: "key-value" },
  b4 = ["href"],
  v4 = { class: "header__information" },
  x4 = { class: "fancy condensed" },
  k4 = { key: 0, class: "section", id: "about" },
  y4 = { class: "container small" },
  C4 = { class: "line-left" },
  w4 = { class: "text-container" },
  A4 = { key: 1, class: "section bg-dark" },
  E4 = { class: "container" },
  S4 = { class: "line-left" },
  D4 = { class: "row row-1 row-md-2 row-lg-3" },
  q4 = { class: "col" },
  T4 = { key: 2, class: "section bg-dark" },
  F4 = { class: "container no-padding" },
  R4 = { class: "section-title" },
  L4 = { class: "timeline" },
  I4 = { class: "timeline__items" },
  z4 = { class: "timeline__item" },
  P4 = { class: "timeline__item__header" },
  M4 = { class: "timeline__item__title" },
  N4 = { class: "timeline__item__date" },
  O4 = { class: "timeline__item__content" },
  B4 = { key: 3, class: "section" },
  $4 = { class: "container" },
  j4 = { class: "row" },
  U4 = { id: "skills", class: "stretch" },
  V4 = { class: "line-left" },
  H4 = { class: "skills-container" },
  G4 = { class: "skill-table" },
  W4 = { class: "skill-table__title" },
  Z4 = { class: "skill-table__content" },
  K4 = { class: "skill-table__row" },
  J4 = ["value"],
  Y4 = { class: "fa fa-star" },
  Q4 = { class: "suffix" },
  X4 = { class: "small" },
  eH = { id: "qualities" },
  tH = { class: "line-right" },
  nH = { class: "qualities" },
  rH = { class: "qualities__row" },
  oH = { id: "interests" },
  sH = { class: "line-right" },
  cH = { class: "interests-container" },
  iH = { class: "marked" },
  lH = { class: "bg-dark" },
  aH = { class: "container" },
  uH = {
    __name: "App",
    setup(t) {
      return (e, n) => (
        Z(),
        Q("div", f4, [
          N("header", p4, [
            N("div", h4, [
              N("div", d4, [
                N("picture", g4, [
                  we(Rc, { src: "jossafossa.jpg", alt: "Joost Hobma" }),
                ]),
                N("div", m4, [
                  N("h1", null, be(Je(Dt).name), 1),
                  N("div", _4, [
                    N("div", null, be(Je(Dt).linksLabel), 1),
                    (Z(!0),
                    Q(
                      ge,
                      null,
                      Ne(
                        Je(Dt).links,
                        (r) => (
                          Z(),
                          Q(
                            "a",
                            { href: r.url, class: "marked" },
                            be(r.label),
                            9,
                            b4
                          )
                        )
                      ),
                      256
                    )),
                  ]),
                ]),
              ]),
              N("div", v4, [
                N("table", x4, [
                  (Z(!0),
                  Q(
                    ge,
                    null,
                    Ne(
                      Je(Dt).contactInfo,
                      (r) => (
                        Z(),
                        Q("tr", null, [
                          N("td", null, be(r.label), 1),
                          N("td", null, be(r.value), 1),
                        ])
                      )
                    ),
                    256
                  )),
                ]),
              ]),
            ]),
          ]),
          (Z(!0),
          Q(
            ge,
            null,
            Ne(
              Je(Dt).sections,
              (r) => (
                Z(),
                Q(
                  ge,
                  null,
                  [
                    r.type === "content"
                      ? (Z(),
                        Q("section", k4, [
                          N("div", y4, [
                            N("h1", C4, be(r.title), 1),
                            N("div", w4, [
                              we(Je(Fc), { source: r.content }, null, 8, [
                                "source",
                              ]),
                            ]),
                          ]),
                        ]))
                      : rt("", !0),
                    r.type === "projects"
                      ? (Z(),
                        Q("section", A4, [
                          N("div", E4, [
                            N("h1", S4, be(r.title), 1),
                            N("div", D4, [
                              (Z(!0),
                              Q(
                                ge,
                                null,
                                Ne(
                                  r.projects,
                                  (o) => (
                                    Z(),
                                    Q("div", q4, [
                                      we(u4, { project: o }, null, 8, [
                                        "project",
                                      ]),
                                    ])
                                  )
                                ),
                                256
                              )),
                            ]),
                          ]),
                        ]))
                      : rt("", !0),
                    r.type === "educations"
                      ? (Z(),
                        Q("section", T4, [
                          N("div", F4, [
                            N("h1", R4, be(r.title), 1),
                            N("div", L4, [
                              N("div", I4, [
                                (Z(!0),
                                Q(
                                  ge,
                                  null,
                                  Ne(
                                    r.educations,
                                    (o) => (
                                      Z(),
                                      Q("div", z4, [
                                        N("header", P4, [
                                          N("div", M4, be(o.title), 1),
                                          N("div", N4, be(o.time), 1),
                                        ]),
                                        N("table", O4, [
                                          (Z(!0),
                                          Q(
                                            ge,
                                            null,
                                            Ne(
                                              o.attributes,
                                              (s, c) => (
                                                Z(),
                                                Q("tr", null, [
                                                  N("td", null, be(c), 1),
                                                  N("td", null, be(s), 1),
                                                ])
                                              )
                                            ),
                                            256
                                          )),
                                        ]),
                                      ])
                                    )
                                  ),
                                  256
                                )),
                              ]),
                            ]),
                          ]),
                        ]))
                      : rt("", !0),
                    r.type === "attributes"
                      ? (Z(),
                        Q("section", B4, [
                          N("div", $4, [
                            N("div", j4, [
                              N("div", U4, [
                                N("h1", V4, be(r.skills.title), 1),
                                N("div", H4, [
                                  (Z(!0),
                                  Q(
                                    ge,
                                    null,
                                    Ne(
                                      r.skills.skills,
                                      (o) => (
                                        Z(),
                                        Q("div", G4, [
                                          N("div", W4, be(o.title), 1),
                                          N("div", Z4, [
                                            (Z(!0),
                                            Q(
                                              ge,
                                              null,
                                              Ne(
                                                o.items,
                                                (s) => (
                                                  Z(),
                                                  Q("div", K4, [
                                                    N(
                                                      "div",
                                                      null,
                                                      be(s.label),
                                                      1
                                                    ),
                                                    N(
                                                      "div",
                                                      {
                                                        value: s.rating,
                                                        class: "rating",
                                                      },
                                                      [
                                                        (Z(!0),
                                                        Q(
                                                          ge,
                                                          null,
                                                          Ne(
                                                            s.rating,
                                                            (c) => (
                                                              Z(), Q("i", Y4)
                                                            )
                                                          ),
                                                          256
                                                        )),
                                                      ],
                                                      8,
                                                      J4
                                                    ),
                                                    N(
                                                      "div",
                                                      Q4,
                                                      be(s.suffix),
                                                      1
                                                    ),
                                                  ])
                                                )
                                              ),
                                              256
                                            )),
                                          ]),
                                        ])
                                      )
                                    ),
                                    256
                                  )),
                                ]),
                              ]),
                              N("div", X4, [
                                N("div", eH, [
                                  N("h1", tH, be(r.qualities.title), 1),
                                  N("div", nH, [
                                    (Z(!0),
                                    Q(
                                      ge,
                                      null,
                                      Ne(
                                        r.qualities.items,
                                        (o) => (
                                          Z(),
                                          Q("div", rH, [
                                            N(
                                              "i",
                                              { class: Yt(["fa", o.icon]) },
                                              null,
                                              2
                                            ),
                                            N("div", null, be(o.label), 1),
                                          ])
                                        )
                                      ),
                                      256
                                    )),
                                  ]),
                                ]),
                                N("div", oH, [
                                  N("h1", sH, be(r.interests.title), 1),
                                  N("div", cH, [
                                    (Z(!0),
                                    Q(
                                      ge,
                                      null,
                                      Ne(
                                        r.interests.items,
                                        (o) => (
                                          Z(),
                                          Q("div", iH, [
                                            o.icon
                                              ? (Z(),
                                                Q(
                                                  "i",
                                                  {
                                                    key: 0,
                                                    class: Yt(["fa", o.icon]),
                                                  },
                                                  null,
                                                  2
                                                ))
                                              : rt("", !0),
                                            dc(" " + be(o.label), 1),
                                          ])
                                        )
                                      ),
                                      256
                                    )),
                                  ]),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]))
                      : rt("", !0),
                  ],
                  64
                )
              )
            ),
            256
          )),
          N("footer", lH, [
            N("div", aH, [N("p", null, be(Je(Dt).footer.label), 1)]),
          ]),
        ])
      );
    },
  };
Xl(uH).mount("#app");
