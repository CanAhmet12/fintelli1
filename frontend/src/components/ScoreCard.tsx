interface Props {
  title: string
  score: number
  color: 'blue' | 'green' | 'purple'
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  purple: 'bg-purple-100 text-purple-800',
}

export function ScoreCard({ title, score, color }: Props) {
  return (
    <div className={`rounded-lg p-6 ${colorClasses[color]}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-bold">{score.toFixed(1)}</div>
    </div>
  )
} 