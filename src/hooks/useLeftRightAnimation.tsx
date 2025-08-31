import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useLeftRightAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && containerRef.current) {
            const container = containerRef.current;

            gsap.set(container, {
                autoAlpha: 0,
                xPercent: -20
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            });

            tl.to(container, {
                duration: 0.8,
                autoAlpha: 1,
                xPercent: 0,
                ease: "power2.out",
                clearProps: "all"
            });
        }

        return () => {
            if (typeof window !== "undefined") {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    }, []);

    return containerRef;
};

export default useLeftRightAnimation;
