import React from 'react'; React
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head'; Head
import Layout from '@/layouts/default'; Layout

export type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: NextPage<Props> = () => pug`
  Head
    title Kotokaze's Blog - Home
  Layout
    p Hello World!
`

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/blogs',
      statusCode: 307,
    },
  }
}

export default Home
