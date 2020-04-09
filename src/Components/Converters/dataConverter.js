import alphabet from './alphabet';

export default function dataConverter(unix, offset, lang) {
  const SH = 3600;
  const SM = 60;
  const MSS = 1000;

  const local = new Date(unix * MSS);
  const cityUnixTime = unix + local.getTimezoneOffset() * SM + offset * SH;
  const city = new Date(cityUnixTime * MSS);

  const dayOfWeek = alphabet.day[lang][city.getDay()];
  const dayOfWeekShort = alphabet.dayShort[lang][city.getDay()];
  const day = city.getDate();
  const month = alphabet.month[lang][city.getMonth()];
  return { dayOfWeek, dayOfWeekShort, day, month };
}
