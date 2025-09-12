import useScrollAnimation from "../../hooks/useScrollAnimation";
import logo from "/assets/img/pixelart-logo.png";

interface DataType {
  sectionClass?: string;
}

const AboutV6 = ({ sectionClass }: DataType) => {
  const containerRef = useScrollAnimation();

  return (
    <>
      <div
        className={`about-style-six-area ${sectionClass ? sectionClass : ""}`}
      >
        <div className="container pt-5">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="thumb-style-four">
                <img src={logo} alt="Image Not Found" />
              </div>
            </div>
            <div className="col-xl-6 offset-xl-1 col-lg-7">
              <div
                className="about-style-six-info text-scroll-animation"
                ref={containerRef}
              >
                <div className="info">
                  <div className="d-flex">
                    <h2 className="title text">
                      Leading VFX & Post-Production Studio
                    </h2>
                  </div>
                  <p className="text">
                    Crafting worlds beyond imagination, we transform ideas into
                    stunning visual realities. From breathtaking CGI to seamless
                    compositing, our team blends artistry with cutting-edge
                    technology. Each frame is designed to captivate, inspire,
                    and push the boundaries of storytelling. Elevating visions
                    with precision, passion, and cinematic excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutV6;
