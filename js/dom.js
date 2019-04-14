/*********************************************************************************
*                             QUERY SELECTORS                                    *
**********************************************************************************/ 
export const DOM = {
    
    // HEADER
    logo: document.querySelector('.logo-heading'),
    navContainer: document.querySelector('.nav-container'),

    // HOME
    contentImgs: document.querySelectorAll('.img-content img'),
    
    // DESTINATIONS
    destinations: document.querySelectorAll('.destination'),
    destinationImgContainer: document.querySelector('.destination-img-container'),
    destinationImg: document.querySelector('#destination-img'),
    signUpButtons: document.querySelectorAll('.btn'),

    // FORMS
    form: document.querySelector('form'),
    formLegend: document.querySelector('form legend'),

    nameInput: document.querySelector('.name-input'),
    emailInput: document.querySelector('.email-input'),

    errorMessages: document.querySelectorAll('.error-message'),
    submitButton: document.querySelector('form button'),
    goBackButton: document.querySelector('.go-back-button')
};