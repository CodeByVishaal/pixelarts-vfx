import team10 from "/assets/img/team/10.jpg";
import team11 from "/assets/img/team/11.jpg";
import team12 from "/assets/img/team/12.jpg";
import team13 from "/assets/img/team/13.jpg";
import { Link } from "react-router-dom";
import SplitTextV2 from "../animation/SplitTextV2.jsx"

const BannerV9 = () => {
    return (
        <>
            <div className="banner-style-nine-area bg-cover"
                style={{ backgroundImage: `url("/assets/img/shape/2.jpg"})` }}>
                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/5.jpg)' }} />
                <div className="container">
                    <div className="banner-style-nine-items">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="content">
                                    <div className="info">

                                        <h2 className="split-text">
                                            <SplitTextV2
                                                delay={150}
                                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                                easing="easeOutCubic"
                                                threshold={0.2}
                                                rootMargin="-50px"
                                            >
                                                Creative
                                            </SplitTextV2>
                                        </h2>

                                        <h2 className="split-text">
                                            <SplitTextV2
                                                delay={150}
                                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                                easing="easeOutCubic"
                                                threshold={0.2}
                                                rootMargin="-50px"
                                            >
                                                Studio <strong>Studio</strong>
                                            </SplitTextV2>
                                        </h2>

                                    </div>
                                    <div className="main-content">
                                        <p>
                                            Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 offset-lg-1">
                                <div className="banner-style-nined-right">
                                    <div className="top">
                                        <ul className="list-style-two">
                                            <li>$20M+ Spend in marketing</li>
                                            <li>1st ambassador partner for marketing in Australia</li>
                                            <li>10+ passionate partner</li>
                                        </ul>
                                    </div>
                                    <div className="user-card-two">
                                        <div className="thumb">
                                            <img src={team10} alt="Image Not Found" />
                                            <img src={team11} alt="Image Not Found" />
                                            <img src={team12} alt="Image Not Found" />
                                            <img src={team13} alt="Image Not Found" />
                                            <Link to="/services">
                                                <i className="fas fa-plus" />
                                            </Link>
                                        </div>
                                        <div className="info">
                                            <p>
                                                We have 40k+ <br /> customersword-wide
                                            </p>
                                        </div>
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

export default BannerV9;