export default async function getTime(data) {
  const { offset } = data;

  const SECOND_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;

  const date = new Date();

  const localOffset = date.getTimezoneOffset() / MINUTES_IN_HOUR;
  let hours = date.getHours() + localOffset + offset;

  if (hours < 0) hours += HOURS_IN_DAY;
  if (hours >= 24) hours -= HOURS_IN_DAY;

  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return { hours, minutes, seconds };
}
