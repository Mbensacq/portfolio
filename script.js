document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. CHARGEMENT DYNAMIQUE DES PROJETS (JSON)
  // ==========================================
  const container = document.getElementById("liste-projets");

  // On vérifie que le conteneur existe avant de lancer le fetch (pour éviter les erreurs)
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
          // Création de la carte
          const card = document.createElement("div");
          card.classList.add("card");

          // Remplissage du contenu
          card.innerHTML = `
                        <img src="${projet.image}" alt="${projet.titre}">
                        <h3>${projet.titre}</h3>
                        <p>${projet.description}</p>
                        <a href="${projet.lien}" target="_blank" style="color: #4CAF50; display:block; margin-top:10px;">Voir le projet &rarr;</a>
                    `;

          // Ajout à la grille
          container.appendChild(card);
        });
      })
      .catch((error) => console.error("Erreur:", error));
  }

  // ==========================================
  // 2. MENU BURGER (MOBILE)
  // ==========================================
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  if (burger) {
    burger.addEventListener("click", () => {
      // Basculer l'affichage du menu
      nav.classList.toggle("nav-active");

      // Animation des liens (effet cascade)
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });

      // Animation de l'icône burger (croix)
      burger.classList.toggle("toggle");
    });
  }

  // ==========================================
  // 3. ANIMATION AU SCROLL (REVEAL)
  // ==========================================

  // On sélectionne tous les éléments avec la classe 'reveal'
  const revealElements = document.querySelectorAll(".reveal");

  // On vérifie dans la console si le script les a trouvés
  console.log(
    `Animation : ${revealElements.length} éléments trouvés à animer.`
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // Si l'élément entre dans l'écran
        if (entry.isIntersecting) {
          // On ajoute la classe CSS 'active'
          entry.target.classList.add("active");
          // On arrête de l'observer (l'animation ne se joue qu'une fois)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      // Threshold 0.15 = L'animation se lance quand 15% de l'élément est visible
      threshold: 0.15,
    }
  );

  // On active l'observateur sur chaque section
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
});
