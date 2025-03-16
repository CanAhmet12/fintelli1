export interface AnalysisResult {
  url: string
  id: string
  timestamp: string
  seo: {
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
  performance: {
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
  ai_recommendations: Array<{
    type: string
    description: string
    priority: 'high' | 'medium' | 'low'
    impact: number
  }>
  overall_score: number
}

export interface SEOResult {
  title: TitleAnalysis
  meta: MetaAnalysis
  keywords: KeywordAnalysis
  score: number
  recommendations: string[]
}

export interface PerformanceResult {
  metrics: {
    load_time: number
    page_size: number
    status_code: number
    resource_count: ResourceCount
    score: number
  }
  recommendations: string[]
}

export interface Recommendation {
  type: string
  description: string
  priority: 'high' | 'medium' | 'low'
  impact: number
}

export interface TitleAnalysis {
  title: string
  length: number
  score: number
  recommendations: string[]
}

export interface MetaAnalysis {
  description: string
  length: number
  score: number
  recommendations: string[]
}

export interface KeywordAnalysis {
  keywords: string[]
  density: { [key: string]: number }
  recommendations: string[]
}

export interface ResourceCount {
  images: number
  scripts: number
  styles: number
}

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

// ... diğer tip tanımlamaları 