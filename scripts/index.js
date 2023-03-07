const gallaryItems = document.querySelector('.gallary__items')
const templateItem = document.querySelector('#gallary-item')
const gallaryItem = templateItem.querySelector('.gallary__item')
// popup-edit
const editProfile = document.querySelector('.profile__edit')
const formProfile = document.querySelector('#popup-edit')
const closeFormProfile = formProfile.querySelector('.popup__close')
const nameInput = formProfile.querySelector('.popup__input_user_name')
const descriptionInput = formProfile.querySelector(
  '.popup__input_user_description'
)
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
//popup-add
const addPlace = document.querySelector('.profile__add')
const formPlace = document.querySelector('#popup-add')
const closeformPlace = formPlace.querySelector('.popup__close')
const namePlaceInput = formPlace.querySelector('.popup__input_place_name')
const linkPlaceInput = formPlace.querySelector('.popup__input_place_link')
//popup-img
const popupImg = document.querySelector('#popup-img')
const closePopupImg = popupImg.querySelector('.popup__close')

const initialGallary = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
]

const addItem = (place, link) => {
  const contentItem = templateItem.content
  const cloneItem = contentItem.cloneNode(true)
  cloneItem.querySelector('.gallary__description').textContent = place
  cloneItem.querySelector('.gallary__image').src = link
  cloneItem
    .querySelector('.gallary__like')
    .addEventListener('click', (evt) =>
      evt.target.classList.toggle('gallary__like_active')
    )
  cloneItem
  cloneItem
    .querySelector('.gallary__trash')
    .addEventListener('click', (evt) =>
      evt.target.closest('.gallary__item').remove()
    )
  const popupOpenImg = () => {
    popupImg.querySelector('.popup__name').textContent = place
    popupImg.querySelector('.popup__image').src = link
    togglePopup(popupImg)
  }
  cloneItem
    .querySelector('.gallary__image')
    .addEventListener('click', popupOpenImg)

  return cloneItem
}

const defaultGallary = () =>
  initialGallary.map((item) => {
    gallaryItems.append(addItem(item.place, item.link))
  })

defaultGallary()

const newItem = (evt) => {
  evt.preventDefault()
  gallaryItems.prepend(addItem(namePlaceInput.value, linkPlaceInput.value))
}

const handlerFormSubmit = (evt) => {
  evt.preventDefault()
  let nameValue = nameInput.value
  let descriptionValue = descriptionInput.value
  profileName.textContent = nameValue
  profileDescription.textContent = descriptionValue
}

const togglePopup = (popup) => {
  popup.classList.toggle('popup_open')
  nameInput.value = profileName.textContent
  descriptionInput.value = profileDescription.textContent
}

// popup-edit

editProfile.addEventListener('click', () => togglePopup(formProfile))
closeFormProfile.addEventListener('click', () => togglePopup(formProfile))
formProfile.addEventListener('submit', handlerFormSubmit)

//popup-add

addPlace.addEventListener('click', () => togglePopup(formPlace))
closeformPlace.addEventListener('click', () => togglePopup(formPlace))
formPlace.addEventListener('submit', newItem)

//popup-img
closePopupImg.addEventListener('click', () => togglePopup(popupImg))
