import React from 'react'; React
import type { NextPage } from 'next';
import Head from 'next/head'; Head
import Layout from '@/components/layouts/default'; Layout
import { Props } from './index.hook'

const IndexPage: NextPage<Props> = () => pug`
  Head
    title Kotokaze's Blog - Home
  Layout
    p Hello World!
`

export { getServerSideProps } from './index.hook'
export default IndexPage
