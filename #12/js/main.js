const pressed = [];
const secretecode = "saintpvul";

window.addEventListener("keyup", (e) => {
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secretecode.length - 1, pressed.length - secretecode.length);

  if (pressed.join("").includes(secretecode)) {
    console.log("BOOM");
    cornify_add();
  }

  console.log(pressed);
});
