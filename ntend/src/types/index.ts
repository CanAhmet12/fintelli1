// Mevcut tiplere ek olarak
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