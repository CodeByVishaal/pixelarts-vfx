import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, EffectFade } from 'swiper/modules';
import PortfolioV1Data from '../../../src/assets/jsonData/portfolio/PortfolioV1Data.json';
import SinglePortfolioV1Light from './SinglePortfolioV1Light';

const PortfolioV1Light = () => {
    return (
        <>
            <div className="portfolio-style-one-content">
                <Swiper className="portfolio-style-two-carousel swiper"
                    direction="horizontal"
                    loop={true}
                    autoplay={false}
                    effect={"fade"}
                    fadeEffect={{ crossFade: true }}
                    speed={1000}
                    pagination={{
                        el: ".project-pagination",
                        type: "custom",
                        clickable: true,
                        renderCustom: (_swiper, current, total) => `${current} <span></span> ${total}`,
                    }}
                    navigation={{
                        nextEl: ".project-button-next",
                        prevEl: ".project-button-prev",
                    }}
                    modules={[Navigation, Pagination, EffectFade, Keyboard]}
                >
                    <div className="swiper-wrapper">
                        {PortfolioV1Data.map(portfolio =>
                            <SwiperSlide key={portfolio.id}>
                                <SinglePortfolioV1Light portfolio={portfolio} />
                            </SwiperSlide>
                        )}
                    </div>
                </Swiper>
                <div className="project-swiper-nav">
                    <div className="project-pagination" />
                    <div className="project-button-prev" />
                    <div className="project-button-next" />
                </div>
            </div>
        </>
    );
};

export default PortfolioV1Light;