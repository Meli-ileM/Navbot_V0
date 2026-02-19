import mongoose from "mongoose";

const robotSchema = new mongoose.Schema(
  {
    // On garde 'nom' pour correspondre à votre formulaire front-end
    nom: { 
      type: String, 
      required: true, 
      trim: true 
    },
    // Le numéro de série est l'identifiant unique physique
    numeroSerie: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    // 'modele' correspond au select (Turtlebot4, etc.)
    modele: { 
      type: String, 
      required: true, 
      trim: true 
    },
    // On adapte les enums pour correspondre à vos labels "En ligne" / "Hors ligne"
    statut: { 
      type: String, 
      enum: ["En ligne", "Hors ligne", "Maintenance", "Active"], 
      default: "Hors ligne" 
    },
  },
  { 
    timestamps: true // Garde trace de la date de création et mise à jour
  }
);

// Export nommé pour éviter les erreurs Next.js
export const Robot = mongoose.models.Robot || mongoose.model("Robot", robotSchema);