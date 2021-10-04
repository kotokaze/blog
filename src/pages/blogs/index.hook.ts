import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import apiClient from '@/modules/api-client'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async (_: GetStaticPropsContext) => {
  const articles: Promise<Article[]> = apiClient.v1.blogs
    .$get()
    .then((res) => res.contents)

  const site: Promise<Site> = apiClient.v1.site
    .$get()

  const props = await Promise.all([ articles, site ])
    .then(([ articles, site ]) => ({ articles, site }))

  return {
    props: props,
    revalidate: 10,
  }
}
