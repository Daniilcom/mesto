import { initialCards } from './data-cards.js'
import { validationSettings } from './validation-settings.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const gallary = document.querySelector('.gallary__items')
const popupItems = document.querySelectorAll('.popup')
// popup-edit
const editorProfile = document.querySelector('.profile__edit')
const profilePopup = document.querySelector('#popup-edit')
const profileForm = document.forms['profile-form']
const nameInput = profilePopup.querySelector('.popup__input_user_name')
const descriptionInput = profilePopup.querySelector(
  '.popup__input_user_description'
)
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
//popup-add
const buttonAddPlace = document.querySelector('.profile__add')
const placePopup = document.querySelector('#popup-add')
const placeForm = document.forms['place-form']
const namePlaceInput = placePopup.querySelector('.popup__input_place_name')
const linkPlaceInput = placePopup.querySelector('.popup__input_place_link')
//popup-img
const popupImg = document.querySelector('#popup-img')
const imgName = popupImg.querySelector('.popup__name')
const img = popupImg.querySelector('.popup__image')

const openPopup = (popup) => {
  popup.classList.add('popup_open')
  document.addEventListener('keydown', closePopupEsc)
}

const closePopup = (popup) => {
  popup.classList.remove('popup_open')
  document.removeEventListener('keydown', closePopupEsc)
}

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_open')
    closePopup(popupOpened)
  }
}

popupItems.forEach((popupItem) => {
  popupItem.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_open')) {
      closePopup(popupItem)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popupItem)
    }
  })
})

const openProfilePopup = () => {
  openPopup(profilePopup)
  nameInput.value = profileName.textContent
  descriptionInput.value = profileDescription.textContent
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault()
  const nameValue = nameInput.value
  const descriptionValue = descriptionInput.value
  profileName.textContent = nameValue
  profileDescription.textContent = descriptionValue
  evt.target.reset()
  closePopup(profilePopup)
}

const createItem = (data, tamplate, handleItemClick) => {
  const card = new Card(data, tamplate, handleItemClick)
  return card.createCard()
}

const addDefaultGallary = () => {
  initialCards.forEach((item) => {
    gallary.append(createItem(item, '#gallary-item', openImgPopup))
  })
}

const openImgPopup = (name, link) => {
  imgName.textContent = name
  img.src = link
  img.alt = name
  openPopup(popupImg)
}

const addNewItem = (evt) => {
  evt.preventDefault()
  gallary.prepend(
    createItem(
      {
        name: namePlaceInput.value,
        link: linkPlaceInput.value,
      },
      '#gallary-item',
      openImgPopup
    )
  )
  evt.target.reset()
  closePopup(placePopup)
}

addDefaultGallary()

// popup - edit
editorProfile.addEventListener('click', () => openProfilePopup())
profilePopup.addEventListener('submit', handleProfileFormSubmit)

//popup-add
buttonAddPlace.addEventListener('click', () => openPopup(placePopup))
placePopup.addEventListener('submit', addNewItem)

//validation
const validationEdit = new FormValidator(validationSettings, profileForm)
const validationAdd = new FormValidator(validationSettings, placeForm)

validationEdit.enableValidation()
validationAdd.enableValidation()
