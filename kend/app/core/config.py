from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Fintelli AI"
    API_V1_STR: str = "/api/v1"
    
    # Database settings
    DATABASE_URL: str = "sqlite:///./fintelli.db"
    
    # API settings
    BACKEND_CORS_ORIGINS: list = ["*"]
    
    # AI Model settings
    MODEL_PATH: str = "models"
    
    class Config:
        case_sensitive = True

settings = Settings() 