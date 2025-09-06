import { useState } from "react";
import CountUp from "react-countup";
import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import useThumbParallax from "../../hooks/useThumbParallax";
import TextScrollAnimation from "../animation/TextScrollAnimation";
import arrowThemeIcon from "/assets/img/icon/arrow-theme.png";
import arrowIcon from "/assets/img/icon/arrow.png";

interface DataType {
  lightMode?: boolean;
}

const AboutV1 = ({ lightMode }: DataType) => {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useScrollAnimation();

  useThumbParallax();

  return (
    <>
      <div
        className="about-style-one-area bg-cover default-padding"
        style={{
          backgroundImage: lightMode ? "none" : "url(/assets/img/shape/13.png)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="about-style-one-left-info">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer">
                      <CountUp end={48} enableScrollSpy />
                    </div>
                    <div className="operator">K</div>
                  </div>
                  <span className="medium">Completed Projects</span>
                </div>
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer">
                      <CountUp end={16} enableScrollSpy />
                    </div>
                    <div className="operator">M</div>
                  </div>
                  <span className="medium">Awesome Clients</span>
                </div>
              </div>
            </div>
            <div className="col-lg-8 offset-lg-1">
              <div
                className="about-style-one-info text-scroll-animation responsive-padding"
                ref={containerRef}
              >
                <p className="text">
                  At Pixel Arts, we transform imagination into breathtaking
                  visuals. From high-end CGI and realistic compositing to
                  dynamic motion graphics, we specialize in creating visual
                  effects that push boundaries and elevate stories. Whether it’s
                  film, advertising, or digital media, our team combines
                  artistry with technology to deliver visuals that leave a
                  lasting impact. With Pixel Arts, your vision doesn’t just come
                  to life — it transcends.
                </p>
                <div className="d-flex">
                  {lightMode ? (
                    <Link to="/about-us">
                      <img src={arrowThemeIcon} alt="Image Not Found" />
                    </Link>
                  ) : (
                    <Link to="/about-us">
                      <img src={arrowIcon} alt="Image Not Found" />
                    </Link>
                  )}

                  <TextScrollAnimation triggerClassName="text">
                    <h2 className="title text">The Magic Behind the Screen</h2>
                  </TextScrollAnimation>
                </div>
              </div>
            </div>
          </div>
          <div className="row"></div>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="izTDbJ23_ws"
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default AboutV1;
