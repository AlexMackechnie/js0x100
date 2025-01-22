import util from "util";

const ride = new Promise((resolve, reject) => {
    console.log("Driver starting trip.");
    setTimeout(() => {
        const arrived = true;
        if (arrived) {
            resolve("🚗 Driver arrived!");
        } else {
            reject("🚧 Driver not coming.");
        }
    }, 1000);
});

const theThenPromise = ride.then((response) => {
    console.log(response);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello");
        }, 1000);
    });
});

theThenPromise.then((response) => {
    console.log(response);
});

// ride.then((response) => {
//     console.log(response);
// }).catch((err) => {
//     console.log(err);
// }).finally(() => {
//     console.log("🎃 Trip marked as complete.");
// });

// ------------------------------------ 
