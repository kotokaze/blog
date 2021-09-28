import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

class DateTime {
  static date = (utc: string): string =>
    format(parseISO(utc), 'yyyy.LL.dd')
  static elapsed = (utc: string): string =>
    formatDistanceToNow(parseISO(utc), { locale: ja })
}

export default DateTime
