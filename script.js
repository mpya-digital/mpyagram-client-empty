(function() {
    var splitToken = window.location.hash.split('=');
    var token = splitToken[1];
    const element = document.getElementById('form');
    const host = 'https://mpyagram.azurewebsites.net/api';

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    };

    const setupClickListeners = () => {
        //setup click listener for a vision and facebutton
        //display a loadingmessage
        //and do a fetch against the face api and show the result in html
    };

    element.addEventListener('submit', () => {
        //fetch data from the instagram API
        //if the fetch succeeds render the html and setup the click listeners
    });

    const fetchInstagramImages = url =>
        fetch(url + '?access_token=' + token)
            .then(res => res.json())
            .then(json => json.data);

    const fetchAwesomeDataFromApi = (apiUrl, imageUrl) =>
        fetch(apiUrl, {
            body: JSON.stringify({
                url: imageUrl
            }),
            ...options
        }).then(res => res.json());

    const displayLoadingMessage = element => {
        const messages = [
            'Contacting robots',
            'Building AI',
            'Training Algorithm',
            'Classifying images',
            'Connecting to API'
        ];
        //get a random loadingMessage and add that to the element
        element.innerText = message;
    };

    const displayLoadingMessages = element => {
        //on intervals display a random loadingMessage
    };

    const imageHolderTemplate = images => {
        // write the html template for the images
        return `<div id="image-list"></div>`;
    };
})();
