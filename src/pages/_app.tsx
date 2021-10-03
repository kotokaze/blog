import React from 'react'
import type { AppProps } from 'next/app'
import UIkit from '@/components/uikit'; UIkit
import '@/styles/site.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
