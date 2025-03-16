from fastapi import APIRouter, HTTPException
from app.services.seo_analyzer import SEOAnalyzer
from app.services.performance_analyzer import PerformanceAnalyzer

router = APIRouter()

@router.post("/analyze")
async def analyze_website(url: str):
    try:
        seo_analyzer = SEOAnalyzer()
        performance_analyzer = PerformanceAnalyzer()
        
        seo_results = await seo_analyzer.analyze_page(url)
        performance_results = await performance_analyzer.analyze_performance(url)
        
        return {
            "seo": seo_results,
            "performance": performance_results,
            "overall_score": (seo_results.get("score", 0) + 
                            performance_results.get("score", 0)) / 2
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 