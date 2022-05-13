class tokenService {
  getLocalRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  getLocalAccessToken() {
    return localStorage.getItem("accessToken");
  }

  setLocalRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  setLocalAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  deleteTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export default new tokenService();
