import React from 'react'; React
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'; Head
import Link from 'next/link'; Link
import Date from '../../components/date'; Date
import DateTime from '../../lib/date-time'; DateTime
import WithSidebar from '../../layouts/with-sidebar'; WithSidebar

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

    article
      div(dangerouslySetInnerHTML={ __html: article.body })
`

export const getStaticPaths: GetStaticPaths = async () => {
  const req: string = `${process.env.MICROCMS_API_URL!}/api/v1/blogs?fields=id`
  const res: Response = await fetch(req, {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY! },
  })

  const json: ResRoot<Array<{ id: string }>> = await res.json()
  const paths = json.contents.map((val) => ({ params: { slug: val['id'] } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { slug } = ctx.params!
  const req: string = `${process.env.MICROCMS_API_URL!}/api/v1/blogs`
    + `?ids=${slug!}`
    + (ctx.preview ? `&draftKey=${ctx.previewData!}` : '')
  const json: ResRoot<Article[]> = await fetch(req, {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY! },
  }).then((res) => res.json())
  const article: Article = json.contents.pop()!

  const req2: string = `${process.env.MICROCMS_API_URL!}/api/v1/authors`
  const json2: ResRoot<Author[]> = await fetch(req2, {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY! },
  }).then((res) => res.json())
  const author: Author = json2.contents.pop()!

  const req3: string = `${process.env.MICROCMS_API_URL!}/api/v1/categories`
  const json3: ResRoot<Category[]> = await fetch(req3, {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY! },
  }).then((res) => res.json())
  const categories: Array<Category> = json3.contents

  const props = {
    article,
    author,
    categories,
    preview: ctx.preview || false,
  }

  return {
    props: props,
    revalidate: 10,
    notFound: !article,
  }
}

export default Detail
