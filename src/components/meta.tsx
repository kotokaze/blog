import Head from 'next/head'; Head

interface Props {
  site: Site
  title?: string
  desc?: string
  kw?: string
  imageUrl?: string
  url?: string
}

const Meta: React.FC<Props> = ({ site, title, desc, kw, imageUrl, url }) => {
  const titleText = title ? (title + ' | ' + site.title) : site.title
  const keywords = kw ? kw : site.categories.map((cat) => cat?.name).join(',')
  const description = desc ? desc : site.description
  const image = imageUrl ? imageUrl : (site.url) + '/assets/images/logo.png'

  return pug`
    Head
      meta(charSet='UTF-8')
      meta(httpEquiv="X-UA-Compatible", content="IE=edge")
      meta(name="viewport", content="width=device-width, initial-scale=1")

      title= titleText
      meta(name='description', content=description)
      meta(name='keywords', content=keywords)

      link(rel='shortcut icon', href='/favicon.ico', type="image/x-icon")

      meta(name='twitter:card', content='summary')
      meta(name='twitter:title', content=titleText)
      meta(name='twitter:description', content=description)
      meta(name='twitter:image', content=image)

      meta(property='og:title', content=titleText)
      meta(property='og:description', content=description)
      meta(property='og:image', content=image)
      meta(property='og:url', content=(url || site.url))
      meta(property='og:locale', content='ja_JP')
      meta(property='og:type', content='website')
  `
}

export default Meta
