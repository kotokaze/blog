import React from 'react'; React
import type { NextPage } from 'next'
import Meta from '@/components/meta'; Meta
import CardList from '@/components/card-list'; CardList
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import type { Props } from './index.hook'

const SlidesPage: NextPage<Props> = ({ items, site }) => pug`
  - const kw = site.categories.map((cat) => cat.name).join(', ')
  Meta(title=('slides | ' + site.title), desc=site.description, kw=kw)
  WithSidebar(site=site)
    CardList(basePath='/slides', items=items)
`

export { getStaticProps } from './index.hook'
export default SlidesPage
