let r = document.querySelector(":root");

let randomBackground =
  "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

let randomBorder =
  "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

r.style.setProperty("--background", randomBackground);

r.style.setProperty("--border-color", randomBorder);
