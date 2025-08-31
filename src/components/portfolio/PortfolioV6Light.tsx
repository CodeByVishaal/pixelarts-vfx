import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, FreeMode } from 'swiper/modules';
import PortfolioV4Data from '../../../src/assets/jsonData/portfolio/PortfolioV4Data.json';
import SinglePortfolioV4Light from './SinglePortfolioV4Light';

interface DataType {
    sectionClass?: string;
}

const PortfolioV6Light = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`portfolio-style-four-area default-padding-bottom ${sectionClass ? sectionClass : ""}`}>
                <div className="container-full no-gap">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-style-four-items">

                                {/* Navigation */}
                                <div className="project-four-nav">
                                    <div className="nav-items">
                                        <div className="project-center-button-prev" />
                                        <div className="project-center-button-next" />
                                    </div>
                                </div>

                                <Swiper className="project-center-stage-carousel"
                                    loop={true}
                                    freeMode={true}
                                    grabCursor={true}
                                    slidesPerView={1}
                                    centeredSlides={true}
                                    spaceBetween={30}
                                    autoplay={false}
                                    navigation={{
                                        nextEl: ".project-center-button-next",
                                        prevEl: ".project-center-button-prev",
                                    }}
                                    breakpoints={{
                                        991: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                            centeredSlides: false
                                        },
                                        1200: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 60
                                        },
                                        1800: {
                                            slidesPerView: 2.8,
                                            spaceBetween: 80
                                        },
                                    }}
                                    modules={[Navigation, FreeMode, Keyboard]}
                                >
                                    <div className="swiper-wrapper">
                                        {PortfolioV4Data.slice(0, 8).map(portfolio =>
                                            <SwiperSlide key={portfolio.id}>
                                                <SinglePortfolioV4Light portfolio={portfolio} />
                                            </SwiperSlide>
                                        )}
                                    </div>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default PortfolioV6Light;