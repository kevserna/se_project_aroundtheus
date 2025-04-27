const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ##################################################################### //
// ############################## Elements ############################# //
// ##################################################################### //
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalClose = profileEditModal.querySelector(
  "#profile-edit-modal-close"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#modal__description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardAddModal = document.querySelector("#add-modal");
const cardAddButton = document.querySelector("#add-button");
const cardAddCloseButton = cardAddModal.querySelector("#card-add-modal-close");
const cardAddForm = document.querySelector("#add-card-form");
const previewImageModalWindow = document.querySelector(".js-preview-modal");
const previewModalClose = previewImageModalWindow.querySelector(
  "#preview-modal-close"
);
const previewImageEl = document.querySelector(".modal__preview-image");
const previewImageCaption = document.querySelector(
  ".modal__preview-image-caption"
);

// ##################################################################### //
// ############################# Functions ############################# //
// ##################################################################### //
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
  modal.removeEventListener("mousedown", handleModalOverlay);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
  modal.addEventListener("mousedown", handleModalOverlay);
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleModalOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function renderCard(cardElement, container) {
  container.prepend(cardElement);
}

function getCardView(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__name");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__trash");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.addEventListener("click", function () {
    previewImageEl.src = cardData.link;
    previewImageEl.alt = cardData.name;
    previewImageCaption.textContent = cardData.name;
    openModal(previewImageModalWindow);
  });

  cardDeleteButton.addEventListener("click", (event) => {
    const cardElement = event.target.closest(".card");
    if (cardElement) {
      cardElement.remove();
    }
  });

  return cardElement;
}

// ##################################################################### //
// ########################### Event Handlers ########################## //
// ##################################################################### //
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// ##################################################################### //
// ########################## Event Listeners ########################## //
// ##################################################################### //
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const cardView = getCardView({
    name,
    link,
  });
  renderCard(cardView, cardListEl);
  cardAddForm.reset();
  closeModal(cardAddModal);
});

profileEditModalClose.addEventListener("click", () =>
  closeModal(profileEditModal)
);
previewModalClose.addEventListener("click", () =>
  closeModal(previewImageModalWindow)
);

cardAddButton.addEventListener("click", () => openModal(cardAddModal));
cardAddCloseButton.addEventListener("click", () => closeModal(cardAddModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach(function (cardData) {
  const cardView = getCardView(cardData);
  renderCard(cardView, cardListEl);
});
