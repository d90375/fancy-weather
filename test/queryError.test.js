import queryError from '../src/Components/errors/QueryError';
import { error as errorDOM } from '../src/Components/DOM/Control';

test('query lang test', () => {
  queryError('ru');
  expect(errorDOM.textContent).toBe('Извинте, неверный запрос');

  queryError('en');
  expect(errorDOM.textContent).toBe('Sorry, invalid query');

  queryError('be');
  expect(errorDOM.textContent).toBe('Прабачце, няправільны запыт');
});
