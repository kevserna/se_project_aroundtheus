import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

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
// ########################## Form Validation ########################## //
// ##################################################################### //
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Create FormValidator instances for each form
const profileEditForm = document.querySelector(
  "#profile-edit-modal .modal__form"
);
const cardAddForm = document.querySelector("#add-modal .modal__form");

const profileEditValidator = new FormValidator(config, profileEditForm);
const cardAddValidator = new FormValidator(config, cardAddForm);

// Enable validation for each form
profileEditValidator.enableValidation();
cardAddValidator.enableValidation();

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

// ##################################################################### //
// ########################### Event Handlers ########################## //
// ##################################################################### //
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditValidator.disableSubmitButton();
  closeModal(profileEditModal);
}

function handleImageClick(card) {
  previewImageEl.src = card._link;
  previewImageEl.alt = card._name;
  previewImageCaption.textContent = card._name;
  openModal(previewImageModalWindow);
}

// ##################################################################### //
// ########################## Event Listeners ########################## //
// ##################################################################### //
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditValidator.resetValidation();
  openModal(profileEditModal);
});

cardAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target.title.value;
  const link = e.target.link.value;
  const card = new Card(
    {
      name,
      link,
    },
    "#card-template",
    handleImageClick
  );
  const cardView = card.getView();
  renderCard(cardView, cardListEl);
  cardAddForm.reset();
  cardAddValidator.disableSubmitButton();
  closeModal(cardAddModal);
});

profileEditModalClose.addEventListener("click", () =>
  closeModal(profileEditModal)
);
previewModalClose.addEventListener("click", () =>
  closeModal(previewImageModalWindow)
);

cardAddButton.addEventListener("click", () => {
  openModal(cardAddModal);
});

cardAddCloseButton.addEventListener("click", () => closeModal(cardAddModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach(function (cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardView = card.getView();
  renderCard(cardView, cardListEl);
});
