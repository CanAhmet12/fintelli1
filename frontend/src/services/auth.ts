import { User } from '@/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

interface AuthState {
  token: string | null
  user: User | null
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
}

// Create the store
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

// React hook for components
export const useAuth = () => {
  const token = useAuth.getState().token
  const user = useAuth.getState().user
  return { token, user }
}

// Client-side only fonksiyonlar
export const authService = {
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const token = await userCredential.user.getIdToken()
      
      // Firestore'dan kullanıcı bilgilerini al
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      const userData = userDoc.data() as User

      useAuth.getState().setToken(token)
      useAuth.getState().setUser(userData)
      return userData
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error('Geçersiz e-posta veya şifre')
    }
  },

  async register(email: string, password: string, name: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const token = await userCredential.user.getIdToken()

      const userData: User = {
        uid: userCredential.user.uid,
        email,
        name,
        role: 'user',
        createdAt: new Date()
      }

      // Firestore'a kullanıcı bilgilerini kaydet
      await setDoc(doc(db, 'users', userCredential.user.uid), userData)

      useAuth.getState().setToken(token)
      useAuth.getState().setUser(userData)
      return userData
    } catch (error: any) {
      console.error('Register error:', error)
      throw new Error('Kayıt sırasında bir hata oluştu')
    }
  },

  async logout() {
    try {
      await signOut(auth)
      useAuth.getState().setToken(null)
      useAuth.getState().setUser(null)
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
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
  },
} 