import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import UIKit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => UIKit.use(Icons))
  return <Component {...pageProps} />
}
export default MyApp
