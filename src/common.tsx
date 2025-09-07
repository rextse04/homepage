import { useEffect, useRef, useState } from "react";

export function useCollapse(initialValue = false) {
    const [collapsed, setCollapsed] = useState(initialValue);
    const body = useRef(null as HTMLDivElement | null);
    const [bodyHeight, setBodyHeight] = useState(undefined as number | undefined);
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            setBodyHeight(entries[0].target.scrollHeight);
        });
        observer.observe(body.current!);
    }, []);
    return {
        body: body,
        collapsed: collapsed,
        setCollapsed: setCollapsed,
        bodyHeight: bodyHeight,
        setBodyHeight: setBodyHeight,
        bodyProps: {ref: body},
        wrapperProps: {style: {maxHeight: collapsed ? 0 : (bodyHeight + "px")}}
    };
}

type CardProps = {
    id?: string;
    title?: React.ReactNode;
    doc?: React.ReactNode;
    buttons?: Array<React.ReactNode>;
    children?: React.ReactNode;
};
export function Card({ id, title, doc, buttons, children }: CardProps) {
    const {collapsed, setCollapsed, bodyProps, wrapperProps} = useCollapse();
    const [docActive, setDocActive] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const copyBtn = useRef(null as HTMLButtonElement | null);
    useEffect(() => {
        if (!copySuccess) return;
        copyBtn.current?.animate([
            {transform: "scale(0)"},
            {transform: "none", offset: 0.2},
            {offset: 1}
        ], {
            duration: 500,
            easing: "ease-out"
        }).addEventListener("finish", () => setCopySuccess(false));
    }, [copySuccess]);
    return <div id={id} className={["card", collapsed ? "collapsed" : ""].join(" ")}>
        {(title !== undefined) && <div className="title" onDoubleClick={() => setCollapsed(!collapsed)}>
            <span className="text">{title}</span>
            <div className="filler" />
            {(buttons !== undefined) && buttons}
            {(doc !== undefined) && <button title="explanation"
                className={["icon-button", "doc-button", docActive ? "active" : ""].join(" ")}
                onClick={() => setDocActive(!docActive)}
                onDoubleClick={e => e.stopPropagation()}
                onBlur={() => setDocActive(false)}>
                <i className="fa-solid fa-question"></i>
                <div className="card doc">
                    <div className="content-wrapper">
                        <div className="content">{doc}</div>
                    </div>
                </div>
            </button>}
            {(id !== undefined) && <button ref={copyBtn} title="copy link to clipboard" className="icon-button"
                onClick={() => {
                    const url = new URL(window.location.href);
                    url.hash = id;
                    navigator.clipboard.writeText(url.toString()).then(() => setCopySuccess(true));
                }}>
                <i className={["fa-solid", copySuccess ? "fa-circle-check" : "fa-link"].join(" ")}
                    style={{ color: copySuccess ? "green" : undefined }}></i>
            </button>}
            <button title={collapsed ? "expand" : "collapse"}
                className="icon-button collapse-toggle" onClick={() => setCollapsed(!collapsed)}>
                <i className="fa-solid fa-angle-down"></i>
            </button>
        </div>}
        <div className="content-wrapper" {...wrapperProps}>
            <div className="content" {...bodyProps}>{children}</div>
        </div>
    </div>;
}