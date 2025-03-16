from bs4 import BeautifulSoup
import requests
import spacy
from keybert import KeyBERT

class SEOAnalyzer:
    def __init__(self):
        self.nlp = spacy.load("tr_core_news_lg")
        self.keyword_extractor = KeyBERT()
        
    async def fetch_page_content(self, url: str) -> str:
        try:
            response = requests.get(url)
            response.raise_for_status()
            return response.text
        except Exception as e:
            raise Exception(f"Sayfa içeriği alınamadı: {str(e)}")
    
    def analyze_title(self, content: str) -> dict:
        soup = BeautifulSoup(content, 'html.parser')
        title = soup.title.string if soup.title else ""
        
        return {
            "title": title,
            "length": len(title),
            "score": self._score_title(title),
            "recommendations": self._get_title_recommendations(title)
        }
    
    def _score_title(self, title: str) -> int:
        score = 100
        if len(title) < 30 or len(title) > 60:
            score -= 20
        # Diğer title değerlendirme kriterleri...
        return score
    
    def _get_title_recommendations(self, title: str) -> list:
        recommendations = []
        if len(title) < 30:
            recommendations.append("Başlık çok kısa. 30-60 karakter arasında olmalı.")
        # Diğer öneriler...
        return recommendations 