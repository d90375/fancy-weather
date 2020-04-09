import { convertDMSlng } from '../src/Components/Converters/dnsChanger';

test('Correct DMS to longitude', () => {
  expect(convertDMSlng(40.7127281)).toBe("40°42'45 E");
  expect(convertDMSlng(51.5073219)).toBe("51°30'26 E");
});
