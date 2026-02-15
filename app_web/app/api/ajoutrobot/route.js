import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Modèle Robot mis à jour avec numeroSerie
const robotSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  modele: { type: String, required: true },
  numeroSerie: { type: String, required: true, unique: true }, // Ajout du N° de Série unique
  statut: { type: String, default: "Actif" },
  dateAjout: { type: Date, default: Date.now },
});

const Robot = mongoose.models.Robot || mongoose.model("Robot", robotSchema);

const MONGODB_URI = "mongodb+srv://amirahamdi:j6rS2qQQOC1Q9Q1c@clusterdata.dsbshld.mongodb.net/?appName=ClusterData";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { nom, modele, numeroSerie } = body; // On récupère le numéro de série

    if (!nom || !modele || !numeroSerie) {
      return NextResponse.json({ message: "Champs manquants (Nom, Modèle ou N° Série)" }, { status: 400 });
    }

    await connectDB();

    // Vérifier si le numéro de série existe déjà
    const existingRobot = await Robot.findOne({ numeroSerie });
    if (existingRobot) {
      return NextResponse.json({ message: "Ce numéro de série existe déjà" }, { status: 409 });
    }

    const newRobot = await Robot.create({
      nom,
      modele,
      numeroSerie,
      statut: "Actif"
    });

    return NextResponse.json({
      id: newRobot._id.toString(),
      nom: newRobot.nom,
      modele: newRobot.modele,
      numeroSerie: newRobot.numeroSerie,
      statut: newRobot.statut
    }, { status: 201 });

  } catch (error) {
    console.error("❌ Erreur AjoutRobot:", error);
    return NextResponse.json({ message: "Erreur serveur lors de l'ajout" }, { status: 500 });
  }
}