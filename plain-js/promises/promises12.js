// async keyword is only needed if you need to:
// 1. use await
// or
// 2. wrap the response in a promise

function asyncResponse() {
    return fetch("https://images.unsplash.com/photo-1551830820-330a71b99659");
}

async function run() {
    console.log("here");
    let result = await asyncResponse();
    console.log(result);
}

let a = run();
console.log(a)

