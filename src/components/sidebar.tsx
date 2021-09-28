import Link from 'next/link'; Link

interface Props {
  author: Author
  categories: Array<Category>
}

const Sidebar: React.VFC<Props> = ({ author, categories }) => pug`
  div
    .uk-margin-large-bottom
      h3.uk-heading-line.uk-text-center #[span Profile]
      img(src=author.avatar.url data-uk-image).uk-border-circle.uk-align-center
      h5.uk-text-large #{author.name}

      .uk-flex.uk-flex-center
        a(href='https://github.com/' + author.githubId, target='_blank', data-uk-icon='github').uk-icon-button.uk-margin-right
        a(href='https://twitter.com/' + author.twitterId, target='_blank', data-uk-icon='twitter').uk-icon-button.uk-margin-right
        a(href=author.wordpress, target='_blank', data-uk-icon='wordpress').uk-icon-button.uk-margin-right
        a(href='/feed', download, data-uk-icon='rss').uk-icon-button

    .uk-margin-large-bottom
      h3.uk-heading-line.uk-text-center #[span Tags]
      each category in categories
        Link(href={pathname: '/categories/[slug]', query: { slug: category.id}}, key=category.id)
          a #[span.uk-badge #{category.name}]
`

export default Sidebar
