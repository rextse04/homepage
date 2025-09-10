import { createContext, useContext, useState, useEffect } from "react";
import { Home } from "./Home";
import { Downloads } from "./Downloads";
import "./common.css";
import "./App.css";

const pages = {
    Home: Home,
    Downloads: Downloads
};
type PageName = keyof typeof pages;
const PageContext = createContext(null as any);
const ThemeContext = createContext(null as any); // true: light, false: dark

function Header() {
    const [page, setPage] = useContext(PageContext);
    const [theme, setTheme] = useContext(ThemeContext);
    return <header className="app-header">
        <div className="links">
            {Object.keys(pages).map(name => (
                <button key={name} className={page === name ? "active" : ""}
                    onClick={() => setPage(name)}>{name}</button>
            ))}
        </div>
        <div className="filler" />
        <div className="buttons">
            <button title="switch theme" className={["icon-button", "circular", "theme-toggle"].join(" ")}
                onClick={() => setTheme(!theme)}>
                <i className="fa-solid fa-lightbulb"></i>
            </button>
        </div>
    </header>;
}

export function App() {
    const [page, setPage] = useState<PageName>("Home");
    const [theme, setTheme] = useState(true);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: light)");
        setTheme(mq.matches);
        mq.addEventListener("change", (e) => setTheme(e.matches));
    }, []);
    const Page = pages[page];
    return <PageContext.Provider value={[page, setPage]}>
    <ThemeContext.Provider value={[theme, setTheme]}>
    <div className="app" data-theme={theme ? "light" : "dark"}>
        <Header />
        <div className="app-body">
            <Page />
        </div>
    </div>
    </ThemeContext.Provider>
    </PageContext.Provider>;
}
