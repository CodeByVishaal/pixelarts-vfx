import thumb9 from '/assets/img/thumb/9.jpg';
import thumb8 from '/assets/img/thumb/8.jpg';
import thumb14 from '/assets/img/thumb/14.jpg';
import { Link } from "react-router-dom";
import CountUp from 'react-countup';
import SplitText from "../animation/SplitText.jsx"

const BannerV7 = () => {
    return (
        <>
            <div className="banner-style-seven-area bg-cover"
                style={{ backgroundImage: `url(/assets/img/shape/1.jpg)`}}>
                <div className="light-banner-active bg-light bg-cover" />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 offset-xl-2">
                            <div className="banner-seven-info">
                                <h2 className='split-text'>
                                    <SplitText
                                        delay={150}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Unike Digital
                                    </SplitText>
                                </h2>
                                <h2 className="text-end split-text">
                                    <SplitText
                                        delay={150}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Experience
                                    </SplitText>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banner-seven-bottom-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-5">
                                <div className="banner-seven-thumb">
                                    <img src={thumb8} alt="Image Not Found" />
                                    <img className='regular-img' src={thumb9} alt="Image Not Found" />
                                    <img className="light-img" src={thumb14} alt="Image Not Found" />

                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-7">
                                <div className="content">
                                    <div className="fun-fact">
                                        <div className="counter">
                                            <div className="timer"><CountUp end={38} enableScrollSpy /></div>
                                            <div className="operator">K</div>
                                        </div>
                                        <span className="medium">Completed Projects</span>
                                    </div>
                                    <div className="info-right">

                                        <p className="split-text">
                                            <SplitText
                                                delay={5}
                                                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                                easing="easeOutCubic"
                                                threshold={0.2}
                                                rootMargin="-50px"
                                            >
                                                Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic.
                                            </SplitText>
                                        </p>

                                        <Link className="btn-animation mt-30" to="/services"><i className="fas fa-arrow-right" /> <span>Our Services</span></Link>
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

export default BannerV7;