import {
    level1Questions,
    level2Questions,
    level3Questions,
    level4Questions,
} from "./questions.js";

document.addEventListener("DOMContentLoaded", function () {
    // ACCESS

    //main blocks
    const BG_CONTAINER = document.getElementById("bg-container");
    const QUESTION_FIELD = document.getElementById("question-container");
    const QUESTION = document.getElementById("question-text");
    const END_GAME_WINDOW = document.getElementById("game-end-window");

    // intro block
    const INTRO_PLAY_BUTTON = document.getElementById("intro-button");
    const INTRO_TEXT = "Front-End Developer";
    const INTRO_ELEMENT = document.querySelector(".intro-txt");

    // question controls blocks

    const answerButtons = document.getElementById("answer-buttons");
    const buttonsField = document.getElementById("buttons-field");
    const NEXT_BUTTON = document.getElementById("next-button");

    // audio controls
    const AUDIO_CONTROLS = document.getElementById("audio-controls");
    const muteButton = document.querySelector(".mute");
    const volumeSlider = document.querySelector(".volume");

    // saved and default audio variables
    const savedVolume = localStorage.getItem("volumeSetting");
    const defaultVolume = savedVolume ? parseFloat(savedVolume) : 0.3;

    // progress audio
    const TYPING_AUDIO = new Audio("./assets/sound/typing.mp3");
    const START_GAME_AUDIO = new Audio("./assets/sound/start-sound.mp3");
    const NEXT_QUESTION_AUDIO = new Audio("./assets/sound/next-qst.mp3");
    const CORRECT_ANSWER_AUDIO = new Audio("./assets/sound/correct-ans.mp3");
    const END_GAME_AUDIO = new Audio("./assets/sound/end-game.mp3");

    // level sounds
    const LEVEL_ONE_AUDIO = new Audio("./assets/sound/qst-1-5.mp3");
    const LEVEL_TWO_AUDIO = new Audio("./assets/sound/qst-6-10.mp3");
    const LEVEL_THREE_AUDIO = new Audio("./assets/sound/qst-11-15.mp3");
    const LEVEL_FOUR_AUDIO = new Audio("./assets/sound/qst-16-20.mp3");

    // main var question counter

    let currentQuestionIndex = 0;
    let animationStarted = false;

    //

    INTRO_PLAY_BUTTON.addEventListener("click", () => {
        INTRO_PLAY_BUTTON.style.display = "none";

        setTimeout(() => {
            AUDIO_CONTROLS.style.display = "flex";
            typeWriterEffect(INTRO_ELEMENT, INTRO_TEXT, 150);

            setTimeout(() => {
                NEXT_BUTTON.style.display = "block";

                NEXT_BUTTON.addEventListener("click", startGameHandler);
            }, INTRO_TEXT.length * 150 + 500);
        }, 300);
    });

    function startGameHandler() {
        START_GAME_AUDIO.play();
        toggleBlinking(INTRO_ELEMENT);
        animateNextButton(() => {
            QUESTION_FIELD.style.display = "block";
            buttonsField.style.display = "block";
            BG_CONTAINER.style.filter = "brightness(45%)";
            quizGame();
        });

        // Remove the event listener
        NEXT_BUTTON.removeEventListener("click", startGameHandler);
    }

    function quizGame() {
        NEXT_BUTTON.querySelector(".inner").textContent = "Next";
        currentQuestionIndex = 0;
        showQuestion();
    }

    function showQuestion() {
        resetTable();
        let currentQuestion = getRandomQuestionByCategory(currentQuestionIndex);
        let questionNumber = currentQuestionIndex + 1;
        let currentQuestionCountInfo = `Question #${questionNumber}`;
        let currentQuestionText = currentQuestion.text;
        QUESTION.style.display = "block";
        buttonsField.style.display = "block";
        nextQuestionAudio();

        setTimeout(() => {
            typeWriterEffect(QUESTION, currentQuestionCountInfo, 100);
            setTimeout(() => {
                deleteTyping(QUESTION, currentQuestionCountInfo, 100);
                setTimeout(() => {
                    typeWriterEffect(QUESTION, currentQuestionText, 50);

                    setTimeout(() => {
                        let index = 0;

                        function showCurrentAnswer() {
                            if (index < currentQuestion.answers.length) {
                                const answer = currentQuestion.answers[index];
                                const button = document.createElement("button");
                                button.classList.add("btn", "outer");
                                button.disabled = true;

                                const answerDiv = document.createElement("div");
                                answerDiv.classList.add("answer-div", "inner");

                                const answerText =
                                    document.createElement("div");
                                answerText.classList.add("answer-text");

                                answerDiv.appendChild(answerText);
                                button.appendChild(answerDiv);
                                answerButtons.appendChild(button);

                                setTimeout(() => {
                                    typeWriterEffect(answerText, answer[0], 50);

                                    if (answer[1]) {
                                        button.dataset.correct = true;
                                    }
                                    button.addEventListener(
                                        "click",
                                        selectAnswer
                                    );
                                    setTimeout(() => {
                                        showCurrentAnswer();
                                        toggleBlinking(answerText);
                                    }, answer[0].length * 50 + 600);
                                }, 500);
                            } else {
                                audioByCurrentLevel(currentQuestionIndex);
                                enableButtons();
                            }
                            index++;
                        }

                        toggleBlinking(QUESTION);
                        showCurrentAnswer();
                    }, currentQuestionText.length * 50 + 1000);
                }, currentQuestionCountInfo.length * 50 + 1000);
            }, currentQuestionCountInfo.length * 50 + 1000);
        }, 0);
    }

    function resetTable() {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
        NEXT_BUTTON.style.display = "none";
        NEXT_BUTTON.classList.remove("correct");
    }

    function enableButtons() {
        const buttons = answerButtons.querySelectorAll(".btn");
        buttons.forEach((button) => {
            button.disabled = false;
        });
    }

    function getRandomQuestionByCategory() {
        let currentQuestionCategory;
        if (currentQuestionIndex < 5) {
            currentQuestionCategory = level1Questions;
        } else if (currentQuestionIndex >= 5 && currentQuestionIndex < 10) {
            currentQuestionCategory = level2Questions;
        } else if (currentQuestionIndex >= 10 && currentQuestionIndex < 15) {
            currentQuestionCategory = level3Questions;
        } else if (currentQuestionIndex >= 15 && currentQuestionIndex < 20) {
            currentQuestionCategory = level4Questions;
        }
        let n = currentQuestionCategory.length;
        let questionNumber = Math.floor(Math.random() * n);
        if (currentQuestionCategory[questionNumber].checked) {
            return getRandomQuestionByCategory();
        }
        //turning current question to checked
        currentQuestionCategory[questionNumber].checked = true;
        return currentQuestionCategory[questionNumber];
    }

    function selectAnswer(e) {
        if (!animationStarted) {
            stopAllAudio();
            const selectedBtn = e.target.closest(".btn");
            const isCorrect = selectedBtn.dataset.correct === "true";
            animateCorrect(selectedBtn, isCorrect);
        }
    }

    function animateCorrect(button, isCorrect) {
        animationStarted = true;
        const correctButton = answerButtons.querySelector(
            ".btn[data-correct='true']"
        );

        let choice = setInterval(() => {
            button.classList.toggle("choice");
        }, 500);

        setTimeout(() => {
            clearInterval(choice);
            if (isCorrect) {
                CORRECT_ANSWER_AUDIO.play();
                button.classList.add("correct");
                NEXT_BUTTON.style.display = "block";
                NEXT_BUTTON.addEventListener("click", nextButtonHandler);
            } else {
                END_GAME_AUDIO.play();
                button.classList.add("wrong");
                correctButton.classList.add("correct");
                setTimeout(() => {
                    endGame();
                }, 1000);
            }
            animationStarted = false;
        }, 2000);
    }

    function nextButtonHandler() {
        if (currentQuestionIndex >= 20) {
            animateNextButton(endGame);
        } else {
            animateNextButton(handleNextButton);
        }
    }

    function animateNextButton(func) {
        if (!animationStarted) {
            animationStarted = true;
            const choiceInterval = setInterval(() => {
                NEXT_BUTTON.classList.toggle("choice");
            }, 500);
            setTimeout(() => {
                clearInterval(choiceInterval);
                NEXT_BUTTON.classList.add("correct");
                setTimeout(() => {
                    func();
                    animationStarted = false;
                    NEXT_BUTTON.style.display = "none";
                }, 1000);
            }, 3000);
        }
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < 20) {
            showQuestion();
        }
    }

    function endGame() {
        resetTable();
        NEXT_BUTTON.removeEventListener("click", nextButtonHandler);
        QUESTION_FIELD.style.background = "black";
        QUESTION_FIELD.style.display = "none";
        NEXT_BUTTON.querySelector(".inner").textContent = "Again";

        const endTextContainer = document.getElementById("end-text");
        const endProgressTextContainer =
            document.getElementById("progress-text");
        const endTextByCurrentPos = getEndGameText();
        const endProgressText = `You answered ${currentQuestionIndex} question${
            currentQuestionIndex != 1 ? "s." : "."
        }`;
        const endTextTime = endTextByCurrentPos.length * 50;
        const endProgressTextTime = endProgressText.length * 50;
        END_GAME_WINDOW.style.display = "block";

        typeWriterEffect(endTextContainer, endTextByCurrentPos, 50);
        setTimeout(() => {
            toggleBlinking(endTextContainer);
            typeWriterEffect(endProgressTextContainer, endProgressText, 50);
            setTimeout(() => {
                NEXT_BUTTON.style.display = "block";
            }, endProgressTextTime + 1000);
        }, endTextTime + 1000);

        NEXT_BUTTON.addEventListener("click", () => {
            toggleBlinking(endProgressTextContainer);
            animateNextButton(() => {
                window.location.reload();
            });
        });
    }

    function getEndGameText() {
        let text;
        if (currentQuestionIndex <= 5) {
            text =
                "Ladies and gentlemen, tonight we have a question that proves even in the pursuit of becoming a developer, the role of a TRAINEE Front-End Developer can lead to incredible opportunities.";
        } else if (currentQuestionIndex > 5 && currentQuestionIndex <= 10) {
            text =
                "Step into the spotlight, as we unveil the power of a JUNIOR Front-End Developer - a role that ignites innovation, fuels creativity, and unlocks a world of digital possibilities on the path to developer dreams.";
        } else if (currentQuestionIndex > 10 && currentQuestionIndex <= 15) {
            text =
                "Welcome to the elite league of digital craftsmanship, here the position of a MIDDLE Front-End Developer takes center stage. Armed with expertise and a knack for innovation, they navigate the realms of code, design, and interfaces that leave a lasting impression on the path to developer aspirations.";
        } else {
            text =
                "Prepare to witness the pinnacle of Front-End mastery as we unveil the extraordinary role of a SENIOR Front-End Developer. With unrivaled expertise, strategic vision, and a touch of coding wizardry, they orchestrate digital symphonies, shaping the future of user interfaces and propelling themselves towards the realm of developers.";
        }
        return text;
    }

    // main animation fn

    function typeWriterEffect(element, text, delay) {
        let currentIndex = 0;
        let interval;

        function typeLetter() {
            element.textContent = text.slice(0, currentIndex) + "|";
            currentIndex++;

            if (currentIndex > text.length) {
                element.textContent = text.slice(0, text.length);
                clearInterval(interval);
                toggleBlinking(element);
                TYPING_AUDIO.pause();
            }
        }

        interval = setInterval(typeLetter, delay);
        TYPING_AUDIO.play();
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

    function deleteTyping(element, currentText, delay = 150) {
        let currentIndex = currentText.length - 1;
        TYPING_AUDIO.play();
        const deleteLetter = () => {
            element.textContent = currentText.slice(0, currentIndex - 1) + "|";
            currentIndex--;

            if (currentIndex === 0) {
                element.textContent = "";
                clearInterval(interval);
                toggleBlinking(element);
                TYPING_AUDIO.pause();
            }
        };

        const interval = setInterval(deleteLetter, delay);
    }

    TYPING_AUDIO.addEventListener("ended", function () {
        this.TYPING_AUDIO = 0;
        this.play();
    });

    // sound and audio elements settings

    const audioElements = [
        LEVEL_ONE_AUDIO,
        LEVEL_TWO_AUDIO,
        LEVEL_THREE_AUDIO,
        LEVEL_FOUR_AUDIO,
        TYPING_AUDIO,
        START_GAME_AUDIO,
        NEXT_QUESTION_AUDIO,
        CORRECT_ANSWER_AUDIO,
        END_GAME_AUDIO,
    ];

    // save audio settings
    // Set the initial volume
    setVolume(defaultVolume);
    volumeSlider.value = defaultVolume * 100;

    // Update the volume slider background
    updateVolumeSliderBackground();
    function updateVolumeSliderBackground() {
        const min = volumeSlider.getAttribute("min");
        const max = volumeSlider.getAttribute("max");
        const range = max - min;
        const val = volumeSlider.value;
        const perc = (val / range) * 100;
        volumeSlider.style.backgroundImage = `linear-gradient(to right, rgb(0, 35, 117) ${perc}%, #ccc 0%)`;
    }

    function stopAllAudio() {
        audioElements.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    function toggleMute() {
        audioElements.forEach(function (audio) {
            audio.muted = !audio.muted;
        });
    }

    function toggleMuteButtonStyle() {
        muteButton.classList.toggle("muted");
    }

    function setVolume(volume) {
        let vol = volume / 10;
        TYPING_AUDIO.volume = vol;
        START_GAME_AUDIO.volume = vol * 0.5;
        NEXT_QUESTION_AUDIO.volume = vol;
        CORRECT_ANSWER_AUDIO.volume = vol;
        END_GAME_AUDIO.volume = vol;
        LEVEL_ONE_AUDIO.volume = vol * 0.5;
        LEVEL_TWO_AUDIO.volume = vol * 0.5;
        LEVEL_THREE_AUDIO.volume = vol * 0.5;
        LEVEL_FOUR_AUDIO.volume = vol * 0.5;
        saveVolumeSetting(volume);
    }
    setVolume(defaultVolume);

    function saveVolumeSetting(volume) {
        localStorage.setItem("volumeSetting", volume);
    }

    volumeSlider.addEventListener("input", function () {
        const volume = parseFloat(this.value) / 100;
        setVolume(volume);
        updateVolumeSliderBackground();
    });

    muteButton.addEventListener("click", function () {
        toggleMute();
        toggleMuteButtonStyle();
        const volume = muteButton.classList.contains("muted")
            ? 0
            : volumeSlider.value / 100;
        saveVolumeSetting(volume);
    });

    function nextQuestionAudio() {
        setTimeout(() => NEXT_QUESTION_AUDIO.play(), 0);
    }

    // getting audio by level
    const audioByCurrentLevel = (level) => {
        let currentAudio;
        if (level < 5) {
            currentAudio = LEVEL_ONE_AUDIO;
        } else if (level >= 5 && level < 10) {
            currentAudio = LEVEL_TWO_AUDIO;
        } else if (level >= 10 && level < 15) {
            currentAudio = LEVEL_THREE_AUDIO;
        } else {
            currentAudio = LEVEL_FOUR_AUDIO;
        }

        currentAudio.addEventListener("ended", function () {
            this.currentTime = 0;
            this.play();
        });
        currentAudio.play();
    };
});
