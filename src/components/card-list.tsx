import Link from 'next/link'; Link
import Date from './date'; Date

interface Props {
  articles: Array<Article>
}

const CardList: React.VFC<Props> = ({ articles }) => pug`
  .uk-grid-small.uk-flex-center(data-uk-grid)
    each blog in articles
      .uk-card.uk-card-default.uk-margin-remove-vertical(className='uk-width-1-3@s', key=blog.id)
        Link(href={pathname: '/blogs/[slug]', query: { slug: blog.id }})
          a.uk-link-toggle.uk-card-header.uk-text-center
            h4.uk-card-title.uk-text-truncate #[span.uk-link-heading #{blog.title}]
            img(src=blog.ogImage.url, width=200, height=100 data-uk-image)

        .uk-card-footer.uk-text-meta
          p #[span(data-uk-icon='calendar')] #[Date(utcTime=blog.publishedAt)]
          p #[span(data-uk-icon='tag')]
            each cat in blog.categories
              Link(href={pathname: '/categories/[slug]', query: { slug: cat.id }}, key=cat.id)
                a #[span.uk-badge #{cat.name}]
`

export default CardList
