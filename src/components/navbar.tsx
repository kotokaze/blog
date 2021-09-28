import Image from 'next/image'; Image
import Link from 'next/link'; Link

const Navbar: React.VFC = () => pug`
  .uk-container.uk-container-expand.uk-background-muted
    nav(data-uk-navbar)
      .uk-navbar-left
        Link(href='/')
          a.uk-navbar-item.uk-logo Kotokaze's Blog

      .uk-navbar-right
        ul.uk-navbar-nav(className='uk-visible@m')
          li
            Link(href='/blogs')
              a Blog
          li
            Link(href='/about')
              a About
          li
            Link(href='/info')
              a Info

        a(
          className='uk-hidden@m',
          data-uk-toggle='target: #offcanvas-nav',
          data-uk-navbar-toggle-icon,
          aria-expanded='false',
          )
`

export default Navbar
