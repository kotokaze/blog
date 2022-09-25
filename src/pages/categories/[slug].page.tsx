import { Fragment } from 'react'; Fragment
import { useRouter } from 'next/router';
import type { NextPage } from 'next'
import Meta from '@/components/meta'; Meta
import CardList from '@/components/card-list'; CardList
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import type { Props } from './[slug].hook'

const CategoryPage: NextPage<Props> = ({
  tag,
  articles,
  slides,
  site,
}) => {
  const router = useRouter()
  const slug: string = router.query.slug!.toString()
  const fullpath: string = `${site.url}${router.pathname.replace('[slug]', slug)}`

  return pug`
    Fragment
      Meta(site=site, title=tag, desc=tag, kw=tag, url=fullpath)
      WithSidebar(site=site)
        section.uk-section.uk-sextion-small.uk-background-primary.uk-flex.uk-flex-center.uk-margin-medium-bottom
          h4.uk-text-lead.uk-text-break #[span(data-uk-icon='tag').uk-margin-small-right] #{tag}

        if articles.length
          CardList(basePath='/blogs', items=articles)

        if slides.length
          CardList(basePath='/slides', items=slides)
  `
}

export { getStaticPaths, getStaticProps } from './[slug].hook'
export default CategoryPage
