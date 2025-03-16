from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

class Website(Base):
    __tablename__ = "websites"
    
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    last_scan = Column(DateTime(timezone=True), server_default=func.now())
    seo_score = Column(Float)
    performance_score = Column(Float)
    
    def __repr__(self):
        return f"<Website {self.url}>" 