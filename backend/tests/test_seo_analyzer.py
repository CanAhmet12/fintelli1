import pytest
from app.services.seo_analyzer import SEOAnalyzer

@pytest.mark.asyncio
async def test_seo_analyzer():
    analyzer = SEOAnalyzer()
    result = await analyzer.analyze_page("https://example.com")
    
    assert "title" in result
    assert "score" in result
    assert isinstance(result["score"], int)
    assert 0 <= result["score"] <= 100 