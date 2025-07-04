// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEL, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEL.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEL, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEL.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEL, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEL, inputEl, options);
  }
  hideInputError(formEL, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEL, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = Array.from(formEL.querySelectorAll(inputSelector));
  const submitButton = formEL.querySelector(submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEL, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    // look for all inputs inside of form
    // loop through alll inputs to see if all are valid
    // if input is not valid
    // get validation message
    // add error class to input
    // display error messaage
    // disable button
    // if all inputs are valid
    // enable button
    // reset error message
  });
}

function resetValidation(formEL, options) {
  const inputEls = Array.from(formEL.querySelectorAll(options.inputSelector));
  const submitButton = formEL.querySelector(options.submitButtonSelector);

  inputEls.forEach((inputEl) => {
    hideInputError(formEL, inputEl, options);
  });

  toggleButtonState(inputEls, submitButton, options);
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
