const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/* ================================
   1️⃣ Schéma & Modèle User
================================ */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Number, enum: [0, 1], default: 0 }, // 0 = user, 1 = admin
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

console.log("🚀 Script lancé");

/* ================================
   2️⃣ URI MongoDB
================================ */
const MONGODB_URI =
  process.env.MONGODB_URI;

/* ================================
   3️⃣ Fonction principale
================================ */
async function main() {
  const type = process.argv[2]; // admin | user

  if (!type) {
    console.log("❌ Tu dois préciser le type : admin ou user");
    console.log("Exemples :");
    console.log("node scripts/create-user.js admin");
    console.log("node scripts/create-user.js user");
    process.exit(1);
  }

  try {
    // ✅ UNE seule connexion
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connecté à MongoDB");

    const hashedPassword = await bcrypt.hash("123456", 10);

    if (type === "admin") {
      const admin = await User.create({
        username: "admin",
        password: hashedPassword,
        admin: 1,
      });

      console.log("👑 Admin créé avec ID :", admin._id);
    } else if (type === "user") {
      const user = await User.create({
        username: "amira",
        password: hashedPassword,
        admin: 0,
      });

      console.log("👤 User créé avec ID :", user._id);
    } else {
      console.log("❌ Type invalide :", type);
    }
  } catch (err) {
    console.error("❌ Erreur :", err.message);
  } finally {
    // ✅ UNE seule déconnexion
    await mongoose.disconnect();
    console.log("🔌 Déconnecté de MongoDB");
  }
}

/* ================================
   4️⃣ Lancement
================================ */
main();
