import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

export type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps = async (_: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: '/blogs',
      statusCode: 307,
    },
  }
}
