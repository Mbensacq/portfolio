/* =============================================================
   script.js — i18n, thème, rendu dynamique, interactions
   Dépend de content.js (I18N, STATS, SKILLS, EXPERIENCE,
   EDUCATION, PROJECTS, LINKS).
   ============================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  let currentLang = root.getAttribute("lang") === "en" ? "en" : "fr";

  /* ---------- Helpers ---------- */
  // Résout une clé pointée ("hero.role") dans un objet.
  function resolve(obj, path) {
    return path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
  }
  function t(path) {
    const v = resolve(I18N[currentLang], path);
    return v == null ? "" : v;
  }

  /* ---------- Application des traductions (chrome statique) ---------- */
  function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.getAttribute("data-i18n-attr")
        .split(";")
        .forEach((pair) => {
          const idx = pair.indexOf(":");
          if (idx === -1) return;
          const attr = pair.slice(0, idx).trim();
          const key = pair.slice(idx + 1).trim();
          el.setAttribute(attr, t(key));
        });
    });

    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));

    root.setAttribute("lang", currentLang);
    const langLabel = document.querySelector("#lang-toggle .lang-current");
    if (langLabel) langLabel.textContent = currentLang === "fr" ? "EN" : "FR";
  }

  /* ---------- Rendu dynamique ---------- */
  function svgIcon(id, cls) {
    return `<svg class="${cls || "ico"}" aria-hidden="true"><use href="#icon-${id}"></use></svg>`;
  }

  function renderStats() {
    const el = document.getElementById("hero-stats");
    if (!el) return;
    el.innerHTML = STATS.map(
      (s) => `
      <li>
        <span class="stat-value grad">${s.value}</span>
        <span class="stat-label">${t("stats." + s.key)}</span>
      </li>`
    ).join("");
  }

  function renderSkills() {
    const el = document.getElementById("skills-grid");
    if (!el) return;
    el.innerHTML = SKILLS.map(
      (s) => `
      <article class="skill-card">
        <div class="skill-head">
          <span class="skill-icon">${svgIcon(s.icon)}</span>
          <h3>${s[currentLang]}</h3>
        </div>
        <div class="chips">
          ${s.items.map((i) => `<span class="chip">${i}</span>`).join("")}
        </div>
      </article>`
    ).join("");
  }

  function renderExperience() {
    const el = document.getElementById("experience-list");
    if (!el) return;
    el.innerHTML = EXPERIENCE.map((e) => {
      const d = e[currentLang];
      const metric = e.metricValue
        ? `<div class="tl-metric">
             <span class="m-value">${e.metricValue}</span>
             <span class="m-label">${d.metric}</span>
           </div>`
        : "";
      const demo = e.demo
        ? `<a class="tl-link" href="${e.demo}" target="_blank" rel="noopener">
             <span>${t("journey.seeLive")}</span>${svgIcon("external")}
           </a>`
        : "";
      return `
        <div class="tl-item">
          <div class="tl-top">
            <span class="tl-role">${d.role}</span>
            <span class="tl-period">${d.type} · ${d.period}</span>
          </div>
          <p class="tl-org">${e.org} <span class="tl-place">· ${d.place}</span></p>
          ${metric}
          <ul class="tl-points">${d.points.map((p) => `<li>${p}</li>`).join("")}</ul>
          ${demo}
        </div>`;
    }).join("");
  }

  function renderEducation() {
    const el = document.getElementById("education-list");
    if (!el) return;
    el.innerHTML = EDUCATION.map((e) => {
      const d = e[currentLang];
      return `
        <div class="tl-item">
          <div class="tl-top">
            <span class="tl-role">${d.title}</span>
            <span class="tl-period">${d.period}</span>
          </div>
          <p class="tl-org">${d.org}</p>
          <p class="tl-note">${d.note}</p>
        </div>`;
    }).join("");
  }

  function renderProjects() {
    const el = document.getElementById("projects-grid");
    if (!el) return;
    el.innerHTML = PROJECTS.map((p) => {
      const d = p[currentLang];
      const links = [];
      if (p.repo && !p.isPrivate) {
        links.push(
          `<a class="project-link" href="${p.repo}" target="_blank" rel="noopener">${svgIcon("github")}<span>${t("projects.repo")}</span></a>`
        );
      }
      if (p.isPrivate) {
        links.push(
          `<span class="project-link muted">${svgIcon("lock")}<span>${t("projects.private")}</span></span>`
        );
      }
      if (p.demo) {
        links.push(
          `<a class="project-link" href="${p.demo}" target="_blank" rel="noopener">${svgIcon("external")}<span>${t("projects.demo")}</span></a>`
        );
      }
      const linksHTML = links.length
        ? `<div class="project-links">${links.join("")}</div>`
        : "";
      return `
        <article class="project-card${p.featured ? " featured" : ""}">
          <div class="project-top">
            <span class="status-badge is-${p.status}">${t("status." + p.status)}</span>
          </div>
          <h3 class="project-title">${d.name}</h3>
          <p class="project-blurb">${d.blurb}</p>
          <div class="project-tech">
            ${p.tech.map((tech) => `<span class="chip">${tech}</span>`).join("")}
          </div>
          ${linksHTML}
        </article>`;
    }).join("");
  }

  function renderDynamic() {
    renderStats();
    renderSkills();
    renderExperience();
    renderEducation();
    renderProjects();
  }

  /* ---------- Langue ---------- */
  function setLang(lang) {
    currentLang = lang === "en" ? "en" : "fr";
    try {
      localStorage.setItem("lang", currentLang);
    } catch (e) {}
    applyI18n();
    renderDynamic();
  }

  /* ---------- Thème ---------- */
  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }

  /* ---------- Révélation au scroll ---------- */
  function initReveal() {
    ["skills-grid", "projects-grid"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.add("reveal");
    });

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- Scrollspy (nav active) ---------- */
  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(document.querySelectorAll(".primary-nav a"));
    const byId = {};
    links.forEach((a) => {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    const sections = ["about", "skills", "journey", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((a) => a.removeAttribute("aria-current"));
            const a = byId[e.target.id];
            if (a) a.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Header + bouton "haut de page" ---------- */
  function initScrollUI() {
    const header = document.querySelector(".site-header");
    const toTop = document.querySelector(".to-top");
    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("scrolled", y > 8);
      if (toTop) toTop.classList.toggle("visible", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Navigation mobile ---------- */
  function initMobileNav() {
    const burger = document.getElementById("nav-burger");
    if (!burger) return;
    const close = () => {
      document.body.classList.remove("nav-open");
      burger.setAttribute("aria-expanded", "false");
    };
    burger.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".primary-nav a").forEach((a) => {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Init ---------- */
  function init() {
    applyI18n();
    renderDynamic();
    initReveal();
    initScrollSpy();
    initScrollUI();
    initMobileNav();

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }
    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        setLang(currentLang === "fr" ? "en" : "fr");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
