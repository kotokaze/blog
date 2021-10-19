import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import RSS from 'rss'
import microcmsClient from '@/modules/microcms'

export type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export const genFeedXml = async (): Promise<string> => {
  const articlesPromise: Promise<Article[]> = microcmsClient.v1.blogs
    .$get()
    .then((res) => res.contents)

  const slidesPromise: Promise<Slide[]> = microcmsClient.v1.slides
    .$get()
    .then((res) => res.contents)

  const sitePromise: Promise<Site> = microcmsClient.v1.site.$get()

  const [articles, slides, site] = await Promise.all([
    articlesPromise,
    slidesPromise,
    sitePromise,
  ])

  const feed = new RSS({
    title: site.title,
    description: site.description,
    feed_url: `${site.url}/feed.xml`,
    site_url: site.url,
    copyright: site.author.name,
    language: 'ja',
    categories: site.categories.map((cat) => cat!.name),
    ttl: 86400,
  })

  articles.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description || `${article.title} | ${site.title}`,
      url: `${site.url}/blogs/${article.id}`,
      guid: article.id,
      categories: article.categories.map((cat) => cat!.name) || [],
      author: article.author.name,
      date: new Date(article.publishedAt!),
    })
  })

  slides.forEach((slide) => {
    feed.item({
      title: slide.title,
      description: slide.description || `${slide.title} | ${site.title}`,
      url: `${site.url}/slides/${slide.id}`,
      guid: slide.id,
      categories: slide.categories.map((cat) => cat!.name) || [],
      date: new Date(slide.publishedAt!),
    })
  })

  return feed.xml({ indent: true })
}

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml: string = await genFeedXml()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Content-Length', Buffer.byteLength(xml))
  res.setHeader('Content-Language', 'ja')
  res.end(xml)

  return {
    props: {},
  }
}
