// -- 3 types in TS
let isDone = false;
let meaningOfLife = 42;
let myName = "Alex";
// -- If you omit, the type is inferred
let done = false;
// done = 42; // Type 'number' is not assignable to type 'boolean'.
// -- Ther is an `any` type
let notSure = 4;
notSure = "maybe a string instead";
notSure = false;
// -- For collections, there are typed arrays:
let list1 = [1, 2, 3];
// -- Alternatively, use the generic array type:
let list2 = [1, 2, 3];
// -- For enums
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let c = Color.Green;
console.log(Color[c]);
// -- `void` is used when a function returns nothing
function returnsNothing() {
    console.log("Logging");
}
returnsNothing();
// -- Functions
let f1 = function (i) {
    return i * i;
};
let f2 = function (i) {
    return i * i;
};
let f3 = (i) => {
    return i * i;
};
let f4 = (i) => {
    return i * i;
};
let f5 = (i) => i * i;
let f6 = (i) => {
    console.log("The type passed was:", typeof (i));
};
f6("s");
f6(1);
let p1 = {
    name: "Alex",
    move: function (i) {
        return `${this.name} moved ${i} places in ${i} seconds.`;
    }
};
console.log(p1.move(10));
let p2 = {
    name: "Rand",
    age: 25,
    move: function (i) {
        return `${this.name} moved ${i} places in ${i / 2} seconds.`;
    }
};
console.log(p2.move(10));
let mySearch = function (src, sub) {
    return src.search(sub) != -1;
};
console.log(mySearch("stringthisstring", "this"));
// -- Classes. Members are public by default.
class Point {
    constructor(x, y = 0) {
        this.y = y;
        this.x = x;
    }
    dist() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
Point.staticProperty = 1;
let point1 = new Point(10);
console.log(`x: ${point1.x}`);
console.log(`y: ${point1.y}`);
console.log(`dist: ${point1.dist()}`);
console.log(`staticProperty: ${Point.staticProperty}`);
class Triangle {
    constructor(height, base) {
        this.height = height;
        this.base = base;
    }
    area() {
        return (1 / 2) * this.height * this.base;
    }
}
class Square {
    constructor(side) {
        this.side = side;
    }
    area() {
        return this.side * this.side;
    }
}
// -- Classes can extend other classes.
// To be used where behaviour or properties must be shared.
console.log("\n🛳️🚢⛴️ ----- BATTLESHIPS -----🛳️🚢⛴️ ");
class Battleship {
    constructor(locX, locY, length, height) {
        this.locX = locX;
        this.locY = locY;
        this.length = length;
        this.height = height;
    }
    move(moveX, moveY) {
        this.locX += moveX;
        this.locY += moveY;
    }
    getGridSpaces() {
        return this.length * this.height;
    }
}
class LongShip extends Battleship {
    constructor(locX, locY) {
        super(locX, locY, 5, 1);
    }
}
class Speedboat extends Battleship {
    constructor(locX, locY) {
        super(locX, locY, 1, 1);
    }
    boost(newLocX, newLocY) {
        this.locX = newLocX;
        this.locY = newLocY;
    }
}
let longShip = new LongShip(1, 3);
let speedboat = new Speedboat(5, 5);
console.log(longShip.getGridSpaces());
console.log(speedboat.getGridSpaces());
