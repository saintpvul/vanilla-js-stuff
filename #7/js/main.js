const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen in my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// some and every
//array.prototype.some() // is at least one person 19?

const isAdult = people.some(function (person) {
  let currentYear = new Date().getFullYear();
  if (currentYear - person.year > 18) {
    console.table(person);
  }
});

isAdult();
