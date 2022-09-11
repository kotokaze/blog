import Head from 'next/head'; Head

interface Props {
  title: string
  desc: string
  kw: string
  children?: React.ReactNode
}

const Meta: React.FC<Props> = ({ title, desc, kw, children }) => pug`
  Head
    meta(charSet='UTF-8')
    meta(httpEquiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1")

    title= title
    meta(name='description', content=desc)
    meta(name='keywords', content=kw)

    link(rel='shortcut icon', href='/favicon.ico', type="image/x-icon")

    = children
`

export default Meta
