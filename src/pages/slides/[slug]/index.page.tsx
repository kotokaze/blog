import { Fragment } from 'react'; Fragment
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Link from 'next/link'; Link
import Breadcrumb from '@/components/breadcrumb'; Breadcrumb
import Meta from '@/components/meta'; Meta
import TwitterIntentButton from '@/components/twitter-intent'; TwitterIntentButton
import Viewer from '@/components/pdf/viewer'; Viewer
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import DateTime from '@/lib/date-time'; DateTime
import type { CharMap } from '@/components/pdf/viewer'
import type { Props } from './index.hook'

const SlidePage: NextPage<Props> = ({ slide, site, preview }) => {
  const router = useRouter()
  const slug: string = router.query.slug!.toString()
  const relpath = router.pathname.replace('[slug]', slug)
  const fullpath: string = `${site.url}${relpath}`
  const kw: string = slide.categories.map((cat) => cat?.name).join(',')
  const worker: string = require('pdfjs-dist/build/pdf.worker.min')
  const cmap: CharMap = { cMapUrl: '/cmaps', cMapPacked: true }

  return pug`
    Fragment
      Meta(site=site, title=slide.title, desc=slide.description, imageUrl=slide.ogImage.url, url=fullpath, kw=kw)
      WithSidebar(site=site)
        Breadcrumb(relpath=relpath, table={title: slide.title, slug: slug})

        if preview
          Fragment
            .uk-alert-danger(data-uk-alert)
              a.uk-alert-close(data-uk-close)
              p プレビューモードで表示中
            Link(href='/api/deactivate').uk-button.uk-button-default.uk-position-bottom-right.uk-position-fixed
              | #[span(data-uk-icon='trash')] Cookie 削除

        .uk-grid-column-medium(data-uk-grid)
          p.uk-text-meta #[span(data-uk-icon='tag')] Tags: #[span &nbsp;]
            each cat in slide.categories
              Link(href={pathname: '/categories/[slug]', query: { slug: cat.id }}, key=cat.id).uk-margin-small-right
                | #[span.uk-badge #{cat.name}]

        .uk-container.uk-container-expand.uk-background-muted.uk-margin-top
          Viewer(src=('/assets/slides/' + slide.filename), workerSrc=worker, cMap=cmap)

        .uk-container.uk-container-expand.uk-margin-medium-top
          h3.uk-text-lead.uk-text-break.uk-text-center #{slide.title}
          .uk-flex.uk-flex-center.uk-grid-column-medium(data-uk-grid)
            p
              | #[span(data-uk-icon='calendar')]
              | #[time(dateTime=slide.publishedAt || slide.createdAt) #{DateTime.date(slide.publishedAt || slide.createdAt)}]
              | #{slide.publishedAt ? 'に公開' : 'に作成'}

            p
              | #[span(data-uk-icon='history')]
              | #[= DateTime.elapsed(slide.revisedAt || slide.publishedAt || slide.createdAt)]
              | 前に更新

          .uk-flex.uk-flex-center.uk-margin-top
            p.uk-text-meta.uk-text-break #{slide.description}

        TwitterIntentButton(fullpath=fullpath, text=slide.title, hashtags=kw, via=site.author.accounts.twitter)
  `
}

export { getStaticPaths, getStaticProps } from './index.hook'
export default SlidePage
