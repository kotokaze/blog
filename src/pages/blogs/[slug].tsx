import React from 'react'; React
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'; Head
import Link from 'next/link'; Link
import Date from '@/components/date'; Date
import DateTime from '@/lib/date-time'; DateTime
import WithSidebar from '@/layouts/with-sidebar'; WithSidebar
import apiClient from '@/modules/api-client'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Detail: NextPage<Props> = ({ article, author, categories, preview }) => pug`
  Head
    title #{article.title} | Kotokaze's Blog
  WithSidebar(author=author, categories=categories)
    section.uk-section.uk-sextion-small.uk-background-primary
      .uk-flex.uk-flex-center
        h4.uk-text-lead.uk-text-break #{article.title}
      .uk-flex.uk-flex-center.uk-grid-column-medium(data-uk-grid)
        p #[span(data-uk-icon='calendar')] #[Date(utcTime=article.publishedAt)]に公開
        p #[span(data-uk-icon='history')] #[= DateTime.elapsed(article.revisedAt)]前に更新

    .uk-margin-large-bottom
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

export const getStaticPaths: GetStaticPaths = async () => {
  const ids: Promise<string[]> = apiClient.v1.blogs
    .$get({
      query: {
        fields: 'id',
      },
    })
    .then((res) => res.contents)
    .then((articles) => articles.map((item) => item.id))

  const paths = (await ids).map((id) => ({ params: { slug: id } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { slug } = ctx.params!

  const article: Promise<Article> = apiClient.v1.blogs
    .$get({
      query: {
        ids: slug!.toString(),
        ...(ctx.preview ? { draftKey: ctx.previewData!.toString() } : null),
      },
    })
    .then((res) => res.contents)
    .then((articles) => articles.pop()!)

  const author: Promise<Author> = apiClient.v1.authors
    .$get()
    .then((res) => res.contents)
    .then((authors) => authors.pop()!)

  const categories: Promise<Category[]> = apiClient.v1.categories
    .$get()
    .then((res) => res.contents)

  const props = await Promise.all([article, author, categories]).then(
    ([article, author, categories]) => ({
      article,
      author,
      categories,
      preview: ctx.preview || false,
    })
  )

  return {
    props: props,
    revalidate: 10,
    notFound: !article,
  }
}

export default Detail
