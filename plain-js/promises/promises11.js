const p = new Promise((res, rej) => {
    res(1);
})

// These three functions are equivalent.
// Each return a Promise that resolves to an object that contains the above promise.
// If we had the promise returned directly...
// Maybe write a blog post on this...

function returnPromiseAsync() {
    return new Promise((res) => {
        res({promise: p}); // we need this un-thenable container (object) as promises passed to resolve() are auto-unwrapped
    });
}

async function returnPromiseAsync() {
    return new Promise((res) => {
        res({promise: p}); // we need this un-thenable container (object) as promises passed to resolve() are auto-unwrapped
    });
}

async function returnPromiseAsync() {
    return {promise: p};
}

let functionPromise = returnPromiseAsync();
let innerPromise;
functionPromise.then((res) => {
    innerPromise = res.promise; // we need this as promises unwrap
    console.log(innerPromise === p); // true
})

