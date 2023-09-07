import Link from 'next/link'; Link

type Props = {
  relpath: string
  table?: {
    slug: string
    title: string
  }
}

const Breadcrumb: React.FC<Props> = ({ relpath, table: { slug, title } = {} }) => {
  const paths = relpath.split('/').filter((item) => item !== '')
  const breadcrumbs = paths.map((item, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/')
    const name = slug ? item.replace(RegExp(slug, 'g'), title!) : item
    return { href, name }
  })

  return pug`
    .uk-container-small.uk-margin-remove-top.uk-width-2-3
      ul.uk-breadcrumb.uk-text-nowrap.uk-text-truncate
        each breadcrumb, index in breadcrumbs
          li(key=index)
            Link(href=breadcrumb.href) #{breadcrumb.name}
  `

}

export default Breadcrumb
