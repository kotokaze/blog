import microcmsClient from '@/modules/microcms'

const PageType: { [key: string]: string } = {
  BLOGS: 'blogs',
  INFO: 'info',
  SLIDES: 'slides',
}
type PageType = typeof PageType[keyof typeof PageType]

type ErrCode = {
  code: number,
  message: string,
}

const isSlugExists = async (type: PageType, slug: string, draftKey: string): Promise<boolean> => {
  let data: { id: string } | null = null
  const query: MethodsGetContentQuery = {
    fields: 'id',
    draftKey: draftKey,
  }

  if (type === PageType.BLOGS)
    data = await microcmsClient.v1.blogs._id(slug).$get({ query })

  if (type === PageType.SLIDES)
    data = await microcmsClient.v1.slides._id(slug).$get({ query })

  return !!data
}

type Args = Partial<{ [key: string]: string | string[] }>
const validateQuery = async (query: Args): Promise<{
  err?: ErrCode,
}> => {
  const { secret, type, slug, draftKey } = query
  if (
    secret !== process.env.MICROCMS_SECRET ||
    !draftKey ||
    !type ||
    !Object.values(PageType).includes(type.toString())
  ) return { err: { code: 401, message: 'Invalid request' } }

  if (type !== PageType.INFO) {
    if (!slug) return { err: { code: 401, message: 'Invalid request' } }

    if (!
      await isSlugExists(
        Object.values(PageType).find((v) => v === type.toString()) as PageType,
        slug.toString(),
        draftKey.toString(),
      )
    ) return { err: { code: 404, message: 'Invalid slug' } }
  }

  return {}
}

export { PageType, validateQuery }
export type { ErrCode }
