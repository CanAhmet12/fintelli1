import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  token: string | null
  user: User | null
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
}

const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user })
}))

// Tarayıcıda localStorage'dan token'ı yükle
if (typeof window !== 'undefined') {
  const savedAuth = localStorage.getItem('auth')
  if (savedAuth) {
    try {
      const { token, user } = JSON.parse(savedAuth)
      useAuthStore.setState({ token, user })
    } catch (error) {
      localStorage.removeItem('auth')
    }
  }
}

// State değişikliklerini localStorage'a kaydet
useAuthStore.subscribe((state) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth', JSON.stringify({
      token: state.token,
      user: state.user
    }))
  }
})

export const authService = {
  getToken: () => useAuthStore.getState().token,
  
  async login(email: string, password: string): Promise<User> {
    const response = await fetch('/api/auth/login', {
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
    useAuthStore.setState({ 
      token: data.token,
      user: data.user
    })
    return data.user
  },

  logout() {
    useAuthStore.setState({ token: null, user: null })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth')
      window.location.href = '/login'
    }
  }
}

export const useAuth = () => {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  return { token, user }
} 