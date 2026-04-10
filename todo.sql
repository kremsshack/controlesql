CREATE DATABASE todoo_app;
USE todoo_app;

CREATE TABLE taches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  statut VARCHAR(50),
  priorite VARCHAR(50),
  date_limite DATE,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO taches (titre, description, statut, priorite, date_limite) VALUES
('Faire les courses', 'Acheter du pain et du lait', 'a_faire', 'normale', '2025-06-01');

INSERT INTO taches (titre, description, statut, priorite, date_limite) VALUES
('Réviser le contrôle', 'Réviser les chapitres 3 et 4', 'en_cours', 'haute', '2025-06-10');

INSERT INTO taches (titre, description, statut, priorite, date_limite) VALUES
('Appeler le médecin', 'Prendre un rendez-vous', 'termine', 'urgente', '2025-05-28');

SELECT * FROM taches;

UPDATE taches SET statut = 'termine' WHERE id = 1;

DELETE FROM taches WHERE id = 3;

SELECT * FROM taches ORDER BY priorite;