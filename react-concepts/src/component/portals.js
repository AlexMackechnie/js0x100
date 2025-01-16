import { useState } from "react";
import { createPortal } from "react-dom";

export default function PortalComponent() {
    const [cabbages, setCabbages] = useState(10);

    return (
        <div style = {{ border: '2px solid black' }}>
            <h3>This is the Portal Component</h3>
            {
                createPortal(
                    <>
                        <p>This is entirely outside the PortalComponent.</p>
                        <p>In every other way, it behaves the same.</p>
                        <p>You can still access state: {cabbages}</p>
                        <p>It breaks out of styling, which is useful for modals, popups, etc.</p>
                    </>,
                    document.body
                )
            }
        </div>
    );
}
