const URL = "https://images.unsplash.com/photo-1551830820-330a71b99659";

async function getFromAPI(url) {
    return new Promise(async (res) => {
        try {
            console.log("Request starting...")
            // Keep in mind, fetch resolves once it has response headers, not when the image is downloaded fully!!
            let response = await fetch(url);
            console.log("Request finished...")

            res("hellO");
        } catch (e) {

        }
    })
}

const a = getFromAPI(URL);
a.then((s) => {
    console.log(s);
})
