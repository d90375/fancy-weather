export function convertToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

export function convertToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}
