import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import type { CardItem } from '@/components/card-list'
import microcmsClient from '@/modules/microcms'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async (_: GetStaticPropsContext) => {
  const query: MethodsGetQuery = {
    fields: 'publishedAt,id,title,categories,ogImage',
  }

  const items: Promise<CardItem[]> = microcmsClient.v1.blogs
    .$get({ query: query })
    .then((res) => res.contents)
    .then((articles) => articles as CardItem[])

  const site: Promise<Site> = microcmsClient.v1.site
    .$get()

  const props = await Promise.all([items, site])
    .then(([items, site]) => ({ items, site }))

  return {
    props: props,
  }
}
