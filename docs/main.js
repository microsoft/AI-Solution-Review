/* =========================================================================
   Agent Review Program — minimal progressive enhancement.
   Nothing here is required for the page to be readable or navigable.
   ========================================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     Screenshot placeholders.

     Each <figure class="shot"> ships with a styled placeholder and a real
     <img> that CSS keeps hidden. When a real file is dropped into
     docs/assets/ the image loads, we add .shot--live, and the placeholder is
     replaced automatically — no markup change needed.

     If JavaScript is unavailable the placeholder simply stays visible, which
     is the correct fallback while the assets are still missing.
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
  wireCompactMenu();
})();
