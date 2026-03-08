import os
import json
import zipfile
import shutil
from io import BytesIO
import pdfplumber
from google import genai
from google.genai import types

def extract_text(file):
    text = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

async def generate_portfolio_zip(file, user_context):
    resume_text = extract_text(file)
    
    # Init Gemini
    client = genai.Client()
    
    prompt = f"""
    You are an expert web developer and portfolio copywriter.
    Extract the following information from the resume and format it as a JSON object.
    
    Additionally, the user requested the following design style and interactions:
    - Theme: {user_context['theme']}
    - Style: {user_context['design_style']}
    - 3D Elements: {user_context['use_3d_elements']}
    - Interactions: {user_context['interactions']}
    
    Create a highly professional and engaging set of data for the portfolio.
    Return ONLY valid JSON with no markdown formatting.
    
    Format:
    {{
      "hero": {{"heading": "...", "subheading": "..."}},
      "about": "A 2-3 sentence engaging summary...",
      "skills": ["Skill 1", "Skill 2", ...],
      "projects": [
        {{"name": "...", "description": "...", "tech_stack": ["...", "..."]}}
      ],
      "experience": [
        {{"role": "...", "company": "...", "duration": "...", "highlights": ["..."]}}
      ],
      "design_preferences": {{
         "theme": "{user_context['theme']}",
         "style": "{user_context['design_style']}",
         "3d_elements": {str(user_context['use_3d_elements']).lower()},
         "interactions": "{user_context['interactions']}"
      }}
    }}
    
    Resume Text:
    {resume_text}
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
        ),
    )
    
    try:
        portfolio_data = json.loads(response.text)
    except json.JSONDecodeError:
        # Fallback if invalid JSON
        portfolio_data = {"error": "Failed to generate valid JSON"}

    # Prepare the React template
    template_dir = "react_template"
    output_zip_path = "portfolio.zip"
    
    # If the react template doesn't exist for some reason, we'll need to handle it.
    if not os.path.exists(template_dir):
        raise Exception("React template is missing.")
        
    # Write the data.json into the react template's src directory
    data_file_path = os.path.join(template_dir, "src", "data.json")
    with open(data_file_path, "w", encoding="utf-8") as f:
        json.dump(portfolio_data, f, indent=2)
        
    # Create a zip archive of the react template
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(template_dir):
            # Exclude node_modules, dist, and .git folders
            dirs[:] = [d for d in dirs if d not in ('node_modules', 'dist', '.git')]
            for file in files:
                file_path = os.path.join(root, file)
                # Ensure the path in the zip is relative to template_dir
                arcname = os.path.relpath(file_path, template_dir)
                zipf.write(file_path, arcname)
                
    return output_zip_path
