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

  items.push(item);
  populateList(items, itemsList);
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `<li><label for="">${plate.text}</label></li>`;
  });
}

addItems.addEventListener("submit", addItem);

// !!! TODO
// need to find dot when add new item
// limit items list with 5 items
