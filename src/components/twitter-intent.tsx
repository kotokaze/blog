import Link from 'next/link'; Link

type Props = {
  fullpath: string
  text: string
  hashtags: string
  via: string
}

const TwitterIntentButton: React.FC<Props> = ({ fullpath, text, hashtags, via }) => {
  const url: string = `https://twitter.com/intent/tweet?url=${fullpath}&text=&#x300C;${text}&#x300D&hashtags=${hashtags}&via=${via}`

  return pug`
    .uk-container.uk-container-expand.uk-margin-medium-top.uk-margin-large-bottom
      div(className='uk-align-right@m').uk-button.uk-button-default
        Link(href=url)
          a(target='_blank').uk-button.uk-button-text
            | #[span(data-uk-icon='twitter')] Share on Twitter
  `
}

export default TwitterIntentButton
