import { memo, useCallback, useState } from "react";

export default function UseCallbackComponent() {
    const [count, setCount] = useState(0);

    console.log("Attempting re-render of UseCallbackComponent");

    const updateCount = (x) => {
        setCount(x);
    }

    const updateCountUsingUseCallback = useCallback(updateCount, []);

    return (
        <div>
            <h4>UseCallbackComponent</h4>
            {count}

            {/*Using this would not re-render the child component on update as the setCount function doesn't change.*/}
            {/*<MemoizedInnerComponentOne setCount={updateCount} />*/}

            {/*Using this re-render the child component on update as the updateCount changes on every render of UseCallbackComponent.*/}
            {/*<MemoizedInnerComponentOne setCount={updateCount} />*/}

            {/*This memoizes the function, so only the parent re-renders.*/}
            {/*<MemoizedInnerComponentOne setCount={updateCountUsingUseCallback} />*/}
            <MemoizedInnerComponentOne setCount={updateCountUsingUseCallback} />
        </div>
    );

}

function InnerComponentOne({ setCount }) {
    console.log("Attempting re-render of InnerComponentOne");

    return (
        <div>
            <h4>InnerComponentOne</h4>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>Update Count</button>
        </div>
    );

}

const MemoizedInnerComponentOne = memo(InnerComponentOne)
