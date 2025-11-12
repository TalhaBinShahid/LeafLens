# LeafLens Backend Integration Guide

## ✅ Integration Complete!

Your frontend has been successfully integrated with the FastAPI backend. All Supabase dependencies have been removed and replaced with direct API calls to your FastAPI server.

## 🔧 Changes Made

### 1. **Environment Configuration**
- **File**: `.env`
- Replaced Supabase credentials with FastAPI backend URL
- Default: `VITE_API_URL=http://localhost:6000`

### 2. **New API Service**
- **File**: `src/lib/api.ts`
- Created complete API service with functions:
  - `predictPlantDisease()` - Calls `/predict` endpoint
  - `startChatSession()` - Calls `/start_chat` endpoint
  - `sendChatMessage()` - Calls `/chat` endpoint
  - `endChatSession()` - Calls `/end_chat` endpoint
- Includes helper functions for formatting disease names and generating disease info

### 3. **Updated Components**

#### **Detect Page** (`src/pages/Detect.tsx`)
- Replaced `mockDetection` with real API call to `/predict`
- Uploads image file to backend
- Processes backend response and formats for display
- Shows proper error messages if backend is unavailable

#### **Results Page** (`src/pages/Results.tsx`)
- Removed Supabase `saveDetectionResult`
- Calls `/start_chat` on component mount to initialize chat session
- Passes `sessionId` to Chatbot component
- Shows loading state while initializing chat

#### **Chatbot Component** (`src/components/Chatbot.tsx`)
- Completely rewritten to use FastAPI backend
- Uses session-based chat via `/chat` endpoint
- Automatically ends chat session on unmount via `/end_chat`
- Real-time AI responses from Google Gemini API
- Removed local mock response generation

### 4. **Dependencies**
- **Removed**: `@supabase/supabase-js`
- **Kept**: All existing UI libraries (React Router, Lucide React, etc.)

## 🚀 How to Run

### Start Backend (Terminal 1)
```bash
cd "e:\LeafLens full project\backend"
uvicorn app:app --reload --port 6000
```

### Start Frontend (Terminal 2)
```bash
cd "e:\LeafLens full project\my-project"
npm run dev
```

## 🔄 API Flow

### Disease Detection Flow:
1. User uploads image on `/detect` page
2. Frontend sends image to `POST /predict`
3. Backend processes with InceptionNet model
4. Returns `{"predicted_disease": "Disease_Name"}`
5. Frontend formats and displays on `/results` page

### Chat Flow:
1. Results page calls `POST /start_chat` with disease name
2. Backend returns `{"session_id": "uuid", "message": "..."}`
3. User sends messages via Chatbot component
4. Each message goes to `POST /chat` with session_id
5. Backend uses Gemini AI to generate responses
6. When user leaves page, frontend calls `POST /end_chat`

## 📝 Important Notes

1. **Backend Must Be Running**: The frontend requires the FastAPI backend to be running on `http://localhost:6000`

2. **CORS**: If you encounter CORS errors, add this to your `app.py`:
   ```python
   from fastapi.middleware.cors import CORSMiddleware
   
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:5173"],  # Vite dev server
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

3. **Port Configuration**: 
   - Backend: Port 6000 (configurable in uvicorn command)
   - Frontend: Port 5173 (default Vite port)
   - Update `.env` if you change backend port

4. **Model File**: Ensure `inception_plantvillage.h5` is in the backend directory

5. **API Key**: Ensure `GEMINI_API_KEY` is set in backend `.env`

## 🎨 Design Preserved

All original styling, layout, and UI components remain unchanged. The integration only modified:
- Data fetching logic
- API calls
- State management for chat sessions

No visual changes were made to the application.

## 🐛 Troubleshooting

### Error: "Failed to predict plant disease"
- Check if backend is running
- Verify backend URL in frontend `.env`
- Check browser console for detailed error

### Error: "Failed to start chat session"
- Ensure backend is running
- Check if `GEMINI_API_KEY` is set in backend `.env`
- Verify session management is working

### CORS Errors
- Add CORS middleware to backend (see notes above)
- Ensure frontend origin is allowed

## 📚 Backend Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/predict` | POST | Upload image, get disease prediction |
| `/start_chat` | POST | Initialize chat session for a disease |
| `/chat` | POST | Send message and get AI response |
| `/end_chat` | POST | Clean up chat session |

## ✨ Success!

Your LeafLens application is now fully integrated with the FastAPI backend. The AI-powered disease detection and chatbot features are ready to use!
