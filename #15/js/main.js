const addItems = document.querySelector(".add-items"),
  clear = document.querySelector(".close-button"),
  itemsList = document.querySelector(".plates");
let items = JSON.parse(localStorage.getItem("items") || []);

if (itemsList) {
  document.getElementById("logo-toggle").classList.add("invert-logo");
  document.getElementById("toggler").classList.add("selected");
}

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };

  if (items.length < 6) {
    items.push(item);
  } else {
    alert("There is too much tapas, don't you think so?");
  }
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map(
      (plate, i) => `
			<li>
				<input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
				<label for="item${i}">${
        plate.text
      }</label><span id='close${i}' class="close">x</span>
			</li>
		`
    )
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target,
    idx = el.dataset.index;
  items[idx].done = !items[idx].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function clearList(l) {
  items = [];
  populateList(items, itemsList);
  l.preventDefault();
}

if (items.length > 1) {
  document.querySelector(".close-button").style.display = "block";
} else {
  document.querySelector(".close-button").style.display = "none";
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
clear.addEventListener("click", clearList);

populateList(items, itemsList);
