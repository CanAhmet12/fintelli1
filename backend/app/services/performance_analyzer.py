import time
import requests
from bs4 import BeautifulSoup

class PerformanceAnalyzer:
    def __init__(self):
        self.metrics = {}
    
    async def analyze_performance(self, url: str) -> dict:
        start_time = time.time()
        
        try:
            response = requests.get(url)
            load_time = time.time() - start_time
            
            metrics = {
                "load_time": load_time,
                "status_code": response.status_code,
                "page_size": len(response.content),
                "resource_count": self._count_resources(response.text)
            }
            
            return {
                "metrics": metrics,
                "score": self._calculate_performance_score(metrics),
                "recommendations": self._generate_recommendations(metrics)
            }
            
        except Exception as e:
            raise Exception(f"Performans analizi başarısız: {str(e)}")
    
    def _count_resources(self, html: str) -> dict:
        soup = BeautifulSoup(html, 'html.parser')
        return {
            "images": len(soup.find_all('img')),
            "scripts": len(soup.find_all('script')),
            "styles": len(soup.find_all('link', rel='stylesheet'))
        }
    
    def _calculate_performance_score(self, metrics: dict) -> int:
        score = 100
        
        if metrics["load_time"] > 3:
            score -= 20
        if metrics["page_size"] > 5000000:  # 5MB
            score -= 15
            
        return score

    def _generate_recommendations(self, metrics: dict) -> list:
        recommendations = []
        
        if metrics["load_time"] > 3:
            recommendations.append("Sayfa yükleme süresi 3 saniyeden fazla. İyileştirilebilir.")
        if metrics["page_size"] > 5000000:  # 5MB
            recommendations.append("Sayfa boyutu 5MB'yi aşıyor. İyileştirilebilir.")
        
        return recommendations 