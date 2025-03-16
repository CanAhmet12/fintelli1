import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { authService } from '../services/auth'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await authService.login(email, password)
      router.push('/')
    } catch (error) {
      setError('Giriş başarısız')
    }
  }

  return (
    // ... mevcut JSX ...
  )
} 