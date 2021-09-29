import React from 'react'; React
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head'; Head
import Layout from '../layouts/default'; Layout

const Home: NextPage = () => pug`
  Head
    title Kotokaze's Blog - Home
  Layout
    p Hello World!
`

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: '/blogs',
      statusCode: 307,
    },
  }
}

export default Home
