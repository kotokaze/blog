import DateTime from '@/lib/date-time'; DateTime

interface Props {
  author: Author
}

const Footer: React.VFC<Props> = ({ author }) => pug`
  .uk-section.uk-section-default.uk-section-small.uk-margin-remove-bottom
    p.uk-text-center.uk-text-meta
      | Copyright #[span &copy;]2021 #[a(href=author.accounts.twitter, target='_blank') #{author.name}]. All rights reserved.
    p.uk-text-center.uk-text-meta
      - const time= (new Date()).toISOString()
      | Revised at #[time(dateTime=time) #{DateTime.date(time)}]
`

export default Footer
