let taches = [];
let nextId = 1;
let filtreCourant = "toutes";

function ajouterTache() {
  const titre = document.getElementById("titre").value.trim();
  const erreur = document.getElementById("erreur-titre");

  // Vérification titre non vide
  if (!titre) {
    erreur.style.display = "block";
    return;
  }
  erreur.style.display = "none";

  // Création de la tâche
  const tache = {
    id: nextId++,
    titre: titre,
    description: document.getElementById("description").value.trim(),
    statut: document.getElementById("statut").value,
    priorite: document.getElementById("priorite").value,
    date_limite: document.getElementById("date_limite").value,
  };

  taches.push(tache);

  // Reset du formulaire
  document.getElementById("titre").value = "";
  document.getElementById("description").value = "";
  document.getElementById("statut").value = "a_faire";
  document.getElementById("priorite").value = "normale";
  document.getElementById("date_limite").value = "";

  afficher();
}

function supprimer(id) {
  taches = taches.filter((t) => t.id !== id);
  afficher();
}

function ouvrirModif(id) {
  const t = taches.find((t) => t.id === id);

  document.getElementById("edit-id").value = t.id;
  document.getElementById("edit-titre").value = t.titre;
  document.getElementById("edit-description").value = t.description;
  document.getElementById("edit-statut").value = t.statut;
  document.getElementById("edit-priorite").value = t.priorite;
  document.getElementById("edit-date").value = t.date_limite;

  document.getElementById("modal").classList.add("ouvert");
}

function fermerModal() {
  document.getElementById("modal").classList.remove("ouvert");
}

function sauvegarder() {
  const titre = document.getElementById("edit-titre").value.trim();
  const erreur = document.getElementById("erreur-edit-titre");

  if (!titre) {
    erreur.style.display = "block";
    return;
  }
  erreur.style.display = "none";

  const id = parseInt(document.getElementById("edit-id").value);
  const idx = taches.findIndex((t) => t.id === id);

  taches[idx].titre = titre;
  taches[idx].description = document
    .getElementById("edit-description")
    .value.trim();
  taches[idx].statut = document.getElementById("edit-statut").value;
  taches[idx].priorite = document.getElementById("edit-priorite").value;
  taches[idx].date_limite = document.getElementById("edit-date").value;

  fermerModal();
  afficher();
}

function filtrer(btn) {
  document
    .querySelectorAll("#filtres button")
    .forEach((b) => b.classList.remove("actif"));
  btn.classList.add("actif");
  filtreCourant = btn.dataset.filtre;
  afficher();
}

function afficher() {
  const conteneur = document.getElementById("taches");

  const liste =
    filtreCourant === "toutes"
      ? taches
      : taches.filter((t) => t.statut === filtreCourant);

  if (liste.length === 0) {
    conteneur.innerHTML = '<div id="vide">Aucune tâche.</div>';
    return;
  }

  conteneur.innerHTML = "";

  for (let i = 0; i < liste.length; i++) {
    const t = liste[i];

    conteneur.innerHTML += `
      <article class="tache">
        <h3>${t.titre}</h3>
        <p>${t.description}</p>
        <div class="meta">
          <div>${t.statut}</div>
          <div>${t.priorite}</div>
          <div>${t.date_limite}</div>
        </div>
        <div class="actions">
          <button onclick="ouvrirModif(${t.id})">Modifier</button>
          <button class="supprimer" onclick="supprimer(${t.id})">Supprimer</button>
        </div>
      </article>
    `;
  }
}
