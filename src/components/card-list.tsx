import Link from 'next/link'; Link
import DateTime from '@/lib/date-time'; DateTime

interface CardItem extends Content {
  title: string
  categories: Array<Category>
  description: string
  ogImage: ImageInfo
}

interface Props {
  basePath: string
  items: Array<CardItem>
  noTag: boolean
}

const CardList: React.FC<Props> = ({ basePath, items, noTag = false }) => pug`
  .uk-grid-small.uk-flex-center(data-uk-grid)
    each item in items
      .uk-card.uk-card-default.uk-margin-right(className='uk-width-1-3@s', key=item.id)
        Link(href={pathname: basePath + '/[slug]', query: { slug: item.id }})
          a.uk-link-toggle.uk-card-header.uk-text-center
            h4.uk-card-title.uk-text-truncate #[span.uk-link-heading #{item.title}]
            img(src=item.ogImage.url + '?fit=fill&fill-color=white&w=200&h=200' data-uk-image)

        .uk-card-footer.uk-text-meta
          p #[span(data-uk-icon='calendar')] #[span &nbsp;] #[time(dateTime=item.publishedAt) #{DateTime.date(item.publishedAt)}]

          if !noTag
            p #[span(data-uk-icon='tag')] #[span &nbsp;]
              each cat in item.categories
                Link(href={pathname: '/categories/[slug]', query: { slug: cat.id }}, key=cat.id)
                  a.uk-margin-small-right #[span.uk-badge #{cat.name}]
`

export type { CardItem }
export default CardList
