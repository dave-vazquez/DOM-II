import {DOM} from './dom.js';

/*********************************************************************************
*                             SIGN UP BUTTON LISTENERS                           *
**********************************************************************************/ 
let destinationImgSrc = ['../img/sun.jpg', '../img/mountain.jpg', '../img/island.jpg'];

DOM.signUpButtons.forEach(button => {

    button.addEventListener('click', evt => {
        hideOtherDestinations(evt);
        showDestinationImg(evt);
        displayForm(evt);
    });
});

function hideOtherDestinations(evt) {
    let signMeUpButton = evt.target;
    let selectedDestination = evt.target.parentNode;

    signMeUpButton.style.display = 'none';

    DOM.destinations.forEach(destination => {
        if(destination !== selectedDestination)
            destination.style.display = 'none';
    });
}

function showDestinationImg(evt) {
    let selectedDestination = evt.target.parentNode;

    DOM.destinations.forEach((destination, i) => {
        if(destination === selectedDestination) {
            
            DOM.destinationImgContainer.style.margin = '0 auto';
            destination.style.margin = '0 auto';
            
            DOM.destinationImg.src = destinationImgSrc[i];
            DOM.destinationImgContainer.style.display = 'inline-block';

            DOM.destinationImg.style.width = '100%';
            DOM.destinationImg.style.height = '210px';
            DOM.destinationImg.style.borderRadius = '10px';
            DOM.destinationImg.style.objectFit = 'cover';
            DOM.destinationImg.style.objectPosition = i !== 2 ? '50% 40%' : '50% 60%';

        }
    });
}

function displayForm(evt) {
    let destinationTitle = getDestination(evt); 

    DOM.form.style.display = 'flex';
    DOM.formLegend.innerHTML = `${destinationTitle}`;
}

function getDestination(evt) {
    return evt.target.parentNode.firstElementChild.textContent;
}

/*********************************************************************************
*                                FORM EVENT LISTENERS                            *
**********************************************************************************/
let nameValid = false;
let emailValid = false;

DOM.form.addEventListener('submit', evt => {
    if(!nameValid || !emailValid) {
        evt.preventDefault();
    }
});

DOM.goBackButton.addEventListener('click', ()=> {
    DOM.form.style.display = 'none';
    
    DOM.destinationImgContainer.style.display = 'none';

    DOM.destinations.forEach(destination => {
        destination.style.display = 'block';
        destination.style.margin = '0 0 30px 0';
    });

    DOM.signUpButtons.forEach(button => {
        button.style.display = 'flex';
    });
});

DOM.nameInput.addEventListener('keyup', evt => {
    if(nameValidated(evt)) {
        evt.target.style.border = '1px solid lightgrey';
        DOM.errorMessages[0].textContent = '';
        DOM.errorMessages[0].style.display = 'none';
        
        nameValid = true;
    }
    else {
        evt.target.style.border = '1px solid red';
        DOM.errorMessages[0].textContent = 'Name cannot contain special characters';
        DOM.errorMessages[0].style.display = 'block';
        
        nameValid = false;
    }

});

DOM.emailInput.addEventListener('blur', evt => {
    if(emailValidated(evt)) {
        evt.target.style.border = '1px solid lightgrey';
        DOM.errorMessages[1].style.display = 'none';
        
        emailValid = true;
    }
    else {
        evt.target.style.border = '1px solid red';
        DOM.errorMessages[1].textContent = 'Email format is invalid.';
        DOM.errorMessages[1].style.display = 'block';
        
        emailValid = false;
    }
});

function nameValidated(evt) {
    let nameInput = evt.target.value;
    let alphaRegex = /^[a-zA-Z\s]*$/;

    return evt.key.match(alphaRegex) && nameInput.match(alphaRegex) && nameInput !== '';
}

function emailValidated(evt) {
    let emailInput = evt.target.value;
    let emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;

    return emailInput.match(emailRegex) || emailInput === '';

}


// DOM.logo.addEventListener('mouseout', evt => {
//     let logo = evt.target;

//     logo.style.transition = 'font-size 140ms linear';
//     logo.style.fontSize = '4rem';
// });


// DOM.logo.addEventListener('mouseover', evt => {

//     let logo = evt.target;

//     logo.style.transition = 'font-size 140ms linear';
//     logo.style.fontSize = '5rem';
// });


