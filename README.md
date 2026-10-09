<div align="center">

# 🤖 NavBot

**Supervision platform for autonomous mobile robots: maps, missions, alerts & remote control**
*Plateforme de supervision de robots mobiles autonomes : cartes, missions, alertes et télécommande*

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

🇬🇧 [English](#-english) · 🇫🇷 [Français](#-français)

</div>

## 🚀 Démo en ligne / Live demo

👉 **[Tester NavBot / Try NavBot](https://claude.ai/code/artifact/a4aef068-cf85-4907-b96c-e52492a5d3e0)**

> 🇫🇷 Version de démonstration en ligne avec données fictives, aucune installation nécessaire.
>
> 🇬🇧 Online demo version with mock data, no installation needed.

---

## 🇬🇧 English

### 💡 About
NavBot is the web interface of an autonomous navigation system for mobile robots. It lets operators supervise their robots, view maps, plan missions and follow the robots' history in real time.
🎓 University project (2025 – 2026), built in a team with a supervisor and an internal university client.

🤝 Team: [Meli-ileM](https://github.com/Meli-ileM) (frontend) · [Amirahamdi-201](https://github.com/Amirahamdi-201) (Next.js web app & backend)

### ✨ Features
- 📊 Dashboard with the robots' status
- 🗺️ Maps and live robot position (Leaflet)
- 🎯 Missions and points of interest (POI)
- 🎮 Remote control of the robot
- 🚨 Alerts, notifications and trip history
- 👥 User & robot management, login with captcha, password reset
- 🌗 Light / dark theme

### 🛠️ Tech stack
| Part | Technologies |
|---|---|
| `frontend/` | React 19, Vite, React Router, Leaflet, Lucide |
| `app_web/` | Next.js, TypeScript, Tailwind CSS, MongoDB (Mongoose), bcrypt |

### 📂 Structure
```
frontend/   React supervision interface (dashboard, maps, missions, alerts…)
app_web/    Next.js web app with API routes (users, robots, auth)
backend/    Reserved for the navigation backend
```

### 🚀 Getting started
```bash
# React interface
cd frontend && npm install && npm run dev      # http://localhost:5173

# Next.js web app (copy app_web/.env.example to app_web/.env.local and set MONGODB_URI)
cd app_web && npm install && npm run dev       # http://localhost:3000
```

---

## 🇫🇷 Français

### 💡 À propos
NavBot est l'interface web d'un système de navigation autonome pour robots mobiles. Elle permet de superviser les robots, consulter les cartes, planifier des missions et suivre l'historique des trajets en temps réel.
🎓 Projet universitaire (2025 – 2026), réalisé en équipe avec un encadrant et un client universitaire interne.

🤝 Équipe : [Meli-ileM](https://github.com/Meli-ileM) (frontend) · [Amirahamdi-201](https://github.com/Amirahamdi-201) (application web Next.js et backend)

### ✨ Fonctionnalités
- 📊 Tableau de bord avec l'état des robots
- 🗺️ Cartes et position du robot en direct (Leaflet)
- 🎯 Missions et points d'intérêt (POI)
- 🎮 Télécommande du robot
- 🚨 Alertes, notifications et historique des trajets
- 👥 Gestion des utilisateurs et des robots, connexion avec captcha, réinitialisation du mot de passe
- 🌗 Thème clair / sombre

### 🚀 Lancer le projet
Voir les commandes de la section anglaise ci-dessus 👆.

---

<div align="center">

Made with 💜 by **Meli**

</div>
