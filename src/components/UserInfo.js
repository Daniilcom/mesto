class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._profileName = document.querySelector(nameSelector)
    this._profileInfo = document.querySelector(infoSelector)
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      description: this._profileInfo.textContent,
    }
  }

  setUserInfo(data) {
    this._profileName.textContent = data.username
    this._profileInfo.textContent = data.description
  }
}

export { UserInfo }
