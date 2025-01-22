const URL = "https://images.unsplash.com/photo-1551830820-330a71b99659"

function myVersionOfFetch(url) {
    return new Promise((resolve, reject) => {
        req = new XMLHttpRequest();
        req.open("GET", url);

        req.onload = function() {
            console.log("XHR handler from the task queue.");
            resolve(req.status);
        }

        // Sends to Web APIs with onload function.
        req.send();
    })
}

const a = myVersionOfFetch(URL)
    .then((res) => {
        console.log(res);
        return "hi"
    }).then((s) => {
        console.log(s);
    });
