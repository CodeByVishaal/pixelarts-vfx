import { useEffect, useRef } from "react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const useScrollAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const handleResize = () => {
            if (window.innerWidth > 1023) {
                const textElements = gsap.utils.toArray<HTMLElement>('.text');
                textElements.forEach(text => {
                    gsap.to(text, {
                        backgroundSize: '100%',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: text,
                            start: 'center 100%',
                            end: 'center 50%',
                            scrub: true,
                        },
                    });
                });
            } else {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return containerRef;
};

export default useScrollAnimation;
