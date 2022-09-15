import type { NextApiHandler } from 'next'
import type { ErrCode } from './index.hook'
import { PageType, validateQuery } from './index.hook'

type PreviewResponse = {
  query: Partial<{ [key: string]: string | string[] }>,
} & ErrCode

const handler: NextApiHandler<PreviewResponse> = async (req, res) => {
  const query = req.query
  const { err } = await validateQuery(query)
  if (err) {
    res.status(err.code).json({ ...err, query })
    res.end()
    return
  }

  res.setPreviewData(query.draftKey!, { maxAge: 60 })
  res.redirect(307,
    `/${query.type}` + (query.type !== PageType.INFO ? `/${query.slug}` : '')
  )
  res.end()
}

export default handler
