class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector)
    this._profileInfo = document.querySelector(infoSelector)
    this._profileAvatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      description: this._profileInfo.textContent,
    }
  }

  getUserId() {
    return this._userId
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name
    this._profileInfo.textContent = data.about
    this._profileAvatar.src = data.avatar
    this._userId = data._id
  }
}

export { UserInfo }
