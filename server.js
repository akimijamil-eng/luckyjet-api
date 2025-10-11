// Importer les dépendances nécessaires
const express = require('express');
const cors = require('cors');

// Créer l'application Express
const app = express();
// L'API écoutera sur le port fourni par Render, ou sur le port 3000 si on la lance localement
const PORT = process.env.PORT || 3000;

// Utiliser le middleware CORS pour autoriser les requêtes depuis votre jeu
app.use(cors());

/**
 * Fonction qui génère une cote de crash aléatoire.
 */
function generateCrashValue() {
  const r = Math.random();
  let crashPoint;

  if (r < 0.80) { // 80% de chance
    crashPoint = 1.20 + Math.random() * 1.80;
  } else if (r < 0.98) { // 18% de chance
    crashPoint = 3.00 + Math.random() * 12.0;
  } else { // 2% de chance
    crashPoint = 20 + Math.random() * 280;
  }
  
  // On retourne la valeur avec 2 décimales
  return parseFloat(crashPoint.toFixed(2));
}

// Définir le "endpoint" (l'URL) de notre API
app.get('/get-crash-value', (req, res) => {
  const crashValue = generateCrashValue();
  
  // On répond en format JSON avec la valeur générée
  console.log(`Nouvelle cote générée : x${crashValue}`);
  res.json({ crashPoint: crashValue });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 L'API de LuckyJet est démarrée sur le port ${PORT}`);
});