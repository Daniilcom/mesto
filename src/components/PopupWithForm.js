import { Popup } from '../components/Popup.js'

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._formElement = document.querySelector(this._popupSelector)
    this._form = this._formElement.querySelector('.popup__form')
    this._submitButton = this._formElement.querySelector('.popup__submit')
    this._defaultText = this._submitButton.textContent
    this._inputList = this._formElement.querySelectorAll('.popup__input')
  }
  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })

    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._form.reset()
  }

  renderButtonText(saved) {
    saved
      ? (this._submitButton.textContent = 'Сохранение...')
      : (this._submitButton.textContent = this._defaultText)
  }
}

export { PopupWithForm }
