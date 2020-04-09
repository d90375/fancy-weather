import { convertToFahrenheit } from '../src/Components/Converters/convertCelsiumFahreneheit';

test('Correct temperature converted Fahrenheit', () => {
  expect(convertToFahrenheit(0)).toBe(32);
  expect(convertToFahrenheit(150)).toBe(302);
  expect(convertToFahrenheit(545)).toBe(1013);
  expect(convertToFahrenheit(43245)).toBe(77873);
  expect(convertToFahrenheit(-5)).toBe(23);
  expect(convertToFahrenheit(-15)).toBe(5);
});
