import React from 'react'; React
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'; Head
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import type { Props } from './index.hook'

export const PDF = dynamic(() => import('@/components/pdf/pdf-viewer'), {
  ssr: false
})

const SlidesPage: NextPage<Props> = ({ site }) => pug`
  Head
    title title
  WithSidebar(site=site)
    .uk-flex.uk-flex-center
      PDF(
        src='https://raw.githubusercontent.com/wojtekmaj/react-pdf/main/sample/webpack5/sample.pdf'
        page=2
        slides
      )
`

export { getStaticProps } from './index.hook'

export default SlidesPage
