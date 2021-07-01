import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const formatDateToDeTime = (date: Date, pattern = 'H.mm'): string => {
  if (date) {
    return format(date, pattern, { locale: de });
  } else {
    return '';
  }
};

export default formatDateToDeTime;
