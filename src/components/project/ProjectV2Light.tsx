import SplitText from "../animation/SplitText.jsx"
import PortfolioV1Light from "../portfolio/PortfolioV1Light";

const ProjectV2Light = () => {
    return (
        <>
            <div className="project-style-one-area default-padding blurry-shape-left overflow-hidden">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-4 pr-50 pr-md-15 pr-xs-15">
                            <div className="portfolio-style-one-left-info">
                                <h4 className="sub-title">Recent Work</h4>
                                <p className="split-text">
                                    <SplitText
                                        delay={5}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Diasert carets dolor sit amet consectetur adipisicing elit. Deserunt ullam laboriosam, excepturi quibusdam ipsa sed maiores illo qui vel dicta impedit nobis sapiente culpa non quis provident ex facilis voluptates.
                                    </SplitText>
                                </p>
                                <div className="portfolio-info-card">
                                    <h5>Experience the perfect blend of creativity and functionality</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <PortfolioV1Light />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectV2Light;