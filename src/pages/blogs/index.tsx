import React from 'react'; React
import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'; Head
import Image from 'next/image'; Image
import Link from 'next/link'; Link
import CardList from '@/components/card-list'; CardList
import WithSidebar from '@/layouts/with-sidebar'; WithSidebar
import apiClient from '@/modules/api-client'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blogs: NextPage<Props> = ({ articles, categories, site }) => pug`
  Head
    title 記事一覧 | Kotokaze's Blog
  WithSidebar(site=site, categories=categories)
    CardList(articles=articles)
`

export const getStaticProps = async () => {
  const articles: Promise<Article[]> = apiClient.v1.blogs
    .$get()
    .then((res) => res.contents)

  const site: Promise<Site> = apiClient.v1.site
    .$get()

  const categories: Promise<Category[]> = apiClient.v1.categories
    .$get()
    .then((res) => res.contents)

  const props = await Promise.all([articles, site, categories]).then(
    ([articles, site, categories]) => ({
      articles,
      site,
      categories,
    })
  )

  return {
    props: props,
    revalidate: 10,
  }
}

export default Blogs
