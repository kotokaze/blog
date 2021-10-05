import type { GetStaticPathsContext, InferGetStaticPropsType } from 'next'
import apiClient from '@/modules/api-client'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async (_: GetStaticPathsContext) => {
  const site: Promise<Site> = apiClient.v1.site.$get()
  const props = await Promise.all([site]).then(([site]) => ({ site }))

  return {
    props: props,
    revalidate: 10,
  }
}