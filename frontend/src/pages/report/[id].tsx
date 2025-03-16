import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AnalysisResult } from '@/types'
import { getAnalysisReport } from '@/services/api'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'
import { ReportHeader } from '@/components/report/ReportHeader'
import { ReportSummary } from '@/components/report/ReportSummary'
import { ReportDetails } from '@/components/report/ReportDetails'
import { ReportCharts } from '@/components/report/ReportCharts'

export default function Report() {
  const router = useRouter()
  const { id } = router.query
  const [report, setReport] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadReport()
    }
  }, [id])

  const loadReport = async () => {
    try {
      setLoading(true)
      const data = await getAnalysisReport(id as string)
      setReport(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rapor yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(`/api/reports/${id}/pdf`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `report-${id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF indirme hatası:', err)
    }
  }

  return (
    <>
      <Head>
        <title>Analiz Raporu - Fintelli AI</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : report ? (
          <div className="container mx-auto px-4 py-8">
            <ReportHeader 
              url={report.url} 
              date={report.timestamp}
              onDownloadPDF={handleDownloadPDF}
            />
            
            <ReportSummary 
              overallScore={report.overall_score}
              seoScore={report.seo.score}
              performanceScore={report.performance.metrics.score}
            />

            <ReportCharts 
              seoData={report.seo}
              performanceData={report.performance}
            />

            <ReportDetails 
              seoDetails={report.seo}
              performanceDetails={report.performance}
              recommendations={report.ai_recommendations}
            />
          </div>
        ) : null}
      </main>
    </>
  )
} 