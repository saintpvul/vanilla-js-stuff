import {
    level1Questions,
    level2Questions,
    level3Questions,
    level4Questions,
} from "./questions.js";

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

    // functions to get questions

    function questionNumber(counter) {
        let text = "Question #" + counter;
        return text;
    }

    function getRandomQuestion(questionLevel) {
        let n = questionLevel.length - 1;
        let questionNumber = Math.floor(Math.random() * n + 1);
        return questionLevel[questionNumber];
    }

    function questionByCurrentLevel() {
        let currentQuestion;
        if (countQuestions <= 5) {
            currentQuestion = getRandomQuestion(level1Questions);
        } else if (countQuestions > 5 && countQuestions <= 10) {
            currentQuestion = getRandomQuestion(level2Questions);
        } else if (countQuestions > 10 && countQuestions <= 15) {
            countQuestions = getRandomQuestion(level3Questions);
        } else if (countQuestions > 15 && countQuestions <= 20) {
            countQuestions = getRandomQuestion(level4Questions);
        }
        return currentQuestion;
    }

    //access

    const BG_CONTAINER = document.getElementById("bg-container");

    const QUESTION_FIELD = document.getElementById("question-container");

    const QUESTION = document.getElementById("question-text");

    const ANSWER_BUTTONS_FIELD = document.getElementById("answer-buttons");

    const START_GAME_BUTTON = document.getElementById("start-button");

    //intro
    const INTRO_TEXT = "Front-End Developer";
    const INTRO_ELEMENT = document.querySelector(".intro-txt");
    const INTRO_PLAY_BUTTON = document.getElementById("intro-button");

    //audio
    const TYPING_AUDIO = new Audio("./assets/sound/typing.mp3");
    const START_GAME_AUDIO = new Audio("./assets/sound/start-sound.mp3");
    const NEXT_QUESTION_AUDIO = new Audio("./assets/sound/next-qst.mp3");

    // level sounds
    const LEVEL_ONE_AUDIO = new Audio("./assets/sound/qst-1-5.mp3");
    const LEVEL_TWO_AUDIO = new Audio("./assets/sound/qst-6-10.mp3");
    const LEVEL_THREE_AUDIO = new Audio("./assets/sound/qst-11-15.mp3");
    const LEVEL_FOUR_AUDIO = new Audio("./assets/sound/qst-16-20.mp3");
    //

    const nextQuestionAudio = () => setTimeout(NEXT_QUESTION_AUDIO.play(), 250);

    function setGlobalVolume(volume) {
        let vol = volume / 10;
        TYPING_AUDIO.volume = vol * 0.5;
        START_GAME_AUDIO.volume = vol * 0.3;
        NEXT_QUESTION_AUDIO.volume = vol;
        LEVEL_ONE_AUDIO.volume = vol;
        LEVEL_TWO_AUDIO.volume = vol;
        LEVEL_THREE_AUDIO.volume = vol;
        LEVEL_FOUR_AUDIO.volume = vol;
    }

    setGlobalVolume(0.2);
    /*

    NEED TO ADD VOLUME CONTROLS

    */

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
            TYPING_AUDIO.play();
            typeWriterEffect(INTRO_ELEMENT, INTRO_TEXT);
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
            animationStarted = false;
            setTimeout(() => {
                QUESTION_FIELD.style.display = "block";
                game();
            }, 250);
            //every mechanics starts next interface block
        }, 5000);
        clearInterval();
        setTimeout(() => {
            START_GAME_BUTTON.classList.add("correct");
        }, 3500);
        toggleBlinking(INTRO_ELEMENT);
    });

    // question counter variable

    let countQuestions = 1;

    // global game function

    function game() {
        const currentQuestion = questionByCurrentLevel();
        const currentAnswers = currentQuestion.answers;
        const questionText = currentQuestion.text;
        const number = questionNumber(countQuestions);
        const answerButtons = document.querySelectorAll(".answer-btn");
        const nextButton = document.getElementById("next-button");
        const delay = 250;

        typeCurrentQuestion(delay);

        function typeCurrentQuestion(delay) {
            setTimeout(() => {
                nextQuestionAudio();
                typeWriterEffect(QUESTION, number);

                setTimeout(() => {
                    deleteTyping(QUESTION, number);
                    setTimeout(() => {
                        typeWriterEffect(QUESTION, questionText);

                        // call the answer typing function after displaying the question
                        setTimeout(() => {
                            showAnswers(currentAnswers);
                            toggleBlinking(QUESTION);
                        }, questionText.length * 150 + 1000);
                    }, number.length * 150 + 500);
                }, number.length * 150 + 1000);
            }, delay);
        }

        function showAnswers(answers) {
            const buttons = document.getElementById("buttons-field");
            const buttonsContainer = document.getElementById("answer-buttons");
            const textFields = document.querySelectorAll(".answer-text");
            buttons.style.display = "block";

            function typeAnswers(index) {
                if (index >= textFields.length) {
                    audioByCurrentLevel(countQuestions);
                    return;
                }

                const textField = textFields[index];
                const answerText = answers[index][0];

                setTimeout(() => {
                    buttonsContainer.children[index].classList.remove("hide");
                    typeWriterEffect(textField, answerText);

                    setTimeout(() => {
                        toggleBlinking(textField);
                        typeAnswers(index + 1);
                    }, answerText.length * 150 + 1000);
                }, 300);
            }

            typeAnswers(0);
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

        answerButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const isCorrectAnswer = currentAnswers[index][1] === true;
                const correctButton = currentAnswers.filter((answer, idx) =>
                    answer[1] === true ? idx : -1
                );

                if (!animationStarted) {
                    animationStarted = true;
                    setInterval(() => {
                        button.toggle("choice");
                    }, 500);
                }

                if (isCorrectAnswer) {
                    setTimeout(() => {
                        button.classList.add("correct");
                    }, 2000);
                    nextButton.style.display = "block";
                } else {
                    console.log("Incorrect answer clicked!");
                }
            });
        });
    }
});

/* NEED SOME CHANGES
- need to change animation of all buttons. 
- block responses from buttons when one of they is clicked. 
- add next button logic.
- add audio controls. audio is quite annoying.
*/
