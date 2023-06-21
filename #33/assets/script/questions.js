const level1Questions = [
    {
        text: "What does HTML stand for?",
        answers: [
            ["Hyperlinks and Text Markup Language", false],
            ["Hyper Text Markup Language", true],
            ["Hyper Text Markup Layout", false],
            ["Home Tool Markup Language", false],
        ],
        checked: false,
    },
    {
        text: "What does 'www' in 'www.(someref).com' stand for?",
        answers: [
            ["World Wild Web", false],
            ["Who Wants Wings (chicken probably)", false],
            ["Willy Wonka Wonderland", false],
            ["World Wide Web", true],
        ],
        checked: false,
    },
    {
        text: "Choose the correct HTML element for the largest heading:",
        answers: [
            ["<h1>", true],
            ["<headind>", false],
            ["<h6>", false],
            ["<head>", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML element for inserting a line break?",
        answers: [
            ["<break/>", false],
            ["<lb>", false],
            ["<br>", true],
            ["<\\n>", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML for adding a background color?",
        answers: [
            ["<body bg='yellow'>", false],
            ["body style='background-color:yellow'", true],
            ["body.style.backgroundColor = 'yellow", false],
            ["background: yellow", false],
        ],
        checked: false,
    },
    {
        text: "Choose the correct HTML element to define important text",
        answers: [
            ["<important>", false],
            ["<b>", false],
            ["<strong>", true],
            ["<i>", false],
        ],
        checked: false,
    },
    {
        text: "Choose the correct HTML element to define emphasized text",
        answers: [
            ["<em>", true],
            ["<i>", false],
            ["<strong>", false],
            ["<italic>", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML for creating a hyperlink?",
        answers: [
            ["<a>http://www.(someref).com</a>", false],
            ["<a url='http://www.(someref).com'>Some WebSite</a>", false],
            ["<a href='http://www.(someref).com'>Some WebSite</a>", true],
            [
                "<a><link href='http://www.(someref).com'>Some WebSite</a>",
                false,
            ],
        ],
        checked: false,
    },
    {
        text: "Which character is used to indicate an end tag?",
        answers: [
            [">", false],
            ["*", false],
            ["<", false],
            ["/", true],
        ],
        checked: false,
    },
    {
        text: "What does CSS stand for?",
        answers: [
            ["Colorful Style Sheets", false],
            ["Creative Style Sheets", false],
            ["Computer Style Sheets", false],
            ["Cascading Style Sheets", true],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML for referring to an external style sheet?",
        answers: [
            ["<style src='styles.css'>", false],
            ["<link rel='stylesheet' type='text/css' href='styles.css'>", true],
            ["<style css='styles.css'>", false],
            ["<stylesheet>style.css</stylesheet>", false],
        ],
        checked: false,
    },
    {
        text: "Where in an HTML document is the correct place to refer to an external style sheet?",
        answers: [
            ["At the end of the document", false],
            ["In the <body> section", false],
            ["Right after <!DOCTYPE>", false],
            ["In the <head> section", true],
        ],
        checked: false,
    },
    {
        text: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            ["<script>", false],
            ["<link>", false],
            ["<style>", true],
            ["<css>", false],
        ],
        checked: false,
    },
    {
        text: "Which HTML attribute is used to define inline styles?",
        answers: [
            ["font", false],
            ["styles", false],
            ["class", false],
            ["style", true],
        ],
        checked: false,
    },
    {
        text: "Which is the correct CSS syntax?",
        answers: [
            ["{body:color=black;}", false],
            ["body{color:black;}", true],
            ["<body=color:black>", false],
            ["body={color:black};", false],
        ],
        checked: false,
    },
    {
        text: "Inside which HTML element do we put the JavaScript?",
        answers: [
            ["<scripting>", false],
            ["<javascript>", false],
            ["<js>", false],
            ["<script>", true],
        ],
        checked: false,
    },
    {
        text: "What does JS stand for?",
        answers: [
            ["JavaScience", false],
            ["JavaStrict", false],
            ["JavaScript", true],
            ["JangoStreet", false],
        ],
        checked: false,
    },
    {
        text: "Where is the correct place to insert a JavaScript?",
        answers: [
            ["The <head> section", false],
            ["The <body> section", false],
            ["At the end of the document", false],
            ["Both <head> and <body> are correct", true],
        ],
        checked: false,
    },
    {
        text: "What is the correct syntax for referring to an external script called 'script.js'?",
        answers: [
            ["<script href='script.js'>", false],
            ["<script name='script.js'>", false],
            ["<script src='script.js'>", true],
            ["<script link='script.js'>", false],
        ],
        checked: false,
    },
    {
        text: "How do you write 'Hello World' in an alert box?",
        answers: [
            ["echo('Hello World');", false],
            ["print('Hello World');", false],
            ["alert('Hello World');", true],
            ["msg('Hello World');", false],
        ],
        checked: false,
    },
    {
        text: "How do you create a function in JavaScript?",
        answers: [
            ["function = myFunction()", false],
            ["function myFunction()", true],
            ["function: myFunction()", false],
            ["function(myFunction):", false],
        ],
        checked: false,
    },
];

const level2Questions = [
    {
        text: "How can you open a link in a new tab/browser window?",
        answers: [
            ["<a href='(someref)' new>", false],
            ["<a href='(someref)' target='_blank'>", true],
            ["<a href='(someref) link='_blank''>", false],
            ["<a href='(someref) target='new'>", false],
        ],
        checked: false,
    },
    {
        text: "Which of these elements are all <table> elements?",
        answers: [
            ["<table><tr><td>", true],
            ["<thd><tbd><trd>", false],
            ["<table><table-head><table-foot>", false],
            ["<table><tr><tt>", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML for making a checkbox?",
        answers: [
            ["<check>", false],
            ["<input type='check'>", false],
            ["<checkbox>", false],
            ["<input type='checkbox'>", true],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML for making a text input field?",
        answers: [
            ["<input type='text'>", true],
            ["<textinput type='field'>", false],
            ["<textfield>", true],
            ["<input type='textfield'>", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML for making a drop-down list?",
        answers: [
            ["<input type='dropdown'>", false],
            ["<list>", false],
            ["<select>", true],
            ["<input type='list'>", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML for making a text area?",
        answers: [
            ["<textarea>", true],
            ["<input type='textarea'>", false],
            ["<text>", false],
            ["<input type='textbox'>", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML for inserting an image?",
        answers: [
            ["<img src='image.jpg' href='Image'>", false],
            ["<img src='image.jpg' alt='Image'>", true],
            ["<img alt='image.jpg' href='image'>", false],
            ["<img href='image.jpg' alt='Image'>", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML for inserting a background image?",
        answers: [
            ["body style='background-image:url(background.jpg)'", true],
            ["body bg='background.jpg'", false],
            ["<background img='background.jpg'>", false],
            ["<background url='(backgroung.jpg)'></background>", false],
        ],
        checked: false,
    },
    {
        text: "Which doctype is correct for HTML5?",
        answers: [
            ["<!DOCTYPE HTML PUBLIC '-//HTML5.0//EN'>", false],
            ["<!DOCTYPE HYPER TEXT5>", false],
            ["<!DOCTYPE html>", true],
            ["<!DOCTYPE HTML5>", false],
        ],
        checked: false,
    },
    {
        text: "How do you insert a comment in a CSS file?",
        answers: [
            ["/* this is a comment */", true],
            ["<!-- this is a comment -->", false],
            ["// this is a comment //", false],
            ["// this is a comment", false],
        ],
        checked: false,
    },
    {
        text: "Which property is used to change the background color?",
        answers: [
            ["color", false],
            ["bg-color", false],
            ["background-color", true],
            ["background", false],
        ],
        checked: false,
    },
    {
        text: "How do you add a background color for ALL <h1> elements?",
        answers: [
            ["h1 {background-color:#FFFFFF;}", true],
            ["all.h1 {background-color:#FFFFFF;}", false],
            ["body.h1 {background-color:#FFFFFF;}", false],
            ["h1.parent {background-color:#FFFFFF}", false],
        ],
        checked: false,
    },
    {
        text: "Which CSS property is used to change the text color of an element?",
        answers: [
            ["text-color", false],
            ["font-color", false],
            ["font-style", false],
            ["color", true],
        ],
        checked: false,
    },
    {
        text: "Which CSS property controls the text size?",
        answers: [
            ["text-style", false],
            ["font-size", true],
            ["text-size", false],
            ["font-style", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct CSS syntax for making all the <p> elements bold?",
        answers: [
            ["<p style='text-soze:bold'", false],
            ["p {text-size:bold;}", false],
            ["<p style='font-size:bold;'>", false],
            ["p {font-weight:bold;}", true],
        ],
        checked: false,
    },
    {
        text: "How do you display hyperlinks without an underline?",
        answers: [
            ["a {text-decorantion:no-underline;}", false],
            ["a {decoration:no-underline;}", false],
            ["a {underline:none}", false],
            ["a {text-decoration:none;}", true],
        ],
        checked: false,
    },
    {
        text: "How do you make each word in a text start with a capital letter?",
        answers: [
            ["transform:capitalize", false],
            ["text-transform:capitalize", true],
            ["text-style:capitalize", false],
            ["You can't do that with CSS", false],
        ],
        checked: false,
    },
    //
    {
        text: "How do you call a function named 'myFunction'?",
        answers: [
            ["call myFunction()", false],
            ["return myFunction()", false],
            ["call function: myFunction()", false],
            ["myFunction()", true],
        ],
        checked: false,
    },
    {
        text: "How to write an IF statement in JavaScript?",
        answers: [
            ["if i == 5 then", false],
            ["if(i = 5)", false],
            ["if(i == 5)", true],
            ["if i = 5 then", false],
        ],
        checked: false,
    },
    {
        text: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answers: [
            ["if(i != 5)", true],
            ["if i <> 5", false],
            ["if i != 5 then", false],
            ["if (i <> 5)", false],
        ],
        checked: false,
    },
    {
        text: "How does a WHILE loop start?",
        answers: [
            ["while(i <= 10)", true],
            ["while(i <= 10; i++)", false],
            ["while i < 1 to 10", false],
            ["while(i = 10)", false],
        ],
        checked: false,
    },
    {
        text: "How does a FOR loop start?",
        answers: [
            ["for(i <= 5; i++)", false],
            ["for(i = 0; i <= 5)", false],
            ["for(i = 0; i <= 5; i++)", true],
            ["for(i = 0; i = 5; i + 1)", false],
        ],
        checked: false,
    },
    {
        text: "Find correct answer: const a = 5, b = '10'; console.log(a + b);",
        answers: [
            ["15", false],
            ["NaN", false],
            ["510", true],
            ["SyntaxError", false],
        ],
        checked: false,
    },
];

const level3Questions = [
    {
        text: "Which HTML element is used to specify a footer for a document or section?",
        answers: [
            ["<foot>", false],
            ["<div class='footer'>", false],
            ["<footer>", true],
            ["<bottom>", false],
        ],
        checked: false,
    },
    {
        text: "What is the correct HTML element for playing video files?",
        answers: [
            ["<movie>", false],
            ["<video>", true],
            ["<media>", false],
            ["<content>", false],
        ],
        checked: false,
    },
    {
        text: "Which attribute specify whether the content of an element should be editable or not?",
        answers: [
            ["placeholder", false],
            ["contenteditable", true],
            ["formvalidate", false],
            ["required", false],
        ],
        checked: false,
    },
    {
        text: "In HTML, onblur and onfocus are:",
        answers: [
            ["Event attributes", true],
            ["HTML elements", false],
            ["Style attrubutes", false],
            ["Tag properties", false],
        ],
        checked: false,
    },
    {
        text: "Graphics defined by SVG is in which format?",
        answers: [
            ["JSON", false],
            ["HTML", false],
            ["CSS", false],
            ["XML", true],
        ],
        checked: false,
    },
    {
        text: "The HTML <canvas> element is used to:",
        answers: [
            ["display database records", false],
            ["create draggable elements", false],
            ["manipulate data in MySQL", false],
            ["draw graphics", true],
        ],
        checked: false,
    },
    {
        text: "In HTML, which attribute is used to specify that an input field must be filled out?",
        answers: [
            ["placeholder", false],
            ["required", true],
            ["validate", false],
            ["formvalidate", false],
        ],
        checked: false,
    },
    {
        text: "Which input type defines a slider control?",
        answers: [
            ["controls", false],
            ["search", false],
            ["slider", false],
            ["range", true],
        ],
        checked: false,
    },

    {
        text: "Which property is used to change the font of an element?",
        answers: [
            ["font-weight", false],
            ["font-style", false],
            ["font", false],
            ["font-family", true],
        ],
        checked: false,
    },
    {
        text: "How do you make the text bold?",
        answers: [
            ["font-size:bold;", false],
            ["font-style:bold;", false],
            ["font-weight:bold;", true],
            ["font-type:bold", false],
        ],
        checked: false,
    },
    {
        text: "How do you display next borders in pixels: left = 20, right = 1, top = 10, bottom = 5?",
        answers: [
            ["border-width: 20px 1px 10px 5px;", false],
            ["border-width: 5px 10px 1px 20px;", false],
            ["border-width: 1px 20px 10px 5px;", false],
            ["border-width: 10px 1px 5px 20px;", true],
        ],
        checked: false,
    },
    {
        text: "Which property is used to change the left margin of an element?",
        answers: [
            ["indent-left", false],
            ["padding-left", false],
            ["border-left", false],
            ["margin-left", true],
        ],
        checked: false,
    },
    {
        text: "How do you make a list that lists its items with squares?",
        answers: [
            ["list-style-type:square", true],
            ["list-type-style:square", false],
            ["list-type-decoration:square", false],
            ["list-decoration:square", false],
        ],
        checked: false,
    },
    {
        text: "Property returns a location object with information about current location of the document:",
        answers: [
            ["window.navigation", true],
            ["window.window", false],
            ["window.location", true],
            ["window.document", false],
        ],
        checked: false,
    },
    {
        text: "How can you detect the client's browser name?",
        answers: [
            ["client.navName", false],
            ["navigator.userAgent", true],
            ["browser.name", false],
            ["location.browser", false],
        ],
        checked: false,
    },
    {
        text: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            ["onchange", false],
            ["onmouseover", false],
            ["onclick", true],
            ["onmouseclick", false],
        ],
        checked: false,
    },
    {
        text: " In a switch....case....default construct where do we put the expression we are going to evaluate?",
        answers: [
            ["case", false],
            ["switch", true],
            ["else", false],
            ["default", false],
        ],
        checked: false,
    },
    {
        text: "Which construct do we use with errors?",
        answers: [
            ["do...while", false],
            ["if...else", false],
            ["switch...case...default", false],
            ["try...catch...finally", true],
        ],
        checked: false,
    },
    {
        text: "How many global error constructors are there in JavaScript?",
        answers: [
            ["3", false],
            ["6", false],
            ["4", false],
            ["7", true],
        ],
        checked: false,
    },
    {
        text: "Which statement do we use to invoke an error?",
        answers: [
            ["call", false],
            ["abend", false],
            ["throw", true],
            ["dump", false],
        ],
        checked: false,
    },
];

const level4Questions = [
    {
        text: "Which HTML element is used to display a scalar measurement within a range?",
        answers: [
            ["<measure>", false],
            ["<range>", false],
            ["<meter>", true],
            ["<gauge>", false],
        ],
        checked: false,
    },
    {
        text: "Which HTML element defines navigation links?",
        answers: [
            ["<navlink>", false],
            ["<nav>", true],
            ["<navigation>", false],
            ["<navigate>", false],
        ],
        checked: false,
    },
    {
        text: "Which attribute specify whether the content of an element should be editable or not?",
        answers: [
            ["placeholder", false],
            ["contenteditable", true],
            ["formvalidate", false],
            ["required", false],
        ],
        checked: false,
    },
    {
        text: "The ... element is used to identify content that is related to the primary contend, but not constitute the primary content",
        answers: [
            ["<nav>", false],
            ["<section>", false],
            ["<aside>", true],
            ["<field>", false],
        ],
        checked: false,
    },
    {
        text: "Which HTML element is used to specify a header for a document or section?",
        answers: [
            ["<nav>", false],
            ["<html>", false],
            ["<body>", false],
            ["<header>", true],
        ],
        checked: false,
    },
    {
        text: "The HTML <canvas> element is used to:",
        answers: [
            ["display database records", false],
            ["create draggable elements", false],
            ["manipulate data in MySQL", false],
            ["draw graphics", true],
        ],
        checked: false,
    },
    {
        text: "In HTML, which attribute is used to specify that an input field must be filled out?",
        answers: [
            ["placeholder", false],
            ["required", true],
            ["validate", false],
            ["formvalidate", false],
        ],
        checked: false,
    },
    {
        text: "Which input type defines a slider control?",
        answers: [
            ["controls", false],
            ["search", false],
            ["slider", false],
            ["range", true],
        ],
        checked: false,
    },
    {
        text: "How do you select all p elements inside a div element?",
        answers: [
            ["div.p", false],
            ["div p", true],
            ["div + p", false],
            ["div #p", false],
        ],
        checked: false,
    },
    {
        text: "How do you group selectors?",
        answers: [
            ["(selector) , (selector)", true],
            ["(selector) > (selector)", false],
            ["(selector) + (selector)", false],
            ["(selector) (selector)", false],
        ],
        checked: false,
    },
    {
        text: "What is the default value of the position property?",
        answers: [
            ["absolute", false],
            ["static", true],
            ["relative", false],
            ["fixed", false],
        ],
        checked: false,
    },
    {
        text: "Which input type defines a slider control?",
        answers: [
            ["controls", false],
            ["search", false],
            ["slider", false],
            ["range", true],
        ],
        checked: false,
    },
    //
    {
        text: "When creating a Number object, what do passed values that can't be converted return?",
        answers: [
            ["isNaN", false],
            ["null", false],
            ["NaN", true],
            ["undefined", false],
        ],
        checked: false,
    },
    {
        text: "How do we access properties of the Math object?",
        answers: [
            ["The Math obj is static and has no props", false],
            ["Math.aPropertyName", true],
            ["aPropertyName.Math", false],
            ["aMath.aPropertyName", false],
        ],
        checked: false,
    },
    {
        text: "What are the Math object properties examples of?",
        answers: [
            ["JavaScript calls", false],
            ["JavaScript constants", true],
            ["JavaScript data", false],
            ["JavaScript procedures", false],
        ],
        checked: false,
    },
    {
        text: "What keyword can we use when creating objects to match a parameter to a property?",
        answers: [
            ["apply", false],
            ["call", false],
            ["new", false],
            ["this", true],
        ],
        checked: false,
    },
    {
        text: "What keyword is used in conjunction with this for object prototyping?",
        answers: [
            ["apply", false],
            ["call", false],
            ["new", true],
            ["save", false],
        ],
        checked: false,
    },
    {
        text: "How do you group selectors?",
        answers: [
            ["(selector) , (selector)", true],
            ["(selector) > (selector)", false],
            ["(selector) + (selector)", false],
            ["(selector) (selector)", false],
        ],
        checked: false,
    },
    {
        text: "What is the default value of the position property?",
        answers: [
            ["absolute", false],
            ["static", true],
            ["relative", false],
            ["fixed", false],
        ],
        checked: false,
    },
    {
        text: "Which input type defines a slider control?",
        answers: [
            ["controls", false],
            ["search", false],
            ["slider", false],
            ["range", true],
        ],
        checked: false,
    },
];

export { level1Questions, level2Questions, level3Questions, level4Questions };
