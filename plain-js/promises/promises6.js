// Implementation of fetch using the XMLHttpRequest Web API.
// Run in browser.

const URL = "https://images.unsplash.com/photo-1551830820-330a71b99659";

function myFetch(url) {
    console.log("one")
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.onload = (response) => {
            console.log("four")
            resolve(xhr.status);
        }

        console.log("two")
        xhr.send();
    })
}

myFetch(URL).then((s) => {
    console.log("five")
})
console.log("three")


