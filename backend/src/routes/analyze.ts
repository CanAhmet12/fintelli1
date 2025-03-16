import { Router, Request } from 'express'
import { analyzeSEO } from '../services/seo'
import { analyzePerformance } from '../services/performance'
import { generateAIRecommendations } from '../services/ai'
import { auth } from '../middleware/auth'
import { Report } from '../models/Report'

// Auth request tipi tanımı
interface AuthRequest extends Request {
  user?: {
    userId: string
  }
}

const router = Router()

router.post('/full', auth, async (req: AuthRequest, res) => {
  try {
    const { url } = req.body

    if (!req.user?.userId) {
      return res.status(401).json({ error: 'Yetkilendirme hatası' })
    }

    // Paralel analiz işlemleri
    const [seoResults, performanceResults] = await Promise.all([
      analyzeSEO(url),
      analyzePerformance(url)
    ])

    // AI önerileri
    const recommendations = await generateAIRecommendations(seoResults, performanceResults)

    // Genel puan hesaplama
    const overall_score = (seoResults.score + performanceResults.metrics.score) / 2

    const result = {
      url,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      seo: seoResults,
      performance: performanceResults,
      ai_recommendations: recommendations,
      overall_score
    }

    // Raporu kaydet
    const report = new Report({
      userId: req.user.userId,
      url,
      seo: seoResults,
      performance: performanceResults,
      ai_recommendations: recommendations,
      overall_score
    })

    await report.save()

    res.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    res.status(500).json({ error: 'Analiz sırasında bir hata oluştu' })
  }
})

export { router as analyzeRouter } 