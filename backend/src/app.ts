import express from 'express'
import cors from 'cors'
import { connectDB } from './config/database'
import { errorHandler } from './middleware/error'
import authRoutes from './routes/auth'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/v1/auth', authRoutes)

// Error handler
app.use(errorHandler)

// MongoDB bağlantısı
connectDB().catch(console.error)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`)
})

// Beklenmeyen hataları yakala
process.on('unhandledRejection', (err) => {
  console.error('Beklenmeyen hata:', err)
  process.exit(1)
}) 