import microcmsClient from '@/modules/microcms'

const PageType: { [key: string]: string } = {
  BLOGS: 'blogs',
  INFO: 'info',
}

type ErrCode = {
  code: number,
  message: string,
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

    const data: { id: string } = await microcmsClient.v1.blogs._id(`${query.slug}`).$get({
      query: {
        fields: 'id',
        draftKey: query.draftKey.toString(),
      },
    })
    if (!data) return { err: { code: 404, message: 'Invalid slug' } }
  }

  return {}
}

export { PageType, validateQuery }
export type { ErrCode }
