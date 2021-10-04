import React from 'react'; React
import type { NextPage } from 'next'
import Head from 'next/head'; Head
import Link from 'next/link'; Link
import Date from '@/components/date'; Date
import DateTime from '@/lib/date-time'; DateTime
import WithSidebar from '@/layouts/with-sidebar'; WithSidebar
import { Props } from './[slug].hook'

const Detail: NextPage<Props> = ({ article, site, preview }) => pug`
  Head
    title #{article.title} | #{site.title}
    meta(name='keywords', contents=article.categories.map((cat) => cat.name).join(','))
  WithSidebar(site=site, author=article.author)
    section.uk-section.uk-sextion-small.uk-background-primary
      .uk-flex.uk-flex-center
        h4.uk-text-lead.uk-text-break #{article.title}
      .uk-flex.uk-flex-center
        h5.uk-text-lead #{article.subTitle}
      .uk-flex.uk-flex-center.uk-grid-column-medium(data-uk-grid)
        p #[span(data-uk-icon='calendar')] #[Date(utcTime=article.publishedAt)]に公開
        p #[span(data-uk-icon='history')] #[= DateTime.elapsed(article.revisedAt)]前に更新

    .uk-margin-medium-bottom
      p.uk-text-meta #[span(data-uk-icon='tag')] Tags: #[span &nbsp;]
        each cat in article.categories
          Link(href={pathname: '/categories/[slug]', query: { slug: cat.id}}, key=cat.id)
            a.uk-margin-small-right #[span.uk-badge #{cat.name}]

    if preview
      .uk-alert-danger(data-uk-alert)
        a.uk-alert-close(data-uk-close)
        p プレビューモードで表示中
      Link(href='/api/deactivate')
        a.uk-button.uk-button-default.uk-position-bottom-right.uk-position-fixed
          | #[span(data-uk-icon='trash')] Cookie 削除

    article
      div(dangerouslySetInnerHTML={ __html: article.body })
`

export { getStaticPaths, getStaticProps } from './[slug].hook'
export default Detail
