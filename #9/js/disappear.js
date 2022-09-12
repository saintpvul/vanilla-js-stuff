"use strict";

//

function disappear() {
  let head = document.getElementById("disappear");
  head.parentNode.removeChild(head);
}

setInterval(disappear, 4000);
