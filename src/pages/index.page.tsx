import React from 'react'; React
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import type { NextPage } from 'next';
import Head from 'next/head'; Head
import Layout from '@/components/layouts/default'; Layout
import type { Props } from './index.hook'

const IndexPage: NextPage<Props> = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace('/blogs')
  }, [router])

  return pug`
    Head
      title Kotokaze's Blog - Home
  `
}

export { getStaticProps } from './index.hook'
export default IndexPage
