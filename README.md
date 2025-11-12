# 🌿 **LeafLens**

LeafLens is a small full-stack app that helps farmers identify **plant diseases** from images 🌱 and get **short, actionable guidance** through a chat assistant powered by **Google Generative AI (Gemini)** 🤖.

> “This README provides an overview of the project, its structure, API details, and setup instructions for local development.”

---

## 🧠 **Tech Stack**

| Layer              | Technology                        |
| ------------------ | --------------------------------- |
| **Backend**        | FastAPI, TensorFlow/Keras, Python |
| **Frontend**       | React, TypeScript, Vite           |
| **AI Integration** | Google Generative AI (Gemini)     |

---

## ⚙️ **Prerequisites**

Before running the project, ensure you have:

* 🐍 **Python** 3.10 or later
* 💻 **Node.js** 18+ and **npm**
* 🔑 A valid **Google Gemini API Key** (`GEMINI_API_KEY`)

---

## 🌟 **Key Features**

✨ Upload an image and receive a predicted disease label
💬 Start a chat session for disease-specific guidance (powered by Gemini)
🧩 Minimal frontend (Vite + React/TypeScript) showcasing image upload, prediction, and chat

---

## 📖 **Quick Glossary / API Contract**

| Feature              | Description                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Predict endpoint** | Accepts an image file and returns `{ predicted_disease: string }`.                                                  |
| **Chat session**     | Start with `{ disease }` → returns `session_id`; send messages `{ session_id, user_message }` → get `{ response }`. |
| **Model**            | `backend/inception_plantvillage.h5` — Keras model for plant disease classification.                                 |

---

## 🗂️ **Repository Structure**

```
LeafLens/
├── backend/
│   ├── app.py                # FastAPI app (endpoints, model, chat session)
│   ├── inception_plantvillage.h5   # Pretrained Keras model
│   ├── models.py             # Pydantic request models
│   └── requirements.txt      # Backend dependencies
│
├── Frontend/
│   ├── src/lib/api.ts        # Helper for API requests
│   ├── src/pages/Detect.tsx  # Image upload & prediction
│   ├── src/pages/Results.tsx # Results & chat UI
│   └── package.json          # Frontend dependencies
```

---

## 🧩 **Backend Overview (`backend/app.py`)**

### 🔹 Endpoints

#### 🧠 POST `/predict`

* Accepts an image, preprocesses it (224×224), runs the Keras model, and returns a label.
  **Example response:**

```json
{ "predicted_disease": "Tomato_Early_blight" }
```

#### 💬 POST `/start_chat`

* Starts a short-lived chat session.
  **Example response:**

```json
{ "session_id": "...", "message": "Chat started for disease: ..." }
```

#### 📤 POST `/chat`

* Sends a user message and gets a Gemini-generated response.
  **Example response:**

```json
{ "response": "Short guidance or reply from Gemini" }
```

#### ❌ POST `/end_chat`

* Ends and deletes a chat session.
  **Example response:**

```json
{ "message": "Chat session ended." }
```

### ⚙️ Configuration Notes

* Model file `inception_plantvillage.h5` **must exist** in `backend/`.
* Environment variable `GEMINI_API_KEY` is **required**.
* CORS is configured for:
  `http://localhost:5173`, `http://localhost:3000`, and optional `FRONTEND_URL`.

---

## 💻 **Frontend Usage – `Frontend/src/lib/api.ts`**

Defines helper functions to call backend endpoints:

| Function                                  | Description                    |
| ----------------------------------------- | ------------------------------ |
| `predictPlantDisease(imageFile)`          | Uploads image → `/predict`     |
| `startChatSession(disease)`               | Starts session → `/start_chat` |
| `sendChatMessage(sessionId, userMessage)` | Sends message → `/chat`        |
| `endChatSession(sessionId)`               | Ends session → `/end_chat`     |

**Default API base URL:**
`http://127.0.0.1:5000` (can be overridden via `import.meta.env.SERVER_URL`)

⚠️ **Note:**
If you see an error mentioning port `6000`, verify that both the backend and frontend are running on the correct ports (`5000` and `5173` respectively). Update `.env.local` if needed.

---

## 🚀 **Setup & Run (Development)**

### 🧩 1) Backend Setup (Windows PowerShell Example)

```powershell
# 1. Create and activate a virtual environment
python -m venv .venv; .\.venv\Scripts\Activate.ps1

# 2. Install dependencies
pip install -r backend/requirements.txt

# 3. Check the model file
dir backend\inception_plantvillage.h5

# 4. Set the Gemini API Key
setx GEMINI_API_KEY "<YOUR_GEMINI_API_KEY>"

# 5. Run backend on port 5000
cd backend
uvicorn app:app --reload --port 5000
```

### 🧠 2) Frontend Setup

```powershell
cd Frontend
npm install
npm run dev
# Default: http://localhost:5173
```

### 🌍 3) Run End-to-End

1. Open your browser at `http://localhost:5173`.
2. Upload an image via the **Detect** page.
3. View prediction and start a chat for disease guidance.

---

## 🌿 **Screenshot / Demo**

> *(Add your app screenshot or GIF demo here)*

![App Screenshot Placeholder](docs/demo.png)

---

## 🧾 **Environment Configuration**

| Component    | Variable                     | Description                                |
| ------------ | ---------------------------- | ------------------------------------------ |
| **Backend**  | `GEMINI_API_KEY`             | Required for Gemini chat                   |
| **Backend**  | `FRONTEND_URL`               | (Optional) allowed CORS origin             |
| **Frontend** | `import.meta.env.SERVER_URL` | Set in `.env.local` if backend URL differs |

---

## 🧰 **Troubleshooting**

⚠️ **Model load errors**

* Ensure `inception_plantvillage.h5` exists and is TensorFlow-compatible.
* Check package versions in `backend/requirements.txt`.

⚠️ **API key errors**

* Set `GEMINI_API_KEY` in your environment or `.env`.

⚠️ **CORS / Connection issues**

* Confirm backend CORS setup matches frontend origin.
* Ensure both services use the same base URL and port.

---

## 🔐 **Security & Production Notes**

* Sessions are **in-memory** — not persisted.
* Do **not** commit your API key or secrets to GitHub.
* For production, add rate limiting, error handling, and request logging.

---

## 🚧 **Next Steps / Suggested Improvements**

✅ Store chat history in a database
✅ Add unit and integration tests
✅ Add health/readiness endpoints
✅ Improve error messages and unify ports

---

## 🤝 **Contributing**

Pull requests and issues are welcome!
Please include relevant tests for new features and keep PRs focused.

---

## 📜 **License**

This repository currently has **no license file**.
Add one (e.g., MIT or Apache 2.0) if you plan to open-source it.

---
