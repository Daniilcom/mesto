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
  avatarForm,
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
      popupConfirm.open(card)
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
  popupEditProfile.renderButtonText(true)
  try {
    const editedData = await api.sendUserInfo(data)
    userInfo.setUserInfo(editedData)
    popupEditProfile.close()
  } catch (err) {
    alert(err)
  } finally {
    popupEditProfile.renderButtonText(false)
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
  popupAddCard.renderButtonText(true)
  try {
    const dataCard = await api.addCard(card)
    const item = createItem(dataCard)
    cardList.addItem(item)
    popupAddCard.close()
  } catch (err) {
    alert(err)
  } finally {
    popupAddCard.renderButtonText(false)
  }
}

//popup confirm
const popupConfirm = new PopupWithConfirmation(
  '#popup-confirm',
  handleCardDelete
)
popupConfirm.setEventListeners()

async function handleCardDelete(card) {
  const cardId = card.getCardId()
  popupConfirm.renderButtonText(true)
  try {
    await api.deleteCard(cardId)
    card.handleCardDelete()
    popupConfirm.close()
  } catch (err) {
    alert(err)
  } finally {
    popupConfirm.renderButtonText(false)
  }
}

//popup avatar
const popupAvatar = new PopupWithForm('#popup-avatar', handleAvatarFormSubmit)
popupAvatar.setEventListeners()

async function handleAvatarFormSubmit(link) {
  popupAvatar.renderButtonText(true)
  try {
    const data = await api.updAvatar(link)
    userInfo.setUserInfo(data)
    popupAvatar.close()
  } catch (err) {
    alert(err)
  } finally {
    popupAvatar.renderButtonText(false)
  }
}

//open popups
function openPopup(popup) {
  popup.open()
}

//validation
const validationEdit = new FormValidator(validationSettings, profileForm)
const validationAdd = new FormValidator(validationSettings, placeForm)
const validationAvatar = new FormValidator(validationSettings, avatarForm)

validationEdit.enableValidation()
validationAdd.enableValidation()
validationAvatar.enableValidation()

// popup - edit
editorProfile.addEventListener('click', openProfilePopup)

//popup-add
buttonAddPlace.addEventListener('click', () => openPopup(popupAddCard))

//popup-avatar
buttonEditAvatar.addEventListener('click', () => openPopup(popupAvatar))
