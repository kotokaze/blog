import { Fragment } from 'react'; Fragment

interface Props {
  title: string
  desc: string
  image?: string
  url: string
}

const Social: React.VFC<Props> = ({ title, desc, image, url}) => pug`
  Fragment
    //- Twitter Card
    meta(name='twitter:card', content='summary')
    meta(name='twitter:title', content=title)
    meta(name='twitter:description', content=desc)
    meta(name='twitter:image', content=(image || (url + '/assets/images/logo.png')))
    meta(name='twitter:image:type', content='image/png')

    //- Open Graph
    meta(property='og:title', content=title)
    meta(property='og:description', content=desc)
    meta(property='og:image', content=(image || (url + '/assets/images/logo.png')))
    meta(property='og:image:type', content='image/png')
    meta(property='og:url', content=url)
    meta(property='og:locale', content='ja_JP')
    meta(property='og:type', content='website')
`

export default Social
