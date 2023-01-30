const addItems = document.querySelector(".add-items"),
  itemsList = document.querySelector(".plates"),
  items = JSON.parse(localStorage.getItem("items")) || [];

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

  if (items.length < 7) {
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
				<label for="item${i}">${plate.text}</label>
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

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);

populateList(items, itemsList);
