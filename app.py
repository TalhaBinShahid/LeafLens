from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import os
import uuid
import time
import requests
from dotenv import load_dotenv

from models import StartChatRequest, ChatRequest, EndChatRequest
load_dotenv()

app = FastAPI()


origins = [
    "http://localhost:5173",  
    "http://localhost:3000",  
    os.getenv("FRONTEND_URL", "")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Load the pre-trained model
MODEL_PATH = "model.h5"
try:
    model = load_model(MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# Define the target image size (e.g., 224x224 for InceptionNet)
TARGET_SIZE = (224, 224)

# Define the class labels (replace with your actual class names)
CLASS_NAMES = ['Apple__Apple_scab', 'Apple_Black_rot', 'Apple_Cedar_apple_rust', 'Apple_healthy', 'Blueberry_healthy', 'Cherry_healthy', 'Cherry_Powdery_mildew', 'Corn_Cercospora_leaf_spot Gray_leaf_spot', 'Corn_Common_rust', 'Corn_healthy', 'Corn_Northern_Leaf_Blight', 'Grape_Black_rot', 'Grape_Esca(Black_Measles)', 'Grape__healthy', 'Grape_Leaf_blight(Isariopsis_Leaf_Spot)', 'Orange__Haunglongbing(Citrus_greening)', 'Peach__Bacterial_spot', 'Peach_healthy', 'Pepper,_bell_Bacterial_spot', 'Pepper,_bell_healthy', 'Potato_Early_blight', 'Potato_healthy', 'Potato_Late_blight', 'Raspberry_healthy', 'Soybean_healthy', 'Squash_Powdery_mildew', 'Strawberry_healthy', 'Strawberry_Leaf_scorch', 'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_healthy', 'Tomato_Late_blight', 'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot', 'Tomato_Spider_mites Two-spotted_spider_mite', 'Tomato_Target_Spot', 'Tomato_Tomato_mosaic_virus', 'Tomato__Tomato_Yellow_Leaf_Curl_Virus']

# Load Google Gen AI API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found in environment variables.")

# In-memory storage for chat sessions
chat_sessions = {}

# Timeout for chat sessions (in seconds)
SESSION_TIMEOUT = 600  # 10 minutes

@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    try:
        # Read the uploaded image file
        image = Image.open(file.file)

        if image.mode != "RGB":
            image = image.convert("RGB")

        # Preprocess the image
        image = image.resize(TARGET_SIZE)
        image = img_to_array(image)
        image = np.expand_dims(image, axis=0)  # Add batch dimension
        image = image / 255.0  # Normalize pixel values

        # Getting prediction
        predictions = model.predict(image)
        predicted_class = np.argmax(predictions[0])
        predicted_label = CLASS_NAMES[predicted_class]

        # Return the prediction as JSON
        return {"predicted_disease": predicted_label}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")
    


@app.post("/start_chat")
async def start_chat(request: StartChatRequest, background_tasks: BackgroundTasks):
    disease = request.disease
    # Generate a unique session ID
    session_id = str(uuid.uuid4())

    # Initialize chat history with system instructions as 'model' role
    chat_sessions[session_id] = {
        "history": [
            {
                "role": "model",  # Gemini does not accept 'system', use 'model'
                "content": (
                    f"You are a helpful assistant for farmers. "
                    f"A model predicts plant diseases from input images. "
                    f"Guide farmers based on their queries. Disease: {disease}."
                    "Try to reply in short sentences since it is like a chatting application."
                    "Avoid using symbols like ** or __ in your responses."
                )
            }
        ],
        "last_active": time.time()
    }

    # Schedule cleanup task
    background_tasks.add_task(cleanup_sessions)
    print(f"Chat Started with SessionId: {session_id}")
    return {"session_id": session_id, "message": f"Chat started for disease: {disease}"}


@app.post("/chat")
async def chat(request: ChatRequest):
    session_id = request.session_id
    user_message = request.user_message

    if session_id not in chat_sessions:
        raise HTTPException(status_code=404, detail="Session not found.")

    # Update last active time
    chat_sessions[session_id]["last_active"] = time.time()

    # Add user message to chat history
    chat_sessions[session_id]["history"].append({"role": "user", "content": user_message})

    # Prepare contents for Gemini
    contents = [
        {
            "role": "model" if msg["role"] in ["assistant", "model"] else "user",
            "parts": [{"text": msg["content"]}]
        } for msg in chat_sessions[session_id]["history"]
    ]

    try:
        response = requests.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
            headers={
                "x-goog-api-key": GEMINI_API_KEY,
                "Content-Type": "application/json"
            },
            json={"contents": contents},
            timeout=30
        )

        response.raise_for_status()
        gemini_response = response.json()

        # Extract assistant's reply
        try:
            assistant_message = gemini_response["candidates"][0]["content"]["parts"][0]["text"]
        except (KeyError, IndexError):
            assistant_message = "I'm sorry, I couldn't process that."
        # assistant_message = "This is a placeholder response from Gemini API."
        # Add assistant's response to chat history
        chat_sessions[session_id]["history"].append({"role": "assistant", "content": assistant_message})

        print(f"Chatting with SessionId: {session_id}")
        return {"response": assistant_message}

    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="The request to Google Gen AI timed out. Please try again later.")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to communicate with Google Gen AI: {e}")



@app.post("/end_chat")
async def end_chat(request: EndChatRequest):
    session_id = request.session_id

    if session_id in chat_sessions:
        del chat_sessions[session_id]
        print(f"Chat Deleted with SessionId: {session_id}")
        return {"message": "Chat session ended."}
    else:
        raise HTTPException(status_code=404, detail="Session not found.")

def cleanup_sessions():
    current_time = time.time()
    expired_sessions = [sid for sid, session in chat_sessions.items() if current_time - session["last_active"] > SESSION_TIMEOUT]
    for sid in expired_sessions:
        print(f"Automatically Deleted Chat with SessionId: {sid}")
        del chat_sessions[sid]