import React from 'react'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import '@/styles/site.scss'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (window === undefined) return

    const loadUIkit = async () => {
      const UIkit = (await import('uikit')).default
      const Icons = (await import('uikit/dist/js/uikit-icons.min')).default
      UIkit.use(Icons)
    }
    loadUIkit()
  }, [])

  return <Component {...pageProps} />
}
export default MyApp
