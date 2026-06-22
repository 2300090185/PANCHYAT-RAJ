# 🏆 Viksit Bharat — Panchayati Raj Rural Awards Portal

A full-stack **Youth Social Impact & Sustainable Development** recognition platform built for the Ministry of Panchayati Raj. The portal covers 16 award categories, dynamic nomination forms with category-specific fields, a jury evaluation dashboard, and an admin panel — all powered by a React/Vite frontend and a Node.js/Express backend.

---

## ✨ Features

### 🌍 Public Portal
- Animated hero section with live activity stats
- **16 Award Categories** with one-click "Apply under category" pre-selection
- UN SDG alignment directory
- Live **National Award Winners Showcase** (fetched from backend)
- Volunteer / NGO / CSR registration modals
- Events & news board

### 📝 Nominee Portal
- **5-step nomination wizard** with progress stepper
- **Category-specific evidence questions** — each of the 16 awards shows unique Q&A fields
- SDG & LDG (Life Development Goals) multi-select mapping
- Impact metric entry (villages, households, women, trees, plastic collected, etc.)
- Document upload UI & declaration checkbox
- Application status tracker

### ⚖️ Jury Evaluation Portal
- Nomination table with search & category filter
- **Dynamic scorecard per category** — criteria, weights, and descriptions auto-load from the nomination's award type
- Range sliders + number inputs for each criterion (max 100 pts)
- Overall score progress bar with 75% recommendation threshold
- Field visit date scheduler
- Collapsible view of nominee's category-specific evidence answers
- Auto-status update: `Award Recommended` / `Under Review`

### 🛡️ Admin Panel
- Full nomination registry with status badges
- Approve / Reject / Information-Requested actions
- Nominee detail modal
- Category and district analytics

### 📊 Analytics & GIS Dashboard
- SDG coverage charts
- Category distribution pie chart
- State/district heatmap

---

## 🗂️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Vanilla CSS (Glassmorphism dark theme) |
| Icons | Lucide React |
| Backend | Node.js + Express |
| Database | JSON flat-file (`server/db.json`) — auto-seeded |
| Dev Runner | `concurrently` (frontend + backend in one command) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/panchayat-raj.git
cd panchayat-raj

# Install dependencies
npm install
```

### Running Locally

```bash
# Start both frontend (Vite) and backend (Express) together
npm run dev:fullstack
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

> The `server/db.json` database file is auto-created and seeded with 3 sample nominations on first run.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Frontend only (Vite) |
| `npm run dev:fullstack` | Frontend + Backend (recommended) |
| `npm run build` | Production build |

---

## 📁 Project Structure

```
panchayat-raj/
├── public/
│   └── images/             # Award winner images
├── server/
│   ├── index.js            # Express API routes
│   └── database.js         # JSON DB read/write + auto-seed
├── src/
│   ├── components/
│   │   ├── AdminPanel.jsx
│   │   ├── AnalyticsDashboard.jsx
│   │   ├── JuryPortal.jsx
│   │   ├── Navbar.jsx
│   │   ├── NominationForm.jsx
│   │   └── PublicPortal.jsx
│   ├── constants/
│   │   └── awardConfigs.js  # 16-category field + jury criteria config
│   ├── App.jsx
│   └── index.css
├── .gitignore
├── package.json
└── vite.config.js
```

---

## 🏅 Award Categories

1. Village Development Award
2. Smart Village Award
3. Plastic-Free Village Award
4. Green Village Award
5. Water Conservation Award
6. Education Excellence Award
7. Health & Hygiene Award
8. Women Empowerment Award
9. Agriculture Innovation Award
10. Digital Village Award
11. Youth Leadership Award
12. Best Volunteer Award
13. Best NGO Award
14. Social Entrepreneurship Award
15. Climate Action Award
16. Biodiversity Conservation Award

---

## 📸 Screenshots

> See the `/public/images` folder for award imagery used in the Winners Showcase.

---

## 📜 License

MIT License — Open for educational and government initiative use.

---

*Built with ❤️ for Viksit Bharat 2047 — Empowering Youth, Transforming Villages.*
