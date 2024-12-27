// Single Line Comment

/* Multi-line
 * comment
 * in JS */

// ----------------------------------------- //
// 1. Numbers, Strings and Operators
// ----------------------------------------- //

// In Programming Language Theory, untyped just means dynamically typed and typed just means statically typed. JavaScript is definitely untyped in this category.
// https://stackoverflow.com/a/9159863
// There is only 1 number type, which is a double.
var _ = 42;
console.log(_);
console.log(typeof(_));

// Basic maths
var a = 1 + 1;
console.log(a);
var b = 0.1 + 0.1;
console.log(b);

// Uneven division
var c = 5/2;
console.log(c);

// Modulo division
var d = 10 % 2;
console.log(d);
var e = 10 % 4;
console.log(e);

// Bitwise operations
// 0001 shifted left 2 positions is 0100
// Because all number values are doubles in JS, they have to be converted back and forward to integers to do bitwise operations.
var f = 1 << 2;
console.log(f);

// Precedence is enforced with paranthesis.
var h = 1 + 3 * 2;
console.log(h);
var g = (1 + 3) * 2;
console.log(g);

// There are 3 special not-a-real-number values.
var h = Infinity;
console.log(typeof(h));
console.log(h);
var i = -Infinity;
console.log(typeof(i));
console.log(i);
var j = NaN;
console.log(typeof(j));
console.log(j);

// Boolean types
var k = true;
console.log(typeof(k));
console.log(k);
var l = false;
console.log(typeof(l));
console.log(l);

// Strings can be created using ' or ".
var m = "hello";
console.log(typeof(m));
console.log(m);

// Negation uses the !
console.log(!false);

// Equality is ===
console.log(3 === 3);
console.log(3 === 1);

// Inequality is !==
console.log(3 !== 3);
console.log(3 !== 1);

// More comparisons
console.log(1 < 10);
console.log(1 > 10);
console.log(2 <= 2);
console.log(2 >= 2);

// String concat
console.log("hello" + "world");

// Which works with more than strings
console.log("1, 2, " + 3);
console.log("Hello" + ["world", "!"]);

// Which has some weird edge cases
console.log(13 + !0);
console.log("13" + !0);
console.log(13 + true);
console.log(13 + false);

// Strings are compared with < and >
console.log("a" < "b");

// Type coercion is done using ==
console.log("5" === 5);
console.log("5" == 5);
console.log(null == undefined);

// String type has some functions and properties.
console.log("This is a string".charAt(0));
console.log("This is a string".substring(0, 5));
console.log("This is a string".length);

// null and undefined
var n = null; // Used to indicate a deliberate non-value, type object.
var o = undefined; // Used to indicate a value is not currently present, type undefined.

// Falsy values: false, null, undefined, NaN, 0 and "".
// Note that 0 is falsy and "0" is truthy, even though 0 == "0".

// ----------------------------------------- //
// 2. Variables, Arrays and Objects
// ----------------------------------------- //

// You need the var keyword. JS is dynamically typed, so type is decided at runtime.
var someVar = 5;
var v1 = 2, v2 = 3;

// Variables declared without being defined are undefined.
var someSecondVar;
console.log(someSecondVar);

// There's shorthand for performing math on variables.
someVar += 5;
console.log(someVar);
someVar *= 10;
console.log(someVar);
someVar++;
console.log(someVar);
someVar--;
console.log(someVar);

// Arrays are ordered lists of values, of any type.
var myArray = ["Hello", 45, true];
console.log(myArray[1]);
myArray.push("World");
console.log(myArray.length);
myArray[2] = false;
console.log(myArray);
myArray.unshift(1);
console.log(myArray);
var firstItem = myArray.shift();
console.log(firstItem);
console.log(myArray);
myArray.push(3);
console.log(myArray);
var lastItem = myArray.pop();
console.log(lastItem);
console.log(myArray);

var anotherArray = [32, false, "js", 12, 56, 90];
console.log(anotherArray.join(":"));
console.log(anotherArray.slice(1, 4));
console.log(anotherArray.splice(1, 1, 1, 2, 3));
console.log(anotherArray);

