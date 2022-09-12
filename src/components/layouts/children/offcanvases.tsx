import Link from 'next/link'; Link

const OffCanvases: React.FC = () => pug`
  div
    #offcanvas-nav(data-uk-offcanvas='flip: true; overlay: true')
      .uk-offcanvas-bar
        ul.uk-nav
          li
            Link(href='/')
              a #[span.uk-margin-small-right(data-uk-icon='icon: home')] Home
          li
            Link(href='/blogs')
              a #[span.uk-margin-small-right(data-uk-icon='icon: pencil')] Blogs
          li
            Link(href='/slides')
              a #[span.uk-margin-small-right(data-uk-icon='icon: image')] Slides
          li
            Link(href='/info')
              a #[span.uk-margin-small-right(data-uk-icon='icon: location')] Info
`

export default OffCanvases
