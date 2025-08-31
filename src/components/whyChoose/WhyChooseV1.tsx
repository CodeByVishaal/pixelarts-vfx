import CountUp from "react-countup";
import Animate from "../animation/Animate";
import petta from "/assets/img/gallery/petta.jpg";

interface DataType {
  sectionClass?: string;
}

const WhyChooseV1 = ({ sectionClass }: DataType) => {
  return (
    <>
      <div className={`${sectionClass ? sectionClass : ""}`}>
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-5">
              <div className="thumb-style-one">
                <img src={petta} alt="Image Not Found" />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="choose-us-style-one">
                <div className="pl-80 pl-md-0 pl-xs-0 pt-120">
                  {" "}
                  {/* Added pt-120 class */}
                  <h4 className="sub-title">Why Choose Pixel Arts?</h4>
                  <h2 className="title">Why Not?</h2>
                  <div
                    className="faq-style-one accordion mt-30"
                    id="faqAccordion"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Precision Rotoscoping & Flawless Paint-Prep
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          <p>
                            Frame-by-frame detailing to ensure clean mattes and
                            seamless object removals that blend naturally into
                            any scene.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Hollywood-Grade Compositing
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          <p>
                            From subtle fixes to complex integrations, our
                            compositing delivers cinematic visuals that feel
                            real and immersive.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Fast Turnaround, Zero Compromise
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          <p>
                            Quick delivery timelines without sacrificing
                            accuracy, quality, or creative integrity.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="award-items">
                  <Animate className="animate__animated animate__fadeInLeft">
                    <div className="award-item">
                      <div className="fun-fact">
                        <div className="h2 timer text-purple">
                          <CountUp end={19} enableScrollSpy />+
                        </div>
                      </div>
                      <h4>Movies </h4>
                    </div>
                  </Animate>

                  <Animate
                    className="animate__animated animate__fadeInLeft"
                    delay="100ms"
                  >
                    <div className="award-item">
                      <div className="fun-fact">
                        <div className="h2 timer text-purple">
                          <CountUp end={10} enableScrollSpy />+
                        </div>
                      </div>
                      <h4>Web Series</h4>
                    </div>
                  </Animate>

                  <Animate
                    className="animate__animated animate__fadeInLeft"
                    delay="200ms"
                  >
                    <div className="award-item">
                      <div className="fun-fact">
                        <div className="h2 timer text-purple">
                          <CountUp end={100} enableScrollSpy />+
                        </div>
                      </div>
                      <h4>Hours of Dedication</h4>
                    </div>
                  </Animate>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseV1;
