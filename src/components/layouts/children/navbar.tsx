import Link from 'next/link'; Link

interface Props {
  title: string
}

const Navbar: React.FC<Props> = ({ title }) => pug`
  .uk-container.uk-container-expand.uk-background-muted
    nav(data-uk-navbar)
      .uk-navbar-left
        Link(href='/').uk-navbar-item.uk-logo #{title}

      .uk-navbar-right
        ul.uk-navbar-nav(className='uk-visible@m')
          li
            Link(href='/blogs') Blog
          li
            Link(href='/slides') Slides
          li
            Link(href='/info') Info

        a(
          className='uk-hidden@m',
          data-uk-toggle='target: #offcanvas-nav',
          data-uk-navbar-toggle-icon,
          aria-expanded='false',
        )
`

export default Navbar
