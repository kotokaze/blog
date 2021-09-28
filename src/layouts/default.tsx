import UIkit from '../components/uikit'; UIkit
import Navbar from '../components/navbar'; Navbar
import OffCanvases from '../components/offcanvases'; OffCanvases

interface Props {
  children: React.ReactNode
}

const Layout: React.VFC<Props> = ({ children }) => pug`
  UIkit/
    header
      Navbar/
    main
      = children
    footer
    OffCanvases/
`

export default Layout
