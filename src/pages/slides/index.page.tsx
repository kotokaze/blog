import React from 'react'; React
import type { NextPage } from 'next'
import Meta from '@/components/meta'; Meta
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import type { Props } from './index.hook'

const SlidesPage: NextPage<Props> = ({ site }) => pug`
  - const kw = site.categories.map((cat) => cat.name).join(', ')
  Meta(title=('slides | ' + site.title), desc=site.description, kw=kw)
  WithSidebar(site=site)
    .uk-container.uk-container-expand.uk-background-muted
`

export { getStaticProps } from './index.hook'
export default SlidesPage
