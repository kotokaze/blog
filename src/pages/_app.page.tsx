import React from 'react'
import type { AppProps } from 'next/app'
import '@/styles/site.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp