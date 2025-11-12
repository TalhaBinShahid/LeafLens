# LeafLens

LeafLens is a small full-stack app to help farmers identify plant diseases from images and get short, actionable guidance via a chat assistant powered by Google Generative AI (Gemini).

“This README provides an overview of the project, its structure, API details, and setup instructions for local development.”

## Tech stack

**Backend:** FastAPI, TensorFlow/Keras, Python  
**Frontend:** React, TypeScript, Vite  
**AI Integration:** Google Generative AI (Gemini)


## Prerequisites

- Python 3.10 or later
- Node.js 18+ and npm
- A valid Google Generative AI (Gemini) API key

## Key features

- Upload an image and receive a predicted disease label.
- Start a short chat session for disease-specific guidance (chat powered by Gemini via the backend).
- Minimal frontend (Vite + React/TypeScript) demonstrating image upload, prediction, and chat.

## Quick glossary / contract

- Predict endpoint: accepts an image file and returns `{ predicted_disease: string }`.
- Chat session: start with `{ disease }` → returns `session_id`; then send messages with `{ session_id, user_message }` to get `{ response }`; end with `{ session_id }`.
- Model: `backend/inception_plantvillage.h5` — a Keras model used for image classification.

## Repository structure

Top-level folders:

- `backend/` — FastAPI backend providing prediction and chat endpoints, and loading the Keras model.
  - `app.py` — main FastAPI app (endpoints, model loading, chat session manager).
  - `inception_plantvillage.h5` — pretrained model file used for prediction (required to run predictions).
  - `models.py` — Pydantic request models used by the chat endpoints.
  - `requirements.txt` — Python dependencies for the backend.

- `Frontend/` — Vite + React + TypeScript frontend.
  - `src/lib/api.ts` — client helper functions used by UI components to call backend endpoints.
  - `src/pages/Detect.tsx`, `src/pages/Results.tsx` — pages that interact with the prediction API.
  - other standard Vite/React config files (see `package.json` in `Frontend/`).

## Backend (what `backend/app.py` provides)

Endpoints (from `backend/app.py`):

- POST `/predict`
  - Description: Accepts a multipart file upload (image), preprocesses it to the configured `TARGET_SIZE` (224×224), normalizes pixels, runs the Keras model, and returns the predicted label.
  - Request: multipart/form-data with `file` field.
  - Response example: `{ "predicted_disease": "Tomato_Early_blight" }`.

- POST `/start_chat`
  - Description: Creates a short-term chat session (stored in-memory) for the given disease. Returns a `session_id` to be used for subsequent chat messages.
  - Request body: JSON `{ "disease": "<predicted_label>" }`.
  - Response example: `{ "session_id": "...", "message": "Chat started for disease: ..." }`.

- POST `/chat`
  - Description: Sends a message to the chat session. The backend forwards an aggregated conversation to Google Generative Language (Gemini) and returns the assistant reply.
  - Request body: JSON `{ "session_id": "...", "user_message": "..." }`.
  - Response example: `{ "response": "Short guidance or reply from Gemini" }`.

- POST `/end_chat`
  - Description: Ends and deletes the chat session.
  - Request body: JSON `{ "session_id": "..." }`.
  - Response example: `{ "message": "Chat session ended." }`.

Notes about backend configuration:

- The backend loads `inception_plantvillage.h5` on startup; the file must be present in `backend/`.
- The app expects an environment variable `GEMINI_API_KEY` (used to call Google Gen AI API). If it is not set, the app will raise an error on startup.
- CORS: the app configures CORS to allow `http://localhost:5173`, `http://localhost:3000`, and the optional `FRONTEND_URL` environment variable.

## Frontend usage and `src/lib/api.ts`

`Frontend/src/lib/api.ts` is the client helper which defines:

- `API_BASE_URL` — resolved from `import.meta.env.SERVER_URL` or defaults to `http://127.0.0.1:5000`.
- `predictPlantDisease(imageFile: File)` — uploads the image to `POST ${API_BASE_URL}/predict` and returns the JSON prediction.
- `startChatSession(disease)` — POSTs `{ disease }` to `/start_chat` and returns `{ session_id, message }`.
- `sendChatMessage(sessionId, userMessage)` — POSTs chat messages to `/chat` and returns `{ response }`.
- `endChatSession(sessionId)` — POSTs `{ session_id }` to `/end_chat`.

Type shapes provided by the client (matching backend responses):

- `PredictionResponse { predicted_disease: string }`
- `StartChatResponse { session_id: string; message: string }`
- `ChatResponse { response: string }`
- `EndChatResponse { message: string }`

Note: If the browser console shows a fetch error on port 6000, check the backend’s running port. By default, the backend runs on 5000, while Vite runs on 5173. Update SERVER_URL in your .env.local file to ensure both match.

## Setup & run (development)

Below are minimal steps to run both backend and frontend locally.

1) Backend (Windows PowerShell example)

```powershell
# 1. Create and activate a virtual environment (optional but recommended)
python -m venv .venv; .\.venv\Scripts\Activate.ps1

# 2. Install dependencies
pip install -r backend/requirements.txt

# 3. Ensure the model file exists
dir backend\inception_plantvillage.h5

# 4. Set required environment variables
setx GEMINI_API_KEY "<YOUR_GEMINI_API_KEY>"
# (You can also use a .env file — the backend uses python-dotenv.)

# 5. Run the backend (use port 5000 to match Frontend default)
cd backend
uvicorn app:app --reload --port 5000
```

2) Frontend

```powershell
cd Frontend
npm install
npm run dev
# By default Vite serves on http://localhost:5173
```

3) Running end-to-end

- Open the frontend (Vite) URL (usually `http://localhost:5173`).
- Use the Detect page to upload an image and submit. The frontend calls `POST ${API_BASE_URL}/predict`.
- After getting a predicted disease, you can start a chat session from the UI which calls `/start_chat` and `/chat`.

## Environment configuration

- Backend: `GEMINI_API_KEY` (required for chat). Optionally set `FRONTEND_URL`.
- Frontend: `import.meta.env.SERVER_URL` (set in your Vite env file — e.g., `.env.local`) to point to the backend if different from `http://127.0.0.1:5000`.

## Troubleshooting

- Model load errors on startup:
  - Ensure `inception_plantvillage.h5` exists in `backend/` and is compatible with the installed TensorFlow/Keras versions.
  - Check Python package versions in `backend/requirements.txt` (this repo pins `tensorflow==2.19.0` and `keras==3.10.0`).

- `GEMINI_API_KEY` related errors:
  - The backend will raise an error if the API key is not present. Set `GEMINI_API_KEY` in environment or a `.env` file.

- CORS or connection issues from the frontend:
  - Confirm `API_BASE_URL` in `Frontend/src/lib/api.ts` matches where the backend is running.
  - Check backend CORS origin configuration in `backend/app.py`.

## Security & production notes

- The app stores chat sessions in-memory — not persistent and not suitable for production scale.
- The backend directly calls an external Gen AI API using an API key; do not commit secrets to the repo. For production use, protect the key and consider server-side rate limits, caching, and proper error handling.

  

## Next steps / suggested improvements

- Persist chat history to a database if you need longer-lived sessions.
- Add tests (unit + integration) for the backend endpoints and frontend helpers.
- Add a small health endpoint and readiness checks before using the service in production.
- Improve error messages and unify the expected backend port across frontend and backend configuration (resolve the `6000` vs `5000` inconsistency if present).

## Contributing

Please open issues or PRs. Add tests for new features and keep changes scoped.

## License

This repository does not include a license file. Add a `LICENSE` file if you intend to open-source it.

---


