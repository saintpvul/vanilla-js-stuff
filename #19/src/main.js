const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const colorInput = document.querySelector("#color-input");
const resetBtn = document.getElementById("reset-all");

let selectedColor = null;
let isRedFilterApplied = false;
let isGhostFilterApplied = false;

function getVideo() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((localMediaStream) => {
            console.log(localMediaStream);

            video.srcObject = localMediaStream;
            video.play();
        })
        .catch((err) => {
            console.error(`OH NO!!!`, err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);

        if (isRedFilterApplied) {
            pixels = redEffect(pixels);
            selectedColor = null;
        }

        if (isGhostFilterApplied) {
            pixels = rgbSplit(pixels);
            selectedColor = null;
        }

        if (selectedColor !== null) {
            pixels = greenScreen(pixels);
        }

        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 100; // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i]; // red
        pixels.data[i + 500] = pixels.data[i + 1]; // green
        pixels.data[i - 550] = pixels.data[i + 2]; // blue
    }
    return pixels;
}

function greenScreen(pixels) {
    const { data } = pixels;

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        const colorDifference =
            Math.abs(red - selectedColor[0]) +
            Math.abs(green - selectedColor[1]) +
            Math.abs(blue - selectedColor[2]);

        if (colorDifference < 100) {
            data[i + 3] = 0; // Set alpha channel to 0 (transparent)
        }
    }

    return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);

colorInput.addEventListener("change", (e) => {
    const hexColor = e.target.value;
    const rgbColor = hexToRgb(hexColor);
    selectedColor = [rgbColor.r, rgbColor.g, rgbColor.b];
});

function hexToRgb(hex) {
    // remove the "#" symbol if present
    hex = hex.replace("#", "");

    // convert the hex color to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}
// buttons

function takePhoto() {
    strip.style.display = "block";
    snap.currentTime = 0;
    snap.play();

    // get photo from canv

    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "handsome");
    link.innerHTML = `<img src="${data}" alt='photo'/>`;
    strip.appendChild(link, strip.lastChild);
    resetBtn.style.display = "inline-block";
}

function applyRedFilter() {
    ctx.globalAlpha = 1;
    isRedFilterApplied = true;
    isGhostFilterApplied = false;
    colorInput.style.display = "none";
    resetBtn.style.display = "inline-block";
}

function applyGhostFilter() {
    ctx.globalAlpha = 0.01;
    isRedFilterApplied = false;
    isGhostFilterApplied = true;
    colorInput.style.display = "none";
    resetBtn.style.display = "inline-block";
}

function applyGreenScreen() {
    ctx.globalAlpha = 1;
    isRedFilterApplied = false;
    isGhostFilterApplied = false;
    colorInput.style.display = "inline-block";
    resetBtn.style.display = "inline-block";
}

function resetAll() {
    const elementsToRemove = Array.from(strip.children).filter(
        (element) => element.tagName !== "H1"
    );

    ctx.globalAlpha = 1;
    selectedColor = null;
    isRedFilterApplied = false;
    isGhostFilterApplied = false;
    resetBtn.style.display = "none";
    colorInput.style.display = "none";
    strip.style.display = "none";

    elementsToRemove.forEach((element) => {
        element.remove();
    });
}
