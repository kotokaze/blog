import {
  formatDistanceToNow,
  parseISO,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

export const formatInJst = (date: Date | string | number, format = 'yyyy/MM/dd') => {
  return formatInTimeZone(date, 'Asia/Tokyo', format, { locale: ja });
};

export const getElapsed = (iso8601: string) => {
  const utcDate = parseISO(iso8601);
  return formatDistanceToNow(utcDate, {
    addSuffix: true,
    locale: ja,
  });
};
