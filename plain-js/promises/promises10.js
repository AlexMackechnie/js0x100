const p = new Promise((res, rej) => {
    res(1);
})

// // Not the same promise.
// async function asyncReturn() {
//     return p;
// }
//
// // The same promise.
// function basicReturn() {
//     return Promise.resolve(p);
// }
//
// function returnPromise() {
//     return new Promise((res) => {
//         res(p);
//     });
// }


function returnPromiseAsync() {
    return new Promise((res) => {
        res(p);
    });
}

// console.log(p === asyncReturn()); // We return the promise directly here, so async doesn't wrap it.
// console.log(p === basicReturn()); // This returns a promise that resolves with the value of the promise.
// console.log(p === returnPromise());

let a = returnPromiseAsync();
a.then((res) => {
    console.log(res);
})
