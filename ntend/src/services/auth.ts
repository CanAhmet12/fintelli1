import { User } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

interface AuthState {
  token: string | null
  user: User | null
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Client-side only fonksiyonlar
export const authService = {
  async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Geçersiz e-posta veya şifre')
    }

    const data = await response.json()
    useAuth.getState().setToken(data.token)
    useAuth.getState().setUser(data.user)
    return data.user
  },

  logout() {
    useAuth.getState().setToken(null)
    useAuth.getState().setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
    }
  },

  getToken(): string | null {
    return useAuth.getState().token
  },

  async getCurrentUser(): Promise<User | null> {
    const token = this.getToken()
    if (!token) return null

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Kullanıcı bilgileri alınamadı')
      }

      const user = await response.json()
      useAuth.getState().setUser(user)
      return user
    } catch {
      return null
    }
  }
} 