import { AnalysisResult } from '@/types'
import { ScoreCard } from './ScoreCard'

interface Props {
  analysis: AnalysisResult
}

export function HistoryCard({ analysis }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{analysis.url}</h2>
          <p className="text-sm text-gray-500">
            {new Date(analysis.timestamp).toLocaleString()}
          </p>
        </div>
        <button 
          onClick={() => window.open(`/report/${analysis.id}`, '_blank')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Raporu Görüntüle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard
          title="Genel Puan"
          score={analysis.overall_score}
          color="blue"
        />
        <ScoreCard
          title="SEO Puanı"
          score={analysis.seo.score}
          color="green"
        />
        <ScoreCard
          title="Performans Puanı"
          score={analysis.performance.metrics.score}
          color="purple"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-gray-900 mb-2">Öne Çıkan Öneriler</h3>
        <ul className="space-y-2">
          {analysis.ai_recommendations
            .filter(rec => rec.priority === 'high')
            .slice(0, 3)
            .map((rec, index) => (
              <li 
                key={index}
                className="text-sm text-gray-600 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-red-500" />
                {rec.description}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
} 