var myObj = {key1: "Hello", key2: "World"};
console.log(myObj["key2"]);
console.log(myObj.key2);
myObj.key3 = false;
console.log(myObj);
console.log(myObj.vndfkjvndskj);

// ----------------------------------------- //
// 3. Logic and Control Structures
// ----------------------------------------- //

// Simple if statement
var count = 2;
if (count === 3) {
    console.log("is three");
} else if (count === 4) {
    console.log("is four");
} else {
    console.log("isn't three or four");
}

// While loop
var wl = 0;
while (wl < 10) {
    console.log(wl);
    wl++;
}

// Do while loops are like while, but they always run once.
var dw = 0;
do {
    console.log("Do while is running.");
} while (dw > 0);

// For is the same as Java
for (var idx = 0; idx < 5; idx++) {
    console.log(idx);
}

// Breaking out of labelled loops.
outer: // This labels the outer loop, so `break outer` breaks outer loop.
for (var ll = 0; ll < 5; ll++) {
    for (var ii = 0; ii < 5; ii++) {
        console.log(ll + " " + ii);
        if (ll === 2 && ii === 2) {
            break outer;
        }
    }
}

// The for/in statement allows iteration over properties of an object.
var description = "";
var person = {fname: "Alex", lname: "Mackechnie", age: 28};
for (var x in person) {
    console.log(person[x]);
    description += person[x] + " ";
}
console.log(description);

// The for/of statement allows iteration over iterable objects (including the built-in String,
// Array).
var myPets = "";
var pets = ["cat", "dog", "hamster", "hedgehog"];
for (var pet of pets) {
    myPets += pet + " ";
}
console.log(myPets);

// && is logical AND, || is logical OR
console.log(true && true);
console.log(false || true);

// && and || both short-circuit, which is used for default values
var otherName;
var aName = otherName || "default";
console.log(aName);

// Switch statements (check equality using ===)
var grade = "A";
switch (grade) {
    case "A":
        console.log("Top marks");
        break;
    case "B":
        console.log("Not bad");
        break;
    case "C":
        console.log("Rubbish");
        break;
    default:
        console.log("Really rubbish");
        break;
}

// ----------------------------------------- //
// 4. Functions, Scope and Closures
// ----------------------------------------- //

// Functions declared using the `function` keyword.
function myFunction(thing) {
    console.log(thing.toUpperCase());
}
myFunction("foo");
typeof(myFunction);

// setTimeout(myFunction, 1000, "heiya"); // Waits 1000 milliseconds before running.
// setInterval(myFunction, 10, "heiyaaaa"); // Repeats every 10 milliseconds.

// setTimeout(function() {
//     console.log("hello from a function");
// }, 1000); // Waits 1000 milliseconds before running.

function myFunction2() {
    var internalScopedVar = 5;
    console.log(internalScopedVar);
}
// console.log(internalScopedVar); // ReferenceError: internalScopedVar is not defined
myFunction2();

// Immediately-executing anonymous functions, preventing variables from leaking to global scope.
(function() {
    var temporary = 5;
    console.log(temporary);
})();
// console.log(temporary); // ReferenceError: temporary is not defined

// This inner function has access to the outer function's scope even after the outer function exits.
// function sayHelloInTwoSeconds(name) {
//     var prompt = "Hello, " + name + "!";
//
//     function inner() {
//         console.log(prompt);
//     }
//     setTimeout(inner, 2000);
//     console.log("sayHelloInTwoSeconds exiting");
// }
// sayHelloInTwoSeconds("Alex");

// ----------------------------------------- //
// 5. More about Objects: Constructors and Prototypes
// ----------------------------------------- //

// Objects can contain functions.
var myObj2 = {
    key1: "Hello",
    key2: "World",
    myFunc: function() {
        console.log(this.key1 + ", " + this.key2 + "!");
    }
}
myObj2.myFunc();

// This shows assigning the same function to `f` in another object, and how `this` works.
var myObj3 = {
    key1: "One",
    key2: "Two",
}
myObj3.f = myObj2.myFunc;
myObj3.f();

// We can specify a context for a function to execute in when we invoke it using `call` or `apply`.
var myObj4 = {
    myString: "Four",
}
var anotherFunc = function(s) {
    console.log(this.myString + s);
}
anotherFunc.call(myObj4, " and Hello Again!");
anotherFunc.apply(myObj4, [" and Hello Again!"]);

