// // fetch calls the Web API, starts the network request, and immediately returns a Promise to JS
// fetch("https://images.unsplash.com/photo-1551830820-330a71b99659")
//     // .then modifies this Promise
//     .then((response) => {
//         console.log(response);
//     });
//
// console.log("done");

const promise = new Promise((resolve) => {
    console.log("one");
    resolve("promiseResolved");
});

console.log("two");
const thenPromise = promise.then((s) => {
    console.log("five");
    console.log(`Result from the promise is ${s}`);
    return "thenPromiseResolved";
});

console.log("three");
thenPromise.then((result) => {
    console.log("six");
    console.log(`Result from the thenPromise is ${result}`);
});

console.log("four");
