from bs4 import BeautifulSoup

class SEOAnalyzer:
    # ... mevcut metodlar ...
    
    async def analyze_meta_description(self, content: str) -> dict:
        soup = BeautifulSoup(content, 'html.parser')
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        description = meta_desc.get('content', '') if meta_desc else ''
        
        return {
            "description": description,
            "length": len(description),
            "score": self._score_meta_description(description),
            "recommendations": self._get_meta_recommendations(description)
        }
    
    async def analyze_keywords(self, content: str) -> dict:
        # Sayfadaki metni çıkar
        soup = BeautifulSoup(content, 'html.parser')
        text = ' '.join([p.text for p in soup.find_all('p')])
        
        # KeyBERT ile anahtar kelimeleri çıkar
        keywords = self.keyword_extractor.extract_keywords(text, 
                                                         keyphrase_ngram_range=(1, 2),
                                                         stop_words='turkish',
                                                         top_n=5)
        
        return {
            "keywords": keywords,
            "density": self._calculate_keyword_density(text, keywords),
            "recommendations": self._get_keyword_recommendations(keywords)
        }
    
    async def analyze_page(self, url: str) -> dict:
        content = await self.fetch_page_content(url)
        
        title_analysis = self.analyze_title(content)
        meta_analysis = await self.analyze_meta_description(content)
        keyword_analysis = await self.analyze_keywords(content)
        
        overall_score = (
            title_analysis["score"] +
            meta_analysis["score"]
        ) / 2
        
        return {
            "title": title_analysis,
            "meta": meta_analysis,
            "keywords": keyword_analysis,
            "score": overall_score,
            "recommendations": (
                title_analysis["recommendations"] +
                meta_analysis["recommendations"]
            )
        } 