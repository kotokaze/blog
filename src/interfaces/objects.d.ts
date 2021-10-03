interface ImageInfo {
  url: string
  height: number
  width: number
}

interface Author extends Content {
  name: string
  avatar: ImageInfo
  githubId?: string
  twitterId?: string
  wordpress?: string
}

interface Category extends Content {
  name: string
}

interface Article extends Content {
  title: string
  categories: Array<Category?>
  body: string
  description?: string
  ogImage?: ImageInfo
  relatedBlogs: Array<Article?>
}