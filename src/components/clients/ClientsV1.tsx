import CountUp from "react-countup";
import { Link } from "react-router-dom";
import SplitText from "../animation/SplitText.jsx";
import hhvm from "/assets/img/logo/HHVM.png";
import petta from "/assets/img/logo/Petta.png";
import sk2 from "/assets/img/logo/SK2.png";
import SadhurangaVettai from "/assets/img/logo/SadhurangaVettai.png";
import sarkar from "/assets/img/logo/Sarkar.png";
import tharmaprabhu from "/assets/img/logo/Tharmaprabhu.png";
import ayali from "/assets/img/logo/ayali.png";

interface DataType {
  sectionClass?: string;
}

const ClientsV1 = ({ sectionClass }: DataType) => {
  return (
    <>
      <div
        className={`clients-area default-padding ${
          sectionClass ? sectionClass : ""
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 mb-md-50">
              <div className="brand-info">
                <h4 className="sub-title">Clients</h4>

                <h2 className="title split-text">
                  <SplitText
                    delay={100}
                    animationFrom={{
                      opacity: 0,
                      transform: "translate3d(0,50px,0)",
                    }}
                    animationTo={{
                      opacity: 1,
                      transform: "translate3d(0,0,0)",
                    }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                  >
                    Some of our previous projects
                  </SplitText>
                </h2>

                <p className="split-text">
                  <SplitText
                    delay={5}
                    animationFrom={{
                      opacity: 0,
                      transform: "translate3d(0,50px,0)",
                    }}
                    animationTo={{
                      opacity: 1,
                      transform: "translate3d(0,0,0)",
                    }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                  >
                    Give lady of they such they sure it. Me contained explained
                    my education. Vulgar as hearts by garret perceived as
                    perfection.
                  </SplitText>
                </p>
              </div>
            </div>
            <div className="col-xl-7 offset-xl-1 col-lg-7">
              <div className="client-style-one-items">
                <div className="client-style-one-item">
                  <div className="fun-fact">
                    <div className="counter">
                      <div className="count-num">
                        <CountUp end={30} enableScrollSpy />
                      </div>
                      <div className="operator">+</div>
                    </div>
                    <span className="medium">Clients</span>
                  </div>
                </div>
                <div className="client-style-one-item">
                  <img src={petta} alt="Image Not Found" />
                </div>
                <div className="client-style-one-item">
                  <img src={sk2} alt="Image Not Found" />
                </div>
                <div className="client-style-one-item">
                  <img src={sarkar} alt="Image Not Found" />
                </div>
                <div className="client-style-one-item">
                  <img src={ayali} alt="Image Not Found" />
                </div>
                <div className="client-style-one-item">
                  <img src={hhvm} alt="Image Not Found" />
                </div>
                <div className="client-style-one-item">
                  <img src={tharmaprabhu} alt="Image Not Found" />
                </div>
                <div className="client-style-one-item">
                  <img src={SadhurangaVettai} alt="Image Not Found" />
                </div>
                <div className="client-style-one-item">
                  <Link to="/project">View All</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientsV1;
