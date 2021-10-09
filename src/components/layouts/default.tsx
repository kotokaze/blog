import UIkit from './children/uikit'; UIkit
import Navbar from './children/navbar'; Navbar
import Scrollbar from './children/scrollbar'; Scrollbar
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
      Scrollbar/
    main/
      = children
    footer/
      Footer(author=author)
    OffCanvases/
`

export default Layout
