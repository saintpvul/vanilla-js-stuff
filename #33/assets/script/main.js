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

    const nextQuestionAudio = () => setTimeout(NEXT_QUESTION_AUDIO.play(), 250);

    function setGlobalVolume(volume) {
        let vol = volume / 10;
        TYPING_AUDIO.volume = vol;
        START_GAME_AUDIO.volume = vol;
        NEXT_QUESTION_AUDIO.volume = vol;
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
                },
                { once: true }
            );
            BG_CONTAINER.style.filter = "brightness(45%)";
            animationStarted = false;
            setTimeout(() => {
                QUESTION_FIELD.style.display = "block";
                typeCurrentQuestion(250);
            }, 250);
            //every mechanics starts next interface block
        }, 5000);
        clearInterval();
        setTimeout(() => {
            START_GAME_BUTTON.classList.add("correct");
        }, 3500);
        toggleBlinking(INTRO_ELEMENT);
    });

    // global question valiables

    let countQuestions = 1;
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // !! this functions dont work as expected

    function typeCurrentQuestion(delay) {
        const currentQuestion = questionByCurrentLevel();
        const answers = currentQuestion.answers;
        const questionText = currentQuestion.text;
        const number = questionNumber(countQuestions);

        setTimeout(() => {
            nextQuestionAudio();
            typeWriterEffect(QUESTION, number);

            setTimeout(() => {
                deleteTyping(QUESTION, number);
                setTimeout(() => {
                    typeWriterEffect(QUESTION, questionText);
                    showAnswerDivs(answers);
                }, number.length * 150 + 1000);
            }, number.length * 150 + 1000);
        }, delay);
    }

    // function showAnswerDivs(answers) {
    //     const answerDivs = document.querySelectorAll(
    //         "#answer-buttons .answer-div"
    //     );
    //     setTimeout(() => {
    //         answerDivs.forEach((div, index) => {
    //             div.style.display = "block";
    //             div.classList.remove("hide");
    //             typeWriterEffect(div, answers[index]);
    //         });
    //     }, 300);
    // }
});

/*  answers appear and first answer goes with :
| >>> ANSWER_1 |
next one turns the blinked divider
| >>> ANSWER_2 |
....
AND DON'T FORGET THE SOUNDS
*/
