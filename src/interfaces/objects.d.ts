interface ImageInfo {
  url: string
  height: number
  width: number
}

interface Links extends Field {
  github?: string
  twitter?: string
  zenn?: string
  qiita?: string
  speakerdeck?: string
  wordpress?: string
}

interface Author extends Content {
  name: string
  description: string
  avatar: ImageInfo
  accounts: Links
}

interface Category extends Content {
  name: string
}

interface Article extends Content {
  title: string
  subTitle: string
  author: Author
  categories: Array<?Category>
  body: string
  description?: string
  ogImage?: ImageInfo
  relatedBlogs: Array<?Article>
}

interface Site extends EditInfo {
  title: string
  author: Author
  description: string
  categories: Array<?Category>
}
