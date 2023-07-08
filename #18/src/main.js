let countFiles = 0;
let totalDuration = 0;

const liElements = document.querySelectorAll(".videos li");
liElements.forEach((el) => {
    const time = el.getAttribute("data-time");
    el.querySelector("span").textContent = time;
});

liElements.forEach((element) => {
    element.addEventListener("click", () => {
        if (!element.classList.contains("selected")) {
            countFiles++;
            totalDuration += convertTimeToSeconds(element.dataset.time);
        } else {
            countFiles--;
            totalDuration -= convertTimeToSeconds(element.dataset.time);
        }
        element.classList.toggle("selected");
        updateCounterValues();
    });
});

function convertTimeToSeconds(time) {
    const [minutes, seconds] = time.split(":");
    return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
}

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const infoTable = document.getElementById("info-table");
const durationElement = document.querySelector(".duration");
const countElement = document.querySelector(".count");
const sizeElement = document.querySelector(".size");

function updateCounterValues() {
    if (countFiles > 0) {
        infoTable.style.display = "flex";
        durationElement.textContent = `Total duration: ${formatDuration(
            totalDuration
        )}`;
        countElement.textContent = `Files Selected: ${countFiles}`;
        sizeElement.textContent = `Files size: ${calculateSize(
            totalDuration
        )} KB`;
    } else {
        infoTable.style.display = "none";
    }
}

function calculateSize(duration) {
    const fileSizePerSecond = 65; // in kilobits
    const fileSize = duration * fileSizePerSecond;
    return fileSize;
}
// file btn elements logic

function selectAllVideos() {
    liElements.forEach((video) => {
        if (!video.classList.contains("selected")) {
            video.classList.add("selected");
            countFiles++;
            totalDuration += convertTimeToSeconds(video.dataset.time);
        }
    });
    updateCounterValues();
    clickFileHandler();
}

function unselectAllVideos() {
    liElements.forEach((video) => {
        if (video.classList.contains("selected")) {
            video.classList.remove("selected");
            countFiles--;
            totalDuration -= convertTimeToSeconds(video.dataset.time);
        }
    });
    updateCounterValues();
    clickFileHandler();
}

function closeWindow() {
    if (fileBtn.classList.contains("pressed")) {
        clickFileHandler();
    }
    window.location.href = "https://github.com/saintpvul/vanilla-js-stuff";
}

// main page buttons logic

const fileBtn = document.getElementById("file-button");
const aboutBtn = document.getElementById("about-button");

const selectOptions = document.getElementById("select-options");

fileBtn.addEventListener("click", clickFileHandler);

function clickFileHandler() {
    if (fileBtn.classList.contains("pressed")) {
        fileBtn.classList.remove("pressed");
        selectOptions.style.display = "none";
        selectOptions.innerHTML = "";
    } else {
        fileBtn.classList.add("pressed");
        selectOptions.style.display = "flex";
        selectOptions.innerHTML =
            '<p onclick="selectAllVideos()">Select all</p><p onclick="unselectAllVideos()">Unselect all</p><p onclick="closeWindow()">Exit</p>';
        selectOptions.style.left = "5%";
        const childElements = selectOptions.querySelectorAll("p");
        childElements.forEach((element) => {
            const text = element.textContent;
            const firstLetter = text.charAt(0);
            const restOfText = text.slice(1);
            element.innerHTML = `<span style="text-decoration: underline">${firstLetter}</span>${restOfText}`;
        });
    }
}

aboutBtn.addEventListener("click", clickAboutHandler);

function clickAboutHandler() {
    if (aboutBtn.classList.contains("pressed")) {
        aboutBtn.classList.remove("pressed");
        selectOptions.style.display = "none";
        selectOptions.innerHTML = "";
    } else {
        aboutBtn.classList.add("pressed");
        selectOptions.style.display = "flex";
        selectOptions.innerHTML = "<p onclick='showAbout()'>About</p>";
        selectOptions.style.left = "10%";
        const childElements = selectOptions.querySelectorAll("p");
        childElements.forEach((element) => {
            const text = element.textContent;
            const firstLetter = text.charAt(0);
            const underlineChar = text.charAt(1);
            const restOfText = text.slice(2);
            element.innerHTML = `${firstLetter}<span style="text-decoration: underline">${underlineChar}</span>${restOfText}`;
        });
    }
}

document.addEventListener("mouseup", (event) => {
    if (!selectOptions.contains(event.target)) {
        selectOptions.style.display = "none";
        selectOptions.innerHTML = "";
        if (aboutBtn.classList.contains("pressed")) {
            aboutBtn.classList.remove("pressed");
        }
        if (fileBtn.classList.contains("pressed")) {
            fileBtn.classList.remove("pressed");
        }
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "f" || event.key === "a") {
        if (event.key === "f") {
            if (fileBtn.classList.contains("pressed")) {
                hideSelectOptions();
            } else {
                aboutBtn.classList.remove("pressed");
                clickFileHandler();
            }
        } else if (event.key === "a") {
            if (aboutBtn.classList.contains("pressed")) {
                hideSelectOptions();
            } else {
                fileBtn.classList.remove("pressed");
                clickAboutHandler();
            }
        }
    } else if (fileBtn.classList.contains("pressed")) {
        if (event.key === "s") {
            selectAllVideos();
        } else if (event.key === "u") {
            unselectAllVideos();
        } else if (event.key === "e") {
            closeWindow();
        }
        fileBtn.classList.remove("pressed");
        selectOptions.style.display = "none";
        selectOptions.innerHTML = "";
    } else if (aboutBtn.classList.contains("pressed")) {
        if (event.key === "b") {
            showAbout();
        }
        aboutBtn.classList.contains("pressed");
        selectOptions.style.display = "none";
        selectOptions.innerHTML = "";
    }
});

function hideSelectOptions() {
    aboutBtn.classList.remove("pressed");
    fileBtn.classList.remove("pressed");
    selectOptions.style.display = "none";
    selectOptions.innerHTML = "";
}

function showAbout() {
    if (aboutBlock.style.display === "block") {
        alert("About is already opened!");
    }
    aboutBlock.style.display = "block";
    clickAboutHandler();
}

// grab the about block

const aboutBlock = document.getElementById("about");
const grabHandle = document.getElementById("about-head-grab");

let isDragging = false;
let dragOffset = { x: 0, y: 0 };

grabHandle.addEventListener("mousedown", (event) => {
    isDragging = true;
    let divRect = grabHandle.getBoundingClientRect();

    dragOffset.x = event.clientX - divRect.left;
    dragOffset.y = event.clientY - divRect.top;
    grabHandle.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (event) => {
    if (isDragging) {
        var newX = event.clientX - dragOffset.x;
        var newY = event.clientY - dragOffset.y;

        aboutBlock.style.left = newX + "px";
        aboutBlock.style.top = newY + "px";
    }
});

document.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        grabHandle.style.cursor = "grab";
    }
});

function closeAbout() {
    aboutBlock.style.display = "none";
}

// in the file section, when one or more videos are clicked, the properties in the info line at the bottom of the page should be updated.  the select all button can be used to select all elements, and the unselect button can be used to remove the selection from all previously selected items.
