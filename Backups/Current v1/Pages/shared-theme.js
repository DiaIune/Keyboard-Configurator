(function () {
  const storagePrefix = "keyboardConfigurator.";
  const themeCorrections = {
    motif: {
      "--cream": "#f0dfcf", "--paper": "#fff4e8", "--oat": "#171717", "--sand": "#f2bd24", "--ink": "#211915", "--muted": "#6b5146", "--label": "#35251f", "--link": "#0f6fb8", "--chip-text": "#35251f",
      "--line": "rgba(45, 28, 22, .25)", "--surface": "rgba(255, 241, 228, .9)", "--surface-soft": "rgba(255, 248, 238, .82)", "--surface-card": "rgba(250, 234, 220, .78)", "--surface-warm": "rgba(242, 189, 36, .34)", "--surface-chip": "rgba(20, 20, 20, .08)", "--control-bg": "#fff4e8", "--control-ink": "#211915", "--control-border": "rgba(21, 88, 63, .34)", "--select-arrow": "#0f6fb8", "--image-frame": "#151515", "--layout-frame": "#f0dfcf",
      "--wash-1": "rgba(242, 189, 36, .38)", "--wash-2": "rgba(12, 12, 12, .14)", "--motif-1": "radial-gradient(circle, rgba(160, 7, 16, .34) 0 2px, transparent 2.5px), radial-gradient(circle, rgba(15, 111, 184, .32) 0 2px, transparent 2.5px), radial-gradient(circle, rgba(21, 88, 63, .3) 0 2px, transparent 2.5px), linear-gradient(90deg, rgba(21, 88, 63, .24) 0 10%, transparent 10% 18%, rgba(220, 44, 43, .28) 18% 27%, transparent 27% 39%, rgba(242, 189, 36, .3) 39% 51%, transparent 51% 62%, rgba(15, 111, 184, .24) 62% 72%, transparent 72% 82%, rgba(223, 106, 167, .24) 82% 91%, transparent 91% 100%)", "--motif-2": "radial-gradient(circle at 82% 24%, rgba(242, 189, 36, .3) 0 96px, transparent 97px), radial-gradient(circle at 18% 76%, rgba(21, 88, 63, .22) 0 102px, transparent 103px), linear-gradient(128deg, transparent 0 54%, rgba(20, 20, 20, .16) 54% 60%, transparent 60% 100%)", "--motif-size-1": "48px 48px, 56px 56px, 64px 64px, auto", "--motif-size-2": "auto", "--red": "#dc2c2b", "--yellow": "#f2bd24", "--green": "#15583f", "--blue": "#0f6fb8", "--violet": "#df6aa7", "--shadow": "0 22px 60px rgba(60, 38, 30, .17)"
    },
    nervewrecker: {
      "--cream": "#272c27", "--paper": "#c7c8c2", "--oat": "#3a3d39", "--sand": "#d7ee38", "--ink": "#eef1e9", "--muted": "#c7d1b3", "--label": "#eef5c5", "--link": "#d7ee38", "--chip-text": "#eef1e9",
      "--line": "rgba(218, 238, 75, .3)", "--surface": "rgba(37, 42, 37, .9)", "--surface-soft": "rgba(52, 57, 51, .82)", "--surface-card": "rgba(43, 48, 43, .78)", "--surface-warm": "rgba(55, 33, 92, .68)", "--surface-chip": "rgba(58, 61, 57, .84)", "--control-bg": "#c7c8c2", "--control-ink": "#221a34", "--control-border": "rgba(215, 238, 56, .4)", "--select-arrow": "#37215c", "--image-frame": "#11130f", "--layout-frame": "#3a3d39",
      "--wash-1": "rgba(215, 238, 56, .34)", "--wash-2": "rgba(64, 34, 115, .34)", "--motif-1": "linear-gradient(90deg, rgba(199, 200, 194, .12) 0 16%, transparent 16% 30%, rgba(215, 238, 56, .24) 30% 42%, transparent 42% 58%, rgba(64, 34, 115, .3) 58% 72%, transparent 72% 100%), radial-gradient(circle at 18% 22%, rgba(215, 238, 56, .28) 0 86px, transparent 87px), radial-gradient(circle at 84% 78%, rgba(64, 34, 115, .32) 0 100px, transparent 101px)", "--motif-2": "linear-gradient(118deg, transparent 0 18%, rgba(215, 238, 56, .24) 18% 21%, transparent 21% 62%, rgba(67, 38, 107, .28) 62% 66%, transparent 66% 100%)", "--motif-size-1": "auto", "--motif-size-2": "auto", "--red": "#5f3a94", "--yellow": "#d7ee38", "--green": "#9dac1d", "--blue": "#c7c8c2", "--violet": "#37215c", "--shadow": "0 22px 60px rgba(9, 13, 8, .34)"
    }
  };

  function applyVars(vars) {
    Object.entries(vars).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  }

  function applyStoredTheme() {
    try {
      const saved = localStorage.getItem(storagePrefix + "themeVars");
      if (saved) applyVars(JSON.parse(saved));
      const themeName = localStorage.getItem(storagePrefix + "themeName");
      if (themeName && themeCorrections[themeName]) applyVars(themeCorrections[themeName]);
    } catch (error) {}
  }

  function currentPageName() {
    const path = window.location.pathname.replace(/\\/g, "/").toLowerCase();
    return path.substring(path.lastIndexOf("/") + 1) || "index.html";
  }

  function enhanceHeaderLinks(topbar) {
    const pageName = currentPageName();
    topbar?.querySelectorAll(".nav a, .brand a").forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href.toLowerCase().endsWith(pageName)) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function enhancePage() {
    document.body.classList.add("reference-shell");
    const topbar = document.querySelector("main.page .topbar");
    enhanceHeaderLinks(topbar);
  }

  applyStoredTheme();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhancePage);
  } else {
    enhancePage();
  }
})();
