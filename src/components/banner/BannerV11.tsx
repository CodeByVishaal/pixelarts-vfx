import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import BannerV11Modal from './BannerV11Modal';
import BannerV11Data from "../../assets/jsonData/banner/BannerV11Data.json"
import SingleBannerV11 from './SingleBannerV11';

const BannerV11 = () => {
    return (
        <>
            <div className="banner-style-eleven-area overflow-hidden text-light">
                <Swiper
                    className="full-screen-portfolio-slider"
                    direction={'vertical'}
                    loop={true}
                    grabCursor={true}
                    mousewheel={true}
                    navigation={{
                        nextEl: '.full-screen-slider-next',
                        prevEl: '.full-screen-slider-prev',
                    }}
                    pagination={{
                        el: '.full-screen-slider-pagination',
                        type: 'fraction',
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation, Keyboard, Mousewheel, Autoplay]}
                >

                    <div className="swiper-wrapper">

                        {BannerV11Data.map(banner =>
                            <SwiperSlide key={banner.id}>
                                <SingleBannerV11 banner={banner} />
                            </SwiperSlide>
                        )}
                    </div>

                    <div className="full-screen-slider-nav">
                        <div className="full-screen-slider-pagination" />
                        <div className="full-screen-slider-prev"><i className="fas fa-angle-left" /> Prev </div>
                        <div className="full-screen-slider-next">Next <i className="fas fa-angle-right" /></div>
                    </div>
                </Swiper>
            </div>

            <BannerV11Modal />
        </>
    );
};

export default BannerV11;