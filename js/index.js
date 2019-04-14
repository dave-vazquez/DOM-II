import {DOM} from './dom.js';
/*********************************************************************************
*                              HEADER EVENT LISTENERS                            *
**********************************************************************************/ 

// transitions nav opacity/display to 0/none as you scroll down page
document.addEventListener('scroll', updateNavOpacity);


// prevents nav bar from appearing in the middle of the page
// if a page-refresh retains horizontal scroll position 
window.addEventListener('load', updateNavOpacity);


// prevents certain elements from retaining 
// JS-manipulated desktop-styles when resized to mobile
// (I have no idea at the moment how to prevent this from happening)
window.addEventListener('resize', evt => {

    /**************** VIEW PORT WIDTH <= 500 ***************/
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

        // Form
        hideForm();

        // Overlapping images in home section
        DOM.overlappedImgs.forEach(img => {
            img.style.opacity = '0';
        });
    }

    //**************** VIEW PORT WIDTH > 500 ****************/
    if(evt.target.innerWidth > 500) {
        updateNavOpacity();
    }
});

// FUNCTIONS
function updateNavOpacity() {
    if(window.innerWidth > 500) {
        DOM.navContainer.style.opacity = 1 - (window.scrollY / 600);

        if(DOM.navContainer.style.opacity <= 0) {
            DOM.navContainer.style.display = 'none';
        }
        else
            DOM.navContainer.style.display = 'flex';
    }
}
/*********************************************************************************
*                           CONTENT HOME EVENT LISTENERS                         *
**********************************************************************************/ 

// alternates the opacity of the overlapping images 
// from 0 to 1 on mouseover event
DOM.contentImgs.forEach(img => {

    let imgToggle = true;
    
    img.addEventListener('mouseover', evt => {

        if(window.innerWidth > 500) {

            let overlappedImg = evt.target.parentNode.lastElementChild;
            
            overlappedImg.style.opacity = imgToggle ? '1.0' : '0';

            imgToggle = !imgToggle;
        }
    });
});

/*********************************************************************************
*                             SIGN UP BUTTON LISTENER                            *
**********************************************************************************/ 
let destinationImgSrc = ['../img/sun.jpg', '../img/mountain.jpg', '../img/island.jpg'];

// displays form when sign-me-up button is clicked
DOM.signUpButtons.forEach(button => {
    button.addEventListener('click', evt => {
        
        hideOtherDestinations(evt);
        showDestinationImg(evt);
        displayForm(evt);

        window.scrollTo(0, 9999); // scrolls to bottom of page when form is displayed
    });
});

// hides the sign-me-up button and hides all destination containers
// that were not selected
function hideOtherDestinations(evt) {
    let signMeUpButton = evt.target;
    let selectedDestination = evt.target.parentNode;

    signMeUpButton.style.display = 'none';

    DOM.destinations.forEach(destination => {
        if(destination !== selectedDestination)
            destination.style.display = 'none';
    });
};

// displays a desination image next to the selected destination
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

// displays form
function displayForm(evt) {
    let destinationTitle = getDestination(evt); 

    DOM.form.style.display = 'flex';
    DOM.formLegend.innerHTML = `${destinationTitle}`;
};

// short hand function to get the title of the selected
// destination from the parent container of the
// sign-me-up button
function getDestination(evt) {
    return evt.target.parentNode.firstElementChild.textContent;
};

/*********************************************************************************
*                             GO BACK BUTTON LISTENER                            *
**********************************************************************************/ 

// hides form when go-back button is clicked
DOM.goBackButton.addEventListener('click', ()=> {
    hideForm();
    resetDestinationStyles();
});

function hideForm() {
    DOM.form.style.display = 'none';
    DOM.destinationImgContainer.style.display = 'none';
}

// resets the destination container styles back to their
// original styles after they were changed
function resetDestinationStyles(){
    
    // Destination Sections
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

    // Destination Button
    DOM.signUpButtons.forEach(button => {
        button.style.display = 'flex';
    });
}

/*********************************************************************************
*                                FORM EVENT LISTENERS                            *
**********************************************************************************/

/*
    Below is an attempt at form validation. Don't know what I'm doing here
    but I gave it a shot.
*/

let nameValid = false;
let emailValid = false;

// validates form when submit button is clicked
// if valid, it does... something
// if not it displays an alert
DOM.form.addEventListener('submit', evt => {
    if(!nameValid || !emailValid) {
        evt.preventDefault();
        alert('Form is not complete or contains errors. Try again.');
    }
});

// checks to see if a non-alphabetical character was typed on
// the key up event
// if it was, an error message will display
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

// checks to see if an invalid email address was enetered on
// blur event of the text feild
// if it was an error message will display
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

// validates fullname or character with regex expression
function nameValidated(evt) {
    let nameInput = evt.target.value;
    let alphaRegex = /^[a-zA-Z\s]*$/; 

    return evt.key.match(alphaRegex) && nameInput.match(alphaRegex);
}

// validates email with regex expression
function emailValidated(evt) {
    let emailInput = evt.target.value;
    let emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/; 

    return emailInput.match(emailRegex) || emailInput === '';
}