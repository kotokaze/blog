import Navbar from '../components/navbar'; Navbar
import OffCanvases from '../components/offcanvases'; OffCanvases

const Layout = ({ children }) => pug`
  div
    header
      Navbar/
    main
      ${children}
    footer
    OffCanvases/
`

export default Layout
