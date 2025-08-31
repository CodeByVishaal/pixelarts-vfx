import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";
import ModalVideo from "react-modal-video";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import SplitText from "../animation/SplitText.jsx";

const AboutV2 = () => {
  const [isOpen, setOpen] = useState(false);

  const homeContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (homeContainerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: homeContainerRef.current,
          pin: true,
          start: "0%",
          end: "100%",
          scrub: 1,
        },
      });

      // Corrected the usage of the from method
      tl.from(".home-container img, .home-container video", {
        width: "50%",
        duration: 1, // Include duration in the same object
      }).to(".home-container img, .home-container video", {
        width: "100%",
        duration: 1,
      });

      tl.from(
        ".home-container .video",
        {
          opacity: 0,
          y: -100,
          duration: 1,
        },
        "<"
      ); // Use "<" to start this animation at the same time as the previous one

      // Cleanup function to kill the ScrollTrigger instance
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <>
      <div className="about-style-two-area default-padding-top overflow-hidden">
        <div className="container mb-80 mb-xs-50">
          <div className="row align-center">
            <div className="col-lg-5">
              <div className="about-style-two-info pr-50 pr-md-15 pr-xs-15">
                <h4 className="sub-title">About Us</h4>
                <h2 className="title">
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
                    Best Modern Digital Agency.
                  </SplitText>
                </h2>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="experience-card">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer">
                      <CountUp end={38} enableScrollSpy />
                    </div>
                    <div className="operator">K</div>
                  </div>
                  <span className="medium">Completed Projects</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 pl-50 pl-md-15 pl-xs-15">
              <p>
                <SplitText
                  className="title-left split-text"
                  delay={5}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,50px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  easing="easeOutCubic"
                  threshold={0.2}
                  rootMargin="-50px"
                >
                  Diasert carets dolor sit amet consectetur adipisicing elit.
                  Deserunt ullam laboriosam, excepturi quibusdam ipsa sed
                  maiores illo qui vel dicta impedit nobis sapiente culpa non
                  quis provident ex facilis voluptates.
                </SplitText>
              </p>
              <Link className="btn-animation mt-10" to="/about-2">
                <i className="fas fa-arrow-right" /> <span>Know More</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="home-container" ref={homeContainerRef}>
            <video loop muted autoPlay>
              <source src="/assets/video/about.mp4" type="video/mp4" />
            </video>
            <div className="video-content">
              <div className="video">
                <Link
                  to="#"
                  className="popup-youtube video-play-button"
                  onClick={() => setOpen(true)}
                >
                  <i className="fas fa-play" />
                  <div className="effect" />
                </Link>
              </div>
            </div>
          </div>
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

export default AboutV2;
