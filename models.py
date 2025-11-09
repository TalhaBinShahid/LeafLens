from pydantic import BaseModel

class StartChatRequest(BaseModel):
    disease: str

class ChatRequest(BaseModel):
    session_id: str
    user_message: str

class EndChatRequest(BaseModel):
    session_id: str