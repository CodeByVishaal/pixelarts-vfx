import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useUpDownScroll = (selector: string) => {
    useEffect(() => {
        const element = document.querySelector(selector);

        if (element) {
            gsap.set(element, {
                yPercent: 80,
            });

            const animation = gsap.to(element, {
                yPercent: -80,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    end: "bottom center",
                    scrub: 1,
                },
            });

            return () => {
                animation.kill();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        }
    }, [selector]);
};

export default useUpDownScroll;
