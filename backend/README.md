# Plant Disease Detection and Chatbot Backend

This repository contains a FastAPI-based backend application for plant disease detection and a chatbot to assist farmers with disease-related queries. The application uses a fine-tuned InceptionNet model for disease prediction and integrates with Google Gen AI for chatbot functionality.

## Features

1. **Disease Prediction**:
   - Accepts an image of a plant leaf.
   - Preprocesses the image and predicts the disease using a pre-trained model.

2. **Chatbot Assistance**:
   - Starts a chat session after predicting the disease.
   - Allows farmers to ask disease-related questions.
   - Ensures chat memory persists until the session ends or times out.

3. **Session Management**:
   - Automatically cleans up inactive chat sessions after 10 minutes.

## Requirements

- Python 3.10 or higher
- TensorFlow
- FastAPI
- Uvicorn
- Requests
- Python-dotenv
- Pre-trained model file (`model.h5`)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TalhaBinShahid/LeafLens.git
   cd LeafLens
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Place the `model.h5` file in the project directory.

4. Create a `.env` file in the project directory and add your Google Gen AI API key:
   ```env
   GEMINI_API_KEY=your_google_gen_ai_api_key
   ```

## Usage

1. Start the FastAPI server:
   ```bash
   uvicorn app:app --reload --port 6000
   ```

2. Open Postman or any API testing tool to interact with the endpoints.

### Endpoints

#### 1. `/predict` (POST)
- **Description**: Predicts the disease from an uploaded image.
- **Request**:
  - Form-data: `file` (image file)
- **Response**:
  ```json
  {
    "predicted_disease": "Disease Name"
  }
  ```

#### 2. `/start_chat` (POST)
- **Description**: Starts a chat session for the predicted disease.
- **Request**:
  ```json
  {
    "disease": "Disease Name"
  }
  ```
- **Response**:
  ```json
  {
    "session_id": "unique_session_id",
    "message": "Chat started for disease: Disease Name"
  }
  ```

#### 3. `/chat` (POST)
- **Description**: Sends a user message to the chatbot and receives a response.
- **Request**:
  ```json
  {
    "session_id": "unique_session_id",
    "user_message": "Your question here"
  }
  ```
- **Response**:
  ```json
  {
    "response": "Chatbot's response"
  }
  ```

#### 4. `/end_chat` (POST)
- **Description**: Ends the chat session.
- **Request**:
  ```json
  {
    "session_id": "unique_session_id"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Chat session ended."
  }
  ```

## Notes

- Ensure the `GEMINI_API_KEY` is valid and has the necessary permissions.
- The chatbot only answers questions related to the predicted disease.
- Sessions are automatically cleaned up after 10 minutes of inactivity.
- The `models.py` file contains Pydantic models for request validation:
  - `StartChatRequest`: Validates the `disease` field for `/start_chat`.
  - `ChatRequest`: Validates the `session_id` and `user_message` fields for `/chat`.
  - `EndChatRequest`: Validates the `session_id` field for `/end_chat`.
