import {
    level1Questions,
    level2Questions,
    level3Questions,
    level4Questions,
} from "./questions.js";

document.addEventListener("DOMContentLoaded", function () {
    // main var question counter

    let countQuestions = 1;

    //main fn
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
            }
        }

        interval = setInterval(typeLetter, delay);
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
        const deleteLetter = () => {
            element.textContent = currentText.slice(0, currentIndex - 1) + "|";
            currentIndex--;

            if (currentIndex === 0) {
                element.textContent = "";
                clearInterval(interval);
                toggleBlinking(element);
            }
        };

        const interval = setInterval(deleteLetter, delay);
    }

    //access

    const BG_CONTAINER = document.getElementById("bg-container");

    const QUESTION_FIELD = document.getElementById("question-container");

    const QUESTION = document.getElementById("question-text");

    const START_GAME_BUTTON = document.getElementById("start-button");

    const END_GAME_WINDOW = document.getElementById("game-end-window");

    const RESTART_GAME_BUTTON = document.getElementById("restart-button");

    //intro
    const INTRO_TEXT = "Front-End Developer";
    const INTRO_ELEMENT = document.querySelector(".intro-txt");
    const INTRO_PLAY_BUTTON = document.getElementById("intro-button");

    //audio
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
    //

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

    //audio control
    const AUDIO_CONTROLS = document.getElementById("audio-controls");

    const muteButton = document.querySelector(".mute");
    const volumeSlider = document.querySelector(".volume");

    // save audio settings

    // saved and default
    const savedVolume = localStorage.getItem("volumeSetting");
    const defaultVolume = savedVolume ? parseFloat(savedVolume) : 0.3;

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
        TYPING_AUDIO.volume = vol * 0.5;
        START_GAME_AUDIO.volume = vol * 0.3;
        NEXT_QUESTION_AUDIO.volume = vol;
        CORRECT_ANSWER_AUDIO.volume = vol;
        END_GAME_AUDIO.volume = vol;
        LEVEL_ONE_AUDIO.volume = vol;
        LEVEL_TWO_AUDIO.volume = vol;
        LEVEL_THREE_AUDIO.volume = vol;
        LEVEL_FOUR_AUDIO.volume = vol;
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

    const nextQuestionAudio = () => setTimeout(NEXT_QUESTION_AUDIO.play(), 250);

    //

    //intro's mechanics
    INTRO_PLAY_BUTTON.addEventListener("click", () => {
        // i need to hide an element with 0.3s transition and then delete if from flow
        INTRO_PLAY_BUTTON.classList.add("hide");
        INTRO_PLAY_BUTTON.addEventListener(
            "transitionend",
            () => {
                INTRO_PLAY_BUTTON.remove();
            },
            { once: true }
        );
        setTimeout(() => {
            AUDIO_CONTROLS.style.display = "flex";
            TYPING_AUDIO.play();
            typeWriterEffect(INTRO_ELEMENT, INTRO_TEXT, 150);
        }, 300);
        setTimeout(() => {
            START_GAME_BUTTON.classList.toggle("hide");
            START_GAME_BUTTON.style.display = "block";
        }, 3500);
    });

    let animationStarted = false;

    // start game's mechanics

    START_GAME_BUTTON.addEventListener("click", () => {
        START_GAME_AUDIO.play();
        if (!animationStarted) {
            animationStarted = true;
            setInterval(() => {
                START_GAME_BUTTON.classList.toggle("choice");
            }, 500);
        }
        setTimeout(() => {
            // same mechanics as in intro block
            START_GAME_BUTTON.classList.toggle("hide");
            START_GAME_BUTTON.addEventListener(
                "transitionend",
                () => {
                    START_GAME_BUTTON.remove();
                    animationStarted = false;
                },
                { once: true }
            );
            BG_CONTAINER.style.filter = "brightness(45%)";
            setTimeout(() => {
                QUESTION_FIELD.style.display = "block";
                game(countQuestions);
            }, 250);
            //every mechanics starts next interface block
        }, 5000);
        clearInterval();
        setTimeout(() => {
            START_GAME_BUTTON.classList.add("correct");
        }, 3500);
        toggleBlinking(INTRO_ELEMENT);
    });

    // global game function
    function game(countCurrentQuestion, delay = 250) {
        //variables for main function game
        let currentQuestion = questionByCurrentLevel();
        let currentAnswers = currentQuestion.answers;
        let questionText = currentQuestion.text;
        let number = questionNumber(countCurrentQuestion);
        const buttonsField = document.getElementById("buttons-field");
        const buttonsContainer = document.getElementById("answer-buttons");
        const answerButtons = document.querySelectorAll(".answer-btn");
        const nextButton = document.getElementById("next-button");

        currentQuestion.checked = true;

        typeCurrentQuestion(delay);

        // functions to get questions

        function questionNumber(counter) {
            let text = "Question #" + counter;
            return text;
        }

        function getRandomQuestion(questionLevel) {
            let n = questionLevel.length - 1;
            let questionNumber = Math.floor(Math.random() * n + 1);
            if (questionLevel[questionNumber].checked) {
                return getRandomQuestion(questionLevel);
            }
            return questionLevel[questionNumber];
        }

        function questionByCurrentLevel() {
            let currentQuestion;
            if (countCurrentQuestion <= 5) {
                currentQuestion = getRandomQuestion(level1Questions);
            } else if (countCurrentQuestion > 5 && countCurrentQuestion <= 10) {
                currentQuestion = getRandomQuestion(level2Questions);
            } else if (
                countCurrentQuestion > 10 &&
                countCurrentQuestion <= 15
            ) {
                currentQuestion = getRandomQuestion(level3Questions);
            } else if (
                countCurrentQuestion > 15 &&
                countCurrentQuestion <= 20
            ) {
                currentQuestion = getRandomQuestion(level4Questions);
            }
            return currentQuestion;
        }

        const correctAnswer = currentAnswers
            .map((answer, index) => {
                let value = [answer, index];
                if (answer[1] === true) {
                    return value;
                }
            })
            .filter(Boolean)[0];
        const correctButton = answerButtons[correctAnswer[1]];

        function typeCurrentQuestion(delay) {
            setTimeout(() => {
                nextQuestionAudio();
                typeWriterEffect(QUESTION, number, 100);

                setTimeout(() => {
                    deleteTyping(QUESTION, number, 100);
                    setTimeout(() => {
                        typeWriterEffect(QUESTION, questionText, 50);

                        // call the answer typing function after displaying the question
                        setTimeout(() => {
                            showAnswers(currentAnswers);
                            toggleBlinking(QUESTION);
                        }, questionText.length * 50 + 1000);
                    }, number.length * 50 + 500);
                }, number.length * 50 + 1000);
            }, delay);
        }

        function showAnswers(answers) {
            const textFields = document.querySelectorAll(".answer-text");
            buttonsField.style.display = "block";

            answerButtons.forEach((button) => {
                button.disabled = true;
            });

            function typeAnswers(index) {
                if (index >= textFields.length) {
                    audioByCurrentLevel(countCurrentQuestion);
                    answerButtons.forEach(
                        (button) => (button.disabled = false)
                    );
                    return;
                }

                const textField = textFields[index];
                const answerText = answers[index][0];

                setTimeout(() => {
                    buttonsContainer.children[index].classList.remove("hide");
                    typeWriterEffect(textField, answerText, 50);

                    setTimeout(() => {
                        toggleBlinking(textField);
                        typeAnswers(index + 1);
                    }, answerText.length * 50 + 1000);
                }, 300);
            }

            typeAnswers(0);

            answerButtons.forEach((button, index) => {
                button.addEventListener("click", () => {
                    responseResult(button, index);
                });
            });
        }

        const audioByCurrentLevel = (levelRange) => {
            let currentAudio;
            if (levelRange < 6) {
                currentAudio = LEVEL_ONE_AUDIO;
            } else if (levelRange >= 6 && levelRange < 11) {
                currentAudio = LEVEL_TWO_AUDIO;
            } else if (levelRange >= 11 && levelRange < 16) {
                currentAudio = LEVEL_THREE_AUDIO;
            } else {
                currentAudio = LEVEL_FOUR_AUDIO;
            }

            currentAudio.addEventListener("ended", function () {
                // Restart the audio when it ends
                this.currentTime = 0;
                this.play();
            });
            currentAudio.play();
        };

        function showCorrectAnswer(delay) {
            setTimeout(() => {
                correctButton.classList.toggle("correct");
            }, delay);
        }

        function toggleNextButton() {
            if (nextButton.classList.contains("hide")) {
                nextButton.style.display = "block";
                nextButton.classList.remove("hide");
            } else {
                nextButton.classList.add("hide");
                nextButton.classList.remove("correct");
                nextButton.addEventListener(
                    "transitionend",
                    () => {
                        nextButton.remove();
                        animationStarted = false;
                    },
                    { once: true }
                );
            }
        }

        function responseResult(button, index) {
            let choice;

            if (!animationStarted) {
                animationStarted = true;
                choice = setInterval(() => {
                    button.classList.toggle("choice");
                }, 500);
            }

            answerButtons.forEach((button) => {
                button.disabled = true;
            });

            stopAllAudio();

            setTimeout(() => clearInterval(choice), 2000);
            animationStarted = false;

            if (index !== correctAnswer[1]) {
                setTimeout(() => {
                    if (countCurrentQuestion <= 10) {
                        console.log("looser");
                    }
                    END_GAME_AUDIO.play();
                    button.classList.add("wrong");
                }, 2000);
                setTimeout(() => {
                    button.classList.remove("wrong");
                    showCorrectAnswer();
                    endGame();
                }, 3500);
            } else {
                stopAllAudio();
                // should start win audio in here and played once
                setTimeout(() => {
                    if (countQuestions + 1 === 21) {
                        END_GAME_AUDIO.play();
                        endGame();
                    }
                    CORRECT_ANSWER_AUDIO.play();
                    toggleNextButton();
                    nextButtonLogic(countCurrentQuestion);
                }, 2000);
            }

            showCorrectAnswer(2000);
        }
        function nextButtonLogic(question) {
            nextButton.addEventListener("click", () => {
                if (!animationStarted) {
                    animationStarted = true;
                    const choiceInterval = setInterval(() => {
                        nextButton.classList.toggle("choice");
                    }, 500);
                    setTimeout(() => {
                        clearInterval(choiceInterval);
                    }, 2000);
                }

                setTimeout(() => {
                    nextButton.classList.add("correct");
                    setTimeout(() => {
                        toggleNextButton();
                        nextButton.addEventListener(
                            "transitionend",
                            () => {
                                QUESTION.style.display = "none";
                                buttonsContainer.style.display = "none";
                                QUESTION.textContent = "";
                                answerButtons.forEach(
                                    (button) => (button.textContent = "")
                                );
                                game(question + 1);
                            },
                            { once: true }
                        );
                    }, 1000);
                }, 2000);
            });
        }

        //end game code

        function endGame() {
            const endTextContainer = document.getElementById("end-text");
            // need to add end game audio in this place
            const endTextByPos = getEndGameText(countCurrentQuestion);

            END_GAME_WINDOW.style.display = "block";
            AUDIO_CONTROLS.style.display = "none";
            buttonsField.style.display = "none";
            QUESTION_FIELD.style.display = "none";
            typeWriterEffect(endTextContainer, endTextByPos, 50);
            setTimeout(() => {
                RESTART_GAME_BUTTON.style.display = "block";
            }, endTextByPos.length * 50 + 1000);

            RESTART_GAME_BUTTON.addEventListener("click", () =>
                window.location.reload()
            );
        }

        function getEndGameText(level) {
            let text;
            let questionsCountText = `
            \nYou answered ${countCurrentQuestion - 1} question${
                countCurrentQuestion != 1 ? "s." : "."
            }`;
            if (level <= 5) {
                text =
                    "Ladies and gentlemen, tonight\nwe have a question that proves\neven in the pursuit of becoming\n a developer, the role of a\nTRAINEE Front-End Developer can \nlead to incredible \nopportunities.";
            } else if (level > 5 && level <= 10) {
                text =
                    "Step into the spotlight, as \nwe unveil the power of a \nJUNIOR Front-End Developer \n- a role that ignites innovation, \nfuels creativity, and \nunlocks a world of digital \npossibilities on the \npath to developer dreams.";
            } else if (level > 10 && level <= 15) {
                text =
                    "Welcome to the elite league \nof digital craftsmanship,\nhere the position of a \nMIDDLE Front-End Developer \ntakes center stage. \nArmed with expertise and a knack \nfor innovation, they navigate \nthe realms of code, design, \nand user experience, \nweaving together captivating \ninterfaces that leave a lasting \nimpression on the path to \ndeveloper aspirations.";
            } else {
                text =
                    "Prepare to witness \nthe pinnacle of Front-End \nmastery as we unveil the \nextraordinary role of a \nSENIOR Front-End Developer.\n With unrivaled expertise, \nstrategic vision, and \na touch of coding wizardry, \nthey orchestrate digital \nsymphonies, shaping the future \nof user interfaces and \npropelling themselves towards \nthe realm of developers.";
            }
            return text + questionsCountText;
        }
        //
    }
});

/* NEED SOME CHANGES
    fix game logic after next game click event
 */
