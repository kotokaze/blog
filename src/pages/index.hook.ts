import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async (_: GetStaticPropsContext) => {
  return {
    props: {}
  }
 }
