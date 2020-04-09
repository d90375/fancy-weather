export default class LS {
  static setItem(key, value) {
    localStorage.setItem(key, this.toStr(value));
  }

  static getItem(key) {
    return this.parseStr(localStorage.getItem(key));
  }

  static clearItem(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  static toStr(value) {
    return JSON.stringify(value);
  }

  static parseStr(value) {
    return JSON.parse(value);
  }
}
