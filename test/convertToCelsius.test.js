import { convertToCelsius } from '../src/Components/Converters/convertCelsiumFahreneheit';

test('Correct temperature converted Celsius', () => {
  expect(convertToCelsius(32)).toBe(0);
  expect(convertToCelsius(302)).toBe(150);
  expect(convertToCelsius(1013)).toBe(545);
  expect(convertToCelsius(77873)).toBe(43245);
  expect(convertToCelsius(23)).toBe(-5);
  expect(convertToCelsius(5)).toBe(-15);
});
