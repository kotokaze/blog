import DateTime from '../lib/date-time'; DateTime

interface Props {
  utcTime: string
}

const Date: React.VFC<Props> = ({ utcTime }) => pug`
  time(dateTime=utcTime)
    = DateTime.date(utcTime)
`

export default Date
