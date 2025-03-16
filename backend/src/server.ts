import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import { analyzeRouter } from './routes/analyze'
import { authRouter } from './routes/auth'
import { reportsRouter } from './routes/reports'

// Çevre değişkenlerini yükle
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

// Veritabanı bağlantısı
connectDB().catch(err => {
  console.error('Veritabanı bağlantı hatası:', err)
  process.exit(1)
})

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/v1/analyze', analyzeRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/reports', reportsRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
}) 