<?php
require 'connexion.php';

// ── Ajouter une tâche ──
if (isset($_POST['ajouter'])) {
    $titre       = $_POST['titre'];
    $description = $_POST['description'];
    $statut      = $_POST['statut'];
    $priorite    = $_POST['priorite'];
    $date_limite = $_POST['date_limite'];

    $req = $pdo->prepare("INSERT INTO taches (titre, description, statut, priorite, date_limite) VALUES (?, ?, ?, ?, ?)");
    $req->execute([$titre, $description, $statut, $priorite, $date_limite]);
}

// ── Supprimer une tâche ──
if (isset($_GET['supprimer'])) {
    $id = $_GET['supprimer'];

    $req = $pdo->prepare("DELETE FROM taches WHERE id = ?");
    $req->execute([$id]);
}

// ── Récupérer les tâches ──
$req = $pdo->query("SELECT * FROM taches ORDER BY date_creation DESC");
$taches = $req->fetchAll();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
  <h1>Todo App</h1>
</header>

<main>

  <!-- Formulaire -->
  <section id="formulaire">
    <h2>Ajouter une tâche</h2>

    <form method="POST" action="index.php">

      <div class="champ">
        <label for="titre">Titre *</label>
        <input type="text" id="titre" name="titre" required>
      </div>

      <div class="champ">
        <label for="description">Description</label>
        <textarea id="description" name="description"></textarea>
      </div>

      <div class="champ">
        <label for="statut">Statut</label>
        <select id="statut" name="statut">
          <option value="a_faire">À faire</option>
          <option value="en_cours">En cours</option>
          <option value="termine">Terminé</option>
        </select>
      </div>

      <div class="champ">
        <label for="priorite">Priorité</label>
        <select id="priorite" name="priorite">
          <option value="faible">Faible</option>
          <option value="normale">Normale</option>
          <option value="haute">Haute</option>
          <option value="urgente">Urgente</option>
        </select>
      </div>

      <div class="champ">
        <label for="date_limite">Date limite</label>
        <input type="date" id="date_limite" name="date_limite">
      </div>

      <button type="submit" name="ajouter">Ajouter</button>

    </form>
  </section>

  <!-- Liste -->
  <section id="liste">
    <h2>Liste des tâches</h2>

    <div id="taches">
      <?php if (count($taches) === 0): ?>
        <div id="vide">Aucune tâche.</div>
      <?php else: ?>
        <?php foreach ($taches as $t): ?>
          <article class="tache">
            <h3><?= htmlspecialchars($t['titre']) ?></h3>
            <p><?= htmlspecialchars($t['description']) ?></p>
            <div class="meta">
              <div><?= htmlspecialchars($t['statut']) ?></div>
              <div><?= htmlspecialchars($t['priorite']) ?></div>
              <div><?= htmlspecialchars($t['date_limite']) ?></div>
            </div>
            <div class="actions">
              <a href="index.php?supprimer=<?= $t['id'] ?>">
                <button class="supprimer">Supprimer</button>
              </a>
            </div>
          </article>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>

  </section>

</main>

</body>
</html>