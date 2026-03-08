import os
import json
import zipfile
import shutil
import asyncio
from io import BytesIO
import pdfplumber
from google import genai
from google.genai import types

def extract_text(file_content: bytes):
    text = ""
    with pdfplumber.open(BytesIO(file_content)) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

async def analyze_resume_for_questions(file_content: bytes):
    """
    Stage 1: Analyzes the resume and determines the archetype.
    Returns 3 tailored questions to ask the user to dial in the design.
    """
    resume_text = extract_text(file_content)
    client = genai.Client()
    
    prompt = f"""
    You are a world-class creative director and web designer. Analyze this resume text and:
    1. Determine the "Archetype" of this person (e.g., Tech Visionary, Creative Director, Business Strategist, Researcher, Builder).
    2. Generate exactly 3 highly specific, short questions to ask the candidate to determine their ideal portfolio design vibe. 
       These questions should NOT be "what color do you want?", but deeper personality/goal questions (e.g., "Do you want this to feel like a cyberpunk terminal or a clean Apple product presentation?", "Is the goal to get hired by an enterprise or win freelance clients?").
    
    Return ONLY valid JSON in this exact format, with no markdown formatting:
    {{
      "archetype": "...",
      "questions": [
        "Question 1?",
        "Question 2?",
        "Question 3?"
      ]
    }}
    
    Resume Text:
    {resume_text}
    """
    
    response = await asyncio.to_thread(
        client.models.generate_content,
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json")
    )
    
    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        return {
            "archetype": "Professional",
            "questions": ["What is your main goal for this portfolio?", "Describe your ideal aesthetic in 3 words?", "Who is your primary audience?"]
        }

async def generate_portfolio_zip(file_content: bytes, archetype: str, user_answers: dict):
    """
    Stage 2: Takes the resume + archetype + answers and generates the React Native code.
    """
    resume_text = extract_text(file_content)
    client = genai.Client()
    
    # Pack answers into readable string
    answers_str = "\n".join([f"Q: {k}\nA: {v}" for k, v in user_answers.items()])
    
    prompt = f"""
    You are an award-winning UI/UX Designer and Elite React Developer (Awwwards winner level).
    You are building a custom, high-end personal portfolio website for a candidate based strictly on their resume.
    
    Profile Archetype: {archetype}
    
    User Design Vibe & Goals:
    {answers_str}
    
    Resume Text:
    {resume_text}
    
    Your task is to write a single, comprehensive `App.jsx` React component using Tailwind CSS, Framer Motion, and lucide-react icons.
    
    CRITICAL DESIGN REQUIREMENTS for a "High-End" Website:
    1. **Copywriting**: Do NOT use generic AI filler ("I am a passionate..."). Write punchy, confident, world-class copy. Extract their actual metrics, achievements, and unique voice from the resume.
    2. **Typography**: Use MASSIVE, bold typography for the hero section (e.g., `text-7xl md:text-9xl tracking-tighter font-black`). Use tight leading and tracking for dramatic effect.
    3. **Layout**: Break out of boring centered text. Use asymmetric layouts, CSS Grids, or "Bento Box" styles for skills and projects.
    4. **Animations**: Every section must use `framer-motion`. Include parallax scroll effects, staggered reveals on lists, and a continuous scrolling Text Marquee (using framer-motion `animate="{{ x: [0, -1000] }}"`).
    5. **Sections Required**:
       - Dramatic Hero Section (Bold hook, clear value proposition)
       - "About" or "Philosophy" (Engaging narrative, not a boring summary)
       - "Featured Work" / Projects (Visual cards or grid with hover physics)
       - Experience Timeline (Clean, scannable, metric-driven)
       - **Contact Section**: A beautiful footer with a "Let's Work Together" massive CTA, email link, and social placeholder icons.
    6. **Aesthetics**: Strictly follow the Vibe requested by the user. If they want Neo-Brutalism, use hard shadows and stark borders. If glassmorphism, use deep blurs.
    
    Output ONLY a JSON object exactly like this, with NO markdown tags outside of the JSON:
    {{
      "app_jsx_code": "import React from 'react'... (full code block)",
      "theme_color": "Hex color, e.g. #3b82f6",
      "background_color": "Hex color, e.g. #050505",
      "text_color": "Hex color, e.g. #ffffff"
    }}
    """
    
    # We use Flash here to ensure we don't hit the strict free-tier limits of the Pro model
    # We use asyncio.to_thread so this synchronous network call doesn't block the main event loop
    response = await asyncio.to_thread(
        client.models.generate_content,
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(response_mime_type="application/json")
    )
    
    try:
        generated_data = json.loads(response.text)
        app_jsx = generated_data.get("app_jsx_code", "")
        bg_col = generated_data.get("background_color", "#0f172a")
        txt_col = generated_data.get("text_color", "#f8fafc")
        acc_col = generated_data.get("theme_color", "#8b5cf6")
    except Exception as e:
        print("Error generating code:", e)
        # Fallback empty app to prevent crash
        app_jsx = "export default function App() { return <div>Error generating site.</div> }"
        bg_col = "#ffffff"
        txt_col = "#000000"
        acc_col = "#0000ff"

    # Prepare the React template output
    template_dir = "react_template"
    
    if not os.path.exists(template_dir):
        raise Exception("React scaffold template is missing.")
        
    css_content = f"""
    @import "tailwindcss";
    @theme {{
      --font-sans: "Inter", system-ui, sans-serif;
    }}
    :root {{
      --bg-color: {bg_col};
      --text-color: {txt_col};
      --accent: {acc_col};
    }}
    body {{
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: var(--font-sans);
      overflow-x: hidden;
    }}
    """
    
    # We will build the zip entirely in memory to prevent Read-Only filesystem crashes on Render
    zip_buffer = BytesIO()
    
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # 1. Walk through the existing template directory and zip everything EXCEPT node_modules/dist/git
        for root, dirs, files in os.walk(template_dir):
            dirs[:] = [d for d in dirs if d not in ('node_modules', 'dist', '.git')]
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, template_dir)
                
                # We skip the default App.jsx and index.css because we will dynamically inject them!
                if arcname.replace("\\", "/") in ("src/App.jsx", "src/index.css"):
                    continue
                    
                zipf.write(file_path, arcname)
                
        # 2. Inject the dynamically generated App.jsx
        zipf.writestr("src/App.jsx", app_jsx)
        
        # 3. Inject the dynamically generated index.css
        zipf.writestr("src/index.css", css_content)
                
    zip_buffer.seek(0)
    return zip_buffer
