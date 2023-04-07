class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector
    this._inputSelector = settings.inputSelector
    this._submitButtonSelector = settings.submitButtonSelector
    this._inactiveButtonClass = settings.inactiveButtonClass
    this._inputErrorClass = settings.inputErrorClass
    this._errorClass = settings.errorClass
    this._formElement = formElement
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    )
    this._buttonElement = this._formElement.querySelector(
      settings.submitButtonSelector
    )
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    )
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    )
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _disableButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass)
    this._buttonElement.setAttribute('disabled', true)
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass)
    this._buttonElement.removeAttribute('disabled')
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton()
    } else {
      this._enableButton()
    }
  }

  _setEventListeners() {
    this._toggleButtonState()
    this._formElement.addEventListener('reset', () => {
      this._disableButton()
    })
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector))
    formList.forEach(() => {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })
      this._setEventListeners()
    })
  }
}

export { FormValidator }
