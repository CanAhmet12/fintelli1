import type { NextApiRequest, NextApiResponse } from 'next'
import { getAnalysisReport } from '@/services/api'
import PDFDocument from 'pdfkit'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { id } = req.query
    const report = await getAnalysisReport(id as string)

    // PDF oluştur
    const doc = new PDFDocument()
    
    // PDF başlığı
    doc.fontSize(25).text('Site Analiz Raporu', { align: 'center' })
    doc.moveDown()
    doc.fontSize(14).text(`URL: ${report.url}`)
    doc.fontSize(12).text(`Tarih: ${new Date(report.timestamp).toLocaleString()}`)
    doc.moveDown()

    // Puanlar
    doc.fontSize(16).text('Puanlar')
    doc.fontSize(12)
      .text(`Genel Puan: ${report.overall_score}`)
      .text(`SEO Puanı: ${report.seo.score}`)
      .text(`Performans Puanı: ${report.performance.metrics.score}`)
    doc.moveDown()

    // SEO Detayları
    doc.fontSize(16).text('SEO Analizi')
    doc.fontSize(12)
      .text(`Başlık: ${report.seo.title.title}`)
      .text(`Başlık Puanı: ${report.seo.title.score}`)
      .text(`Meta Açıklama: ${report.seo.meta.description}`)
    doc.moveDown()

    // Performans Detayları
    doc.fontSize(16).text('Performans Analizi')
    doc.fontSize(12)
      .text(`Yükleme Süresi: ${report.performance.metrics.load_time}s`)
      .text(`Sayfa Boyutu: ${(report.performance.metrics.page_size / 1024 / 1024).toFixed(2)}MB`)
    doc.moveDown()

    // AI Önerileri
    doc.fontSize(16).text('AI Önerileri')
    report.ai_recommendations.forEach(rec => {
      doc.fontSize(12)
        .text(`${rec.type} (${rec.priority})`)
        .text(rec.description)
        .moveDown(0.5)
    })

    // PDF'i gönder
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=report-${id}.pdf`)
    doc.pipe(res)
    doc.end()

  } catch (error) {
    console.error('PDF oluşturma hatası:', error)
    res.status(500).json({ message: 'PDF oluşturulamadı' })
  }
} 