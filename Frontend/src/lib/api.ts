// src/lib/api.ts

// Base API configuration
export const API_BASE_URL = 
  import.meta.env.SERVER_URL || "http://127.0.0.1:5000";

// -----------------------------
// 📦 Type definitions
// -----------------------------

export interface PredictionResponse {
  predicted_disease: string;
}

export interface StartChatResponse {
  session_id: string;
  message: string;
}

export interface ChatResponse {
  response: string;
}

export interface EndChatResponse {
  message: string;
}

// -----------------------------
// 🧠 Utility functions
// -----------------------------

/** Predict plant disease from uploaded image */
export async function predictPlantDisease(
  imageFile: File
): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    console.log("Sending image to backend:", `${API_BASE_URL}/predict`);
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Prediction failed" }));
      throw new Error(error.detail || `Prediction failed (${response.status})`);
    }

    const data = await response.json();
    console.log("Prediction received:", data);
    return data;
  } catch (err: unknown) {
    console.error("Prediction error:", err);
    if (err instanceof Error && err.message.includes("fetch")) {
      throw new Error("Cannot connect to backend. Ensure it's running on port 6000.");
    }
    throw err;
  }
}

export async function startChatSession(
  disease: string
): Promise<StartChatResponse> {
  const response = await fetch(`${API_BASE_URL}/start_chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ disease }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Failed to start chat" }));
    throw new Error(error.detail);
  }

  return response.json();
}

/** Send a chat message */
export async function sendChatMessage(
  sessionId: string,
  userMessage: string
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, user_message: userMessage }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Chat failed" }));
    throw new Error(error.detail);
  }

  return response.json();
}

/** End an active chat session */
export async function endChatSession(
  sessionId: string
): Promise<EndChatResponse> {
  const response = await fetch(`${API_BASE_URL}/end_chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Failed to end chat" }));
    throw new Error(error.detail);
  }

  return response.json();
}
