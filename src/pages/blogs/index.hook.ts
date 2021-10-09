import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import microcmsClient from '@/modules/microcms'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async (_: GetStaticPropsContext) => {
  const articles: Promise<Article[]> = microcmsClient.v1.blogs
    .$get()
    .then((res) => res.contents)

  const site: Promise<Site> = microcmsClient.v1.site
    .$get()

  const props = await Promise.all([ articles, site ])
    .then(([ articles, site ]) => ({ articles, site }))

  return {
    props: props,
    revalidate: 10,
  }
}
