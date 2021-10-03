import UIkit from '@/components/uikit'; UIkit
import Navbar from '@/components/navbar'; Navbar
import Footer from '@/components/footer'; Footer
import OffCanvases from '@/components/offcanvases'; OffCanvases

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
      Footer/
    OffCanvases/
`

export default Layout
