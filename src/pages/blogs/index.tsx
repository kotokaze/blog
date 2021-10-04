import React from 'react'; React
import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'; Head
import Image from 'next/image'; Image
import Link from 'next/link'; Link
import CardList from '@/components/card-list'; CardList
import WithSidebar from '@/layouts/with-sidebar'; WithSidebar
import apiClient from '@/modules/api-client'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blogs: NextPage<Props> = ({ articles, site }) => pug`
  Head
    title 記事一覧 | #{site.title}
  WithSidebar(site=site)
    CardList(articles=articles)
`

export const getStaticProps = async () => {
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

export default Blogs
