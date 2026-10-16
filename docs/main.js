/* =========================================================================
   Agent Review Program — minimal progressive enhancement.
   Nothing here is required for the page to be readable or navigable.
   ========================================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------------------
     Scroll reveal. Elements carrying [data-reveal] are hidden by CSS only
     while the .js class is present, so a no-JS visitor sees everything.
     Reduced-motion visitors get the content revealed immediately.

     This checks live geometry on a rAF-throttled scroll rather than using
     IntersectionObserver: a fast flick-scroll can move past several elements
     between observer samples and leave them permanently hidden, whereas
     re-reading position each frame reveals anything at or above the fold.
     ----------------------------------------------------------------------- */
  function wireScrollReveal() {
    var targets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!targets.length) return;

    function showAll() {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      targets = [];
    }

    if (reduceMotion) {
      showAll();
      return;
    }

    var ticking = false;

    function check() {
      ticking = false;
      var limit = window.innerHeight - 40;

      targets = targets.filter(function (el) {
        if (el.getBoundingClientRect().top >= limit) return true;
        el.classList.add("is-visible");
        return false;
      });

      if (!targets.length) {
        window.removeEventListener("scroll", request);
        window.removeEventListener("resize", request);
      }
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(check);
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    window.addEventListener("load", request);
    check();
  }

  /* -----------------------------------------------------------------------
     Sticky header picks up a hairline and shadow once the page scrolls.
     ----------------------------------------------------------------------- */
  function wireStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var ticking = false;
    function update() {
      header.classList.toggle("is-stuck", window.scrollY > 8);
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* -----------------------------------------------------------------------
     Quick navigation highlights the section nearest the top of the page.
     The links themselves are normal anchors and work without JavaScript.
     ----------------------------------------------------------------------- */
  function wireQuickNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".quick-nav__link"));
    var items = links.map(function (link) {
      var target = document.querySelector(link.getAttribute("href"));
      return target ? { link: link, target: target } : null;
    }).filter(Boolean);

    if (!items.length) return;

    var ticking = false;
    var activeLink = null;

    function keepCurrentLinkVisible(link) {
      if (window.innerWidth >= 1440) return;

      var list = link.closest(".quick-nav__list");
      if (!list) return;

      var left = link.offsetLeft;
      var right = left + link.offsetWidth;
      var visibleLeft = list.scrollLeft;
      var visibleRight = visibleLeft + list.clientWidth;

      if (left < visibleLeft || right > visibleRight) {
        list.scrollTo({
          left: Math.max(0, left - 12),
          behavior: reduceMotion ? "auto" : "smooth"
        });
      }
    }

    function update() {
      var marker = window.innerWidth >= 1440 ? 100 : 125;
      var current = items[0];

      items.forEach(function (item) {
        if (item.target.getBoundingClientRect().top <= marker) current = item;
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = items[items.length - 1];
      }

      items.forEach(function (item) {
        if (item === current) {
          item.link.setAttribute("aria-current", "location");
        } else {
          item.link.removeAttribute("aria-current");
        }
      });

      if (current.link !== activeLink) {
        activeLink = current.link;
        keepCurrentLinkVisible(activeLink);
      }

      ticking = false;
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    window.addEventListener("hashchange", request);
    update();
  }

  wireScrollReveal();
  wireStickyHeader();
  wireQuickNav();
})();
