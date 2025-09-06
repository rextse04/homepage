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
    buttons?: Array<React.ReactNode>;
    children?: React.ReactNode;
};
export function Card({ id, title, buttons, children }: CardProps) {
    const {collapsed, setCollapsed, bodyProps, wrapperProps} = useCollapse();
    return <div id={id} className={["card", collapsed ? "collapsed" : ""].join(" ")}>
        {(title !== undefined) && <div className="title" onDoubleClick={() => setCollapsed(!collapsed)}>
            <span className="text">{title}</span>
            <div className="filler" />
            {(id !== undefined) && <button title="copy link to clipboard" className="icon-button" onClick={() => {
                const url = new URL(window.location.href);
                url.hash = id === undefined ? "" : id;
                navigator.clipboard.writeText(url.toString());
            }}>
                <i className="fa-solid fa-link"></i>
            </button>}
            {(buttons !== undefined) && buttons}
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