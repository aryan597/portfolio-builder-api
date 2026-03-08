# AI Dynamic Portfolio Generation Engine 🚀

Welcome to the **AI Portfolio Builder Engine**. This is not a static template filler—this is a sophisticated, two-stage Generative AI pipeline that builds completely bespoke, Awwwards-tier React sites on the fly based on a candidate's resume and psychological profile.

This API will be deployed directly to my portfolio website, allowing anyone to upload their resume and experience the power of my AI engineering skills firsthand.

## 🧠 How The Architecture Works

Instead of forcing user data into a single rigid template, this engine uses a multi-stage approach with **Google Gemini 2.5 Pro**:

### Stage 1: The "Profiler"
When a user uploads a PDF resume, the backend instantly parses it utilizing `pdfplumber` and passes the raw text to Gemini. The AI acts as a psychological profiler:
- It classifies the user into an **Archetype** (e.g., Tech Visionary, Creative Director, Business Strategist).
- It generates **3 hyper-specific psychological questions** (e.g., "Do you want this to feel like a cyberpunk terminal or a clean Apple presentation?").
- These dynamic questions are returned to the frontend to dial in the perfect visual aesthetic.

### Stage 2: The "Creative Director" (Dynamic React Generation)
Once the user answers the dynamic questions, the engine fires a second massive prompt to Gemini 2.5 Pro. We instruct the model to act as an Elite React Developer.
- Gemini takes the Resume, the Archetype, and the user's Answers.
- It writes an entirely **new, single-file React component (`App.jsx`) from scratch**.
- It enforces strict high-end design patterns: massive typography, asymmetric CSS grids (Bento boxes), scrolling Framer Motion marquees, parallax effects, and bold copywriting (no AI filler text).
- It generates custom Tailwind CSS color hexes to match the mood.

### Stage 3: The "Scaffolder"
The Python backend (FastAPI) takes this pure, raw generation and injects it into a pre-configured Vite + React + Framer Motion environment. It builds a `.zip` archive entirely in memory and streams it back to the user for instant download. 

The result? The user unzips the folder, runs `npm install` && `npm run dev`, and instantly has a completely unique, premium personal portfolio website.

---

## 🛠️ Tech Stack Showcase

*   **Backend:** Python, FastAPI, Uvicorn/Gunicorn
*   **AI Engine:** Google GenAI SDK (Gemini 2.5 Flash & Pro)
*   **Infrastructure:** Render (via Infrastructure as Code `render.yaml`)
*   **Generated Frontend Stack:** Vite, React, Tailwind CSS V4, Framer Motion, Lucide Icons

*This engine was built to demonstrate my capability to bridge complex AI prompt engineering with practical, stunning full-stack web development.*
