import puppeteer from 'puppeteer'
import { Protocol } from 'puppeteer'

interface ResourceCount {
  images: number
  scripts: number
  styles: number
}

interface PerformanceMetrics {
  name: string
  value: number
}

export async function analyzePerformance(url: string) {
  const browser = await puppeteer.launch({ headless: 'new' })
  try {
    const page = await browser.newPage()
    
    // Performans metriklerini topla
    const client = await page.target().createCDPSession()
    await client.send('Network.enable')
    await client.send('Performance.enable')

    const startTime = Date.now()
    await page.goto(url, { waitUntil: 'networkidle0' })
    const loadTime = Date.now() - startTime

    // Kaynak sayılarını topla
    const resourceCount = await page.evaluate((): ResourceCount => {
      return {
        images: document.getElementsByTagName('img').length,
        scripts: document.getElementsByTagName('script').length,
        styles: document.getElementsByTagName('link').length
      }
    })

    // Sayfa boyutunu hesapla
    const metrics = await client.send('Performance.getMetrics') as { metrics: PerformanceMetrics[] }
    const jsHeapSize = metrics.metrics.find(m => m.name === 'JSHeapUsedSize')?.value || 0

    // Performans puanı hesapla
    const loadScore = loadTime < 2000 ? 100 :
                     loadTime < 3000 ? 80 :
                     loadTime < 4000 ? 60 : 40

    const sizeScore = jsHeapSize < 1000000 ? 100 :
                     jsHeapSize < 2000000 ? 80 :
                     jsHeapSize < 3000000 ? 60 : 40

    const resourceScore = (resourceCount.images + resourceCount.scripts + resourceCount.styles) < 20 ? 100 :
                         (resourceCount.images + resourceCount.scripts + resourceCount.styles) < 30 ? 80 :
                         (resourceCount.images + resourceCount.scripts + resourceCount.styles) < 40 ? 60 : 40

    const overallScore = Math.round((loadScore + sizeScore + resourceScore) / 3)

    return {
      metrics: {
        load_time: loadTime / 1000, // saniye cinsinden
        page_size: jsHeapSize,
        status_code: 200,
        resource_count: resourceCount,
        score: overallScore
      },
      recommendations: [
        loadTime > 2000 ? 'Sayfa yükleme süresini optimize edin' : null,
        jsHeapSize > 1000000 ? 'Sayfa boyutunu küçültün' : null,
        resourceCount.images > 10 ? 'Görsel sayısını azaltın ve optimize edin' : null,
        resourceCount.scripts > 10 ? 'Script sayısını azaltın ve birleştirin' : null,
        resourceCount.styles > 5 ? 'CSS dosyalarını birleştirin' : null
      ].filter(Boolean) as string[]
    }

  } finally {
    await browser.close()
  }
} 