import thumb4 from '/assets/img/thumb/4.jpg';
import CountUp from 'react-countup';

const BannerV10 = () => {

    return (
        <>
            <div className="banner-style-ten-area shadow dark-hard">

                {/* Background Video  */}
                <video loop muted autoPlay>
                    <source src="/assets/video/abstract.mp4" type="video/mp4" />
                </video>

                <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/7.jpg)' }} />


                <div className="container">
                    <div className="row align-center">
                        <div className="col-xl-8 col-lg-7 pl-60 pl-md-15 pl-xs-15 order-lg-last">
                            <div className="banner-ten-content">
                                <h2>Transforming ideas into <strong>Digital</strong> <b>realities</b></h2>
                                <p>
                                    Providing innovative solutions in branding, marketing, design, and advertising. These agencies often collaborate with clients to develop unique campaigns, visual identities, and digital strategies that resonate with target audiences. Services may include graphic design, content creation, social media management.
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="banner-style-ten-left-info">
                                <img src={thumb4} alt="Image Not Found" />
                                <div className="fun-fact-style-two">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={28} enableScrollSpy /></div>
                                        <div className="operator">K</div>
                                    </div>
                                    <span className="medium">Completed Projects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BannerV10;