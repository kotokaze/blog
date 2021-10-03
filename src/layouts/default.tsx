import UIkit from '@/components/uikit'; UIkit
import Navbar from '@/components/navbar'; Navbar
import Footer from '@/components/footer'; Footer
import OffCanvases from '@/components/offcanvases'; OffCanvases

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
