from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from app.services.seo_analyzer import SEOAnalyzer
from app.services.performance_analyzer import PerformanceAnalyzer
from app.services.ai_optimizer import AIOptimizer
from app.db.session import get_db
from app.models.website import Website

router = APIRouter()

@router.post("/analyze/full")
async def analyze_website_full(
    url: str,
    db: Session = Depends(get_db)
):
    try:
        # Analizörleri başlat
        seo_analyzer = SEOAnalyzer()
        performance_analyzer = PerformanceAnalyzer()
        ai_optimizer = AIOptimizer()
        
        # Analizleri yap
        seo_results = await seo_analyzer.analyze_page(url)
        perf_results = await performance_analyzer.analyze_performance(url)
        
        # AI önerileri al
        ai_recommendations = ai_optimizer.predict_improvements({
            **seo_results,
            **perf_results
        })
        
        # Sonuçları veritabanına kaydet
        website = Website(
            url=url,
            seo_score=seo_results["score"],
            performance_score=perf_results["score"]
        )
        db.add(website)
        db.commit()
        
        return {
            "url": url,
            "seo": seo_results,
            "performance": perf_results,
            "ai_recommendations": ai_recommendations,
            "overall_score": (seo_results["score"] + perf_results["score"]) / 2
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/history/{url}")
async def get_website_history(
    url: str,
    db: Session = Depends(get_db)
):
    website = db.query(Website).filter(Website.url == url).first()
    if not website:
        raise HTTPException(status_code=404, detail="Website not found")
    return website 