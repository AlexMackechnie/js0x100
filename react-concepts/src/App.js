import { useEffect, useState, useMemo } from "react";
import UseRefComponent from './component/useRefExample';
import UseReducerExampleComponent from './component/useReducerExample';

export default function App() {
    return (
        <>
            <ConditionalShower name={"Event Handling"} defaultState={false} >
                <EventHandling />
            </ConditionalShower>

            <ConditionalShower name={"Inner Components"} defaultState={false} >
                <WrapperComponent>
                    <InnerComponent>
                        test
                    </InnerComponent>
                </WrapperComponent>
            </ConditionalShower>

            <ConditionalShower name={"Lifecycles"} defaultState={false} >
                <ComponentLifecycle />
            </ConditionalShower>

            <ConditionalShower 
                name={"Passing State Down"} 
                description={"This shows how re-renders work when the state changes in a parent or a child component. TL;DR: Any time the state in a parent changes, that component is re-rendered (which basically just means it is called). Because it returns other components, they are also called (i.e. re-rendered). The state in those components that doesn't change isn't affected because React grabs it from its state store. But for example, a variable that sets `let i = 0` would be reset at this point."}
                defaultState={false} >
                <ParentComponent />
            </ConditionalShower>

            <ConditionalShower
                name="useMemo"
                description=""
                defaultState={false}>
                <MemoExampleComponent />
            </ConditionalShower>

            <ConditionalShower
                name="useRef"
                description=""
                defaultState={false}>
                <UseRefComponent />
            </ConditionalShower>

            <ConditionalShower
                name="useReducer"
                description=""
                defaultState={true}>
                <UseReducerExampleComponent />
            </ConditionalShower>
        </>
    );
}

function EventHandling() {
    const [inputState, setInputState] = useState("");
    const [clicks, setClicks] = useState(0);
    let clicksNoState = 0;

    const handleChange = (value) => {
        console.log(value);
        setInputState(value);
    }

    const onClickUsingStateHandler = () => {
        setClicks(clicks + 1);
        console.log(clicks);
    };

    const onClickNotUsingStateHandler = () => {
        clicksNoState++;
        console.log(clicksNoState);
    };

    return (
        <>
            <input value={inputState} onChange={(e) => handleChange(e.target.value)}>
            </input>
            <div>
                <button onClick={onClickUsingStateHandler}>
                    This uses useState
                </button>
                <p>{clicks}</p>
            </div>
            <div>
                <button onClick={onClickNotUsingStateHandler}>
                    This just updates a variable (but doesn't cause a re-render)
                </button>
                <p>{clicksNoState}</p>
            </div>
        </>
    );
}

function WrapperComponent({ children }) {
    return (
        <>
            <h3>This is wrapper component that turns the inner text blue, and includes it below.</h3>
            <div style={{"color": "blue"}}>
                {children}
            </div>
        </>
    );
}

function InnerComponent({ children }) {
    return <p>{children}</p>
}

function ConditionalShower({ children, name, description, defaultState }) {
    const [show, setShow] = useState(defaultState);

    return (
        <div>
            <hr />
            <button onClick={() => {setShow(!show)}}>Toggle {name}</button>
            <p>{description}</p>
            { show && (
                children
            )}
            <hr />
        </div>
    );
}

function ComponentLifecycle() { 
    const [header, setHeader] = useState('h');

    useEffect(() => {
        console.log("Component mounted");

        return () => {
            console.log("Component unmounted.");
        };
    }, []);

    useEffect(() => {
        console.log("Component updated");
    });

    useEffect(() => {
        console.log(`State: header updated to ${header}`);
    }, [header]);

    return (
        <>
            <h3>{header}</h3>
            <input value={header} onChange={(e) => {setHeader(e.target.value)}} />
        </>
    );
}

function ParentComponent() {
    const [dataToPass, setDataToPass] = useState("🚀");
    const [localData, setLocalData] = useState("🏚️");

    console.log("ParentComponent re-rendering...");

    useEffect(() => {
        return () => {
            console.log("ParentComponent unmount...");
        };
    });

    return (
        <div>
            <h2>Parent Component</h2>
            <h4>Parent State (passed down)</h4>
            <p>Update parent state (passed down): <input value={dataToPass} onChange={(e) => setDataToPass(e.target.value)} /></p>
            <p>{dataToPass}</p>

            <h4>Parent State (not passed down)</h4>
            <p>Update parent state (not passed down): <input value={localData} onChange={(e) => setLocalData(e.target.value)} /></p>
            <p>{localData}</p>
            <ChildComponent data={dataToPass} /> 
        </div>
    );
}

function ChildComponent({ data }) {
    const [unrelatedState, setUnrelatedState] = useState("🎃");

    console.log("ChildComponent re-rendering...");

    return (
        <div>
            <h2>Child Component</h2>

            <h4>Child State</h4>
            <p>Update child state: <input value={unrelatedState} onChange={(e) => setUnrelatedState(e.target.value)} /></p>
            <p>{unrelatedState}</p>

            <h4>State from Parent</h4>
            <p>{data}</p>
        </div>
    );
}

function MemoExampleComponent() {
    return (
        <div>
            <ShoppingCartItem name="Charger" pricePerItem={9.99}/>
        </div>
    );
}

function ShoppingCartItem({ name, pricePerItem }) {
    const [quantity, setQuantity] = useState(50);
    const [giftWrap, setGiftWrap] = useState(false);

    console.log("🚧 -----------------------------------");
    console.log("- Rendering attempt: ShoppingCartItem");
    useEffect(() => {
        console.log("- Rendering complete: ShoppingCartItem");
        console.log("✅ -----------------------------------");
    });

    // This is a bad way to recompute the total cost.
    // If we toggle the gift wrap setting, the total cost is recomputed even though nothing changes.
    // For the Price <p>, the Virtual DOM will stay the same and therefore so will the Real DOM.
    // However, the recomputation of the cost is extra JS we don't need when we're just toggling the gift wrap option.
    // console.log("Recomputing total cost.");
    // const totalCost = pricePerItem * quantity;

    // Here's the same thing using useMemo!
    // It says "if quantity changes, run this code again and update totalCost;
    // if not, then just use the same value as before (stored in React's data store).
    // It does not trigger re-renders.
    const totalCost = useMemo(
        () => {
            console.log("Recomputing total cost.");
            return pricePerItem * quantity;
        },
        [quantity]
    );

    return (
        <div>
            <h3>{name}</h3>
            <p>Price: {pricePerItem}</p>
            <p>
                Quantity: {quantity}
                <button onClick={() => {setQuantity(quantity - 1)}}>-</button>
                <button onClick={() => {setQuantity(quantity + 1)}}>+</button>
            </p>
            <p>
                Gift Wrap: {giftWrap ? "yes" : "no"}
                <button onClick={() => {setGiftWrap(!giftWrap)}}>Toggle</button>
            </p>
            <p>Total Cost: {totalCost}</p>
        </div>
    );
}

