import { Card, useCollapse } from "./common";
import "./common.css";
import "./Home.css";

function Introduction() {
    return <Card id="introduction">
        <div className="profile">
            <div className="card pic">
                <img src={new URL("./res/profile_pic.jpg", import.meta.url).toString()}
                    alt="a profile picture of me"></img>
            </div>
            <div className="socials">
                <a title="email" className="icon-button circular" href="mailto:rextse.work@gmail.com">
                    <i className="fa-solid fa-envelope"></i>
                </a>
                <a title="GitHub" className="icon-button circular" href="https://github.com/rextse04/">
                    <i className="fa-brands fa-github"></i>
                </a>
                <a title="LinkedIn" className="icon-button circular" href="https://www.linkedin.com/in/yik-long-tse-b2459124a/">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
            </div>
        </div>
        <div className="text">
            <header title="with Tse as my last name and Yik Long as my first name">
                Hi! I am <strong>Tse Yik Long (Rex)</strong>.
            </header>
            <p>
                I am a Year 4 student at <a href="https://hkust.edu.hk/">HKUST</a>,
                studying Quantitative Finance, Computer Science and Mathematics, in the order of my majors.
                My research focuses on parameterised algorithms and its applications on solving hard real-life problems,
                particularly in the area of compiler optimisations.
                Apart from algorithms, I also like to delve into programming languages and software engineering,
                which have inspired a few (tiny) pet projects of mine.
            </p>
            <p>
                In my free time, I am fond of cycling and playing historical and simulation video games.
                (My favourites are Hearts of Iron 4 and Cities Skylines.)
            </p>
        </div>
    </Card>
}

function Skills() {
    return <Card id="skills" title="Skills" doc={<>
        <section>
            <span className="legend high">Proficient</span>
            : completed at least one non-trivial project with the technology,
            with knowledge of best practices and experience with most paradigms and facilities.
        </section>
        <section>
            <span className="legend medium">Skilled</span>
            : capability and experience in using the technology in its common use cases.
        </section>
    </>}>
        <section>
            <header>Programming Languages</header>
            <ul className="icon-list">
                <li className="card high">
                    <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" />
                    <span className="text">C++</span>
                </li>
                <li className="card high">
                    <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/3/35/The_C_Programming_Language_logo.svg" />
                    <span className="text">C</span>
                </li>
                <li className="card high">
                    <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" />
                    <span className="text">HTML/CSS/JavaScript</span>
                </li>
                <li className="card medium">
                    <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" />
                    <span className="text">Python</span>
                </li>
                <li className="card medium">
                    <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" />
                    <span className="text">PHP</span>
                </li>
                <li className="card medium">
                    <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/7/78/Microsoft_Visual_Basic_for_Applications_logo.svg" />
                    <span className="text">VBA</span>
                </li>
            </ul>
        </section>
        <section>
            <header>Frameworks</header>
            <ul className="icon-list">
                <li className="card high">
                    <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/3/30/React_Logo_SVG.svg" />
                    <span className="text">React</span>
                </li>
                <li className="card medium">
                    <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/TensorFlow_logo.svg"/>
                    <span className="text">TensorFlow</span>
                </li>
            </ul>
        </section>
    </Card>;
}

type CVTableRowProps = {
    period: React.ReactNode;
    title: React.ReactNode;
    prize?: React.ReactNode;
    children?: React.ReactNode;
};
function CVTableRow({ period, title, prize, children } : CVTableRowProps) {
    const {collapsed, setCollapsed, bodyProps, wrapperProps} = useCollapse(true);
    return <tr>
        <td>{period}</td>
        <td className={collapsed ? "collapsed" : ""}>
            <div className="title" onDoubleClick={() => setCollapsed(!collapsed)}>
                <span className="text">
                    {title}
                    {prize && <>&emsp;<span className="prize">{prize}</span></>}
                </span>
                <div className="filler"></div>
                <button title={collapsed ? "expand" : "collapse"}
                    className="icon-button collapse-toggle" onClick={() => setCollapsed(!collapsed)}>
                    <i className="fa-solid fa-angle-down"></i>
                </button>
            </div>
            <div className="content-wrapper" {...wrapperProps}>
                <div className="content" {...bodyProps}>{children}</div>
            </div>
        </td>
    </tr>
}

function Education() {
    return <Card id="education" title="Education">
        <table className="cv-table">
            <tbody>
                <CVTableRow period="2022-2026" title="Hong Kong University of Science and Technology (HKUST)">
                    BSc in Quantitative Finance, Computer Science and Mathematics <br/>
                    Current GPA: 3.968/4.3 (up to 2024-25 summer) <br/>
                    Notable courses:
                    <ul>
                        <li>COMP2012H (Honors Object-Oriented Programming and Data Structures): A+</li>
                        <li>COMP3711H (Honors Design and Analysis of Algorithms): A+</li>
                        <li>COMP3721 (Theory of Computation): A+</li>
                        <li>MATH2131 (Honors in Linear and Abstract Algebra I): A</li>
                        <li>MATH2033 (Mathematical Analysis): A+</li>
                        <li>MATH3131 (Honors in Linear and Abstract Algebra II): A</li>
                    </ul>
                </CVTableRow>
                <CVTableRow period="2016-2022" title="St Paul's Co-education College (SPCC)">
                    Hong Kong Diploma of Secondary Education (HKDSE) results:
                    <ul>
                        <li>5** in English and Mathematics (Compulsory Part)</li>
                        <li>5* in Chinese, Mathematics (M2), Liberal Studies, Physics, Chemistry and Economics</li>
                    </ul>
                </CVTableRow>
            </tbody>
        </table>
    </Card>;
}

