// All animation elements
let headerAnimationTimeout;
let bgImageInterval;
let aboutShowcaseLeftInterval;
let aboutShowcaseRightInterval;

// Webpage timers handler

function stopAllTimers() {
    clearTimeout(headerAnimationTimeout);
    clearInterval(bgImageInterval);
    clearInterval(aboutShowcaseLeftInterval);
    clearInterval(aboutShowcaseRightInterval);
}

// Function to start all timers
function startAllTimers() {
    animateHeader();
    startBgImageInterval();
    startAboutShowcaseIntervals();
}

// Heading animation

// Heading text animation
const headerHeading = document.getElementById("header-head");
headerHeading.style.opacity = 0;
headerHeading.style.transition = "opacity 1s";

const headerHeadingText = ["Embrace the Chaos", "Shop", "MessDepot"];

// Function to animate header text when page is opened or reloaded
function animateHeader() {
    setTimeout(() => {
        headerHeading.textContent = headerHeadingText[0];
        headerHeading.style.opacity = 1;

        setTimeout(() => {
            headerHeading.style.opacity = 1;

            setTimeout(() => {
                headerHeading.style.opacity = 0;

                setTimeout(() => {
                    headerHeading.textContent = headerHeadingText[1];
                    headerHeading.style.opacity = 1;

                    setTimeout(() => {
                        headerHeading.style.opacity = 1;

                        setTimeout(() => {
                            headerHeading.style.opacity = 0;

                            setTimeout(() => {
                                headerHeading.textContent =
                                    headerHeadingText[2];
                                headerHeading.style.opacity = 1;
                            }, 1000);
                        }, 1000);
                    }, 500);
                }, 1000);
            }, 500);
        }, 1000);
    }, 1000);
}
// Setting the bg image and change it every 2mins

const header = document.getElementById("heading-bg");
const images = [
    "./src/img/bg/op-1.jpg",
    "./src/img/bg/op-2.jpg",
    "./src/img/bg/op-4.jpg",
    "./src/img/bg/op-5.jpg",
    "./src/img/bg/op-6.jpg",
];

let currentImageCounter = 1;

// Function to update bg img of chosen element

function setImageByUrl(img) {
    return `url(${img})`;
}

function setImageWithLinearGradientBySide(img, side) {
    return `linear-gradient(
            to ${side},
            rgba(255, 255, 255, 0) 70%,
            rgba(245, 245, 245, 1) 100%
        ),
        ${setImageByUrl(img)}`;
}

function setNewImage(element, imageScenario) {
    // Image transition animation, so that the user does not see the image loading process
    element.style.transition = "opacity 1s";
    element.style.opacity = "0";
    setTimeout(() => {
        element.style.backgroundImage = imageScenario;
        element.style.opacity = "1";
    }, 1000);
}

function getNexBgImage() {
    if (currentImageCounter >= 5) {
        currentImageCounter = 0;
    }
    let currentImage = images[currentImageCounter];
    currentImageCounter++;
    return currentImage;
}

// Eave last bg img
function saveBackgroundImage(imageUrl) {
    localStorage.setItem("lastImage", imageUrl);
}

function getBackgroundImage() {
    return localStorage.getItem("lastImage");
}

// Set last bg image if it exists
let lastImg = getBackgroundImage();
if (lastImg) {
    setNewImage(header, setImageByUrl(lastImg));
}

// Function to start the interval to set background image every 2 mins
function startBgImageInterval() {
    bgImageInterval = setInterval(() => {
        const nextImage = getNexBgImage();
        saveBackgroundImage(nextImage);
        setNewImage(header, setImageByUrl(nextImage));
    }, 2 * 60 * 1000);
}

// Nav logo-button logic

function reloadPage() {
    showAbout();
    window.location.reload();
    window.location.href = "#";
}

// Main section

// Getting access

const wrapper = document.querySelector(".site-wrap");

const about = document.querySelector(".about");
const aboutBtn = document.querySelector(".about-btn");
const aboutShowcase = document.querySelector(".about-showcase");
const leftImg = document.querySelector(".about-left");
const rightImg = document.querySelector(".about-right");

const catalog = document.querySelector(".catalog");
const catalogBtn = document.querySelector(".catalog-btn");

const catalogLeft = document.querySelector(".catalog-left");
const catalogRight = document.querySelector(".catalog-right");

const locations = document.querySelector(".locations");
const locationsBtn = document.querySelector(".locations-btn");
const locationsShowcase = document.querySelector(".locations-showcase");
const locationsLeft = document.querySelector(".locations-left");
const locationsRight = document.querySelector(".locations-right");

const main = document.querySelector("main");
// Navbar buttons functions

const transitionDuration = 1000; // 1 second
const shortTransitionDuration = 300; // 0.3 second

function hideElement(element) {
    element.style.opacity = "0";
    setTimeout(() => {
        element.style.display = "none";
    }, transitionDuration);
}

function showElement(element) {
    element.style.display = "block";
    setTimeout(() => {
        element.style.opacity = "1";
    }, 0);
}

