import '../pages/index.css'
import { initialCards } from '../utils/dataCards.js'
import { validationSettings } from '../utils/validationSettings.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section.js'
import {
  editorProfile,
  profileForm,
  nameInput,
  descriptionInput,
  buttonAddPlace,
  placeForm,
  namePlaceInput,
  linkPlaceInput,
} from '../utils/constants.js'

//render cards
const addDefaultCards = new Section(
  {
    items: initialCards,
    renderer: renderDefaultCards,
  },
  '.gallary__items'
)
addDefaultCards.renderItems()

function renderDefaultCards(item) {
  const card = new Card(item, '#gallary-item', handleCardClick)
  addDefaultCards.addItem(card.createCard())
}

const createItem = (data, tamplate, handleItemClick) => {
  const card = new Card(data, tamplate, handleItemClick)
  return card.createCard()
}

//popup images
const openImgPopup = new PopupWithImage('#popup-img')
openImgPopup.setEventListeners()

function handleCardClick(name, link) {
  openImgPopup.open(name, link)
}

//popup edit user profile
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
})

const popupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit)
popupEditProfile.setEventListeners()

function handleEditFormSubmit(data) {
  userInfo.setUserInfo(data)
  popupEditProfile.close()
}

function openProfilePopup() {
  const { username, description } = userInfo.getUserInfo()
  nameInput.value = username
  descriptionInput.value = description
  popupEditProfile.open()
}

//popup add cards
const popupAddCard = new PopupWithForm('#popup-add', handleAddFormSubmit)
popupAddCard.setEventListeners()

function handleAddFormSubmit() {
  addDefaultCards.addItem(
    createItem(
      {
        name: namePlaceInput.value,
        link: linkPlaceInput.value,
      },
      '#gallary-item',
      handleCardClick
    )
  )
  popupAddCard.close()
}

function openAddCardPopup() {
  popupAddCard.open()
}

//validation
const validationEdit = new FormValidator(validationSettings, profileForm)
const validationAdd = new FormValidator(validationSettings, placeForm)

validationEdit.enableValidation()
validationAdd.enableValidation()

// popup - edit
editorProfile.addEventListener('click', openProfilePopup)

//popup-add
buttonAddPlace.addEventListener('click', openAddCardPopup)
