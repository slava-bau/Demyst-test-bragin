function formatCurrency(value: string): string {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) {
    return value;
  }

  const countryLocales = process.env.REACT_APP_COUNTRY_LOCALES;
  const currencyCode = process.env.REACT_APP_CURRENCY_CODE;

  return new Intl.NumberFormat(countryLocales, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2
  }).format(numberValue);
}

export default formatCurrency;
