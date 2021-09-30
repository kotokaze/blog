import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const val: boolean =
    req.query.secret !== process.env.SECRET ||
    !req.query.slug ||
    !req.query.draftKey
  if (val) return res.status(401).json({ message: 'Invalid token' })

  const data: { id: string } = await fetch(`${process.env.MICROCMS_API_URL}/api/v1/blogs`
    + `/${req.query.slug}`
    + `?draftKey=${req.query.draftKey}&fields=id`, {
      headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY! },
    }
  ).then((res) => res.json())
  if (!data) return res.status(401).json({ message: 'Invalid slug' })

  res.setPreviewData(req.query.draftKey, { maxAge: 60 })
  res.redirect(307, `/blogs/${data.id}`)
  res.end()
}

export default handler
