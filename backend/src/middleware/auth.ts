import { Request, Response, NextFunction } from 'express'
import { auth } from '../config/firebase'

// Auth request tipi tanımı
interface AuthRequest extends Request {
  user?: {
    userId: string
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'Yetkilendirme token\'ı gerekli' })
    }

    const decodedToken = await auth.verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (error) {
    res.status(401).json({ error: 'Geçersiz token' })
  }
} 