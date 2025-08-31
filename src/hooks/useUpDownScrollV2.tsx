import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useUpDownScrollV2 = (selector: string, startY: number = 50, endY: number = -20, scrub: number = 1) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            gsap.set(selector, { yPercent: startY });

            gsap.to(selector, {
                yPercent: endY,
                ease: "none",
                scrollTrigger: {
                    trigger: selector,
                    end: "bottom center",
                    scrub: scrub,
                },
            });
        }
    }, [selector, startY, endY, scrub]);
};

export default useUpDownScrollV2;