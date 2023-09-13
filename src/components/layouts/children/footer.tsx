import Link from 'next/link'; Link
import DateTime from '@/lib/date-time'; DateTime

interface Props {
  author: Author
}

const Footer: React.FC<Props> = ({ author }) => pug`
  .uk-section.uk-section-default.uk-section-small.uk-margin-remove-bottom
    p.uk-text-center.uk-text-small
      | This site anonymously collects traffic data using Cloudflare's analytics to improve the user experience.
    p.uk-text-center.uk-text-meta
      | Copyright #[span &copy;]2021 - 2023.
      | #[Link(href=('https://twitter.com/' + author.accounts.twitter), target='_blank') #{author.name}].
      | All rights reserved.
`

export default Footer
