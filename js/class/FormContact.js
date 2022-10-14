import Photographer from './Photographer.js';

const modalForm = document.getElementById('modal-form');
const contactForm = document.getElementById('contact-form');
const firstname = document.getElementById('first-name');
const lastname = document.getElementById('last-name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const modalCloseButton = document.getElementById('closeModal');
const modalSubmitButton = document.getElementById('submitForm');

const formRegex = {
  string: /^[a-zA-Z \-àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/,
  email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
};

const formConstraints = {
  length: 2
};

const formSuccess = {
  valid: 'Champ valide.'
};
const formErrors = {
  empty: 'Veuillez renseigner ce champ.',
  names: {
    invalid: 'Caractère utilisé non valide, utilisez uniquement des lettres, espaces et "-".',
    minLength: 'Ce champ doit comporter au moins 2 caractères.'
  },
  email: {
    empty: 'Veuillez renseigner votre adresse email.',
    invalid: 'L\'adresse e-mail n\'est pas valide.'
  }
};

/* ENG: Display modal */
/* FRA: Affichage de la modal */
const displayModal = () => {
  modalForm.classList.add('open');
  document.body.classList.add('no-scroll');
  modalForm.focus();
  document.addEventListener('keydown', accessibility);
};

/* ENG: Close modal */
/* FRA: Fermeture de la modal */
const closeModal = (e) => {
  modalForm.classList.remove('open');
  document.body.classList.add('no-scroll');
  document.getElementById('contact-btn').focus();
  document.removeEventListener('keydown', accessibility);
};

const accessibility = (e) => {
  e.key === 'Escape' && closeModal();

  if (e.key === 'Tab' && e.target === modalCloseButton) {
    e.preventDefault();
    contactForm.focus();
  };
};

/**
 * ENG: Contact Form Initialization
 * FRA: Initialisation du formulaire de contact
 */
const init = () => {
  /* ENG: Retrieve Photographer object and his instance */
  /* FRA: Récuperation de l'objet Photographer et de son instance */

  /* ENG: Photographer.instances return an array */
  /* FRA: Photographer.instances retourne un array */
  const photographerName = Photographer.instances[0].name;
  /* ENG: Retrieve the contact form element */
  /* FRA: Récuperation de l'element contact form */
  const contactForm = document.getElementById('contact-form');
  /* ENG: Get the name element and display the photographer's name into it with innerHTML */
  /* FRA: Obtenir l'élement nom, et afficher le nom du photographe dedans avec innerHTML */
  document.getElementById('form-name').innerHTML += photographerName;

  /* ENG: Add an event listener to close the modal on the close button */
  /* FRA: Ajout d'une écoute d'évenement pour fermer la modal sur le clique du boutton fermer de la modal */
  modalCloseButton.addEventListener('click', closeModal);

  /* ENG: Add an event listener on the submission form button */
  /* FRA: Ajout d'une écoute d'évenement sur le boutton de soumission du formulaire */
  modalSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (validate() === true) {
      const data = new FormData(contactForm);
      console.log(data.entries());
      console.group('Données du formulaire');
      for (const entry of data.entries()) {
        const name = entry[0];
        const value = entry[1];
        console.log(name + ': ' + value);
      }
      contactForm.reset();
      closeModal();
    } else {
      forAllFieldsValidation();
    }
  });
};

/**
 * @param {HTMLElement} field
 */
function minLengthElementStyle (field) {
  field.parentElement.removeAttribute('data-success', formSuccess.valid);
  field.parentElement.setAttribute('data-error', formErrors.names.minLength);
};

/**
 * @param {HTMLElement} field
 */
function emptyElementStyle (field) {
  field.parentElement.removeAttribute('data-success', formSuccess.valid);
  field.parentElement.setAttribute('data-error', formErrors.empty);
};

/**
 * @param {HTMLElement} field
 */
function successElementStyle (field) {
  field.parentElement.removeAttribute('data-error');
  field.parentElement.setAttribute('data-success', formSuccess.valid);
};

/**
 * @param {HTMLElement} field
 */
function emptyEmailElementStyle (field) {
  field.parentElement.removeAttribute('data-success');
  field.parentElement.setAttribute('data-error', formErrors.email.empty);
};

/* ENG: Simple string or textarea checker */
/* FRA: Checker de string simple ou textarea */
/**
 * @param {HTMLElement} field
 */
function checkSimpleString (field) {
  if (field.nodeName === 'INPUT') {
    if (field.value.length < formConstraints.length) {
      minLengthElementStyle(field);
      return false;
    }
  } else if (field.nodeName === 'TEXTAREA') {
    if (field.value.length < formConstraints.length) {
      minLengthElementStyle(field);
      return false;
    };
  };

  if (field.value === '' || field.value === null) {
    emptyElementStyle(field);
    return false;
  };

  if (field.value.match(formRegex.string)) {
    successElementStyle(field);
    return true;
  };
};

/* ENG/FRA: Firstname Check */
function checkFirstName () {
  if (checkSimpleString(firstname) === true) {
    return true;
  };
  return false;
};

/* ENG/FRA: Lastname Check */
function checkLastName () {
  if (checkSimpleString(lastname) === true) {
    return true;
  };
  return false;
};

/* ENG/FRA: Email Check */
function checkEmail () {
  if (email.value === '' || email.value === null) {
    emptyEmailElementStyle(email);
    return false;
  };

  if (email.value.match(formRegex.email)) {
    successElementStyle(email);
    return true;
  };

  return emptyEmailElementStyle(email);
};

/* ENG/FRA: Message Check */
function checkMessage () {
  if (checkSimpleString(message) === true) {
    return true;
  };
};

/* ENG: Form fields validation */
/* FRA: Validation des champs du formulaire */
function formFieldsValidation (element, method) {
  if (element !== null) {
    element.addEventListener('focusout', method);
  };
};

/* ENG: Add an event on the focus out */
/* FRA: Ajout un event sur le defocus de l'input */
formFieldsValidation(firstname, checkFirstName);
formFieldsValidation(lastname, checkLastName);
formFieldsValidation(email, checkEmail);
formFieldsValidation(message, checkMessage);

/* ENG: Fields validation check */
/* FRA: Check des champs de validation */
function forAllFieldsValidation () {
  checkFirstName();
  checkLastName();
  checkEmail();
  checkMessage();
};

/* ENG: Check all inputs checker */
/* FRA: Checker tout les inputs de check */
function validate () {
  /* ENG: We take every fields check and return true if all fields are ok */
  /* FRA: On prend tout tout les champs check et on retourne ture si tout les champs sont ok */
  if (checkFirstName() === true && checkLastName() === true && checkEmail() === true && checkMessage() === true) {
    console.log('The form has been validated!');
    return true;
  };
  return false;
};

const FormContact = {
  initialization: init,
  open: displayModal
};

export default FormContact;
