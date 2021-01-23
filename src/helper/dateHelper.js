import errorMessages from '@/data/errorMessages';

/**
 *
 * Format date
 *
 * @param {string} date
 * @param {Object} option
 * @param {string} locale
 * @ignore
 */
const formatDateTime = (date, option, locale) => {
  const dateFormat = new Intl.DateTimeFormat(locale, option);
  return dateFormat.format(new Date(date));
};

/**
 *
 * Transform date into specific format
 *
 * @param {!string} date
 * @param {?string} [option=date] - Options: date, time, dateTime, dateShort
 * @param {?string} [locale=de-DE]
 * @returns {string}
 * @example dateHelper(new Date(), 'time') // Output: 12:11
 * @author Dominik Niemann <dominik@polargold.de>
 */
const dateHelper = (date, option = 'date', locale = 'de-DE') => {
  if (!date) throw new Error(errorMessages.DATE_HELPER.NO_VALUE);

  const format = {
    date: { month: '2-digit', day: '2-digit', year: '2-digit' },
    time: { hour: 'numeric', minute: 'numeric' },
    dateTime: {
      month: '2-digit', day: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric',
    },
    dateShort: { month: '2-digit', day: '2-digit' },
  };
  return formatDateTime(date, format[option], locale);
};

export default dateHelper;
