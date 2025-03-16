import { SEOResult, PerformanceResult } from '@/types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface Props {
  seoData: SEOResult
  performanceData: PerformanceResult
}

export function ReportCharts({ seoData, performanceData }: Props) {
  const keywordData = Object.entries(seoData.keywords.density).map(([keyword, density]) => ({
    keyword,
    density: density * 100
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Anahtar Kelime Dağılımı</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={keywordData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="keyword" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="density" stroke="#3B82F6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Kaynak Dağılımı</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[performanceData.metrics.resource_count]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="images" stroke="#10B981" />
            <Line type="monotone" dataKey="scripts" stroke="#F59E0B" />
            <Line type="monotone" dataKey="styles" stroke="#6366F1" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 