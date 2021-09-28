import Sidebar from '../components/sidebar'; Sidebar
import Layout from './default'; Layout

interface Props {
  author: Author
  categories: Array<Category>
  children: React.ReactNode
}

const WithSidebar: React.VFC<Props> = ({author, categories, children}) => pug`
  Layout
    .uk-padding-large.uk-grid-divider(data-uk-grid)
      aside.uk-width-1-4(className='uk-visible@m')
        Sidebar(author=author categories=categories)
      section.uk-width-expand
        = children
`

export default WithSidebar
