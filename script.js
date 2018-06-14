(function() {
    var splitToken = window.location.hash.split('=');
    var token = splitToken[1];
    const formElement = document.getElementById('form');
    const host = 'https://mpyagram.azurewebsites.net/api';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    };

    formElement.addEventListener('submit', e => {
        const hashtagElement = document.getElementById('input');
        loadImages(
            `https://api.instagram.com/v1/tags/${
                hashtagElement.value
            }/media/recent`
        ).then(images => {
            if (!images) {
                return;
            }

            for (var i = 0; i < images.length; i++) {
                createImageHTMLAndAddListeners(
                    images[i].images.standard_resolution.url
                );
            }
        });
    });

    var imageContainer = document.getElementById('image-container');

    const loadImages = url =>
        fetch(url + '?access_token=' + token)
            .then(res => res.json())
            .then(json => json.data);

    const fetchData = (apiUrl, imageUrl) =>
        fetch(apiUrl, {
            body: JSON.stringify({
                url: imageUrl
            }),
            ...options
        }).then(res => res.json());

    const getLoadingMessage = function() {
        const messages = [
            'Contacting robots',
            'Building AI',
            'Training Algorithm',
            'Classifying images',
            'Connecting to API'
        ];
        return (message =
            messages[Math.floor(Math.random() * messages.length)]);
    };

    const displayLoadingMessages = function(element) {
        element.innerText = getLoadingMessage();
        setInterval(function() {
            element.innerText = getLoadingMessage();
        }, 1000);
    };

    const createAndReturnImageHolder = function() {
        const imageHolder = document.createElement('div');
        imageHolder.classList = 'image-holder';
        return imageHolder;
    };
    const createAndReturnLoadingMessageContainer = function() {
        const loadingMessageContainer = document.createElement('div');
        loadingMessageContainer.classList.add('loading-message', 'hide');
        const loadingIcon = document.createElement('span');
        loadingIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
        loadingMessageContainer.appendChild(loadingIcon);
        return loadingMessageContainer;
    };

    const createVisionButton = function(
        loadingMessageContainer,
        loadingMessageHolder,
        imageDescription,
        url
    ) {
        const visionButton = document.createElement('button');

        visionButton.addEventListener('click', () => {
            loadingMessageContainer.classList.remove('hide');
            displayLoadingMessages(loadingMessageHolder);
            fetchData(
                `${host}/vision?query=visualFeatures=Description,Tags,Categories,Adult`,
                url
            ).then(response => {
                loadingMessageContainer.classList.add('hide');
                imageDescription.innerText =
                    response.description.captions[0].text;
            });
        });

        const visionIcon = document.createElement('span');
        visionIcon.classList.add('fas', 'fa-eye');
        visionButton.appendChild(visionIcon);
        return visionButton;
    };

    const createFaceButton = function(
        loadingMessageContainer,
        loadingMessageHolder,
        imageDescription,
        url
    ) {
        const faceButton = document.createElement('button');
        faceButton.addEventListener('click', () => {
            loadingMessageContainer.classList.remove('hide');
            displayLoadingMessages(loadingMessageHolder);
            fetchData(
                `${host}/face?query=returnFaceAttributes=age,gender,emotion,accessories`,
                url
            ).then(response => {
                loadingMessageContainer.classList.add('hide');
                if (response.length > 0) {
                    const firstResponseFaceAttributes =
                        response[0].faceAttributes;
                    imageDescription.innerText = `This person is ${
                        firstResponseFaceAttributes.age
                    } years old and the gender is ${
                        firstResponseFaceAttributes.gender
                    }`;
                } else {
                    imageDescription.innerText =
                        'Im sorry but i couldnt find a face on this image';
                }
            });
        });

        const faceIcon = document.createElement('span');
        faceIcon.classList.add('far', 'fa-smile');
        faceButton.appendChild(faceIcon);
        return faceButton;
    };

    const createImageHTMLAndAddListeners = url => {
        const imageHolder = createAndReturnImageHolder();

        const loadingMessageContainer = createAndReturnLoadingMessageContainer();
        const loadingMessageHolder = document.createElement('p');
        loadingMessageContainer.appendChild(loadingMessageHolder);

        const imageVisionDescription = document.createElement('p');
        const imageFaceDescription = document.createElement('p');
        const image = document.createElement('img');

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList = 'button-container';
        /*const visionButton = createVisionButton(
            loadingMessageContainer,
            loadingMessageHolder,
            imageVisionDescription,
            url
        );

        const faceButton = createFaceButton(
            loadingMessageContainer,
            loadingMessageHolder,
            imageFaceDescription,
            url
        );*/

        image.setAttribute('src', url);
        image.className = 'images';

        /*buttonsContainer.appendChild(visionButton);
        buttonsContainer.appendChild(faceButton);

        imageHolder.appendChild(image);
        imageHolder.appendChild(buttonsContainer);
        imageHolder.appendChild(loadingMessageContainer);
        imageHolder.appendChild(imageVisionDescription);
        imageHolder.appendChild(imageFaceDescription);
        imageContainer.appendChild(imageHolder);*/
    };
})();
