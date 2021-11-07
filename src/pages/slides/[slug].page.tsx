import React from 'react'; React
import type { NextPage } from 'next'
import Meta from '@/components/meta'; Meta
import Viewer from '@/components/pdf/viewer'; Viewer
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import type { CharMap } from '@/components/pdf/viewer'
import type { Props } from './[slug].hook'

const SlidePage: NextPage<Props> = ({ slide, site }) => {
  const kw: string = slide.categories.map((cat) => cat?.name).join(',')
  const worker: string = require('pdfjs-dist/build/pdf.worker.min')
  const cmap: CharMap = { cMapUrl: '/cmaps', cMapPacked: true }

  return pug`
    Meta(title=(slide.title + ' | '  + site.title), desc=slide.description, kw=kw)
    WithSidebar(site=site)
      .uk-container.uk-container-expand.uk-background-muted
        Viewer(src=('/assets/slides/' + slide.filename), workerSrc=worker, cMap=cmap)
  `
}

export { getStaticPaths, getStaticProps } from './[slug].hook'
export default SlidePage
