import { Popup } from './Popup.js'

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleCardDelet) {
    super(popupSelector)
    this._handleCardDelet = handleCardDelet
    this._formElement = document.querySelector(this._popupSelector)
    this._form = this._formElement.querySelector('.popup__form')
    this._submitButton = this._formElement.querySelector('.popup__submit')
    this._defaultText = this._submitButton.textContent
  }

  open(card) {
    super.open()
    this._card = card
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._renderButtonText(true)
      this._handleCardDelet(this._card)
        .then(() => this.close())
        .catch((err) => {
          alert(err)
        })
        .finally(() => this._renderButtonText(false))
    })
  }

  _renderButtonText(saved) {
    saved
      ? (this._submitButton.textContent = 'Удаление...')
      : (this._submitButton.textContent = this._defaultText)
  }
}

export { PopupWithConfirmation }
