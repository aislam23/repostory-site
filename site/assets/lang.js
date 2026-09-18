/*
 * Repostory — переключатель языка (RU/EN).
 * Без JS видна русская версия (размётка по умолчанию), она полностью читаема.
 * С JS выбор языка запоминается в localStorage и применяется при следующем визите.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "repostory_lang";

  function getStoredLang() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* приватный режим / доступ запрещён — просто не запоминаем выбор */
    }
  }

  function applyLang(lang) {
    if (lang !== "ru" && lang !== "en") {
      lang = "ru";
    }

    document.documentElement.setAttribute("lang", lang);

    var blocks = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      block.hidden = block.getAttribute("data-lang") !== lang;
    }

    var buttons = document.querySelectorAll(".lang-btn");
    for (var j = 0; j < buttons.length; j++) {
      var btn = buttons[j];
      var isActive = btn.getAttribute("data-set-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  function init() {
    var stored = getStoredLang();
    if (stored) {
      applyLang(stored);
    } else {
      applyLang("ru");
    }

    var buttons = document.querySelectorAll(".lang-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var lang = this.getAttribute("data-set-lang");
        storeLang(lang);
        applyLang(lang);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