function Publications() {
    return <></>;
}

function Projects() {
    return <Card id="projects" title="Previous and Current Projects">
        <table className="cv-table">
            <tbody>
                <CVTableRow period="2025-now" title="Final Year Project: DOCA GPUNetIO for efficient network communication with application to AI">
                    <ul>
                        <li>Industrial co-operation with NVIDIA under the supervision of Prof Cindy Li and NVIDIA engineers.</li>
                        <li>Focus: Implementing and proposing novel uses of DOCA technology to boost computational efficiency in real-life scenarios.</li>
                    </ul>
                </CVTableRow>
                <CVTableRow period="2024-now" title="Open Topic in Algorithms and Complexity">
                    <ul>
                        <li>Continuing research under the supervision of <a href="https://amir.goharshady.com/">Prof Amir Goharshady</a>.</li>
                        <li>Previously part of HKUST's Undergraduate Research Opportunities Program (UROP).</li>
                        <li>Focus: Parameterized algorithms and their applications.</li>
                    </ul>
                </CVTableRow>
                <CVTableRow period="2024" title="Credit Planner">
                    A React-based static <a href="https://rextse04.github.io/credit-planner/">credit planner</a> for HKUST students.
                </CVTableRow>
                <CVTableRow period="2021-2022" title="The Simpler the Better: A Novel Adversarial Approach towards Weakly-Supervised Image Segmentation">
                    A deep-learning model that utilises adversarial training to separate an object in an image from the surrounding without ground-truth labels during training.
                </CVTableRow>
                <CVTableRow period="2021-2022" title="A New Approach to Eye-to-Face Synthesis">
                    A deep-learning model that utilises the VGG image recognition model for transfer training to solve an eye-to-face image generation problem.
                </CVTableRow>
            </tbody>
        </table>
    </Card>;
}

function Awards() {
    return <Card id="awards" title="Scholarships and Awards">
        <table className="cv-table">
            <tbody>
                <CVTableRow period="2022-now" title="Dean's List">
                    in all semesters except 2023-24 Spring.
                </CVTableRow>
                <CVTableRow period="2022-2026" title="HKSAR Government Scholarship">
                    for exceptional performance in HKDSE.
                </CVTableRow>
                <CVTableRow period="2025" title="Fung's Scholarship">
                    for financial support during exchange.
                </CVTableRow>
                <CVTableRow period="2024" title="HKUST Firebird CTF Competition 2024"
                    prize={<>4<sup>th</sup> overall, 2<sup>nd</sup> in HKUST</>}>
                    Solved multiple CTF challenges related to cybersecurity as a team effort.
                </CVTableRow>
                <CVTableRow period="2023" title="Jane Street: Electronic Trading Challenge"
                    prize="Top 5 teams in final round">
                    Solved multiple coding challenges in a limited period of time using Python.
                </CVTableRow>
                <CVTableRow period="2021-2022" title="IEEE Hong Kong Section Pre-University STEM Student Conference 2021"
                    prize="Credit Award">
                    <ul>
                        <li>Collaborated with others to create a prototype for an AI-driven walking stick with obstacle detection.</li>
                        <li>Presented results in poster and oral form.</li>
                    </ul>
                </CVTableRow>
                <CVTableRow period="2021" title="International Science Competition 2022"
                    prize="Regional Finalist">
                    Collaborated with others to develop and present a novel methodology for semi-supervised image segmentation.
                </CVTableRow>
                <CVTableRow period="2020-2021" title="2nd International Artificial Intelligence Fair"
                    prize="First Prize">
                    Collaborated with others to present an eye-to-face image generation deep learning model.
                </CVTableRow>
            </tbody>
        </table>
    </Card>;
}

function Others() {
    return <Card id="others" title="Other Experiences">
        <table className="cv-table">
            <tbody>
                <CVTableRow period="2025" title="Undergradute Teaching Assistant (UGTA) for COMP2011">
                    Designed and implemented a full programming assignment for the course.
                </CVTableRow>
                <CVTableRow period="2024" title="Student Helper at HKUST Open Day">
                    Answered parents and prospective students' answers at the CSE booth at Open Day.
                </CVTableRow>
                <CVTableRow period="2024" title="Undergraduate Teaching Assistant (UGTA) for COMP2012">
                    Assisted the PGTA in managing course logistics and answering students' questions.
                </CVTableRow>
            </tbody>
        </table>
    </Card>;
}

function Languages() {
    return <Card id="langs" title="Language Proficiency">
        My mothertougue is <strong>Chinese</strong>, <strong>Cantonese</strong> to be specific.
        However, I can also speak <strong>Mandarin</strong> and <strong>English</strong> fluently.
        I took IELTS Academic in June 2024 and obtained an excellent score of 8.5
        (Listening 9.0, Reading 8.5, Writing 7.5, Speaking 8.0).
    </Card>;
}

export function Home() {
    return <>
        <Introduction />
        <Skills />
        <Education />
        <Publications />
        <Projects />
        <Awards />
        <Others />
        <Languages />
    </>;
}