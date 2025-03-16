import { AnalysisResult } from '@/types'

interface AnalysisResultsProps {
  result: AnalysisResult
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Analiz Sonuçları</h2>
      
      {/* SEO Sonuçları */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">SEO Analizi</h3>
        <div className="grid gap-4">
          <div>
            <h4 className="font-medium">Başlık</h4>
            <p>{result.seo.title.title}</p>
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded">
                <div 
                  className="h-2 bg-blue-600 rounded" 
                  style={{ width: `${result.seo.title.score}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium">Meta Açıklama</h4>
            <p>{result.seo.meta.description}</p>
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded">
                <div 
                  className="h-2 bg-blue-600 rounded" 
                  style={{ width: `${result.seo.meta.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performans Sonuçları */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Performans Analizi</h3>
        <div className="grid gap-4">
          <div>
            <h4 className="font-medium">Yükleme Süresi</h4>
            <p>{result.performance.metrics.load_time.toFixed(2)} saniye</p>
          </div>
          <div>
            <h4 className="font-medium">Sayfa Boyutu</h4>
            <p>{(result.performance.metrics.page_size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      </div>

      {/* AI Önerileri */}
      <div>
        <h3 className="text-xl font-semibold mb-3">AI Önerileri</h3>
        <ul className="list-disc pl-5 space-y-2">
          {result.ai_recommendations.map((rec, index) => (
            <li key={index} className="text-gray-700">
              {rec.description}
              <span className={`ml-2 px-2 py-1 text-xs rounded ${
                rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {rec.priority}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Genel Puan */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Genel Puan</h3>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(result.overall_score)}
          </div>
        </div>
      </div>
    </div>
  )
}