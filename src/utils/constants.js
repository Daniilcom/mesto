// popup-edit
const editorProfile = document.querySelector('.profile__edit')
const profileForm = document.forms['profile-form']
const nameInput = document.querySelector('.popup__input_user_name')
const descriptionInput = document.querySelector(
  '.popup__input_user_description'
)

//popup-add
const buttonAddPlace = document.querySelector('.profile__add')
const placeForm = document.forms['place-form']

//popuo-avatar
const buttonEditAvatar = document.querySelector('.profile__avatar-upd')
const avatarForm = document.forms['avatar-form']

const requestData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: '24288f94-4e58-4303-be1b-8968711a8d83',
    'content-Type': 'application/json',
  },
}

export {
  editorProfile,
  profileForm,
  nameInput,
  descriptionInput,
  buttonAddPlace,
  placeForm,
  avatarForm,
  buttonEditAvatar,
  requestData,
}
