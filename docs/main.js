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
    var quickNav = document.querySelector(".quick-nav");
    var links = Array.prototype.slice.call(document.querySelectorAll(".quick-nav__link"));
    var items = links.map(function (link) {
      var target = document.querySelector(link.getAttribute("href"));
      return target ? { link: link, target: target } : null;
    }).filter(Boolean);

    if (!items.length) return;

    var ticking = false;
    var activeLink = null;

    function keepCurrentLinkVisible(link) {
      if (window.innerWidth >= 1760) return;

      var list = link.closest(".quick-nav__list");
      if (!list) return;

      var listRect = list.getBoundingClientRect();
      var linkRect = link.getBoundingClientRect();
      var nextLeft = list.scrollLeft;

      if (linkRect.left < listRect.left || linkRect.right > listRect.right) {
        nextLeft += linkRect.left - listRect.left;
      }

      if (nextLeft !== list.scrollLeft) {
        list.scrollTo({
          left: Math.max(0, nextLeft),
          behavior: "auto"
        });
      }
    }

    function update() {
      // When the quick navigation is not sticky (short viewports), measure
      // from just under the header instead of from the bottom of the menu.
      var sticky = quickNav && window.getComputedStyle(quickNav).position !== "static";
      var marker = window.innerWidth >= 1760 || !sticky
        ? 100
        : Math.ceil(quickNav.getBoundingClientRect().bottom + 16);
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

  /* -----------------------------------------------------------------------
     A link to the collapsed setup details (or to a step inside them) opens
     the <details> first, so the target is visible when the page scrolls.
     ----------------------------------------------------------------------- */
  function wireDisclosureLinks() {
    function openForHash() {
      var id = window.location.hash.slice(1);
      if (!id) return;

      var target;
      try { target = document.getElementById(decodeURIComponent(id)); } catch (e) { return; }
      if (!target) return;

      var details = target.closest("details");
      if (!details || details.open) return;

      details.open = true;
      target.scrollIntoView({ block: "start" });
    }

    window.addEventListener("hashchange", openForHash);
    openForHash();
  }

  /* -----------------------------------------------------------------------
     FAQ: "Expand all" / "Collapse all". The buttons stay hidden without
     JavaScript; each question still opens on its own.
     ----------------------------------------------------------------------- */
  function wireFaqToggles() {
    var tools = document.querySelector(".faq-tools");
    if (!tools) return;

    var items = Array.prototype.slice.call(document.querySelectorAll("details.faq"));
    if (!items.length) return;

    tools.hidden = false;
    tools.addEventListener("click", function (event) {
      var button = event.target.closest("[data-faq-toggle]");
      if (!button) return;
      var open = button.getAttribute("data-faq-toggle") === "open";
      items.forEach(function (item) { item.open = open; });
    });
  }

  /* -----------------------------------------------------------------------
     Print: open every collapsed <details> (FAQ answers, setup details) so
     the printout has the content, then restore what was closed.
     ----------------------------------------------------------------------- */
  function wirePrint() {
    var opened = [];
    window.addEventListener("beforeprint", function () {
      opened = Array.prototype.slice.call(document.querySelectorAll("details:not([open])"));
      opened.forEach(function (item) { item.open = true; });
    });
    window.addEventListener("afterprint", function () {
      opened.forEach(function (item) { item.open = false; });
      opened = [];
    });
  }

  wireScrollReveal();
  wireStickyHeader();
  wireQuickNav();
  wireDisclosureLinks();
  wireFaqToggles();
  wirePrint();
})();
