import { ScoreCard } from '../ScoreCard'

interface Props {
  overallScore: number
  seoScore: number
  performanceScore: number
}

export function ReportSummary({ overallScore, seoScore, performanceScore }: Props) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Özet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreCard
          title="Genel Puan"
          score={overallScore}
          color="blue"
        />
        <ScoreCard
          title="SEO Puanı"
          score={seoScore}
          color="green"
        />
        <ScoreCard
          title="Performans Puanı"
          score={performanceScore}
          color="purple"
        />
      </div>
    </div>
  )
} 