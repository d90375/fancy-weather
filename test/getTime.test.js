import getTime from '../src/Components/Converters/getTime';

const x = getTime({ offset: 3 }).then(e => {
  console.log(e);
});
console.log(typeof x.hours);

test('weather time json converted', () => {
  const timedata1 = {
    offset: 3
  };
  expect(
    getTime(timedata1).then(data => expect(data).toEqual({ hours: 23, minutes: 53, seconds: 45 }))
  );

  const timedata2 = {
    offset: 4
  };
  expect(
    getTime(timedata1).then(data => expect(data).toEqual({ hours: 23, minutes: 55, seconds: 18 }))
  );
});
