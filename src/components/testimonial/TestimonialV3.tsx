import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import TestimonialV1Data from "../../../src/assets/jsonData/testimonial/TestimonialV1Data.json";
import shape14 from "/assets/img/shape/14.png";
import SingleTestimonialV1 from "./SingleTestimonialV1";

interface DataType {
  sectionClass?: string;
}

const TestimonialV3 = ({ sectionClass }: DataType) => {
  return (
    <>
      <div
        className={`testimonial-style-three-area default-padding ${
          sectionClass ? sectionClass : ""
        }`}
      >
        <div className="shape-style-one">
          <img className="upDownScrol" src={shape14} alt="Image Not Found" />
        </div>
        <div className="container">
          <div className="testimonial-heading">
            <div className="row">
              <div className="col-lg-8">
                <h2 className="text-large-gradient">Testimonials</h2>
              </div>
              <div className="col-lg-4 text-end">
                <div className="testimonial-three-quote">
                  <h2>4.9</h2>
                  <div className="info">
                    <div className="ratings">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                    <span>145 (Review)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Swiper
                className="testimonial-style-three-carousel swiper"
                loop={true}
                slidesPerView={1}
                spaceBetween={30}
                autoplay={false}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                }}
                modules={[Pagination, Navigation, Keyboard]}
              >
                <div className="swiper-wrapper">
                  {TestimonialV1Data.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <SingleTestimonialV1 testimonial={testimonial} />
                    </SwiperSlide>
                  ))}
                </div>

                {/* Navigation */}
                <div className="testimonial-control">
                  <div className="swiper-pagination" />
                  <div className="swiper-nav-left">
                    <div className="swiper-button-prev" />
                    <div className="swiper-button-next" />
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialV3;
