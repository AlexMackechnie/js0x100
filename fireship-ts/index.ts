import * as _ from 'lodash';

console.log("hello");

async function hello() {
    return "world";
}

let lucky: number = 23;

// Types

type Style = 'bold' | 'italic';

let font: Style;
font = "bold";

// Interfaces

interface Person {
    first: string,
    last: string,
}

const person: Person = {
    first: "Alex",
    last: "Mackechnie",
}

function pow(x: number, y: number): string {
    return Math.pow(x, y).toString();
}

console.log(pow(5, 2));

// Arrays

const arr: number[] = []

arr.push(1);
arr.push(2);

type MyList = [string, number?, boolean?]
const arr2: MyList = ["hello"]
console.log(arr2);

// Generics

class Observable<T> {
    constructor(public value: T) {}
}

let x: Observable<number>;

