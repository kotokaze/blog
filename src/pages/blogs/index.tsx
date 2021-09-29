import React from 'react'; React
import type { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'; Head
import Image from 'next/image'; Image
import Link from 'next/link'; Link
import CardList from '../../components/card-list'; CardList
import WithSidebar from '../../layouts/with-sidebar'; WithSidebar

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blogs: NextPage<Props> = ({ articles, author, categories }) => pug`
  Head
    title 記事一覧 | Kotokaze's Blog
  WithSidebar(author=author, categories=categories)
    CardList(articles=articles)
`

export const getStaticProps = async () => {
  const req: string = `${process.env.MICROCMS_API_URL!}/api/v1/blogs`
    + '?orders=-publishedAt'
    + '?limit=12'
  const json: ResRoot<Article[]> = await fetch(req, {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY! },
  }).then(async (res) => await res.json())
  const articles: Array<Article> = json.contents

  const req1: string = `${process.env.MICROCMS_API_URL!}/api/v1/authors`
  const json1: ResRoot<Author[]> = await fetch(req1, {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY! },
  }).then(async (res) => await res.json())
  const author: Author = json1.contents.pop()!

  const req2: string = `${process.env.MICROCMS_API_URL!}/api/v1/categories`
  const json2: ResRoot<Category[]> = await fetch(req2, {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY! },
  }).then(async (res) => await res.json())
  const categories: Array<Category> = json2.contents

  const props = {
    articles,
    author,
    categories,
  }

  return {
    props: props,
    revalidate: 10,
  }
}

export default Blogs
