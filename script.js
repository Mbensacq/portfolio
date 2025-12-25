document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("liste-projets");
  if (container) {
    fetch("data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossible de charger le fichier JSON");
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((projet) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <img src="${projet.image}" alt="${projet.titre}">
            <h3>${projet.titre}</h3>
            <p>${projet.description}</p>
            <a href="${projet.lien}" target="_blank" style="color: #4CAF50; display:block; margin-top:10px;">Voir le projet &rarr;</a>
          `;

          container.appendChild(card);
        });
      })
      .catch((error) => console.error("Erreur:", error));
  }
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  if (burger) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });
      burger.classList.toggle("toggle");
    });
  }
  const revealElements = document.querySelectorAll(".reveal");
  console.log(
    `Animation : ${revealElements.length} éléments trouvés à animer.`
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
    }
  );
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
});
