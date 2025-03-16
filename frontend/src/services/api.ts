import axios from 'axios'
import { authService } from './auth'
import { AnalysisResult, User } from '@/types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
})

// Request interceptor'ı ekle
api.interceptors.request.use((config) => {
  const token = authService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const analyzeWebsite = async (url: string): Promise<AnalysisResult> => {
  try {
    const response = await api.post('/analyze/full', { url })
    return response.data
  } catch (error) {
    console.error('API error:', error)
    throw new Error('Analiz sırasında bir hata oluştu')
  }
}

interface LoginResponse {
  token: string
  user: User
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { email, password })
    return response.data
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error)
    throw new Error(error.response?.data?.message || 'Giriş sırasında bir hata oluştu')
  }
}

export const register = async (email: string, password: string, name: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/register', { email, password, name })
    return response.data
  } catch (error: any) {
    console.error('Register error:', error.response?.data || error)
    throw new Error(error.response?.data?.message || 'Kayıt sırasında bir hata oluştu')
  }
}

export const getWebsiteHistory = async (url: string): Promise<AnalysisResult[]> => {
  const response = await api.get<AnalysisResult[]>(`/history/${encodeURIComponent(url)}`)
  return response.data
}

export const getAnalysisReport = async (id: string): Promise<AnalysisResult> => {
  const response = await api.get<AnalysisResult>(`/reports/${id}`)
  return response.data
}