import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useItemMoveTopEffect = () => {
    useEffect(() => {
        const itemMoveTop = document.querySelector(".item-move-top-items");
        if (!itemMoveTop) return;

        ScrollTrigger.matchMedia({
            "(min-width: 992px)": () => {
                const pbmitpanels = gsap.utils.toArray<HTMLElement>(".item-move-top-item");
                const spacer = 0;

                if (pbmitpanels.length === 0) return;

                const pbmitheight = pbmitpanels[0].offsetHeight + 120;

                pbmitpanels.forEach((pbmitpanel, i) => {
                    gsap.set(pbmitpanel, { top: i * 0 });

                    gsap.to(pbmitpanel, {
                        scrollTrigger: {
                            trigger: pbmitpanel,
                            start: "top bottom-=100",
                            end: "top top+=0",
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                        ease: "none",
                        scale: () => 1 - (pbmitpanels.length - i) * 0.0,
                    });

                    ScrollTrigger.create({
                        trigger: pbmitpanel,
                        start: "top 140px",
                        endTrigger: ".item-move-top-items",
                        end: `bottom top+=${pbmitheight + pbmitpanels.length * spacer}`,
                        pin: true,
                        pinSpacing: false,
                    });
                });
            },
            "(max-width: 1025px)": () => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
        };
    }, []);
};

export default useItemMoveTopEffect;
