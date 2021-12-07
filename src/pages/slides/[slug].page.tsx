import React from 'react'; React
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Link from 'next/link'; Link
import Meta from '@/components/meta'; Meta
import Viewer from '@/components/pdf/viewer'; Viewer
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import DateTime from '@/lib/date-time'; DateTime
import type { CharMap } from '@/components/pdf/viewer'
import type { Props } from './[slug].hook'

const SlidePage: NextPage<Props> = ({ slide, site }) => {
  const router = useRouter()
  const slug: string = router.query.slug as string
  const fullpath: string = `${site.url}${router.pathname.replace('[slug]', slug)}`
  const kw: string = slide.categories.map((cat) => cat?.name).join(',')
  const worker: string = require('pdfjs-dist/build/pdf.worker.min')
  const cmap: CharMap = { cMapUrl: '/cmaps', cMapPacked: true }

  return pug`
    Meta(title=(slide.title + ' | '  + site.title), desc=slide.description, kw=kw)
    WithSidebar(site=site)
      .uk-grid-column-medium(data-uk-grid)
        p.uk-text-meta #[span(data-uk-icon='tag')] Tags: #[span &nbsp;]
          each cat in slide.categories
            Link(href={pathname: '/categories/[slug]', query: { slug: cat.id }}, key=cat.id)
              a.uk-margin-small-right #[span.uk-badge #{cat.name}]

      .uk-container.uk-container-expand.uk-background-muted.uk-margin-top
        Viewer(src=('/assets/slides/' + slide.filename), workerSrc=worker, cMap=cmap)

      .uk-container.uk-container-expand.uk-margin-medium-top
        .uk-flex.uk-flex-center
          h3.uk-heading-small.uk-text-break #{slide.title}
        .uk-flex.uk-flex-center.uk-grid-column-medium(data-uk-grid)
          p #[span(data-uk-icon='calendar')] #[time(dateTime=slide.publishedAt || slide.createdAt) #{DateTime.date(slide.publishedAt || slide.createdAt)}]
            if slide.publishedAt
              | に公開
            else
              | に作成
          p #[span(data-uk-icon='history')] #[= DateTime.elapsed(slide.revisedAt || slide.publishedAt || slide.createdAt)]前に更新
        .uk-flex.uk-flex-center.uk-margin-top
          p.uk-text-meta.uk-text-break #{slide.description}

      .uk-container.uk-container-expand.uk-margin-medium-top
        .uk-flex.uk-flex-right
          a(href='https://twitter.com/intent/tweet?url=' + fullpath + '&text=' + slide.title + '&hashtags=' + kw).uk-button.uk-button-text
            | #[span(data-uk-icon='twitter')] Share on Twitter
  `
}

export { getStaticPaths, getStaticProps } from './[slug].hook'
export default SlidePage
