export class LocalStorageService {

  static getItem(name: string) {
    return JSON.parse(localStorage.getItem(name));
  }

  static removeItem(name: string) {
    localStorage.removeItem(name);
  }

  static setItem(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }
}
