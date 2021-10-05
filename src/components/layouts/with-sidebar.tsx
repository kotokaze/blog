import Sidebar from './children/sidebar'; Sidebar
import Layout from './default'; Layout

interface Props {
  site: Site
  author?: Author
  children: React.ReactNode
}

const WithSidebar: React.VFC<Props> = ({ site, author, children }) => pug`
  Layout(site=site)
    .uk-padding-large.uk-grid-divider(data-uk-grid)
      Sidebar(author=(author ? author : site.author), categories=site.categories)
      section.uk-width-expand
        = children
`

export default WithSidebar
