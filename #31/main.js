//access
const list = document.getElementById("list");
list.addEventListener("click", toggleChecked, false);

const close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = deleteItem;
}

const nodeList = document.getElementsByTagName("li");
for (let i = 0; i < nodeList.length; i++) {
    let span = createCloseButton();
    nodeList[i].appendChild(span);
}

function createCloseButton() {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = deleteItem;
    return span;
}

function deleteItem() {
    let div = this.parentElement;
    div.style.display = "none";
}

function toggleChecked(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
    }
}

function addElement() {
    let inputValue = document.getElementById("new-item").value;

    if (!inputValue) {
        alert("Input field can't be empty!");
        return;
    }

    let li = document.createElement("li");
    let newTask = document.createTextNode(inputValue);
    li.appendChild(newTask);
    list.appendChild(li);

    let span = createCloseButton();
    li.appendChild(span);

    document.getElementById("new-item").value = "";
}
