const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(settings.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(settings.errorClass)
}

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(settings.inputErrorClass)
  errorElement.classList.remove(settings.errorClass)
  errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    )
  } else {
    hideInputError(formElement, inputElement, settings)
  }
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  )
  const buttonElement = formElement.querySelector(settings.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, settings)
  formElement.addEventListener('reset', () => {
    disableButton(buttonElement, settings)
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings)
      toggleButtonState(inputList, buttonElement, settings)
    })
  })
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(formElement, settings)
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const disableButton = (buttonElement, settings) => {
  buttonElement.classList.add(settings.inactiveButtonClass)
  buttonElement.setAttribute('disabled', true)
}

const enableButton = (buttonElement, settings) => {
  buttonElement.classList.remove(settings.inactiveButtonClass)
  buttonElement.removeAttribute('disabled')
}

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, settings)
  } else {
    enableButton(buttonElement, settings)
  }
}

enableValidation(validationSettings)
