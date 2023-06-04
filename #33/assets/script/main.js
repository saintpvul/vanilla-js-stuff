// document.addEventListener("DOMContentLoaded", function () {
//     const textContainer = document.querySelector(".dynamic-text");
//     const typingIndicator = textContainer.querySelector("span::after");
//     const text = "Developer";
//     let index = 0;

//     function typeLetter() {
//         if (index < text.length) {
//             const letter = document.createElement("span");
//             letter.textContent = text[index];
//             textContainer.insertBefore(letter, typingIndicator);
//             index++;
//         } else {
//             clearInterval(typingInterval);
//         }
//     }

//     const typingInterval = setInterval(typeLetter, 150);
// });
