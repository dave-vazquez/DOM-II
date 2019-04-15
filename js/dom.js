/*********************************************************************************
*                             QUERY SELECTORS                                    *
**********************************************************************************/ 
export const DOM = {
    
    // HEADER
    logo: document.querySelector('.logo-heading'),
    navContainer: document.querySelector('.nav-container'),
    navLinks: document.querySelector('nav > a'),

    // HOME
    contentImgs: document.querySelectorAll('.img-content img'),
    overlappedImgs: document.querySelectorAll('.img-content #img2'),
    
    // DESTINATIONS
    destinationContainer: document.querySelector('.content-destination'),
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



































































































































































































































































DOM.eggAlert = 'HEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAAHEYYEYAAEYAAAEYAEYAA';
DOM.secretSauce = '.text-content p > span';
DOM.egg = '<img id="hmg" src="https://media.giphy.com/media/M7gtacN7aPNsc/giphy.gif"></br><iframe width="5px" height="5px" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/103876304&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>';