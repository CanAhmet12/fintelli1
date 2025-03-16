export interface SEOResult {
  title: {
    title: string
    length: number
    score: number
    recommendations: string[]
  }
  meta: {
    description: string
    length: number
    score: number
    recommendations: string[]
  }
  keywords: {
    keywords: string[]
    density: { [key: string]: number }
    recommendations: string[]
  }
  score: number
}

export interface PerformanceResult {
  metrics: {
    load_time: number
    page_size: number
    status_code: number
    resource_count: {
      images: number
      scripts: number
      styles: number
    }
    score: number
  }
  recommendations: string[]
}

export interface AIRecommendation {
  type: string
  description: string
  priority: 'high' | 'medium' | 'low'
  impact: number
} 