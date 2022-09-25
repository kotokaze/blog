import { Fragment } from 'react'; Fragment
import type { NextPage } from 'next'
import Meta from '@/components/meta'; Meta
import CardList from '@/components/card-list'; CardList
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import { Props } from './index.hook'

const BlogsPage: NextPage<Props> = ({ items, site }) => {
  return pug`
    Fragment
      Meta(site=site, title='記事一覧')
      WithSidebar(site=site)
        CardList(basePath='/blogs', items=items)
  `
}

export { getStaticProps } from './index.hook'
export default BlogsPage
