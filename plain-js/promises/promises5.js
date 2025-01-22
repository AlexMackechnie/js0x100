// Implementation of fetch using setTimeout to simulate the HTTP request.

function myFetch() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("HTTP request finished");
        }, 1000);
    });
}

const promise = myFetch();
promise.then((s) => {
    console.log(s);
});
