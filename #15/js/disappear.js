"use strict";

//

function disappear() {
  let head = document.getElementById("disappear");
  head.parentNode.removeChild(head);
}

setTimeout(disappear, 4000);
