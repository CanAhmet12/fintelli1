import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import '@/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // SSR sırasında hiçbir şey render etme
  if (!mounted) {
    return null
  }

  return <Component {...pageProps} />
}

// getInitialProps'u kaldır
App.getInitialProps = undefined

export default App 