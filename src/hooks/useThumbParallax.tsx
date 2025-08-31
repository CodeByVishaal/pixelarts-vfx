import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const useThumbParallax = () => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleScrollTrigger = () => {
            const width = window.innerWidth;
            if (width > 1023) {
                const containers = document.querySelectorAll('.img-container');

                containers.forEach(container => {
                    const img = container.querySelector('img');
                    if (!img) return;

                    const t4 = gsap.timeline({
                        scrollTrigger: {
                            trigger: container,
                            scrub: true,
                            pin: false,
                        }
                    });

                    t4.fromTo(img,
                        { yPercent: -60, ease: 'none' },
                        { yPercent: 60, ease: 'none' }
                    );
                });
            }
        };

        handleScrollTrigger();

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
};

export default useThumbParallax;

