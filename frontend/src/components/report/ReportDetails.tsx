import { SEOResult, PerformanceResult, Recommendation } from '@/types'
import { DetailCard } from '../DetailCard'

interface Props {
  seoDetails: SEOResult
  performanceDetails: PerformanceResult
  recommendations: Recommendation[]
}

export function ReportDetails({ seoDetails, performanceDetails, recommendations }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">SEO Analizi</h2>
        <div className="space-y-4">
          <DetailCard
            title="Başlık Analizi"
            details={{
              title: seoDetails.title.title,
              length: seoDetails.title.length,
              score: seoDetails.title.score,
              recommendations: seoDetails.title.recommendations
            }}
          />
          <DetailCard
            title="Meta Açıklama"
            details={{
              description: seoDetails.meta.description,
              length: seoDetails.meta.length,
              score: seoDetails.meta.score
            }}
          />
          <DetailCard
            title="Anahtar Kelimeler"
            details={{
              keywords: Object.keys(seoDetails.keywords.density),
              density: seoDetails.keywords.density
            }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Performans Analizi</h2>
        <div className="space-y-4">
          <DetailCard
            title="Yükleme Süresi"
            value={`${performanceDetails.metrics.load_time.toFixed(2)}s`}
          />
          <DetailCard
            title="Sayfa Boyutu"
            value={`${(performanceDetails.metrics.page_size / 1024 / 1024).toFixed(2)}MB`}
          />
          <DetailCard
            title="Kaynaklar"
            details={{
              images: performanceDetails.metrics.resource_count.images,
              scripts: performanceDetails.metrics.resource_count.scripts,
              styles: performanceDetails.metrics.resource_count.styles
            }}
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">AI Önerileri</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{rec.type}</h4>
                  <span 
                    className={`px-2 py-1 text-sm rounded ${
                      rec.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : rec.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>
                <p className="text-gray-600">{rec.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-500">Etki:</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full">
                    <div 
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${rec.impact}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{rec.impact}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 