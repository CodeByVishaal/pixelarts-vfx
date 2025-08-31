import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useHorizontalScroll = () => {
  useEffect(() => {
    const width = window.innerWidth;

    if (width > 1023) {
      gsap.registerPlugin(ScrollTrigger);
      const sections = gsap.utils.toArray(".panel");
      const container = document.querySelector(
        ".thecontainer"
      ) as HTMLDivElement;

      if (container && sections.length > 0) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".thecontainer",
            pin: true,
            scrub: 1,
            end: () => "+=" + container.offsetWidth,
          },
        });
      }
    }
  }, []);
};

export default useHorizontalScroll;
