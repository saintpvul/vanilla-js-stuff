"use strict";

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
  }
  return true;
});
console.log(isAdult);

//array.prototype.every() // is everyone 19?

const allAdults = people.every(
  (person) => new Date().getFullYear() - person.year > 18
);
console.log(allAdults);
//array.prototype.find()
//find is like filter, but instead returns just the one you are looking for
// find the comment with id of 82343

const findComment = comments.find((comment) => comment.id === 823423);

console.log(findComment);
