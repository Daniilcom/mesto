class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._popupItem = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popupItem.classList.add('popup_open')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose)
    this._popupItem.classList.remove('popup_open')
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handleClose(evt) {
    if (
      evt.target.classList.contains('popup_open') ||
      evt.target.classList.contains('popup__close')
    ) {
      this.close()
    }
  }

  setEventListeners() {
    this._popupItem.addEventListener('mousedown', (evt) => {
      this._handleClose(evt)
    })
  }
}

export { Popup }
