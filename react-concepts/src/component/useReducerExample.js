import { useReducer } from "react";

// This should be a pure function as well.
// The same inputs should always provide the same output.
function reducer(state, action) {
    if (action.type === "increment_count1") {
        return {
            ...state,
            count1: state.count1 + 1
        };
    } else if (action.type === "increment_count2") {
        return {
            ...state,
            count2: state.count2 + 1
        };
    }
}

export default function UseReducerExampleComponent() {
    const [state, dispatch] = useReducer(reducer, {
        count1: 42,
        count2: 142
    });

    return (
        <div>
            <h4>Count 1 {state.count1}</h4>
            <button 
                onClick={() => dispatch({ type: "increment_count1" })}>
                Increment Age
            </button>
            <h4>Count 2 {state.count2}</h4>
            <button 
                onClick={() => dispatch({ type: "increment_count2" })}>
                Increment Age
            </button>
        </div>
    );
}
