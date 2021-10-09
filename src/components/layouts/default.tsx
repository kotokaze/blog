import UIkit from './children/uikit'; UIkit
import Navbar from './children/navbar'; Navbar
import Footer from './children/footer'; Footer
import OffCanvases from './children/offcanvases'; OffCanvases

interface Props {
  title: string
  author: Author
  children: React.ReactNode
}

const Layout: React.VFC<Props> = ({ title, author, children }) => pug`
  UIkit/
    header(data-uk-sticky)
      Navbar(title=title)
    main/
      = children
    footer/
      Footer(author=author)
    OffCanvases/
`

export default Layout
