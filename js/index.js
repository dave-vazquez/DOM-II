import {DOM} from './dom.js';
/*********************************************************************************
*                              HEADER EVENT LISTENERS                            *
**********************************************************************************/ 

/* prevents nav bar from appearing in the middle of the page if 
   page refresh retains horizonatl scroll position */
window.addEventListener('load', updateNavOpacity);

/* prevents certain elements from retaining JS manipulated 
   desktop styles when resized to mobile */
window.addEventListener('resize', evt => {

    if(evt.target.innerWidth <= 500) {

        // Nav Bar
        DOM.navContainer.style.opacity = 1;
        DOM.navContainer.style.display = 'flex';

        // Destinations
        DOM.destinations.forEach(destination => {
            destination.style.display = 'inline-block';
            destination.style.width = '80%';
            destination.style.margin = '0 auto 30px auto';
        });

        /*
            Note regarding the above forEach on destinations:
        
            I'm noticing that manipulating styles from JS can
            get really tricky, especially if certain elements
            inherit positioning properties from parent,
            flex-containers.

            As soon as a flex-item has a style property updated,
            it appears to lose it's flex-item properties entirely.
        */
    }

    if(evt.target.innerWidth > 500) {
        updateNavOpacity();
    }
});

document.addEventListener('scroll', updateNavOpacity);


function updateNavOpacity() {
    
    if(window.innerWidth > 500) {
        DOM.navContainer.style.opacity = 1 - (window.scrollY / 600);

        if(DOM.navContainer.style.opacity <= 0)
            DOM.navContainer.style.display = 'none';
        else
            DOM.navContainer.style.display = 'flex';
    }
}

/*********************************************************************************
*                           CONTENT HOME EVENT LISTENERS                         *
**********************************************************************************/ 
DOM.contentImgs.forEach(img => {

    if(window.innerWidth > 500) {
        let imgToggle = true;

        img.addEventListener('mouseover', evt => {

            let overlappedImg = evt.target.parentNode.lastElementChild;
            
            overlappedImg.style.opacity = imgToggle ? '1.0' : '0';

            imgToggle = !imgToggle;

        });
    }
});

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
};

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
};

function displayForm(evt) {
    let destinationTitle = getDestination(evt); 

    DOM.form.style.display = 'flex';
    DOM.formLegend.innerHTML = `${destinationTitle}`;
};

function getDestination(evt) {
    return evt.target.parentNode.firstElementChild.textContent;
};

DOM.goBackButton.addEventListener('click', ()=> {
    DOM.form.style.display = 'none';
    
    DOM.destinationImgContainer.style.display = 'none';

    DOM.destinations.forEach(destination => {
        
        if(window.innerWidth > 500) {
            destination.style.display = 'block';
            destination.style.margin = '0 0 30px 0';
        }
        else {
            destination.style.display = 'inline-block';
            destination.style.width = '80%';
            destination.style.margin = '0 auto 30px auto';
        }
    });

    DOM.signUpButtons.forEach(button => {
        button.style.display = 'flex';
    });
});

/*********************************************************************************
*                                FORM EVENT LISTENERS                            *
**********************************************************************************/

/*
    Below is an attempt at form validation. I really don't know what I'm doing here
    and whether any of the below is even close to the proper way to do form validation.

    I don't have the time yet to dive into form validation that deeply, but I'm 
    assuming it will be a topic covered in Lambda. 

    For now, this is my first stab at it. 
*/

let nameValid = false;
let emailValid = false;

DOM.form.addEventListener('submit', evt => {
    if(!nameValid || !emailValid) {
        evt.preventDefault();
        alert('Form is not complete or contains errors. Try again.');
    }
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

    // only alphabetic characters and spaces
    let alphaRegex = /^[a-zA-Z\s]*$/; 

    return evt.key.match(alphaRegex) && nameInput.match(alphaRegex);
}

function emailValidated(evt) {
    let emailInput = evt.target.value;

    // regex for proper email format
    let emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/; 

    return emailInput.match(emailRegex) || emailInput === '';
}