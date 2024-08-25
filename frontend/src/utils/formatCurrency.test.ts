import formatCurrency from './formatCurrency';

describe('formatCurrency', () => {
  beforeAll(() => {
    process.env.REACT_APP_COUNTRY_LOCALES = 'au-AU';
    process.env.REACT_APP_CURRENCY_CODE = 'AUD';
  });

  it('should format whole numbers as currency with cents in AUD', () => {
    expect(formatCurrency('1000')).toBe('$1,000.00');
  });

  it('should format numbers with cents correctly in AUD', () => {
    expect(formatCurrency('1000.50')).toBe('$1,000.50');
  });

  it('should round and format numbers with more than two decimal places in AUD', () => {
    expect(formatCurrency('1000.123')).toBe('$1,000.12');
  });

  it('should format small numbers as currency with cents in AUD', () => {
    expect(formatCurrency('0.5')).toBe('$0.50');
  });

  it('should format zero correctly as currency in AUD', () => {
    expect(formatCurrency('0')).toBe('$0.00');
  });

  it('should format large numbers correctly in AUD', () => {
    expect(formatCurrency('98765432197541.03')).toBe('$98,765,432,197,541.03');
  });

  it('should handle negative numbers correctly in AUD', () => {
    expect(formatCurrency('-1234.56')).toBe('-$1,234.56');
  });

  it('should return the original string if it cannot be parsed as a number', () => {
    expect(formatCurrency('abc')).toBe('abc');
  });

  it('should return an empty string if an empty string is passed', () => {
    expect(formatCurrency('')).toBe('');
  });

  it('should format currency according to the "de-DE" locale and "EUR" currency', () => {
    process.env.REACT_APP_COUNTRY_LOCALES = 'de-DE';
    process.env.REACT_APP_CURRENCY_CODE = 'EUR';
    
    expect(formatCurrency('1000')).toBe('1.000,00 €');
    expect(formatCurrency('1000.50')).toBe('1.000,50 €');
    expect(formatCurrency('-1000.12')).toBe('-1.000,12 €');
  });
});
