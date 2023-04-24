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
const namePlaceInput = document.querySelector('.popup__input_place_name')
const linkPlaceInput = document.querySelector('.popup__input_place_link')

export {
  editorProfile,
  profileForm,
  nameInput,
  descriptionInput,
  buttonAddPlace,
  placeForm,
  namePlaceInput,
  linkPlaceInput,
}
