import { Fragment } from 'react'; Fragment
import type { NextPage } from 'next'
import Meta from '@/components/meta'; Meta
import CardList from '@/components/card-list'; CardList
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import type { Props } from './index.hook'

const SlidesPage: NextPage<Props> = ({ items, site }) =>{
  return pug`
    Fragment
      Meta(site=site, title='slides')
      WithSidebar(site=site)
        CardList(basePath='/slides', items=items)
  `
}

export { getStaticProps } from './index.hook'
export default SlidesPage
