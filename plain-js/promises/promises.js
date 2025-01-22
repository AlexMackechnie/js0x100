// Only works in Browser as XMLHttpRequest is a Web API.
//
function makeRequest() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://images.unsplash.com/photo-1551830820-330a71b99659");
    xhr.onload = function () {
      console.log("four", xhr.status);
    };
    // Calls the Web API, which executes the request somewhere else in the browser. This lets it actually run in parallel with your other JavaScript (i.e. the while loop below and the http request will be running in parallel). The while loop is running in the V8 runtime, and the HTTP request is happening elsewhere in the browser (not in the V8 runtime).
    xhr.send(); 
}

console.log("one");

makeRequest();

console.log("two");

let i = 0;
while (i < 1000000000) {
    i++;
}

console.log("three");
