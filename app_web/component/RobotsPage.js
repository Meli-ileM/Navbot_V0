"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Plus, RefreshCw, X, Cpu, Hash, AlertTriangle, CheckCircle, Activity } from "lucide-react";

export default function RobotsPage() {
  const [robots, setRobots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Récupérer les robots depuis l'API
  const fetchRobots = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getrobot"); // Assurez-vous du 's' à getrobots
      if (response.ok) {
        const data = await response.json();
        setRobots(data);
      }
    } catch (error) {
      console.error("Erreur chargement robots:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRobots();
  }, []);



  // 2. Ajouter un robot
  const handleAddRobot = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const robotData = {
      nom: formData.get("nom"),
      modele: formData.get("modele"),
      numeroSerie: formData.get("numeroSerie"),
      statut: formData.get("statut") || "Actif",
    };

    try {
      const response = await fetch("/api/ajoutrobot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(robotData),
      });

      if (response.ok) {
        const newRobot = await response.json();
        setRobots((prev) => [...prev, newRobot]);
        setIsModalOpen(false);
        e.target.reset();
      } else {
        const err = await response.json();
        alert(err.message || "Erreur lors de l'ajout.");
      }
    } catch (error) {
      alert("Erreur réseau.");
    }
  };

  // 3. Supprimer un robot
  const handleDeleteRobot = async (id) => {
    if (!confirm("Supprimer ce robot ?")) return;
    try {
      const response = await fetch(`/api/deleterobot?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        setRobots((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      alert("Erreur suppression.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
  const nextStatus = currentStatus === "Actif" ? "En panne" : "Actif";
  try {
    const response = await fetch(`/api/updatestat?id=${id}`, { // <--- Vérifiez l'URL ici
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut: nextStatus }),
    });

    if (response.ok) {
      setRobots((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: nextStatus } : r))
      );
    }
  } catch (error) {
    alert("Erreur réseau lors du changement de statut.");
  }
};

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      <div className="bg-[#24386E] text-white py-6 px-10 shadow-lg mx-6 mt-6 rounded-xl flex justify-center items-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-center">Gestion des Robots</h1>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-end gap-3 mb-4">
 
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#24386E] text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:bg-[#1a2a52] transition-all"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Nouveau Robot</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="max-h-[540px] overflow-y-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-[#24386E] sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase w-16">N°</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">N° Série</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Nom</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Modèle</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase">Statut</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr><td colSpan="6" className="py-10 text-center text-gray-400">Chargement...</td></tr>
                ) : robots.map((robot, index) => (
                  <tr key={robot.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-[#24386E]">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{robot.numeroSerie || "N/A"}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{robot.nom}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{robot.modele}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        robot.statut === "Actif" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {robot.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-3">
                        {/* --- LOGIQUE DES ICONES DE STATUT --- */}
                        {robot.statut === "Actif" ? (
                          <button 
                            onClick={() => toggleStatus(robot.id, robot.statut)}
                            className="text-orange-500 hover:text-orange-700 hover:scale-110 transition-all"
                            title="Signaler en panne"
                          >
                            <AlertTriangle size={20} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => toggleStatus(robot.id, robot.statut)}
                            className="text-green-500 hover:text-green-700 hover:scale-110 transition-all"
                            title="Remettre en service (Actif)"
                          >
                            <CheckCircle size={20} />
                          </button>
                        )}

                        <button 
                          onClick={() => handleDeleteRobot(robot.id)}
                          className="text-red-500 hover:text-red-700 hover:scale-110 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal d'ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#24386E] p-4 text-white flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center gap-2"><Cpu size={20}/> Nouveau Robot</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddRobot} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1 italic">
                  <Hash size={14}/> Numéro de Série
                </label>
                <input type="text" name="numeroSerie" required className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#24386E]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Robot</label>
                <input type="text" name="nom" required className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#24386E]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
                  <select name="modele" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none">
                    <option value="Turtlebot4">Turtlebot4</option>
                    <option value="Turtlebot3">Turtlebot3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Activity size={14}/> Statut</label>
                  <select name="statut" className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none">
                    <option value="Actif">Actif</option>
                    <option value="En panne">En panne</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg">Annuler</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-[#24386E] text-white rounded-lg">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}