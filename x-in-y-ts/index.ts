// -- 3 types in TS
let isDone: boolean = false;
let meaningOfLife: number = 42;
let myName: string = "Alex";

// -- If you omit, the type is inferred
let done = false;
// done = 42; // Type 'number' is not assignable to type 'boolean'.

// -- Ther is an `any` type
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

// -- For collections, there are typed arrays:
let list1: number[] = [1, 2, 3];

// -- Alternatively, use the generic array type:
let list2: Array<number> = [1, 2, 3];

// -- For enums
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
console.log(Color[c]);

// -- `void` is used when a function returns nothing
function returnsNothing(): void {
    console.log("Logging");
}
returnsNothing();

// -- Functions
let f1 = function (i: number): number {
    return i * i;
}
let f2 = function (i: number) {
    return i * i;
}
let f3 = (i: number): number => {
    return i * i;
}
let f4 = (i: number) => {
    return i * i;
}
let f5 = (i: number) => i * i;
let f6 = (i: string | number): void => {
    console.log("The type passed was:", typeof(i));
}
f6("s");
f6(1);

// -- Interfaces
interface Person {
    name: string;
    age?: number;
    move(i: number): string;
}
let p1: Person = {
    name: "Alex",
    move: function(i: number): string {
        return `${this.name} moved ${i} places in ${i} seconds.`
    }
}
console.log(p1.move(10));

let p2: Person = {
    name: "Rand",
    age: 25,
    move: function(i: number): string {
        return `${this.name} moved ${i} places in ${i / 2} seconds.`
    }
}
console.log(p2.move(10));

// let p3: Person = {
//     name: "Mat",
//     age: true // Type 'boolean' is not assignable to type 'number'.
// }

// -- Interfaces can define `function` types.
interface SearchFunction {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunction = function(src: string, sub: string) {
    return src.search(sub) != -1;
}
console.log(mySearch("stringthisstring", "this"));

// -- Classes. Members are public by default.
class Point {
    x: number;
    constructor(x: number, public y: number = 0) {
        this.x = x;
    }

    dist(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    static staticProperty: number = 1;
}
let point1: Point = new Point(10);
console.log(`x: ${point1.x}`);
console.log(`y: ${point1.y}`);
console.log(`dist: ${point1.dist()}`);
console.log(`staticProperty: ${Point.staticProperty}`);

// -- Classes can be marked as explicitly implementing an interface.
// To be used where there isn't shared behaviour or properties, but we must define a contract that all implementing classes must adhere to.
interface Shape {
    area(): number;
}

class Triangle implements Shape {
    height: number;
    base: number;
    constructor(height: number, base: number) {
        this.height = height;
        this.base = base;
    }
    area(): number {
        return (1/2) * this.height * this.base;
    }
}

class Square implements Shape {
    side: number;
    constructor(side: number) {
        this.side = side;
    }
    area(): number {
        return this.side * this.side;
    }
}

// -- Classes can extend other classes.
// To be used where behaviour or properties must be shared.

console.log("\n🛳️🚢⛴️ ----- BATTLESHIPS -----🛳️🚢⛴️ ");

abstract class Battleship {
    locX: number;
    locY: number;
    length: number;
    height: number;
    constructor(locX: number, locY: number, length: number, height: number) {
        this.locX = locX;
        this.locY = locY;
        this.length = length;
        this.height = height;
    }
    move(moveX: number, moveY: number): void {
        this.locX += moveX; 
        this.locY += moveY; 
    }
    getGridSpaces(): number {
        return this.length * this.height;
    }
}

class LongShip extends Battleship {
    constructor(locX: number, locY: number) {
        super(locX, locY, 5, 1);
    }
}

class Speedboat extends Battleship {
    constructor(locX: number, locY: number) {
        super(locX, locY, 1, 1);
    }

    boost(newLocX: number, newLocY: number): void {
        this.locX = newLocX; 
        this.locY = newLocY; 
    }
}

let longShip: LongShip = new LongShip(1, 3);
let speedboat: Speedboat = new Speedboat(5, 5);

console.log(longShip.getGridSpaces());
console.log(speedboat.getGridSpaces());
