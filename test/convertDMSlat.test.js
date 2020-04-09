import { convertDMSlat } from '../src/Components/Converters/dnsChanger';

test('Correct DMS to latitude', () => {
  expect(convertDMSlat(-4.4860088)).toBe("4°29'9 S");
  expect(convertDMSlat(55.0252998)).toBe("55°1'31 N");
  expect(convertDMSlat(40.6624158)).toBe("40°39'44 N");
});
