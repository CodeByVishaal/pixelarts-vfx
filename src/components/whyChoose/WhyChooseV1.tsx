import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Animate from "../animation/Animate";
import petta from "/assets/img/gallery/petta.jpg";

interface DataType {
  sectionClass?: string;
}

const WhyChooseV1 = ({ sectionClass }: DataType) => {
  const [heroImage, setHeroImage] = useState(petta);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the hero image from backend
    const fetchHeroImage = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_BASE_URL}/media/hero-image`);
        const data = await response.json();
        
        console.log('Hero image response:', data); // Debug log
        
        if (data.success && data.image && data.image.url) {
          setHeroImage(data.image.url);
          console.log('Hero image set to:', data.image.url); // Debug log
        } else {
          console.log('No hero image found, using default');
          // Keep default image
        }
      } catch (error) {
        console.error('Error fetching hero image:', error);
        // Keep default image on error
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImage();
  }, []);

  return (
    <>
      <div className={`${sectionClass ? sectionClass : ""}`}>
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-5">
              <div className="thumb-style-one">
                {loading ? (
                  <div style={{ 
                    width: '100%', 
                    height: '400px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#f0f0f0'
                  }}>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <img 
                    src={heroImage} 
                    alt="Why Choose Pixel Arts" 
                    onError={(e) => {
                      console.error('Image failed to load, using fallback');
                      e.currentTarget.src = petta;
                    }}
                  />
                )}
              </div>
            </div>
            <div className="col-lg-7">
              <div className="choose-us-style-one">
                <div className="pl-80 pl-md-0 pl-xs-0 pt-120">
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
                          <CountUp end={50} enableScrollSpy />+
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
                          <CountUp end={10000} enableScrollSpy />+
                        </div>
                      </div>
                      <h4>Hours</h4>
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