import { SEOResult, PerformanceResult } from '../types'

export async function generateAIRecommendations(
  seoResults: SEOResult,
  performanceResults: PerformanceResult
) {
  const recommendations = []

  // SEO önerileri
  if (seoResults.title.score < 80) {
    recommendations.push({
      type: 'SEO',
      description: 'Sayfa başlığını optimize edin',
      priority: 'high',
      impact: 90
    })
  }

  if (seoResults.meta.score < 80) {
    recommendations.push({
      type: 'SEO',
      description: 'Meta açıklamayı geliştirin',
      priority: 'high',
      impact: 85
    })
  }

  // Performans önerileri
  if (performanceResults.metrics.load_time > 3) {
    recommendations.push({
      type: 'Performance',
      description: 'Sayfa yükleme süresini optimize edin',
      priority: 'high',
      impact: 95
    })
  }

  if (performanceResults.metrics.page_size > 2000000) {
    recommendations.push({
      type: 'Performance',
      description: 'Sayfa boyutunu küçültün',
      priority: 'medium',
      impact: 80
    })
  }

  // Kaynak optimizasyonu
  const { resource_count } = performanceResults.metrics
  if (resource_count.images > 10) {
    recommendations.push({
      type: 'Resource',
      description: 'Görsel sayısını ve boyutlarını optimize edin',
      priority: 'medium',
      impact: 75
    })
  }

  if (resource_count.scripts > 10) {
    recommendations.push({
      type: 'Resource',
      description: 'JavaScript dosyalarını birleştirin ve minimize edin',
      priority: 'medium',
      impact: 70
    })
  }

  return recommendations
} 