function showAbout() {
    catalogBtn.style.color = "white";
    locationsBtn.style.color = "white";
    aboutBtn.style.color = "grey";
    if (about.style.display === "block") {
        return;
    } else {
        hideElement(locations);
        hideElement(locationsShowcase);
        hideElement(catalog);
        wrapper.style.minWidth = "640px";
        showElement(about);
        showElement(aboutShowcase);
        main.style.minHeight = "90vh";
    }
}

function showCatalog() {
    aboutBtn.style.color = "white";
    locationsBtn.style.color = "white";
    catalogBtn.style.color = "grey";
    if (catalog.style.display === "block") {
        return;
    } else {
        hideElement(locations);
        hideElement(aboutShowcase);
        hideElement(about);
        hideElement(aboutShowcase);
        wrapper.style.minWidth = "780px";
        showElement(catalog);
        main.style.minHeight = "215vh";
    }
}

function showLocations() {
    aboutBtn.style.color = "white";
    catalogBtn.style.color = "white";
    locationsBtn.style.color = "grey";
    if (locations.style.display === "flex") {
        return;
    } else {
        hideElement(about);
        hideElement(aboutShowcase);
        hideElement(catalog);
        wrapper.style.minWidth = "640px";
        showElement(locations);
        showElement(locationsShowcase);
        main.style.minHeight = "90vh";
    }
}

// sticky nav function

const nav = document.getElementById("main-nav");
const topOfNav = nav.offsetTop;

function fixNav() {
    if (window.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + "px";
        document.body.classList.add("fixed-nav");
    } else {
        document.body.style.paddingTop = 0;
        document.body.classList.remove("fixed-nav");
    }
}
window.addEventListener("scroll", fixNav);

// About-showcase images and it's update

const aboutShowcaseImages = [
    "./src/img/about/clothes1.jpg",
    "./src/img/about/clothes2.jpg",
    "./src/img/about/clothes3.jpg",
    "./src/img/about/clothes4.jpg",
    "./src/img/about/clothes5.jpg",
    "./src/img/about/collection.jpg",
    "./src/img/about/fabric-knitting.jpg",
    "./src/img/about/sewing-process.jpg",
    "./src/img/about/style-development.jpg",
    "./src/img/about/workshop.jpg",
];

let leftImageCount = 0;
let rightImageCount = 1;

const getAboutShowcaseImages = (side) => {
    const n = aboutShowcaseImages.length;
    let currentImage;
    if (side === "left") {
        if (leftImageCount >= n) {
            leftImageCount = 0;
        }
        currentImage = aboutShowcaseImages[leftImageCount];
        leftImageCount += 2;
    } else if (side === "right") {
        if (rightImageCount >= n) {
            rightImageCount = 1;
        }
        currentImage = aboutShowcaseImages[rightImageCount];
        rightImageCount += 2;
    }
    return currentImage;
};

// product images

const productImages = [
    "./src/img/clothes/cl-1.jpg",
    "./src/img/clothes/cl-5.jpg",
    "./src/img/clothes/cl-2.jpg",
    "./src/img/clothes/cl-3.jpg",
    "./src/img/clothes/cl-4.jpg",
    "./src/img/clothes/cl-6.jpg",
];

const products = document.querySelectorAll(".product");

products.forEach((product, idx) => {
    product.style.backgroundImage = setImageByUrl(productImages[idx]);
});

// Function to animate about showcase side-bg images
function startAboutShowcaseIntervals() {
    aboutShowcaseLeftInterval = setInterval(() => {
        const nextLeftImage = getAboutShowcaseImages("left");
        setNewImage(
            leftImg,
            setImageWithLinearGradientBySide(nextLeftImage, "right")
        );
    }, 15 * 1000);

    aboutShowcaseRightInterval = setInterval(() => {
        const nextRightImage = getAboutShowcaseImages("right");
        setNewImage(
            rightImg,
            setImageWithLinearGradientBySide(nextRightImage, "left")
        );
    }, 25 * 1000);
}

startAllTimers();

// add locations map
function initMap() {
    const map = L.map("map");

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers for New York City and London
    L.marker([40.7128, -74.006]).addTo(map).bindPopup("New York City");
    L.marker([51.5074, -0.1278]).addTo(map).bindPopup("London");

    // Create a bounds object that includes both locations
    const bounds = L.latLngBounds([
        [40.7128, -74.006],
        [51.5074, -0.1278],
    ]);
    console.log(bounds);

    // Set the map view to fit the bounds
    map.fitBounds(bounds);

    // Add eventListener to location blocks
    const newYorkBlock = document.getElementById("new-york");
    const londonBlock = document.getElementById("london");

    // Center the map on the mouseovered location
    newYorkBlock.addEventListener("mouseover", function () {
        map.setView([40.7338, -74.056], 13);
    });

    londonBlock.addEventListener("mouseover", function () {
        map.setView([51.5244, -0.1748], 13);
    });
}

// Initialize the map
initMap();

// Usage example
