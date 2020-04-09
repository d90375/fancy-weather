import alphabet from '../src/Components/Converters/alphabet';

test('Alphabet translate test', () => {
  expect(alphabet.static.en[0]).toBe('Feels like: ');
  expect(alphabet.static.ru[0]).toBe('Ощущается как: ');
  expect(alphabet.static.be[0]).toBe('Адчуваецца як: ');
  expect(alphabet.day.en[0]).toBe('Sunday');
  expect(alphabet.day.ru[0]).toBe('Воскресенье');
  expect(alphabet.day.be[0]).toBe('Нядзеля');
  expect(alphabet.dayShort.en[0]).toBe('Sun');
  expect(alphabet.dayShort.ru[0]).toBe('Вс');
  expect(alphabet.dayShort.be[0]).toBe('Нд');
  expect(alphabet.month.en[0]).toBe('January');
  expect(alphabet.month.ru[0]).toBe('Января');
  expect(alphabet.month.be[0]).toBe('Студзеня');
});
