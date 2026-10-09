// scripts/testConnection.js
const mongoose = require("mongoose");

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // défini dans .env.local
    console.log("✅ Connexion à MongoDB réussie !");
    await mongoose.disconnect();
    console.log("🔌 Déconnecté de MongoDB");
  } catch (err) {
    console.error("❌ Erreur de connexion :", err.message);
  }
}

testConnection();
