

async function examplePromise() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("Timeout finished.");
        }, 2000);
    });
}

async function testingAsyncAwait() {
    console.log("Starting function.");

    const result = await examplePromise();

    console.log("Finished");
}

testingAsyncAwait();
