import PortfolioV3Data from '../../../src/assets/jsonData/portfolio/PortfolioV3Data.json';
import SplitText from "../animation/SplitText.jsx"
import SinglePortfolioV3Light from './SinglePortfolioV3Light';

interface DataType {
    hasTitle?: boolean;
    sectionClass?: string;
}

const PortfolioV3Light = ({ hasTitle, sectionClass }: DataType) => {
    return (
        <>
            <div className={`portfolio-style-three-area ${sectionClass ? sectionClass : ""}`}>

                {/* Portfolio Title  */}
                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 offset-lg-3">
                                <div className="site-heading text-center">
                                    <h4 className="sub-title">Popular Projects</h4>
                                    <h2 className="title split-text">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Featured Works
                                        </SplitText>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="portfolio-style-three-items">
                        {PortfolioV3Data.map(portfolio =>
                            <SinglePortfolioV3Light portfolio={portfolio} key={portfolio.id} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioV3Light;