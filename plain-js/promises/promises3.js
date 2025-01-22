const promise = new Promise((resolve) => {
    console.log("one");
    resolve("three");
});

promise.then((s) => {
    console.log(s);
    return "four";
}).then((t) => {
    console.log(t);
    return "five";
}).then((u) => {
    console.log(u);
})

console.log("two");
