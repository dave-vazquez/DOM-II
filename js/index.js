/*********************************************************************************
*                             QUERY SELECTORS                                    *
**********************************************************************************/ 
const DOM = {
    
    // HEADER
    logo: document.querySelector('.logo-heading'),
    
    // DESTINATIONS
    destinations: document.querySelectorAll('.destination'),
    destinationImgContainer: document.querySelector('.destination-img-container'),
    destinationImg: document.querySelector('#destination-img'),
    signUpButtons: document.querySelectorAll('.btn'),

    // FORMS
    form: document.querySelector('form'),
    formLegend: document.querySelector('form legend'),
    submitButton: document.querySelector('form button'),
    goBackButton: document.querySelector('.go-back-button')
};


/*********************************************************************************
*                             SIGN UP BUTTON LISTENERS                           *
**********************************************************************************/ 
DOM.signUpButtons.forEach(button => {

    let destinationImgSrc = ['../img/sun.jpg', '../img/mountain.jpg', '../img/island.jpg'];

    button.addEventListener('click', evt => {
        hideOtherDestinations(evt);
        showDestinationImg(evt);
        displayForm(evt);
    });

    
    function hideOtherDestinations(evt) {
        let signMeUpButton = evt.target;
        let selectedDestination = evt.target.parentNode;
        
        DOM.destinations.forEach(destination => {
            if(destination !== selectedDestination)
                destination.style.display = 'none';
        });

        signMeUpButton.style.display = 'none';
        
        selectedDestination.style.margin = '0';
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
        DOM.formLegend.innerHTML = `${destinationTitle}: Sign up Form!`;
    }

    function getDestination(evt) {
        return evt.target.parentNode.firstElementChild.textContent;
    }
});

/*********************************************************************************
*                                FORM EVENT LISTENERS                            *
**********************************************************************************/ 
DOM.submitButton.addEventListener('submit', evt => {
    evt.preventDefault();

    alert('Form Submitted!');
});

DOM.goBackButton.addEventListener('click', (evt)=> {

    DOM.form.style.display = 'none';
    
    DOM.destinationImgContainer.style.display = 'none';

    DOM.destinations.forEach(destination => {
        destination.style.display = 'block';
        destination.style.marginBottom = '30px';
    });

    DOM.signUpButtons.forEach(button => {
        button.style.display = 'flex';
    });


});





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


