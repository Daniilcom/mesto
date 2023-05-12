class Card {
  constructor(
    data,
    userId,
    cardTemplateSelector,
    { handleCardClick, handleLikeClick, handleDeleteClick }
  ) {
    this.dataCards = data
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._cardId = data._id
    this._userId = userId
    this._ownerId = data.owner._id
    this._cardTemplateSelector = cardTemplateSelector
    this._handleCardClick = handleCardClick
    this._handleLikeClick = handleLikeClick
    this._handleDeleteClick = handleDeleteClick
  }

  _getTemplate() {
    const cardItem = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.gallary__item')
      .cloneNode(true)

    return cardItem
  }

  getCardId() {
    return this._cardId
  }

  handleCardDelete() {
    this._element.remove()
    this._element = null
  }

  likedCard() {
    return this._likes.some((like) => like._id === this._userId)
  }

  _handleLikeButton() {
    if (this.likedCard()) {
      this.likeButton.classList.toggle('gallary__like_active')
    }
  }

  setLikesCard(data) {
    this._likes = data.likes
    this.likeCounter.textContent = this._likes.length
    this._handleLikeButton()
  }

  renderLikes() {
    this._likes.length === 0
      ? (this.likeCounter.textContent = '')
      : (this.likeCounter.textContent = this._likes.length)
    this.likedCard()
      ? this.likeButton.classList.add('gallary__like_active')
      : this.likeButton.classList.remove('gallary__like_active')
  }

  _renderTrashButton() {
    if (this._ownerId !== this._userId) {
      this.trashButton.remove()
    }
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._handleLikeClick()
    })

    this.trashButton.addEventListener('click', () => {
      this._handleDeleteClick()
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
    this.likeCounter = this._element.querySelector('.gallary__like-counter')
    this.trashButton = this._element.querySelector('.gallary__trash')
    this.renderLikes()
    this._renderTrashButton()
    this._setEventListeners()

    return this._element
  }
}

export { Card }
