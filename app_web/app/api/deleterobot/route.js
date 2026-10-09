import { NextResponse } from "next/server";
import mongoose from "mongoose";

// 1. Définition du schéma (doit être identique à celui des autres routes)
const robotSchema = new mongoose.Schema({
  nom: String,
  modele: String,
  numeroSerie: String,
  statut: String,
});

const Robot = mongoose.models.Robot || mongoose.model("Robot", robotSchema);

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.error("❌ Erreur connexion MongoDB (Delete):", err);
  }
}

// 2. ✅ EXPORT NOMMÉ "DELETE"
export async function DELETE(request) {
  try {
    // Récupération de l'ID depuis l'URL (?id=...)
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID du robot manquant" }, { status: 400 });
    }

    await connectDB();

    // Suppression dans MongoDB
    const deletedRobot = await Robot.findByIdAndDelete(id);

    if (!deletedRobot) {
      return NextResponse.json({ message: "Robot non trouvé en base" }, { status: 404 });
    }

    console.log(`🗑️ Robot supprimé : ${id}`);

    return NextResponse.json({ message: "Robot supprimé avec succès" }, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur DELETE /api/deleterobot:", error);
    return NextResponse.json({ message: "Erreur serveur lors de la suppression" }, { status: 500 });
  }
}