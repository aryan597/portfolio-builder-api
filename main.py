import os
from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

from generator import analyze_resume_for_questions, generate_portfolio_zip

load_dotenv()

app = FastAPI(title="AI Portfolio Builder API")

os.makedirs("templates", exist_ok=True)
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    """
    Stage 1: Receives the resume and returns 3 custom questions based on their profile archetype.
    """
    file_content = await file.read()
    analysis = await analyze_resume_for_questions(file_content)
    return JSONResponse(content=analysis)

@app.post("/generate-portfolio")
async def create_portfolio(
    file: UploadFile = File(...),
    archetype: str = Form(...),
    q1: str = Form(...),
    q2: str = Form(...),
    q3: str = Form(...)
):
    """
    Stage 2: Receives the resume, archetype, and the 3 user answers.
    Generates and returns the zip file.
    """
    file_content = await file.read()
    answers = {
        "Question 1": q1,
        "Question 2": q2,
        "Question 3": q3
    }
    
    zip_buffer = await generate_portfolio_zip(file_content, archetype, answers)

    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=portfolio.zip"}
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
