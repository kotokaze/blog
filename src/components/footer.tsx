interface Props {
  author: Author
}

const Footer: React.VFC<Props> = ({ author }) => pug`
  .uk-section.uk-section-default.uk-section-small.uk-margin-remove-bottom
    p.uk-text-center.uk-text-meta
      | Copyright #[span &copy;]2021 #[a(href=author.accounts.twitter, target='_blank') #{author.name}]. All rights reserved.
`

export default Footer
