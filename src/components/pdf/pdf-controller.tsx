interface Props {
  isPrevDisabled: boolean
  isNextDisabled: boolean
  prevPage: () => void
  nextPage: () => void
}

const PageController: React.VFC<Props> = ({ prevPage, nextPage, isPrevDisabled, isNextDisabled }) => pug`
  .uk-flex.uk-flex-center
    button(
      onClick=prevPage
      disabled=isPrevDisabled
    ).uk-button.uk-button-default.uk-margin-small-right #[span(data-uk-icon='icon: chevron-double-left')]
    button(
      onClick=nextPage
      disabled=isNextDisabled
    ).uk-button.uk-button-default #[span(data-uk-icon='icon: chevron-double-right')]
`


export default PageController
