document.addEventListener("DOMContentLoaded", function () {
    const text = "Front-End Developer";
    const dynamicTextElement = document.querySelector(".dynamic-text");
    const playButton = document.getElementById("play-button");

    const audio = new Audio("./assets/sound/typing.mp3");

    let currentIndex = 0;
    let interval;

    function addLetter() {
        dynamicTextElement.textContent = text.slice(0, currentIndex) + "|";
        currentIndex++;

        if (currentIndex > text.length) {
            dynamicTextElement.textContent = text.slice(0, text.length);
            clearInterval(interval);
            dynamicTextElement.innerHTML += "<span>|</span>";
            interval = setInterval(blinkText, 500);
        }
    }

    function blinkText() {
        const spanElement = dynamicTextElement.querySelector("span");
        spanElement.classList.toggle("blinking");
    }
    playButton.addEventListener("click", function () {
        playButton.classList.add("hide");
        playButton.addEventListener(
            "transitionend",
            function () {
                playButton.remove();
            },
            { once: true }
        );
        setTimeout(function () {
            audio.play();
            interval = setInterval(addLetter, 150);
        }, 300);
    });
});
