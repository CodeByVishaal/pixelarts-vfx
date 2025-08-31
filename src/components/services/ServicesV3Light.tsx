import arrowLongRight from '/assets/img/icon/arrow-long-right.png';
import ServicesV3Data from "../../../src/assets/jsonData/services/ServicesV3Data.json";
import { Link } from "react-router-dom";
import SingleServiceV3Light from './SingleServiceV3Light';
import SplitText from "../animation/SplitText.jsx"
import useActiveIndex from '../../hooks/useActiveIndex';

interface DataType {
    sectionClass?: string;
    hasTitle?: boolean;
}

const ServicesV3Light = ({ sectionClass, hasTitle }: DataType) => {
    const { activeIndex, handleMouseEnter, handleTouchStart } = useActiveIndex()

    return (
        <>
            <div className={`services-style-three-area ${sectionClass ? sectionClass : ""}`}>

                {/* Section Title */}
                {hasTitle &&
                    <div className="container">
                        <div className="site-heading">
                            <div className="row align-center">
                                <div className="col-lg-8">
                                    <h4 className="sub-title">Services We Offer</h4>
                                    <h2 className="title">
                                        <SplitText
                                            delay={80}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Turn Information
                                        </SplitText>
                                    </h2>
                                    <h2 className="title">
                                        <SplitText
                                            delay={80}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Into Actionable Insights
                                        </SplitText>
                                    </h2>
                                </div>
                                <div className="col-lg-4 text-end">
                                    <Link to="/services" className="btn-circle">
                                        <div className="button-content">
                                            <span><img src={arrowLongRight} alt="Image Not Found" /></span> <strong>All Members</strong>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="service-style-three-items" id="accordion">
                                {ServicesV3Data.map((service, index) =>
                                    <li
                                        className={activeIndex === index ? 'out' : ''}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onClick={() => handleTouchStart(index)}
                                        onTouchStart={() => handleTouchStart(index)}
                                        key={service.id}
                                    >
                                        <SingleServiceV3Light service={service} />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesV3Light;