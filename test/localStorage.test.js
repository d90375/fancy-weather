import coordinateLocalStorage from '../src/test/coordinateLocalStorage';
import LS from '../src/Components/API/LS';

test('save localstorage test', () => {
  coordinateLocalStorage(125, 125);

  expect(LS.getItem('latitude')).toBe(125);
  expect(LS.getItem('longitude')).toBe(125);

  coordinateLocalStorage(-214124123133, -312312312313);

  expect(LS.getItem('latitude')).toBe(-214124123133);
  expect(LS.getItem('longitude')).toBe(-312312312313);

  coordinateLocalStorage(5252.243234, -4234234.423424);

  expect(LS.getItem('latitude')).toBe(5252.243234);
  expect(LS.getItem('longitude')).toBe(-4234234.423424);

  coordinateLocalStorage(10.9999, -10.9999);

  expect(LS.getItem('latitude')).toBe(10.9999);
  expect(LS.getItem('longitude')).toBe(-10.9999);
});
