import React from 'react'; React
import type { NextPage } from 'next'
import Head from 'next/head'; Head
import Image from 'next/image'; Image
import Link from 'next/link'; Link
import CardList from '@/components/card-list'; CardList
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import { Props } from './index.hook'

const BlogsPage: NextPage<Props> = ({ items, site }) => pug`
  Head
    title 記事一覧 | #{site.title}
  WithSidebar(site=site)
    CardList(basePath='/blogs', items=items)
`

export { getStaticProps } from './index.hook'
export default BlogsPage
