let editProfile = document.querySelector('.profile__edit')
let formElement = document.querySelector('.popup-edit')
let closeFormElement = document.querySelector('.popup-edit__close')
let nameInput = formElement.querySelector('.popup-edit__input_user_name')
let descriptionInput = formElement.querySelector(
  '.popup-edit__input_user_description'
)
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

function togglePopup() {
  formElement.classList.toggle('popup-edit__open')
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
