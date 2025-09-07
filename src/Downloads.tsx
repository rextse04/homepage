import { Card } from "./common";
import "./common.css";

type DownloadProps = {
    title: React.ReactNode;
    href: string;
    children?: React.ReactNode;
};
function Download({ title, href, children } : DownloadProps) {
    return <Card title={title} buttons={[<a key="download" title="download" className="icon-button" href={href}>
        <i className="fa-solid fa-download"></i>
    </a>]}>
        {children}
    </Card>;
}

export function Downloads() {
    return <>
        <Download title="MATH2131 Notes" href={new URL("./res/Preparation.pdf", import.meta.url).toString()}>
            This is the set of notes I wrote as preparation for <a href="https://www.math.hkust.edu.hk/~ivanip/">Prof Ivan Ip</a>'s MATH2131 in Fall 2023.
            This was the first "serious and challenging" math course I took in HKUST,
            and this was the first piece of formal mathematic text I wrote in my life.
        </Download>
    </>;
}