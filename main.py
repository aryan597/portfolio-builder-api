import os
from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

from generator import generate_portfolio_zip

load_dotenv()

app = FastAPI(title="AI Portfolio Builder API")

# Ensure templates directory exists
os.makedirs("templates", exist_ok=True)
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/generate-portfolio")
async def create_portfolio(
    file: UploadFile = File(...),
    theme: str = Form("Auto"),
    design_style: str = Form("Glassmorphism"),
    use_3d_elements: bool = Form(False),
    interactions: str = Form("Smooth Scroll")
):
    
    # Store the user choices in a context dict
    user_context = {
        "theme": theme,
        "design_style": design_style,
        "use_3d_elements": use_3d_elements,
        "interactions": interactions
    }

    zip_file_path = await generate_portfolio_zip(file, user_context)

    return FileResponse(
        path=zip_file_path,
        media_type="application/zip",
        filename="portfolio.zip"
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
