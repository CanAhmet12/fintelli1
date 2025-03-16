import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Hata:', err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: Object.values(err.errors).map((e: any) => e.message).join(', ')
    })
  }

  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Bu email adresi zaten kullanılıyor'
    })
  }

  res.status(500).json({
    error: 'Sunucu hatası'
  })
} 