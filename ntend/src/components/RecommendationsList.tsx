import { Recommendation } from '@/types'

interface Props {
  recommendations: Recommendation[]
}

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
}

export function RecommendationsList({ recommendations }: Props) {
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <div 
          key={index}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900">{rec.type}</h4>
            <span 
              className={`${priorityColors[rec.priority]} text-sm px-2 py-1 rounded`}
            >
              {rec.priority}
            </span>
          </div>
          
          <p className="text-gray-600 mb-2">{rec.description}</p>
          
          <div className="flex items-center gap-2">
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
  )
} 