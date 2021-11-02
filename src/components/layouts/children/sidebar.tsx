import Link from 'next/link'; Link

interface Props {
  author: Author
  categories: Array<Category>
  repo: string
}

const Sidebar: React.VFC<Props> = ({ author, categories, repo }) => pug`
  aside.uk-width-1-4(className='uk-visible@m')
    .uk-margin-large-bottom
      h3.uk-heading-line.uk-text-center #[span Profile]
      img(src=author.avatar.url data-uk-image).uk-border-circle.uk-align-center
      h5.uk-text-large #{author.name}

      .uk-flex.uk-flex-center
        a(href=author.accounts.twitter, target='_blank', data-uk-icon='twitter').uk-icon-button.uk-margin-right
        a(href=author.accounts.github, target='_blank', data-uk-icon='github').uk-icon-button.uk-margin-right
        a(href=repo, target='_blank', data-uk-icon='git-branch').uk-icon-button.uk-margin-right
        a(href='/feed', data-uk-icon='rss').uk-icon-button

    .uk-margin-large-bottom
      h3.uk-heading-line.uk-text-center #[span Tags]
      each category in categories
        Link(href={pathname: '/categories/[slug]', query: { slug: category.id}}, key=category.id)
          a.uk-margin-small-right #[span.uk-badge #{category.name}]
`

export default Sidebar
