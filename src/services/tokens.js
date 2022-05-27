export default class tokenService {
  static getLocalRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  static getLocalAccessToken() {
    return localStorage.getItem("accessToken");
  }

  static setLocalRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  static setLocalAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  static deleteTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
