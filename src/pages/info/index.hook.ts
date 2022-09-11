import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import microcmsClient from '@/modules/microcms'

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const query: MethodsGetContentQuery = {
    ...(ctx.preview ? { draftKey: ctx.previewData!.toString() } : null),
  }

  const site: Promise<Site> = microcmsClient.v1.site.$get({ query })
  const props = await Promise.all([site]).then(([site]) => ({ site }))

  return {
    props: props,
  }
}
