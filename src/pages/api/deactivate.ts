import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.preview)
    res.clearPreviewData()
  res.redirect(307, '/')
  res.end()
}

export default handler
