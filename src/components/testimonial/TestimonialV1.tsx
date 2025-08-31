import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import TestimonialV1Data from "../../../src/assets/jsonData/testimonial/TestimonialV1Data.json";
import SingleTestimonialV1 from "./SingleTestimonialV1";
import shape3 from "/assets/img/shape/3.png";

const TestimonialV1 = () => {
  return (
    <>
      <div className="testimonial-style-one-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="testimonial-one-quote">
                <h4 className="sub-title">Testimonials</h4>
                <div className="testimonial-quote">
                  <img src={shape3} alt="Image Not Found" />
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <Swiper
                className="testimonial-style-one-carousel swiper"
                direction="horizontal"
                loop={true}
                autoplay={false}
                speed={1000}
                pagination={{
                  type: "bullets",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                modules={[Navigation, Keyboard]}
              >
                <div className="swiper-wrapper">
                  {TestimonialV1Data.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <SingleTestimonialV1 testimonial={testimonial} />
                    </SwiperSlide>
                  ))}
                </div>

                {/* Add Arrows */}
                <div className="testimonial-one-navigation">
                  <div className="swiper-button-prev" />
                  <div className="swiper-button-next" />
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialV1;
