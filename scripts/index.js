let editProfile = document.querySelector('.profile__edit')
let popupEditProfile = document.querySelector('.popup-edit')
let closePopupEditProfile = document.querySelector('.popup-edit__close')

const popupToggle = function () {
  popupEditProfile.classList.toggle('popup-edit__open')
}

editProfile.addEventListener('click', popupToggle)
closePopupEditProfile.addEventListener('click', popupToggle)
