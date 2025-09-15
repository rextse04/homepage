import { useEffect, useRef, useState } from "react";

export const collapseTime = 300;
export function useCollapse(initialValue = false) {
    const [collapsed, setCollapsed] = useState(+initialValue as number | boolean);
    const wrapper = useRef(null as HTMLDivElement | null);
    const body = useRef(null as HTMLDivElement | null);
    useEffect(() => {
        if (typeof(collapsed) === "number") return;
        const frames = collapsed ? [
            {maxHeight: body.current?.scrollHeight + "px"},
            {maxHeight: 0}
        ] : [
            {maxHeight: 0},
            {maxHeight: body.current?.scrollHeight + "px", offset: 1},
            {maxHeight: "none"}
        ];
        const timing = {
            duration: collapseTime,
            fill: "forwards" as FillMode,
            easing: "ease-in-out"
        };
        wrapper.current?.animate(frames, timing).finished
        .then(animation => {
            animation.commitStyles();
            animation.cancel();
        });
    }, [collapsed]);
    return {
        wrapper: wrapper,
        body: body,
        collapsed: collapsed,
        setCollapsed: setCollapsed,
        toggle: () => setCollapsed(collapsed => !collapsed),
        wrapperProps: {ref: wrapper},
        bodyProps: {ref: body}
    };
}

export function useCollapsableTitle(initialValue = false) {
    const hooks = useCollapse(initialValue);
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const btnsf = (e : React.BaseSyntheticEvent) => e.stopPropagation();
    return {
        ...hooks,
        toggleProps: {
            title: hooks.collapsed ? "expand" : "collapse",
            onClick: hooks.toggle
        },
        buttonsProps: {
            onClick: btnsf,
            onPointerOver: btnsf,
            onPointerOut: btnsf,
            onPointerDown: btnsf,
            onPointerUp: btnsf
        },
        titleProps: {
            className: [
                "title",
                hooks.collapsed ? "collapsed" : "",
                hover ? "hover" : "",
                active ? "active" : ""
            ].join(" "),
            onClick: hooks.toggle,
            onPointerOver: () => setHover(true),
            onPointerOut: () => setHover(false),
            onPointerDown: () => setActive(true),
            onPointerUp: () => setActive(false)
        }
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
    const {toggleProps, buttonsProps, titleProps, bodyProps, wrapperProps} = useCollapsableTitle();
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
    return <div id={id} className="card">
        {(title !== undefined) && <div {...titleProps}>
            <span className="text">{title}</span>
            <div className="filler" />
            <div className="buttons" {...buttonsProps}>
                {(buttons !== undefined) && buttons}
                {(doc !== undefined) && <button title="explanation"
                    className={["icon-button", "doc-button", docActive ? "active" : ""].join(" ")}
                    onClick={() => setDocActive(!docActive)}
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
                <button className="icon-button collapse-toggle" {...toggleProps}>
                    <i className="fa-solid fa-angle-up"></i>
                </button>
            </div>
        </div>}
        <div className="content-wrapper" {...wrapperProps}>
            <div className="content" {...bodyProps}>{children}</div>
        </div>
    </div>;
}