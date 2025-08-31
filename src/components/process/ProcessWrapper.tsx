import ProcessV1 from "./ProcessV1";
import SplitText from "../animation/SplitText.jsx"

const ProcessWrapper = () => {
    return (
        <>
            <div className="process-area overflow-hidden text-center default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">Our Process </h4>
                                <h2 className="title split-text">
                                    <SplitText
                                        delay={100}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Best Solutions Provider
                                    </SplitText>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <ProcessV1 />
                </div>
            </div>
        </>
    );
};

export default ProcessWrapper;