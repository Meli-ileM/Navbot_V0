import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// 1️⃣ Définition du Schéma
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Number, enum: [0, 1], default: 0 },
});

// Initialisation sécurisée du modèle
const User = mongoose.models.User || mongoose.model("User", userSchema);

// 2️⃣ URI MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("📡 Connexion MongoDB établie");
  } catch (err) {
    console.error("❌ Échec connexion MongoDB:", err);
  }
}

// 4️⃣ Route POST
export async function POST(request) {
  try {
    // AFFICHER LES DONNÉES REÇUES DU FRONT
    const userData = await request.json();
    console.log("📥 Données brutes reçues du Front-end :", userData);

    const { name, role } = userData;

    // Validation simple
    if (!name || !role) {
      console.log("⚠️ Validation échouée : Nom ou rôle manquant");
      return NextResponse.json(
        { message: "Nom et rôle sont requis" },
        { status: 400 }
      );
    }

    await connectDB();

    // Vérifier l'existence
    const existingUser = await User.findOne({ username: name });
    if (existingUser) {
      console.log(`🚫 L'utilisateur "${name}" existe déjà en base.`);
      return NextResponse.json(
        { message: "Cet utilisateur existe déjà" },
        { status: 400 }
      );
    }

    // Préparation des données pour la base
    const hashedPassword = await bcrypt.hash("NavBot2026", 10);
    const isAdmin = role === "Admin" ? 1 : 0;

    console.log("🛠️ Préparation de l'objet User pour MongoDB...");
    console.log(`- Username: ${name}`);
    console.log(`- Role original: ${role} -> Valeur admin: ${isAdmin}`);

    // Création
    const newUser = await User.create({
      username: name,
      password: hashedPassword,
      admin: isAdmin,
    });

    console.log(`✅ Utilisateur créé avec succès (ID: ${newUser._id})`);

    // Réponse au front
    return NextResponse.json({
      id: newUser._id,
      name: newUser.username,
      role: newUser.admin === 1 ? "Admin" : "User",
      message: "Utilisateur ajouté avec succès !"
    }, { status: 201 });

  } catch (error) {
    console.error("🔥 Erreur critique dans /api/ajoutUser :", error.message);
    return NextResponse.json(
      { message: "Erreur serveur", error: error.message },
      { status: 500 }
    );
  }
}