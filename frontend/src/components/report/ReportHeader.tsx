interface Props {
  url: string
  date: string
  onDownloadPDF: () => void
}

export function ReportHeader({ url, date, onDownloadPDF }: Props) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Site Analiz Raporu
        </h1>
        <p className="text-gray-600">{url}</p>
        <p className="text-sm text-gray-500">
          {new Date(date).toLocaleString()}
        </p>
      </div>
      <button
        onClick={onDownloadPDF}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        PDF İndir
      </button>
    </div>
  )
} 