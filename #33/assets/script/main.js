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
    const START_GAME_BUTTON = document.getElementById("start-button");
    const END_GAME_WINDOW = document.getElementById("game-end-window");
    const RESTART_GAME_BUTTON = document.getElementById("restart-button");

    // intro block
    const INTRO_TEXT = "Front-End Developer";
    const INTRO_ELEMENT = document.querySelector(".intro-txt");
    const INTRO_PLAY_BUTTON = document.getElementById("intro-button");

    // question controls blocks

    const answerButtons = document.querySelectorAll(".answer-btn");
    const buttonsField = document.getElementById("buttons-field");
    const nextButton = document.getElementById("next-button");
    const answerTextFields = document.querySelectorAll(".answer-text");

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

    //
    // complete refactor
    function quizGame() {
        currentQuestionIndex = 0;
        showQuestion();
    }

    function showQuestion() {
        let currentQuestion = getRandomQuestionByCategory(currentQuestionIndex);
        let questionNumber = currentQuestionIndex + 1;
        let currentQuestionCountInfo = `Question #${questionNumber}`;
        let currentQuestionText = currentQuestion.text;
        QUESTION.style.display = "block";
        setTimeout(() => {
            typeWriterEffect(QUESTION, currentQuestionCountInfo, 100);
            setTimeout(() => {
                deleteTyping(QUESTION, currentQuestionCountInfo, 100);
                setTimeout(() => {
                    typeWriterEffect(QUESTION, currentQuestionText, 50);

                    setTimeout(() => {
                        //answer handle
                        toggleBlinking(QUESTION);
                    }, currentQuestionText.length * 50 + 1000);
                }, currentQuestionCountInfo.length * 50 + 1000);
            }, currentQuestionCountInfo.length * 50 + 1000);
        }, 0);
        currentQuestion.answers.forEach((answer) => {
            const button = document.createElement("button");
            button.textContent = answer[0];
            button.classList.add("btn");
            answerButtons.appendChild(button);
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

    quizGame();

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

    const nextQuestionAudio = () =>
        setTimeout(() => NEXT_QUESTION_AUDIO.play(), 250);
    // getting audio by level
    const audioByCurrentLevel = (level) => {
        let currentAudio;
        if (level < 6) {
            currentAudio = LEVEL_ONE_AUDIO;
        } else if (level >= 6 && level < 11) {
            currentAudio = LEVEL_TWO_AUDIO;
        } else if (level >= 11 && level < 16) {
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

    //

    // intro starts here
    INTRO_PLAY_BUTTON.addEventListener("click", () => {
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

    // game starts here
    START_GAME_BUTTON.addEventListener("click", () => {
        let choiceInterval;
        START_GAME_AUDIO.play();
        if (!animationStarted) {
            animationStarted = true;

            choiceInterval = setInterval(() => {
                START_GAME_BUTTON.classList.toggle("choice");
            }, 500);
        }
        setTimeout(() => {
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
                // game(countQuestions);
            }, 250);
        }, 5000);
        clearInterval();
        setTimeout(() => {
            clearInterval(choiceInterval);
            START_GAME_BUTTON.classList.add("correct");
        }, 3500);
        toggleBlinking(INTRO_ELEMENT);
    });

    // type question into question filed and start showAnswers animation
    function typeCurrentQuestion(
        delay,
        questionCounterText,
        currentQuestionText,
        answers,
        correctAnswer,
        level
    ) {
        QUESTION.style.display = "block";
        setTimeout(() => {
            nextQuestionAudio();
            typeWriterEffect(QUESTION, questionCounterText, 100);
            setTimeout(() => {
                deleteTyping(QUESTION, questionCounterText, 100);
                setTimeout(() => {
                    typeWriterEffect(QUESTION, currentQuestionText, 50);
                    // call the answer typing function after displaying the question
                    setTimeout(() => {
                        showAnswers(answers, correctAnswer, level);
                        toggleBlinking(QUESTION);
                    }, currentQuestionText.length * 50 + 1000);
                }, questionCounterText.length * 50 + 1000);
            }, questionCounterText.length * 50 + 1000);
        }, delay);
    }

    function showAnswers(answers, correctAnswer, level) {
        let index = 0;
        buttonsField.style.display = "block";

        answerButtons.forEach((button) => {
            button.disabled = true;
        });

        function typeAnswers(index) {
            if (index >= answerTextFields.length) {
                audioByCurrentLevel(level);
                answerButtons.forEach((button) => {
                    button.disabled = false;
                });
                return;
            }

            const textField = answerTextFields[index];
            const answerText = answers[index][0];

            setTimeout(() => {
                answerButtons[index].classList.remove("hide");
                typeWriterEffect(textField, answerText, 50);

                setTimeout(() => {
                    toggleBlinking(textField);
                    typeAnswers(index + 1);
                }, answerText.length * 50 + 1000);
            }, 300);
        }

        typeAnswers(index);
        //start to listen the click event of buttons and its logic
        answerButtons.forEach((button, idx) => {
            button.addEventListener("click", () => {
                responseResult(level, correctAnswer, button, idx);
            });
        });
    }
    // answer buttons logic

    function responseResult(currentLevel, correctAnswer, button, index) {
        let choice;

        if (!animationStarted) {
            animationStarted = true;
            choice = setInterval(() => {
                button.classList.toggle("choice");
            }, 500);
        }

        console.log(currentLevel);
        answerButtons.forEach((button) => {
            button.disabled = true;
        });

        stopAllAudio();

        setTimeout(() => clearInterval(choice), 2000);
        animationStarted = false;
        console.log(index, correctAnswer[1]);
        if (index !== correctAnswer[1]) {
            setTimeout(() => {
                if (currentLevel <= 10) {
                    console.log("looser");
                }
                END_GAME_AUDIO.play();
                button.classList.add("wrong");
            }, 2000);
            setTimeout(() => {
                button.classList.remove("wrong");
                showCorrectAnswer(correctAnswer, 0);
                endGame(currentLevel);
            }, 3500);
        } else {
            stopAllAudio();
            // should start win audio in here and played once
            setTimeout(() => {
                if (currentLevel + 1 === 21) {
                    END_GAME_AUDIO.play();
                    endGame(currentLevel);
                }
                CORRECT_ANSWER_AUDIO.play();
                toggleNextButton();
                countQuestions++;
                nextButtonLogic(countQuestions);
            }, 2000);
        }

        showCorrectAnswer(correctAnswer, 2000);
    }
    function showCorrectAnswer(correctAnswer, delay) {
        setTimeout(() => {
            answerButtons[correctAnswer[1]].classList.toggle("correct");
        }, delay);

        nextButton.addEventListener("click", () =>
            setTimeout(() => {
                answerButtons[correctAnswer[1]].classList.toggle("correct");
            }, 4000)
        );
    }
    // next button logic

    //next button appearence
    function toggleNextButton() {
        if (nextButton.classList.contains("hide")) {
            nextButton.style.display = "block";
            nextButton.classList.toggle("hide");
        } else {
            nextButton.classList.add("hide");
            nextButton.classList.remove("correct");
            nextButton.addEventListener("transitionend", () => {
                nextButton.style.display = "none";
                animationStarted = false;
            });
        }
    }
    //  main next button fn
    function nextButtonLogic(questionLevel) {
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
                    QUESTION.style.display = "none";
                    buttonsField.style.display = "none";
                    QUESTION.textContent = "";
                    answerButtons.forEach((button) => {
                        button.classList.add("hide");
                    });
                    answerTextFields.forEach(
                        (textField) => (textField.textContent = "")
                    );
                    game(questionLevel);
                }, 1000);
            }, 2000);
        });
    }

    // end game appearance and logic

    function endGame(currentLevel) {
        const endTextContainer = document.getElementById("end-text");
        const endProgressTextContainer =
            document.getElementById("progress-text");
        console.log(currentLevel);

        const endTextByPos = getEndGameText(currentLevel);
        const endProgressText = (level) => `
            You answered ${level - 1} question${level - 1 != 1 ? "s." : "."}`;

        const endTextTime = endTextByPos.length * 50;
        const endProgressTextTime = endProgressText(currentLevel).length * 50;

        END_GAME_WINDOW.style.display = "block";
        AUDIO_CONTROLS.style.display = "none";
        buttonsField.style.display = "none";
        QUESTION_FIELD.style.display = "none";
        typeWriterEffect(endTextContainer, endTextByPos, 50);
        setTimeout(() => {
            toggleBlinking(endTextContainer);
            typeWriterEffect(
                endProgressTextContainer,
                endProgressText(currentLevel),
                50
            );
            setTimeout(() => {
                RESTART_GAME_BUTTON.style.display = "block";
            }, endProgressTextTime + 1000);
        }, endTextTime + 1000);

        RESTART_GAME_BUTTON.addEventListener("click", async () => {
            if (!animationStarted) {
                animationStarted = true;
                const choiceInterval = setInterval(() => {
                    RESTART_GAME_BUTTON.classList.toggle("choice");
                }, 500);
                setTimeout(() => {
                    clearInterval(choiceInterval);
                    RESTART_GAME_BUTTON.classList.add("correct");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }, 2000);
            }
        });
    }

    function getEndGameText(level) {
        let text;
        if (level <= 5) {
            text =
                "Ladies and gentlemen, tonight we have a question that proves even in the pursuit of becoming a developer, the role of a TRAINEE Front-End Developer can lead to incredible opportunities.";
        } else if (level > 5 && level <= 10) {
            text =
                "Step into the spotlight, as we unveil the power of a JUNIOR Front-End Developer - a role that ignites innovation, fuels creativity, and unlocks a world of digital possibilities on the path to developer dreams.";
        } else if (level > 10 && level <= 15) {
            text =
                "Welcome to the elite league of digital craftsmanship, here the position of a MIDDLE Front-End Developer takes center stage. Armed with expertise and a knack for innovation, they navigate the realms of code, design, and interfaces that leave a lasting impression on the path to developer aspirations.";
        } else {
            text =
                "Prepare to witness the pinnacle of Front-End mastery as we unveil the extraordinary role of a SENIOR Front-End Developer. With unrivaled expertise, strategic vision, and a touch of coding wizardry, they orchestrate digital symphonies, shaping the future of user interfaces and propelling themselves towards the realm of developers.";
        }
        return text;
    }

    // global game function
    function game(currentQuestionCounter, delay = 250) {
        // setting questions by its count to main game variables
        console.log(currentQuestionCounter);
        const number = countQuestionNumber(currentQuestionCounter);
        const currentQuestion = questionByCurrentLevel(currentQuestionCounter);
        const currentAnswers = currentQuestion.answers;
        const questionText = currentQuestion.text;

        // find the button of correct answer and correct answer itself
        const correctAnswer = currentAnswers
            .map((answer, index) => {
                let value = [answer, index];
                if (answer[1] === true) {
                    return value;
                }
            })
            .filter(Boolean)[0];

        // setting the 'checked' property of current question to true
        currentQuestion.checked = true;
        console.log(correctAnswer);
        console.log(currentQuestion);

        // game function logic by starting main functions
        typeCurrentQuestion(
            delay,
            number,
            questionText,
            currentAnswers,
            correctAnswer,
            currentQuestionCounter
        );
    }

    /* NEED SOME CHANGES
    fix a bug with processing the response to the second and subsequent responses ****** fixed
    need to change next button toggle and answer animation after it was animated

    need to delete all buttons and fill the answers field content with buttons dynamically and also dynamiacally delete those
    */
});
