import '../pages/index.css'
import { validationSettings } from '../utils/validationSettings.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section.js'
import { Api } from '../components/Api.js'
import {
  editorProfile,
  profileForm,
  nameInput,
  descriptionInput,
  buttonAddPlace,
  placeForm,
  buttonEditAvatar,
  requestData,
} from '../utils/constants.js'

const api = new Api(requestData)

//render cards
const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createItem(item)
      cardList.addItem(cardElement)
    },
  },
  '.gallary__items'
)

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data)
    cardList.renderItems(initialCards)
  })
  .catch((err) => {
    alert(err)
  })

function createItem(data) {
  const userId = userInfo.getUserId()
  const card = new Card(data, userId, '#gallary-item', {
    handleCardClick: (title, link) => {
      openImgPopup.open(title, link)
    },
    handleLikeClick: () => {
      const cardId = card.getCardId()
      const liked = card.likedCard()
      const res = liked ? api.deleteLikeCard(cardId) : api.addLikeCard(cardId)
      res
        .then((initialCards) => {
          card.setLikesCard(initialCards)
          card.renderLikes()
        })
        .catch((err) => {
          alert(err)
        })
    },
    handleDeleteClick: () => {
      openConfirmPopup.open(card)
    },
  })
  return card.createCard()
}

//popup images
const openImgPopup = new PopupWithImage('#popup-img')
openImgPopup.setEventListeners()

//popup edit user profile
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
})

const popupEditProfile = new PopupWithForm('#popup-edit', handleEditFormSubmit)
popupEditProfile.setEventListeners()

async function handleEditFormSubmit(data) {
  try {
    const editedData = await api.sendUserInfo(data)
    userInfo.setUserInfo(editedData)
  } catch (err) {
    alert(err)
  }
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

async function handleAddFormSubmit(card) {
  try {
    const dataCard = await api.addCard(card)
    const item = createItem(dataCard)
    cardList.addItem(item)
    popupAddCard.close()
  } catch (err) {
    alert(err)
  }
}

//popup confirm
const openConfirmPopup = new PopupWithConfirmation(
  '#popup-confirm',
  handleCardDelete
)
openConfirmPopup.setEventListeners()

async function handleCardDelete(card) {
  const cardId = card.getCardId()
  try {
    await api.deleteCard(cardId)
    openConfirmPopup.close()
    card.handleCardDelete()
  } catch (err) {
    alert(err)
  }
}

//popup avatar
const popupAvatar = new PopupWithForm('#popup-avatar', handleAvatarFormSubmit)
popupAvatar.setEventListeners()

async function handleAvatarFormSubmit(link) {
  try {
    const data = await api.updAvatar(link)
    userInfo.setUserInfo(data)
  } catch (err) {
    alert(err)
  }
}

//open popups
function openPopup(popup) {
  popup.open()
}

//validation
const validationEdit = new FormValidator(validationSettings, profileForm)
const validationAdd = new FormValidator(validationSettings, placeForm)

validationEdit.enableValidation()
validationAdd.enableValidation()

// popup - edit
editorProfile.addEventListener('click', openProfilePopup)

//popup-add
buttonAddPlace.addEventListener('click', () => openPopup(popupAddCard))

//popup-avatar
buttonEditAvatar.addEventListener('click', () => openPopup(popupAvatar))
