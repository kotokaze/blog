import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import microcmsClient from '@/modules/microcms'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async (_: GetStaticPropsContext) => {
  const site: Promise<Site> = microcmsClient.v1.site.$get()
  const props = await Promise.all([site]).then(([site]) => ({ site }))

  return {
    props: props,
  }
}
