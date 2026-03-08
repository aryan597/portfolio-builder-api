# AI Portfolio Builder 🚀

Welcome to the **AI Portfolio Builder!** This dynamic FastAPI web server acts as an intuitive portfolio generator. By uploading a single PDF resume and answering a few aesthetic configuration questions, Gemini AI instantly extracts your data and translates it into a stunning, production-ready React (Vite) portfolio utilizing Framer Motion animations and Three.js 3D elements!

## ✨ Features
* **Resume Parsing:** Uses `pdfplumber` to extract content from your PDF resume.
* **AI Knowledge Engine:** Leverages `google-genai` (Gemini 2.5 Flash) to synthesize your CV into professional web copy.
* **Granular Options:** Choose between Dark/Light modes, design patterns (Glassmorphism, Neo-Brutalism, Minimal), and varying interactions.
* **Downloadable React Client:** When executing generation, we instantly scaffold a clean, modern Vite React App and serve it to you as a `.zip` archive!

## 🚀 Setting Up Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portfolio-builder-api
   ```

2. **Set up a Virtual Environment (Optional but Recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables:**
   Create a `.env` file referencing the required API Key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Run the Application locally:**
   ```bash
   python main.py
   # or
   uvicorn main:app --reload
   ```
   *The server runs on `http://localhost:8000` by default.*

## ☁️ Deploying to Render

This application is fully prepared for cloud deployment on platforms like Render.

1. Create a **New Web Service** on Render.
2. Link your GitHub repository.
3. Configure your environment settings:
   - **Environment:** `Python`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add your **Environment Variables** securely on the Render dashboard:
   - `GEMINI_API_KEY` => `[Your actual Key]`
5. Click **Deploy!** 

## 🏗️ Generating the React Site

1. Access the web interface via the live URL.
2. Form submission returns a `portfolio.zip` file.
3. Extract the ZIP locally.
4. Open your terminal inside the extracted directory and run:
   ```bash
   npm install
   npm run dev
   ```
5. Presto! Your personalized AI 3D portfolio is now running locally.
