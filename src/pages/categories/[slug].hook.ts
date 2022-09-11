import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import type { CardItem } from '@/components/card-list'
import microcmsClient from '@/modules/microcms'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths: GetStaticPaths = async (_) => {
  const paths: Array<{ params: { slug: string } }> =
    await microcmsClient.v1.categories
      .$get({ query: { fields: 'id' } })
      .then((res) => res.contents)
      .then((contents) => contents.map((item) => item.id))
      .then((ids) => ids.map((id) => ({ params: { slug: id } })))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const { slug } = ctx.params!

  const category: Promise<Category> = microcmsClient.v1.categories
    ._id(slug!.toString())
    .$get({ query: { fields: 'name' } })

  const query: MethodsGetQuery = {
    filters: `categories[contains]${slug!.toString()}`,
  }

  const articles: Promise<CardItem[]> = microcmsClient.v1.blogs
    .$get({ query })
    .then((res) => res.contents)
    .then((contents) => (contents as CardItem[]))

  const slides: Promise<CardItem[]> = microcmsClient.v1.slides
    .$get({ query })
    .then((res) => res.contents)
    .then((contents) => (contents as CardItem[]))

  const site: Promise<Site> = microcmsClient.v1.site
    .$get()

  const props = await Promise.all([category, articles, slides, site]).then(
    ([category, articles, slides, site]) => ({ category, articles, slides, site })
  )

  return {
    props: props,
    notFound: !props.category,
  }
}
