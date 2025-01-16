import { Suspense, use, useEffect } from "react";

const externalFunctionThatTakesAWhile = new Promise((resolve) => {
    setTimeout(() => {
        resolve(10);
    }, 1000);
})

export default function SuspenseComponent() {
    return (
        <div>
            <h3>Suspense</h3>
            <Suspense fallback={<Loading />}>
                <ComponentThatTakesTime />
            </Suspense>
        </div>
    )
}

function ComponentThatTakesTime() {
    const albums = use(externalFunctionThatTakesAWhile);
    return (
        <div>
            {albums}
        </div>
    );
}

function Loading() {
    return (
        <div>
            Loading...
        </div>
    );
}
