// https://www.youtube.com/watch?v=napDjGFjHR0

// Helpers
function getAllPropertyNames(o) {
    console.log("---- OBJECT ----");
    console.log(o);
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            console.log("OWN PROPERTY: ", i, o[i]);
        } else {
            console.log("PROTO PROPERTY: ", i, o[i]);
        }
    }
    console.log("---- DONE ----");
}

// Objects are just equivalent of dictionaries.
const object = {}
console.log(typeof(object));

// Object is mutable when using `const`; re-assigning is not.
object["rabbit"] = "🐇";
console.log(object);

// Another way to create an object
const obj = new Object();
obj.rabbit = "🐰";
console.log(obj);

// This is another way, but most useful for when you have an existing object and you want another object to inherit from it.
const organism = {
    dna: Math.random(),
}
const o = Object.create(organism);
console.log(o);
console.log(o.dna);
console.log(Object.getPrototypeOf(o));
Object.defineProperty(o, "unicorn", {
    value: "🦄",
    enumerable: true
});
console.log(o);
console.log(o.__proto__);

// Creating object with properties the same as defined.
const spider = "🕷️";
const legs = 8;
const obj1 = {
    spider: spider,
    legs: legs
}
const obj2 = {
    spider,
    legs
}
console.log(obj2);

// Destructure, the opposite
const { spider: s, legs: l } = obj2;
console.log(s);
console.log(l);

let web = "";
// Object with method
const objWithMethod = {
    spider,
    legs,
    web: '',
    makeWeb: function() {
        this.web += "🕸️🕸️🕸️"; // Refers to local `this` context.
        return this;
    },
}
objWithMethod.makeWeb();
console.log(objWithMethod);

objWithMethod.makeWeb().makeWeb().makeWeb();
console.log(objWithMethod);

// Object References
let a = "🎃"; // a is a primitive, stored on the stack
let b = a;
console.log(a, b);
a = "👻";
console.log(a, b);

let c = { boo: "🎃" } // c is an object, referenced on the heap
let d = c;
console.log(c, d);
c.boo = "👻";
console.log(c, d);

let e = { boo: "🎃" }
Object.setPrototypeOf(e, { woo: "🏚️" });
let f = Object.assign({}, e); // Only copies non-proto properties.
console.log(Object.getOwnPropertyNames(e));
getAllPropertyNames(e);
console.log(Object.getOwnPropertyNames(f));
getAllPropertyNames(f);

console.log("------------ SPREAD SYNTAX ------------");
let g = { boo: "🎃" }
Object.setPrototypeOf(g, { woo: "🏚️" });
let h = { ...g }
console.log(Object.getOwnPropertyNames(g));
getAllPropertyNames(g);
console.log(Object.getOwnPropertyNames(h));
getAllPropertyNames(h);

console.log("------------ LOOPING OVER OBJECT ------------");

const dino = {
    comet: "☄️",
    trex: "🦖",
}
// note: each loop iteration has its own block scope, which is why `const` works
for (const [k, v] of Object.entries(dino)) {
    console.log(k, v);
}

console.log("------------ CONSTRUCTORS ------------");

// This is super similar to a class in other languages.
function Zombie(name) {
    this.name = name;
    this.reanimated = Date.now();

    this.eatBrain = function() {
        return `${this.name} is hungry for 🧠`;
    }
}

const zombie = new Zombie("Zevo");
console.log(zombie);
console.log(zombie.eatBrain());


// Could be defined as a `class` like so:
class ZombieClass {
  constructor(name) {
    this.name = name;
    this.reanimated = Date.now();
  }

  eatBrain() {
    return `${this.name} is hungry for 🧠`;
  }
}
const zombie2 = new ZombieClass("Zori");
console.log(zombie2);
console.log(zombie2.eatBrain());



