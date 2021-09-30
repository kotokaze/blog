import type { NextApiHandler } from 'next'
import apiClient from '../../modules/api-client'

const handler: NextApiHandler = async (req, res) => {
  const val: boolean =
    req.query.secret !== process.env.MICROCMS_SECRET ||
    !req.query.slug ||
    !req.query.draftKey
  if (val) return res.status(401).json({ message: 'Invalid token' })

  const data: { id: string }= await apiClient.v1.blogs._id(`${req.query.slug}`).$get({
    query: {
      fields: 'id',
      draftKey: req.query.draftKey.toString(),
    },
  })
  if (!data) return res.status(401).json({ message: 'Invalid slug' })

  res.setPreviewData(req.query.draftKey, { maxAge: 60 })
  res.redirect(307, `/blogs/${data.id}`)
  res.end()
}

export default handler
