import { useState } from "react";
import { Link } from "react-router-dom";
import ServiceListData from "../../../src/assets/jsonData/services/ServiceListData.json";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import ServiceList from "../services/ServiceList";
import logo from "/assets/img/pixelart-logo.png";

interface DataType {
  sectionClass?: string;
}

const AboutV6 = ({ sectionClass }: DataType) => {
  const containerRef = useScrollAnimation();

  const [activeServiceId, setActiveServiceId] = useState(
    ServiceListData[0]?.id || null
  );

  const handleMouseEnter = (id: number) => {
    setActiveServiceId(id);
  };

  const handleMouseLeave = () => {
    // Do nothing on mouse leave to keep the active item
  };

  return (
    <>
      <div
        className={`about-style-six-area ${sectionClass ? sectionClass : ""}`}
      >
        <div className="container">
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
                <ul className="service-list">
                  {ServiceListData.map((service) => (
                    <li
                      key={service.id}
                      onMouseEnter={() => handleMouseEnter(service.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to="/services"
                        className={`${
                          activeServiceId === service.id ? "active" : ""
                        }`}
                      >
                        <ServiceList service={service} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutV6;
