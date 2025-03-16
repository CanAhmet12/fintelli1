import puppeteer from 'puppeteer'

export async function analyzeSEO(url: string) {
  const browser = await puppeteer.launch({ headless: 'new' })
  try {
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })

    const seoData = await page.evaluate(() => {
      // Title analizi
      const title = document.title
      const titleScore = title.length >= 30 && title.length <= 60 ? 100 : 
                        title.length < 30 ? 70 : 50

      // Meta description analizi
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
      const metaScore = metaDescription.length >= 120 && metaDescription.length <= 160 ? 100 :
                       metaDescription.length < 120 ? 70 : 50

      // Keyword analizi
      const bodyText = document.body.innerText
      const words = bodyText.toLowerCase().match(/\b\w+\b/g) || []
      const wordCount = words.length
      const keywordDensity = words.reduce((acc: {[key: string]: number}, word) => {
        acc[word] = (acc[word] || 0) + 1
        return acc
      }, {})

      // En çok kullanılan 10 kelime
      const topKeywords = Object.entries(keywordDensity)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .reduce((obj: {[key: string]: number}, [key, value]) => {
          obj[key] = Number((value / wordCount * 100).toFixed(2))
          return obj
        }, {})

      return {
        title: {
          title,
          length: title.length,
          score: titleScore,
          recommendations: titleScore < 100 ? [
            'Başlık 30-60 karakter arasında olmalıdır',
            'Başlık anahtar kelime içermelidir'
          ] : []
        },
        meta: {
          description: metaDescription,
          length: metaDescription.length,
          score: metaScore,
          recommendations: metaScore < 100 ? [
            'Meta açıklama 120-160 karakter arasında olmalıdır',
            'Meta açıklama sayfayı iyi özetlemelidir'
          ] : []
        },
        keywords: {
          keywords: Object.keys(topKeywords),
          density: topKeywords,
          recommendations: [
            'Anahtar kelimelerin yoğunluğu %1-3 arasında olmalıdır',
            'Anahtar kelimeler doğal kullanılmalıdır'
          ]
        },
        score: Math.round((titleScore + metaScore) / 2)
      }
    })

    return seoData

  } finally {
    await browser.close()
  }
} 