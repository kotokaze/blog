import UIkit from './children/uikit'; UIkit
import Navbar from './children/navbar'; Navbar
import Footer from './children/footer'; Footer
import OffCanvases from './children/offcanvases'; OffCanvases

interface Props {
  site: Site
  children: React.ReactNode
}

const Layout: React.VFC<Props> = ({ site, children }) => pug`
  UIkit/
    header
      Navbar(title=site.title)/
    main
      = children
    footer
      Footer(author=site.author)
    OffCanvases/
`

export default Layout
