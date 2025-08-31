import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import BannerV12Modal from "./BannerV12Modal";
import BannerV12Data from '../../assets/jsonData/banner/BannerV12Data.json';
import SingleBannerV12 from "./SingleBannerV12";

const BannerV12 = () => {
    return (
        <>
            <div className="full-slider-two-area overflow-hidden text-light bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/12.jpg)' }}>
                <Swiper
                    className="full-screen-portfolio-two"
                    loop={true}
                    grabCursor={true}
                    mousewheel={true}
                    speed={1000}
                    navigation={{
                        nextEl: '.full-slider-two-next',
                        prevEl: '.full-slider-two-prev',
                    }}
                    pagination={{
                        el: '.full-slider-two-pagination',
                        type: 'fraction',
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation, Keyboard, Mousewheel, Autoplay]}
                >
                    <div className="swiper-wrapper">
                        {BannerV12Data.map(banner =>
                            <SwiperSlide key={banner.id}>
                                <SingleBannerV12 banner={banner} />
                            </SwiperSlide>
                        )}
                    </div>

                    <div className="full-slider-two-nav">
                        <div className="full-slider-two-pagination" />
                        <div className="full-slider-two-prev"><i className="fas fa-angle-left" /> Prev </div>
                        <div className="full-slider-two-next">Next <i className="fas fa-angle-right" /></div>
                    </div>
                </Swiper>
            </div >

            <BannerV12Modal />
        </>
    );
};

export default BannerV12;