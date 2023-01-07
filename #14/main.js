// string nums and bools

let age = 100,
  age2 = age;
console.log(age, age2);
age = 200;
console.log(age, age2);

let name1 = "Paul",
  name2 = name1;
console.log(name1, name2);
name1 = "Pavel";
console.log(name1, name2);

// if we have an array

const players = ["Paul", "Sultan", "Aika", "Rus"];

// and we want to make a cope of it

const team = players;
console.log(players, team);

// you might think we can just do something like this for keep initial value in third element of players array as it is and change third element of team array

team[3] = "Aziz";

console.log(players);
console.log(team);
/* 
however what happens whe we update an array?

now here is the promlem

we have edited the original array too 

why? it's because that is an array reference, not an array copy. The both point to the same array!

For fix this we should take a copy instead!

*/
//we can use slice
const team2 = players.slice(),
  // or we can use concat with empty array
  team3 = [].concat(players),
  // or we can use spread operator
  team4 = [...players],
  team5 = Array.from(players);

console.log(players);
console.log(" initial players ^^^");
team2[1] = "Nika";
console.log(team2);
console.log("team2 ^^^");
console.log(team3);
console.log("team3 ^^^");

team3[0] = "Ethan";
console.log(players);
console.log("players ^^^");
console.log(team3);
console.log("team3 ^^^");

/*
when we update it, the original array isn't changed

the same thing fgoes with objects, let's say we have a person obj
*/

const person = {
  name: "Paul",
  age: 32,
};

// and make copy as we think

const cap = person;
cap.num = 99;

// how do we take a copy instead?

const cap2 = Object.assign({}, person, { num: 99, age: 55 });
console.log(cap2);

// we will hopefully soon see the object spread with ...

const cap3 = { ...person };

// things to note this is only 1 level deep -- both for arrays and objects. lodash has a cloneDeep method, but you should think twise before using it.

const paul = {
  name: "Paul",
  age: 27,
  social: {
    twitter: "@saintpvul",
    facebook: "saintpvul",
  },
};

console.log(paul);

//we can make copy by this ways

const dev1 = Object.assign({}, paul),
  dev2 = JSON.parse(JSON.stringify(paul));

console.log(dev1);
console.log(dev1.social.twitter);
console.log(JSON.stringify(paul));
// after using JSON stringify method it is not object anymore

// but if we use JSON.parse it can make copy of out person object

console.log(dev2);
