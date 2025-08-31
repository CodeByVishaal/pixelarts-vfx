import BrandV2Data from '../../../src/assets/jsonData/brand/BrandV2Data.json';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';

const BrandV2 = () => {
    return (
        <>
            <div className="barnd-style-two-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="brand-heading">
                                <h3>Thurusted by <CountUp end={200} enableScrollSpy />K+ customers</h3>
                            </div>
                            <Swiper className="brand-carousel swiper"
                                loop={true}
                                slidesPerView={2}
                                spaceBetween={30}
                                autoplay={true}
                                pagination={{
                                    el: '.swiper-pagination',
                                    clickable: true,
                                }}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 30
                                    },
                                    992: {
                                        slidesPerView: 4,
                                        spaceBetween: 30
                                    },
                                    1400: {
                                        slidesPerView: 5,
                                        spaceBetween: 80
                                    },
                                }}
                                modules={[Pagination, Keyboard, Autoplay]}
                            >
                                <div className="swiper-wrapper">
                                    {BrandV2Data.map(brand =>
                                        <SwiperSlide className="swiper-slide" key={brand.id}>
                                            <img src={`/assets/img/brand/${brand.thumb}`} alt="Thumb" width={380} height={80} />
                                        </SwiperSlide>
                                    )}
                                </div>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BrandV2;