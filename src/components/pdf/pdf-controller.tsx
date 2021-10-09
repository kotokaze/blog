import { useKey } from '@/hooks/useKey'

interface Props {
  isPrevDisabled: boolean
  isNextDisabled: boolean
  prevPage: () => void
  nextPage: () => void
}

const PageController: React.VFC<Props> = ({
  prevPage,
  nextPage,
  isPrevDisabled,
  isNextDisabled,
}) => {
  const onEnterPressed = ({ key }: KeyboardEvent) => {
    if (!isNextDisabled) nextPage()
  }
  const onArrowRightPressed = ({ key }: KeyboardEvent) => {
    if (!isNextDisabled) nextPage()
  }
  const onArrowLeftPressed = ({ key }: KeyboardEvent) => {
    if (!isPrevDisabled) prevPage()
  }

  useKey('Enter', onEnterPressed)
  useKey('ArrowRight', onArrowRightPressed)
  useKey('ArrowLeft', onArrowLeftPressed)

  return pug`
    #pdf-controller
      .uk-flex.uk-flex-center
        button(
          onClick=prevPage
          disabled=isPrevDisabled
          data-uk-tooltip='title: Previous page; pos: bottom; delay: 200'
        ).uk-button.uk-button-default.uk-active.uk-margin-small-right #[span(data-uk-icon='icon: chevron-double-left')]
        button(
          onClick=nextPage
          disabled=isNextDisabled
          data-uk-tooltip='title: Next page; pos: bottom; delay: 200'
        ).uk-button.uk-button-default.uk-active #[span(data-uk-icon='icon: chevron-double-right')]

      div(className='uk-visible@m').uk-flex.uk-flex-right.uk-margin-remove-top.uk-margin-small-bottom
        button(
          data-uk-icon='icon: info'
          data-uk-tooltip='title: [←] Previous Page<br/>[→ / Enter] Next Page; pos: bottom; delay: 200'
        ).uk-button.uk-active
  `
}

export default PageController
