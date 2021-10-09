import React from 'react'; React
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Meta from '@/components/meta'; Meta
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import type { Props } from './index.hook'

export const PDF = dynamic(() => import('@/components/pdf/pdf-viewer'), {
  ssr: false
})

const SlidesPage: NextPage<Props> = ({ site }) => pug`
  - const kw = site.categories.map((cat) => cat.name).join(', ')
  Meta(title=('slides | ' + site.title), desc=site.description, kw=kw)
  WithSidebar(site=site)
    .uk-container.uk-container-expand.uk-background-muted
      PDF(
        src='https://raw.githubusercontent.com/wojtekmaj/react-pdf/main/sample/webpack5/sample.pdf'
        page=2
        slides
      )
`

export { getStaticProps } from './index.hook'
export default SlidesPage
