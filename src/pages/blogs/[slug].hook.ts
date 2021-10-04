import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import apiClient from '@/modules/api-client'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Array<{ params: { slug: string } }> = await apiClient.v1.blogs
    .$get({ query: { fields: 'id' } })
    .then((res) => res.contents)
    .then((contents) => contents.map((item) => item.id))
    .then((ids) => ids.map((id) => ({ params: { slug: id } })))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { slug } = ctx.params!

  const query: MethodsGetQuery = {
    ids: slug!.toString(),
    ...(ctx.preview ? { draftKey: ctx.previewData!.toString() } : null),
  }

  const article: Promise<Article> = apiClient.v1.blogs
    .$get({ query: query })
    .then((res) => res.contents)
    .then((articles) => articles.pop()!)

  const site: Promise<Site> = apiClient.v1.site
    .$get()

  const props = await Promise.all([article, site]).then(([article, site]) => ({
    article: article,
    preview: ctx.preview || false,
    site: site,
  }))

  return {
    props: props,
    revalidate: 10,
    notFound: !props.article,
  }
}
