const addItems = document.querySelector(".add-items"),
  itemsList = document.querySelector(".plates"),
  items = [];

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

addItems.addEventListener("submit", addItem);
