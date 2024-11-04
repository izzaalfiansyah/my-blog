const TOKEN = "MYBLOGAPPTOKEN";

export class Storage {
  static async setToken(val: string) {
    localStorage.setItem(TOKEN, val);
  }

  static getToken() {
    return localStorage.getItem(TOKEN);
  }

  static async removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
