import React from 'react'; React
import type { NextPage } from 'next'
import Meta from '@/components/meta'; Meta
import CardList from '@/components/card-list'; CardList
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import { Props } from './index.hook'

const BlogsPage: NextPage<Props> = ({ items, site }) => {
  const kw: string = site.categories.map((cat) => cat?.name).join(',')

  return pug`
    Meta(title=('記事一覧 | ' + site.title), desc=site.description, kw=kw)
    WithSidebar(site=site)
      CardList(basePath='/blogs', items=items)
  `
}

export { getStaticProps } from './index.hook'
export default BlogsPage
