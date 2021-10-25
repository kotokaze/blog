import React from 'react'; React
import type { NextPage } from 'next';
import Meta from '@/components/meta'; Meta
import Social from '@/components/social'; Social
import Layout from '@/components/layouts/default'; Layout
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import type { Props } from './index.hook'
import 'animate.css/animate.min.css'

const IndexPage: NextPage<Props> = ({ site }) => {
  return pug`
    Meta(title=site.title, desc=site.description, kw='Kotokaze, kotokaze, Blog')
      Social(title=site.title, desc=site.description, url=site.url)
    WithSidebar(site=site)
      .uk-container-expand.uk-section-xlarge.uk-margin-large
        .uk-flex.uk-flex-center
          .callout.uk-margin-large-bottom
            h1.callout-title.animate__animated.animate__bounceInDown Kotokaze's Blog
            h2.callout-subtitle.animate__animated.animate__zoomInDown Welcome to my blog!
  `
}

export { getStaticProps } from './index.hook'
export default IndexPage