// You can use this to hack Math to accept an array
console.log(Math.min(42, 6, 27));
console.log(Math.min([42, 6, 27]));
console.log(Math.min.apply(Math, [42, 6, 27]));

// `call` and `apply` are only temporary. We can use `bind` for permanence.
var boundFunc = anotherFunc.bind(myObj4);
boundFunc(" hiya");

// `bind` can also be used to partially apply a function
var product = function(a, b) {console.log(a * b)};
var doubler = product.bind({}, 2);
doubler(8);

// When you call a function with the `new` keyword, a new object is created and made available to the function via the `this` keyword. Functions designed to be called like this are called constructors.

var MyConstructor = function() {
    this.myNumber = 5;
    this.mySecondNumber = 10;
}
var myNewObj = new MyConstructor();
console.log(myNewObj);

// Unlike most other OO languages, JS has no concept of instances created from class blueprints. Instead, JS combines instantiation and inheritance into a single concept: a prototype.
// Every JS object has a prototype. When you go to access a property on an object that doesn't exist on the actual object, the interpreter will look at its prototype.
// JavaScript's objects are equivalent to "dictionaries" or "maps" in other
// languages: an unordered collection of key-value pairs.

var myObj = {
    myString: "Hello, world!"
}
var myPrototype = {
    meaningOfLife: 42,
    myFunc: function() {
        return this.myString.toLowerCase();
    }
}
console.log(myObj.__proto__);
myObj.__proto__ = myPrototype;
console.log(myObj.__proto__);
console.log(myObj.meaningOfLife);
console.log(myObj.myFunc());

myPrototype.meaningOfLife = 43;
console.log(myObj.meaningOfLife);

console.log("Prototype chain");
for (var x in myObj) {
    if (myObj.hasOwnProperty(x)) {
        console.log("ℹ️ This is on the object itself");
    } else {
        console.log("ℹ️ This isn't");
    }
    console.log(myObj[x]);
}

// Prototype

function Person(first, last, age) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
}
Person.prototype.nationality = "English";
var person = new Person("Alex", "Mackechnie", 28);
console.log(person);
console.log(person.nationality);
for (var x in person) {
    if (person.hasOwnProperty(x)) {
        console.log("ℹ️ This is on the object itself");
    } else {
        console.log("ℹ️ This isn't");
    }
    console.log(person[x]);
}

function logProto(o) {
    console.log("----------- OBJECT -----------", + o);
    for (var x in o) {
        if (o.hasOwnProperty(x)) {
            console.log("ℹ️ This is on the object itself");
        } else {
            console.log("ℹ️ This isn't");
        }
        console.log(o[x]);
    }
}

var myObjWithProto = Object.create(myPrototype);
logProto(myObjWithProto);

// Constructors have a prototype property, but this *is not* the prototype of the constructor function itself; instead, it's the prototype that new objects are given when they're created with that constructor and the `new` keyword.
MyConstructor.prototype = {
    num: 6,
    getMyNumber: function() {
        return this.num;
    }
}
var myNewObj2 = new MyConstructor();
logProto(myNewObj2);
console.log(myNewObj2.getMyNumber());
myNewObj2.num = 7;
console.log(myNewObj2.getMyNumber());

// Built in types have constructors that create equivalent wrapper objects.
var myNumber = 12;
var myNumberObj = new Number(12);
console.log(myNumber == myNumberObj);
console.log(myNumber === myNumberObj);
console.log(typeof(myNumber));
console.log(typeof(myNumberObj));

// Wrapper objects and regular builtins share a prototype, so you can add functionality to a string.
String.prototype.firstCharacter = function() {
    return this.charAt(0);
}
console.log("abc".firstCharacter());

// ----------------------------------------- //
// 6. ES6 Additions
// ----------------------------------------- //

let name = "Billy";
name = "William";

const pi = 3.14;
// pi = 4.13; // Will not work

console.log(isEven(5));
function isEven(number) {
    return number % 2 === 0;
}

const isEven2 = (number) => {
    return number % 2 === 0;
}
console.log(isEven2(5));
