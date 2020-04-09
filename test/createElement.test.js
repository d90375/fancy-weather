import createElement from '../src/Components/DOM/createElement';

test('Create dom element test', () => {
  const el = createElement('span', 'true', 'false');

  expect(el.tagName).toBe('SPAN');
  expect(el.classList.contains('true')).toBe(true);
  expect(el.classList.contains('falsee')).toBe(false);
});
