import LS from '../src/Components/API/LS';
import langToLocalStorage from '../src/test/langToLocalStorage';

test('save localstorage test', () => {
  langToLocalStorage('ru');

  expect(LS.getItem('lang')).toBe('ru');

  langToLocalStorage('be');

  expect(LS.getItem('lang')).toBe('be');

  langToLocalStorage('en');

  expect(LS.getItem('lang')).toBe('en');
});
