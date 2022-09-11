import microcmsClient from '@/modules/microcms'

const PageType: { [key: string]: string } = {
  BLOGS: 'blogs',
  INFO: 'info',
}
type PageType = typeof PageType[keyof typeof PageType]

type ErrCode = {
  code: number,
  message: string,
}

const isSlugExists = async (type: PageType, slug: string, draftKey: string): Promise<boolean> => {
  if (type === PageType.BLOGS) {
    const data: { id: string } = await microcmsClient.v1.blogs._id(slug).$get({
      query: {
        fields: 'id',
        draftKey: draftKey.toString(),
      },
    })
    return !!data.id
  }

  return false
}

const validateQuery = async (query: { [key: string]: string | string[] }): Promise<{
  err?: ErrCode,
}> => {

  const val: boolean =
    query.secret !== process.env.MICROCMS_SECRET ||
    !query.draftKey ||
    !Object.values(PageType).includes(query.type?.toString())
  if (val) return { err: { code: 401, message: 'Invalid request' } }

  if (query.type !== PageType.INFO) {
    if (!query.slug) return { err: { code: 401, message: 'Invalid request' } }

    if (!
      await isSlugExists(
        Object.values(PageType).find((v) => v === query.type.toString()) as PageType,
        query.slug.toString(),
        query.draftKey.toString(),
      )
    ) return { err: { code: 404, message: 'Invalid slug' } }
  }

  return {}
}

export { PageType, validateQuery }
export type { ErrCode }
