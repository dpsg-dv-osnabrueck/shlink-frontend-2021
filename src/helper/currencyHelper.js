import errorMessages from '@/data/errorMessages';

/**
 *
 * Transform number into specific currency
 *
 * @param {!number} price
 * @param {?string} [locale=de-DE]
 * @param {?string} [currency=EUR]
 * @returns {string}
 * @example currencyHelper(20) // Output: 20,00 €
 * @author Dominik Niemann <dominik@polargold.de>
 *
 */
const currencyHelper = (price, locale = 'de-DE', currency = 'EUR') => {
  if (!price) throw new Error(errorMessages.CURRENCY_HELPER.NO_VALUE);

  const priceFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  return priceFormat.format(price);
};

export default currencyHelper;
