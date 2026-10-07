/* =========================================================================
   Agent Review Program — minimal progressive enhancement.
   Nothing here is required for the page to be readable or navigable.
   ========================================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------------------
     Screenshot placeholders.

     Each <figure class="shot"> ships with a designed mock of the panel and a
     real <img> pointing at its final path. CSS keeps the image at opacity 0
     (not display:none, so loading="lazy" still fires) with the mock on top.
     When a real file is dropped into docs/assets/ the image loads, we add
     .shot--live, and the mock is replaced automatically — no markup change.

     With JavaScript unavailable the mock simply stays, which is the correct
     fallback while the assets are still missing.
     ----------------------------------------------------------------------- */
  function revealLoadedScreenshots() {
    document.querySelectorAll(".shot").forEach(function (figure) {
      var img = figure.querySelector(".shot__img");
      if (!img) return;

      function reveal() {
        if (img.naturalWidth > 0) figure.classList.add("shot--live");
      }

      if (img.complete) {
        reveal();
      } else {
        img.addEventListener("load", reveal, { once: true });
      }
    });
  }

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
     Compact <details> menu: close on selection, outside click, or Escape.
     The menu works without this — it is only dismissal polish.
     ----------------------------------------------------------------------- */
  function wireCompactMenu() {
    var menu = document.querySelector(".menu");
    if (!menu) return;

    function close() {
      menu.removeAttribute("open");
    }

    menu.addEventListener("click", function (event) {
      if (event.target.closest(".menu__panel a")) close();
    });

    document.addEventListener("click", function (event) {
      if (menu.hasAttribute("open") && !menu.contains(event.target)) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !menu.hasAttribute("open")) return;
      close();
      var summary = menu.querySelector("summary");
      if (summary) summary.focus();
    });
  }

  revealLoadedScreenshots();
  wireScrollReveal();
  wireStickyHeader();
  wireCompactMenu();
})();
