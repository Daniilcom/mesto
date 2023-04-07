class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._cardTemplateSelector = cardTemplateSelector
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardItem = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.gallary__item')
      .cloneNode(true)

    return cardItem
  }

  _handleCardLike() {
    this.likeButton.classList.toggle('gallary__like_active')
  }

  _handleCardDelete() {
    this.trashButton.closest('.gallary__item').remove()
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._handleCardLike()
    })

    this.trashButton.addEventListener('click', () => {
      this._handleCardDelete()
    })

    this.cardImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }

  createCard() {
    this._element = this._getTemplate()
    this.cardImg = this._element.querySelector('.gallary__image')
    this.cardImg.src = this._link
    this.cardImg.alt = this._name
    this._element.querySelector('.gallary__description').textContent =
      this._name
    this.likeButton = this._element.querySelector('.gallary__like')
    this.trashButton = this._element.querySelector('.gallary__trash')

    this._setEventListeners()

    return this._element
  }
}

export { Card }
