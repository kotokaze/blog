import React from 'react'; React
import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'; Head
import Image from 'next/image'; Image
import Link from 'next/link'; Link
import CardList from '../../components/card-list'; CardList
import WithSidebar from '../../layouts/with-sidebar'; WithSidebar
import apiClient from '../../modules/api-client'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blogs: NextPage<Props> = ({ articles, author, categories }) => pug`
  Head
    title 記事一覧 | Kotokaze's Blog
  WithSidebar(author=author, categories=categories)
    CardList(articles=articles)
`

export const getStaticProps = async () => {
  const articles: Promise<Article[]> = apiClient.v1.blogs
    .$get()
    .then((res) => res.contents)

  const author: Promise<Author> = apiClient.v1.authors
    .$get()
    .then((res) => res.contents)
    .then((authors) => authors.pop()!)

  const categories: Promise<Category[]> = apiClient.v1.categories
    .$get()
    .then((res) => res.contents)

  const props = await Promise.all([articles, author, categories]).then(
    ([articles, author, categories]) => ({
      articles,
      author,
      categories,
    })
  )

  return {
    props: props,
    revalidate: 10,
  }
}

export default Blogs
