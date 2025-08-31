import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import BannerV3Data from '../../../src/assets/jsonData/banner/BannerV3Data.json';
import SingleBannerV3 from './SingleBannerV3';
import BannerV3ModalContent from './BannerV3ModalContent';

const BannerV3 = () => {
    return (
        <>
            <div className="banner-style-three-area overflow-hidden">
                <Swiper className="banner-slide-counter"
                    loop={true}
                    grabCursor={true}
                    mousewheel={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    pagination={{
                        clickable: true,
                        type: "fraction",
                        el: ".banner-slide-pagination",
                    }}
                    navigation={{
                        nextEl: ".banner-slide-button-next",
                        prevEl: ".banner-slide-button-prev",
                    }}
                    breakpoints={{
                        991: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                            centeredSlides: false,
                        },
                        992: {
                            slidesPerView: 2.2,
                            spaceBetween: 50,
                        },
                        1400: {
                            slidesPerView: 2.4,
                            spaceBetween: 80,
                        },
                    }}
                    modules={[Pagination, Navigation, Keyboard, Mousewheel, Autoplay]}
                >
                    <div className="swiper-wrapper">
                        {BannerV3Data.map(banner =>
                            <SwiperSlide key={banner.id}>
                                <SingleBannerV3 banner={banner} />
                            </SwiperSlide>
                        )}
                    </div>
                    <div className="banner-slide-pagination" />
                    <div className="banner-slide-button-prev" />
                    <div className="banner-slide-button-next" />
                </Swiper>
            </div>

            {/* Modal */}
            {BannerV3Data.map(data =>
                <BannerV3ModalContent data={data} key={data.id} />
            )}
        </>
    );
};

export default BannerV3;