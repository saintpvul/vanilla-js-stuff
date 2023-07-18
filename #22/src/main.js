// need to change all elements of the webpage, create diff blocks with content, add sliders and forms, some animation / activity

//heading animation

//setting the bg image and change it every 2mins
//cant get access to this files from js
const header = document.querySelector("header");
const images = [
    "./img/op-1.jpg",
    "./img/op-2.jpg",
    "./img/op-3.jpg",
    "./img/op-4.jpg",
    "./img/op-5.jpg",
    "./img/op-6.jpg",
];

let currentImageCounter = 2;

function setCurrentBackgroundImage() {
    header.style.backgroundImage = `url(${images[currentImageCounter]})`;
    currentImageCounter++;
    if (currentImageCounter >= images.length) {
        currentImageCounter = 0;
    }
}

setInterval(() => {
    setCurrentBackgroundImage();
}, 2 * 60 * 10);

// heading text animation
const mainHeading = document.getElementById("main-head");
mainHeading.style.opacity = 0;
mainHeading.style.transition = "opacity 1s";

const mainHeadingText = ["Embrace the Chaos", "Shop", "MessDepot"];

setTimeout(() => {
    mainHeading.textContent = mainHeadingText[0];
    mainHeading.style.opacity = 1;

    setTimeout(() => {
        mainHeading.style.opacity = 1;

        setTimeout(() => {
            mainHeading.style.opacity = 0;

            setTimeout(() => {
                mainHeading.textContent = mainHeadingText[1];
                mainHeading.style.opacity = 1;

                setTimeout(() => {
                    mainHeading.style.opacity = 1;

                    setTimeout(() => {
                        mainHeading.style.opacity = 0;

                        setTimeout(() => {
                            mainHeading.textContent = mainHeadingText[2];
                            mainHeading.style.opacity = 1;
                        }, 1000);
                    }, 1000);
                }, 500);
            }, 1000);
        }, 500);
    }, 1000);
}, 1000);

// main section

function reloadPage() {
    window.location.reload();
}
