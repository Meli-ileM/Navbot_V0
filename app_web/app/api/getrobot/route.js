import { NextResponse } from "next/server";
import mongoose from "mongoose";

// 1. Définition du schéma AVEC timestamps pour permettre le tri
const robotSchema = new mongoose.Schema({
  nom: String,
  modele: String,
  numeroSerie: String,
  statut: String,
}, { timestamps: true }); // <--- TRÈS IMPORTANT pour le .sort({ createdAt: -1 })

const Robot = mongoose.models.Robot || mongoose.model("Robot", robotSchema);

const MONGODB_URI = "mongodb+srv://amirahamdi:j6rS2qQQOC1Q9Q1c@clusterdata.dsbshld.mongodb.net/?appName=ClusterData";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    // Option de timeout pour éviter que la page charge à l'infini si la DB est offline
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, 
    });
  } catch (err) {
    console.error("❌ Erreur de connexion MongoDB:", err);
  }
}

export async function GET() {
  try {
    await connectDB();

    // On récupère les robots
    const robots = await Robot.find({});
    
    // On trie manuellement si createdAt n'existe pas encore sur les anciens documents
    const sortedRobots = robots.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    const formattedRobots = sortedRobots.map(r => ({
      id: r._id.toString(), 
      nom: r.nom || "Sans nom",
      modele: r.modele || "Inconnu",
      numeroSerie: r.numeroSerie || "S/N manquant",
      statut: r.statut || "Hors ligne",
    }));

    return NextResponse.json(formattedRobots, { 
      status: 200,
      headers: { 
        "Cache-Control": "no-store, max-age=0",
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    console.error("❌ Erreur critique GET /api/getrobots:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}