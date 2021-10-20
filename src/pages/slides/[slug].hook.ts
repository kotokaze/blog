import type { GetStaticPathsContext, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import microcmsClient from '@/modules/microcms'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths = async (ctx: GetStaticPathsContext) => {
  const paths: Array<{ params: { slug: string } }> =
    await microcmsClient.v1.slides
      .$get({ query: { fields: 'id' } })
      .then((res) => res.contents)
      .then((contents) => contents.map((item) => item.id))
      .then((ids) => ids.map((id) => ({ params: { slug: id } })))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { slug } = params!

  const slide: Promise<Slide> = microcmsClient.v1.slides
    ._id(slug!.toString())
    .$get()

  const site: Promise<Site> = microcmsClient.v1.site
    .$get()

  const props = await Promise.all([slide, site])
    .then(([slide, site]) => ({ slide, site }))

  return {
    props: props,
    notFound: !slug,
  }
}
