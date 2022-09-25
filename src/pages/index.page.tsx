import { Fragment } from 'react'; Fragment
import type { NextPage } from 'next';
import Meta from '@/components/meta'; Meta
import Layout from '@/components/layouts/default'; Layout
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import type { Props } from './index.hook'
import 'animate.css/animate.min.css'

const IndexPage: NextPage<Props> = ({ site }) => {
  return pug`
    Fragment
      Meta(site=site, title='Home')
      WithSidebar(site=site)
        .uk-container-expand.uk-section-xlarge.uk-margin-large
          .uk-flex.uk-flex-center
            .callout.uk-margin-large-bottom
              h1.callout-title.animate__animated.animate__bounceInDown #{site.title}
              h2.callout-subtitle.animate__animated.animate__zoomInDown Welcome to my blog!
  `
}

export { getStaticProps } from './index.hook'
export default IndexPage
