interface DetailCardProps {
  title: string
  details?: any
  value?: string
}

export function DetailCard({ title, details, value }: DetailCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-medium text-gray-700 mb-2">{title}</h4>
      
      {value ? (
        <p className="text-gray-900">{value}</p>
      ) : details ? (
        <div className="space-y-2">
          {details.score && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Puan</span>
              <span className="font-medium">{details.score}/100</span>
            </div>
          )}
          
          {details.length && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Uzunluk</span>
              <span className="font-medium">{details.length} karakter</span>
            </div>
          )}
          
          {details.keywords && (
            <div className="flex flex-wrap gap-2">
              {details.keywords.map((keyword: string, index: number) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
} 