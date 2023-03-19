const gallary = document.querySelector('.gallary__items')
const templateItem = document.querySelector('#gallary-item')
const gallaryItem = templateItem.content.querySelector('.gallary__item')
const popupItems = document.querySelectorAll('.popup')
// popup-edit
const editorProfile = document.querySelector('.profile__edit')
const formProfile = document.querySelector('#popup-edit')
const profileCloseElement = formProfile.querySelector('.popup__close')
const nameInput = formProfile.querySelector('.popup__input_user_name')
const descriptionInput = formProfile.querySelector(
  '.popup__input_user_description'
)
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
//popup-add
const buttonAddPlace = document.querySelector('.profile__add')
const formPlace = document.querySelector('#popup-add')
const placeCloseElement = formPlace.querySelector('.popup__close')
const namePlaceInput = formPlace.querySelector('.popup__input_place_name')
const linkPlaceInput = formPlace.querySelector('.popup__input_place_link')
//popup-img
const popupImg = document.querySelector('#popup-img')
const imgCloseElement = popupImg.querySelector('.popup__close')

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

const closePopupСlick = popupItems.forEach((popupItem) => {
  popupItem.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_open')) {
      closePopup(popupItem)
    }
  })
})

const openProfilePopup = () => {
  openPopup(formProfile)
  nameInput.value = profileName.textContent
  descriptionInput.value = profileDescription.textContent
}

const handleFormSubmit = (evt) => {
  evt.preventDefault()
  const nameValue = nameInput.value
  const descriptionValue = descriptionInput.value
  profileName.textContent = nameValue
  profileDescription.textContent = descriptionValue
  closePopup(formProfile)
}

const itemData = initialCards.map((item) => {
  return {
    name: item.name,
    link: item.link,
  }
})

const createItem = (itemData) => {
  const contentItem = templateItem.content
  const cloneItem = contentItem.cloneNode(true)
  cloneItem.querySelector('.gallary__description').textContent = itemData.name
  cloneItem.querySelector('.gallary__image').src = itemData.link
  cloneItem.querySelector('.gallary__image').alt = `${itemData.name}`

  cloneItem
    .querySelector('.gallary__like')
    .addEventListener('click', (evt) =>
      evt.target.classList.toggle('gallary__like_active')
    )
  cloneItem
    .querySelector('.gallary__trash')
    .addEventListener('click', (evt) =>
      evt.target.closest('.gallary__item').remove()
    )
  const openImgPopup = () => {
    popupImg.querySelector('.popup__name').textContent = itemData.name
    popupImg.querySelector('.popup__image').src = itemData.link
    popupImg.querySelector('.popup__image').alt = `${itemData.name}`
    openPopup(popupImg)
  }
  cloneItem
    .querySelector('.gallary__image')
    .addEventListener('click', openImgPopup)

  return cloneItem
}

const addDefaultGallary = () => {
  itemData.forEach((item) => {
    gallary.append(createItem(item))
  })
}

const addNewItem = (evt) => {
  evt.preventDefault()
  gallary.prepend(
    createItem({
      name: namePlaceInput.value,
      link: linkPlaceInput.value,
    })
  )
  closePopup(formPlace)
  namePlaceInput.value = ''
  linkPlaceInput.value = ''
}

addDefaultGallary()

// popup-edit

editorProfile.addEventListener('click', () => openProfilePopup())
profileCloseElement.addEventListener('click', () => closePopup(formProfile))
formProfile.addEventListener('submit', handleFormSubmit)

//popup-add

buttonAddPlace.addEventListener('click', () => openPopup(formPlace))
placeCloseElement.addEventListener('click', () => closePopup(formPlace))
formPlace.addEventListener('submit', addNewItem)

//popup-img
imgCloseElement.addEventListener('click', () => closePopup(popupImg))
