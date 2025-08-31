import { Link } from "react-router-dom";
import SplitTextV2 from "../animation/SplitTextV2.jsx"
import useScrollAnimation from "../../hooks/useScrollAnimation";

interface DataType {
    sectionClass?: string;
    title?: string;
    titleBold?: string
}

const QuickContact = ({ sectionClass, title, titleBold }: DataType) => {
    const containerRef = useScrollAnimation();

    return (
        <>
            <div className={`quick-contact-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2">
                            <div className="quick-contact-items text-scroll-animation" ref={containerRef}>

                                <h2 className="split-text">
                                    <SplitTextV2
                                        delay={150}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        {title ? title : "Let's"} <span>&nbsp;</span> <strong>{titleBold ? titleBold : 'Join'}</strong>

                                    </SplitTextV2>
                                </h2>

                                <div className="pl-100 pl-xs-0 d-flex align-items-center">
                                    <p className="text">
                                        Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff. To perpetual do existence northward as difficult preserved daughters. Continued at up to zealously necessary breakfast. Surrounded sir motionless she end literature. Gay direction neglected.
                                    </p>
                                    <div className="btn-large-border text-end">
                                        <Link to="/contact-us"><i className="fas fa-long-arrow-right" /> Apply Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickContact;