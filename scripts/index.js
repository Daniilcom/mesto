const gallaryItems = document.querySelector('.gallary__items')
const templateItem = document.querySelector('#gallary-item')
const gallaryItem = templateItem.querySelector('.gallary__item')

const editProfile = document.querySelector('.profile__edit')
const formProfile = document.querySelector('#popup-edit')
const closeFormProfile = formProfile.querySelector('.popup__close')
const nameInput = formProfile.querySelector('.popup__input_user_name')
const descriptionInput = formProfile.querySelector(
  '.popup__input_user_description'
)
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

const addPlace = document.querySelector('.profile__add')
const formPlace = document.querySelector('#popup-add')
const closeformPlace = formPlace.querySelector('.popup__close')
const namePlaceInput = formPlace.querySelector('.popup__input_place_name')
const linkPlaceInput = formPlace.querySelector('.popup__input_place_link')

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
  return cloneItem
}
const defaultGallary = () =>
  initialGallary.map((item) => {
    gallaryItems.append(addItem(item.place, item.link))
  })

defaultGallary()

const togglePopup = (popup) => {
  popup.classList.toggle('popup_open')
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

// popup-edit

editProfile.addEventListener('click', () => togglePopup(formProfile))
closeFormProfile.addEventListener('click', () => togglePopup(formProfile))
formProfile.addEventListener('submit', handleFormSubmit)

//popup-add

addPlace.addEventListener('click', () => togglePopup(formPlace))
closeformPlace.addEventListener('click', () => togglePopup(formPlace))
