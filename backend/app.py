
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import shutil
import uuid
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


VIDEO_DIR = "videos"
os.makedirs(VIDEO_DIR, exist_ok=True)

@app.post("/api/upload-video")
async def upload_video(video: UploadFile = File(...)):
    file_id = uuid.uuid4().hex
    filename = f"{file_id}.webm"
    save_path = os.path.join(VIDEO_DIR, filename)

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(video.file, buffer)

    return {
        "status": "saved",
        "filename": filename
    }


from mediapipe_extractor import extract_landmarks
from inference import predict

MAX_FRAMES = 30

@app.post("/predict")
async def predict_gesture(file: UploadFile):
    print("Received video")

    video_bytes = await file.read()
    print("Video size:", len(video_bytes))

    with open("temp.webm", "wb") as f:
        f.write(video_bytes)

    print("Extracting landmarks...")
    sequence = extract_landmarks("temp.webm", MAX_FRAMES)

    print("Running model...")
    preds = predict(sequence)
    print("Predictions from model:", preds, type(preds))

    print("Done")
    return {"predictions": preds}
    
