import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import BannerV4Data from '../../../src/assets/jsonData/banner/BannerV4Data.json';
import { Link } from "react-router-dom";
import { Autoplay, Controller, EffectFade, FreeMode, Mousewheel } from 'swiper/modules';
import { useState } from 'react';

const BannerV4 = () => {

    const [firstSwiper, setFirstSwiper] = useState<SwiperType | null>(null);
    const [secondSwiper, setSecondSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="banner-style-four-area">
            <Swiper
                className="banner-style-four-carousel"
                spaceBetween={10}
                loop={false}
                loopAdditionalSlides={4}
                initialSlide={3}
                effect={"fade"}
                fadeEffect={{
                    crossFade: true
                }}
                onSwiper={setFirstSwiper}
                controller={{ control: secondSwiper }}
                modules={[EffectFade, Controller, Mousewheel]}
            >
                <div className="swiper-wrapper">
                    {BannerV4Data.bannerThumb.map(data => (
                        <SwiperSlide key={data.id}>
                            <div className="banner-style-four-item">
                                <img src={`/assets/img/portfolio/${data.thumbFirst}`} alt="Image Not Found" width={800} height={600} />
                                <img src={`/assets/img/portfolio/${data.thumbLast}`} alt="Image Not Found" width={800} height={800} />
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>

            <Swiper className="banner-style-four-bullet"
                direction="vertical"
                loop={false}
                // effect={"fade"}
                grabCursor={true}
                mousewheel={true}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                spaceBetween={50}
                slidesPerView="auto"
                touchRatio={0.2}
                slideToClickedSlide={true}
                loopAdditionalSlides={4}
                breakpoints={{
                    991: {
                        centeredSlides: true,
                    },
                }}
                watchSlidesProgress={true}
                onSwiper={setSecondSwiper}
                controller={{ control: firstSwiper }}
                modules={[Mousewheel, EffectFade, FreeMode, Autoplay, Controller]}
            >
                <div className="swiper-wrapper">
                    {BannerV4Data.bannerInfo.map(data => (
                        <SwiperSlide className="swiper-slide" key={data.id}>
                            <div className="swiper-bullet-item">
                                <ul className="project-meta">
                                    <li>{data.tag}</li>
                                    <li>{data.date}</li>
                                </ul>
                                <h2>
                                    <Link to={`/project-details/${data.id}`}>
                                        {data.titleFirst}<strong>{data.titleLast}</strong>
                                    </Link>
                                </h2>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    );
};

export default BannerV4;