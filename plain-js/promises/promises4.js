
const URL = "https://images.unsplash.com/photo-1551830820-330a71b99659";

const promise = fetch(URL);

promise.then((s) => {
    console.log(s);
});

console.log(promise);
