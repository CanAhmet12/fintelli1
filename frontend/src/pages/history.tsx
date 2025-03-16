import { useState, useEffect } from 'react'
import Head from 'next/head'
import { getWebsiteHistory } from '@/services/api'
import { AnalysisResult } from '@/types'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function History() {
  const [history, setHistory] = useState<AnalysisResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const data = await getWebsiteHistory()
      setHistory(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Geçmiş yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Analiz Geçmişi - Fintelli AI</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Analiz Geçmişi
          </h1>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <div className="grid gap-6">
              {history.map((analysis, index) => (
                <HistoryCard key={index} analysis={analysis} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
} 