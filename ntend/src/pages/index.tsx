import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AnalysisResult } from '@/types'
import { analyzeWebsite } from '@/services/api'
import { AnalysisResults } from '@/components/AnalysisResults'
import { ErrorMessage } from '@/components/ErrorMessage'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useAuth } from '../services/auth'

export default function Home() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const token = useAuth.getState().token
      if (!token) {
        router.push('/login')
      }
    }
  }, [mounted, router])

  const handleAnalyze = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await analyzeWebsite(url)
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return null // veya loading spinner
  }

  return (
    <>
      <Head>
        <title>Fintelli AI - SEO ve Web Site Optimizasyon</title>
        <meta name="description" content="AI tabanlı SEO ve web site optimizasyon platformu" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Fintelli AI
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4 mb-8">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Web sitesi URL'si girin"
                className="flex-1 px-4 py-2 rounded-lg"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !url}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Analiz ediliyor...' : 'Analiz Et'}
              </button>
            </div>

            {error && <ErrorMessage message={error} />}
            {loading && <LoadingSpinner />}
            {result && <AnalysisResults result={result} />}
          </div>
        </div>
      </main>
    </>
  )
} 