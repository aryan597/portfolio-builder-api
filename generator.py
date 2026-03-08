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
       These should be simple but revealing (e.g., "Do you prefer a dark mode or light mode aesthetic?", "What is your primary goal for this portfolio?", "Describe your ideal vibe in one word").
    
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
    You are an award-winning UI/UX Designer and Elite Copywriter. 
    You are building a custom, high-end personal portfolio website for a candidate based strictly on their resume.
    
    Profile Archetype: {archetype}
    
    User Design Vibe & Goals:
    {answers_str}
    
    Resume Text:
    {resume_text}
    
    Your task is to:
    1. Select the absolute BEST Awwwards-tier boilerplate template (1-5) for this candidate:
       1: "The Visionary" (Horizontal scroll, massive typography. For Designers/Artists)
       2: "The Architect" (Brutalist, dark terminal, physics nodes. For Software Engineers)
       3: "The Executive" (Minimalist glassmorphism, 3D sphere. For Founders/Directors/Leaders)
       4: "The Alchemist" (High-energy, 3D kinetic bento boxes, neon. For Marketers/Creators)
       5: "The Scholar" (Editorial sepia, deep reading, elegant serif. For Researchers/Academics)
    2. Define the ideal CSS color hex codes for their chosen vibe.
    3. Write world-class, punchy, confident copywriting for their site data payload. Do NOT use generic AI filler ("I am a passionate..."). 
    
    Output ONLY a JSON object exactly like this, with NO markdown tags outside of the JSON:
    {{
      "template_id": 1,
      "theme_color": "#e11d48",
      "background_color": "#050505",
      "text_color": "#f5f5f5",
      "data_json": {{
         "name": "First Last",
         "title": "Punchy Job Title / Main Value Prop",
         "about": "A confident, 2-3 sentence engaging narrative about their expertise.",
         "experience": [
            {{ "company": "Company Name", "role": "Job Title", "duration": "2020 - 2023", "description": "1-2 sentences of key measurable impact." }}
         ],
         "education": [
            {{ "school": "University Name", "degree": "Degree Earned", "year": "Graduation Year" }}
         ],
         "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
         "projects": [
            {{ "title": "Project Name", "role": "Their Role", "description": "1 sentence metric-driven outcome." }},
            {{ "title": "Project Name", "role": "Their Role", "description": "1 sentence metric-driven outcome." }}
         ],
         "contactEmail": "extracted_or_generated@email.com",
         "socialLinks": {{
            "twitter": "@handle",
            "linkedin": "linkedin-handle"
         }}
      }}
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
        template_id = generated_data.get("template_id", 1)
        bg_col = generated_data.get("background_color", "#050505")
        txt_col = generated_data.get("text_color", "#f5f5f5")
        acc_col = generated_data.get("theme_color", "#e11d48")
        data_json = generated_data.get("data_json", {})
    except Exception as e:
        print("Error generating code:", e)
        template_id = 1
        bg_col = "#050505"
        txt_col = "#f5f5f5"
        acc_col = "#e11d48"
        data_json = {
            "name": "Jane/John Doe",
            "title": "Expert Professional",
            "about": "Solving complex problems with elegant solutions.",
            "experience": [
                { "company": "Tech Corp", "role": "Senior Developer", "duration": "2021 - Present", "description": "Led core architecture rewrite." }
            ],
            "education": [
                { "school": "State University", "degree": "B.S. Computer Science", "year": "2020" }
            ],
            "skills": ["Strategy", "Execution", "Leadership"],
            "projects": [],
            "contactEmail": "hello@example.com",
            "socialLinks": {}
        }

    # Map template_id to the actual folder name
    template_map = {
        1: "template_creative",
        2: "template_engineer",
        3: "template_executive",
        4: "template_marketer",
        5: "template_researcher"
    }
    
    chosen_template_folder = template_map.get(template_id, "template_creative")
    api_templates_dir = os.path.join(os.path.dirname(__file__), "api_templates", chosen_template_folder)
    base_template_dir = os.path.join(os.path.dirname(__file__), "react_template")
    
    # Ensure directories exist
    if not os.path.exists(base_template_dir):
        raise Exception("Base React scaffold template is missing.")
    if not os.path.exists(api_templates_dir):
        raise Exception(f"Specific boilerplate template '{chosen_template_folder}' is missing.")
        
    # Read the specific App.jsx and index.css for the chosen template
    with open(os.path.join(api_templates_dir, "App.jsx"), "r", encoding="utf-8") as f:
        app_jsx_content = f.read()
        
    with open(os.path.join(api_templates_dir, "index.css"), "r", encoding="utf-8") as f:
        base_css_content = f.read()
        
    # Append the AI-generated color variables explicitly to the bottom of the index.css
    color_overrides = f"""
    :root {{
      --bg-color: {bg_col};
      --text-color: {txt_col};
      --accent: {acc_col};
    }}
    """
    final_css_content = base_css_content + "\\n" + color_overrides

    # We will build the zip entirely in memory to prevent Read-Only filesystem crashes on Render
    zip_buffer = BytesIO()
    
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # 1. Walk through the existing base react_template directory and zip everything EXCEPT node_modules/dist/git
        for root, dirs, files in os.walk(base_template_dir):
            dirs[:] = [d for d in dirs if d not in ('node_modules', 'dist', '.git')]
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, base_template_dir)
                
                # We skip the default App.jsx and index.css (and any existing data.json) to dynamically inject them
                if arcname.replace("\\\\", "/") in ("src/App.jsx", "src/index.css", "src/data.json"):
                    continue
                    
                zipf.write(file_path, arcname)
                
        # 2. Inject the dynamically read chosen template App.jsx
        zipf.writestr("src/App.jsx", app_jsx_content)
        
        # 3. Inject the dynamically read chosen template index.css (with color overrides)
        zipf.writestr("src/index.css", final_css_content)
        
        # 4. Inject the AI-generated content payload data.json
        zipf.writestr("src/data.json", json.dumps(data_json, indent=2))
                
    zip_buffer.seek(0)
    return zip_buffer
