import { Router } from 'express'
import { Report } from '../models/Report'
import { auth } from '../middleware/auth'

const router = Router()

// Kullanıcının tüm raporlarını getir
router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
    res.json(reports)
  } catch (error) {
    console.error('Get reports error:', error)
    res.status(500).json({ error: 'Raporlar alınamadı' })
  }
})

// Belirli bir raporu getir
router.get('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      userId: req.user.userId
    })

    if (!report) {
      return res.status(404).json({ error: 'Rapor bulunamadı' })
    }

    res.json(report)
  } catch (error) {
    console.error('Get report error:', error)
    res.status(500).json({ error: 'Rapor alınamadı' })
  }
})

export { router as reportsRouter } 