let editProfile = document.querySelector('.profile__edit')
let formElement = document.querySelector('.popup')
let closeFormElement = document.querySelector('.popup__close')
let nameInput = formElement.querySelector('.popup__input_user_name')
let descriptionInput = formElement.querySelector(
  '.popup__input_user_description'
)
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

function togglePopup() {
  formElement.classList.toggle('popup_open')
  nameInput.value = profileName.textContent
  descriptionInput.value = profileDescription.textContent
}

function handleFormSubmit(evt) {
  evt.preventDefault()
  let nameValue = nameInput.value
  let descriptionValue = descriptionInput.value
  profileName.textContent = nameValue
  profileDescription.textContent = descriptionValue
}

editProfile.addEventListener('click', togglePopup)
closeFormElement.addEventListener('click', togglePopup)
formElement.addEventListener('submit', handleFormSubmit)
