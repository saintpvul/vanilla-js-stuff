document.addEventListener("DOMContentLoaded", function () {
    //main fn

    function typeWriterEffect(element, text) {
        let currentIndex = 0;
        let interval;

        function typeLetter() {
            element.textContent = text.slice(0, currentIndex) + "|";
            currentIndex++;

            if (currentIndex > text.length) {
                element.textContent = text.slice(0, text.length);
                clearInterval(interval);
                toggleBlinking(element);
            }
        }

        interval = setInterval(typeLetter, 150);
    }

    function toggleBlinking(elem) {
        const spanContent = "<span class='blinking'>|</span>";
        const spanElement = elem.querySelector("span.blinking");

        if (spanElement) {
            spanElement.remove();
        } else {
            elem.insertAdjacentHTML("beforeend", spanContent);
        }
    }

    //intro

    const INTRO_TEXT = "Front-End Developer";
    const INTRO_ELEMENT = document.querySelector(".intro-txt");
    const INTRO_PLAY_BUTTON = document.getElementById("intro-button");

    const INTRO_AUDIO = new Audio("./assets/sound/typing.mp3");

    INTRO_PLAY_BUTTON.addEventListener("click", function () {
        INTRO_PLAY_BUTTON.classList.add("hide");
        INTRO_PLAY_BUTTON.addEventListener(
            "transitionend",
            function () {
                INTRO_PLAY_BUTTON.remove();
            },
            { once: true }
        );
        setTimeout(function () {
            INTRO_AUDIO.play();
            typeWriterEffect(INTRO_ELEMENT, INTRO_TEXT);
        }, 300);
    });
    // start game
});
