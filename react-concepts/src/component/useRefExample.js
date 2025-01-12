import { useRef } from "react";

// You wouldn't use useState for this as **we don't need to re-render just to focus an <input>.**
// You would typically use this for DOM things you want to change but that do not need a re-render to show.
// Focusing is just an internal state change in the browser; not a HTML change. It doesn't need a re-render.
export default function UseRefComponent() {

    const internalRef = useRef(null);

    const focus = () => {
        internalRef.current?.focus();
    };

    return (
        <div>
            <h3>useRef Example</h3>
            <input ref={internalRef} autoFocus={false} />
            <button onClick={focus}>Focus</button>
        </div>
    );
}
