import { Popup } from '../components/Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._name = this._popupItem.querySelector('.popup__name')
    this._img = this._popupItem.querySelector('.popup__image')
  }

  open(name, link) {
    this._name.textContent = name
    this._name.alt = name
    this._img.src = link
    super.open()
  }
}

export { PopupWithImage }
