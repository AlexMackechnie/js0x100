import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export default function UseContextComponent() {
    const [theme, setTheme] = useState("dark");

    return (
        <div>
            <h1>UseContextComponent</h1>
            <p>The theme is {theme}</p>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Theme Switcher</button>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <InnerOne />
            </ThemeContext.Provider>
        </div>
    );
}

function InnerOne() {
    return (
        <div>
            <h2>Inner One</h2>
            <InnerTwo />
        </div>
    )
}

function InnerTwo() {
    return (
        <div>
            <h3>Inner Two</h3>
            <InnerThree />
        </div>
    )
}

function InnerThree() {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <div>
            <h4>Inner Three</h4>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Or set it from here</button>
            <p>{theme}</p>
        </div>
    )
}
