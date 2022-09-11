import Sidebar from './children/sidebar'; Sidebar
import Layout from './default'; Layout

interface Props {
  site: Site
  author?: Author
  children: React.ReactNode
}

const WithSidebar: React.FC<Props> = ({ site, author, children }) => pug`
  Layout(title=site.title, author=site.author)
    .uk-padding-large.uk-grid-divider(data-uk-grid)
      Sidebar(author=(author ? author : site.author), categories=site.categories, repo=site.repo)
      section.uk-width-expand
        = children
`

export default WithSidebar
