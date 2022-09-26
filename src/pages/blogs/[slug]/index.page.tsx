import { Fragment } from 'react'; Fragment
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'; Link
import CardList from '@/components/card-list'; CardList
import DateTime from '@/lib/date-time'; DateTime
import Meta from '@/components/meta'; Meta
import TwitterIntentButton from '@/components/twitter-intent'; TwitterIntentButton
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import { Props } from './index.hook'

const BlogPage: NextPage<Props> = ({ article: content, site, preview }) => {
  const router = useRouter()
  const slug: string = router.query.slug!.toString()
  const fullpath: string = `${site.url}${router.pathname.replace('[slug]', slug)}`
  const kw: string = content.categories.map((cat) => cat?.name).join(',')
  const bodies: Array<string> = content.body.map((content) => content.content)

  return pug`
    Fragment
      Meta(site=site, title=content.title, desc=content.description, kw=kw, imageUrl=content.ogImage.url, url=fullpath)
      WithSidebar(site=site, author=site.author)
        section.uk-section.uk-sextion-small.uk-background-primary
          .uk-flex.uk-flex-center
            h4.uk-text-lead.uk-text-break #{content.title}
          .uk-flex.uk-flex-center
            h5.uk-text-lead #{content.subTitle}
          .uk-flex.uk-flex-center.uk-grid-column-medium(data-uk-grid)
            p #[span(data-uk-icon='calendar')] #[time(dateTime=content.publishedAt || content.createdAt) #{DateTime.date(content.publishedAt || content.createdAt)}]
              if content.publishedAt
                | に公開
              else
                | に作成
            p #[span(data-uk-icon='history')] #[= DateTime.elapsed(content.revisedAt || content.publishedAt || content.createdAt)]前に更新

        .uk-margin-medium-bottom
          p.uk-text-meta #[span(data-uk-icon='tag')] Tags: #[span &nbsp;]
            each cat in content.categories
              Link(href={pathname: '/categories/[slug]', query: { slug: cat.id}}, key=cat.id)
                a.uk-margin-small-right #[span.uk-badge #{cat.name}]

        if preview
          Fragment
            .uk-alert-danger(data-uk-alert)
              a.uk-alert-close(data-uk-close)
              p プレビューモードで表示中
            a(href='/api/deactivate').uk-button.uk-button-default.uk-position-bottom-right.uk-position-fixed
              | #[span(data-uk-icon='trash')] Cookie 削除

        article
          each body, idx in bodies
            div(dangerouslySetInnerHTML={ __html: body }, key=idx)

        TwitterIntentButton(fullpath=fullpath, text=content.title, hashtags=kw, via=site.author.accounts.twitter)

        if content.relatedBlogs.length
          .uk-margin-medium-top
            h4.uk-text-lead.uk-text-center.uk-margin-medium_bottom 関連記事
            CardList(basePath='/blogs', items=content.relatedBlogs, noTag=true)
  `
}

export { getStaticPaths, getStaticProps } from './index.hook'
export default BlogPage
