import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import microcmsClient from '@/modules/microcms'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Array<{ params: { slug: string } }> = await microcmsClient.v1.blogs
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

  const query: MethodsGetContentQuery = {
    ...(ctx.preview ? { draftKey: ctx.previewData!.toString() } : null),
  }

  const article: Promise<Article> = microcmsClient.v1.blogs
    ._id(slug!.toString())
    .$get({ query })

  const site: Promise<Site> = microcmsClient.v1.site
    .$get()

  const props = await Promise.all([article, site]).then(([article, site]) => ({
    article: article,
    preview: !!ctx.preview,
    site: site,
  }))

  return {
    props: props,
    notFound: !props.article,
  }
}
