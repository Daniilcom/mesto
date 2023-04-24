import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._formElement = document.querySelector(this._popupSelector)
    this._form = this._formElement.querySelector('.popup__container')
  }
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input')

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
      evt.target.reset()
    })
  }
}

export { PopupWithForm }
