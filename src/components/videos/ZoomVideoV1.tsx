/* eslint-disable prefer-const */

import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ZoomVideoV1 = () => {
    const videoContainerRef = useRef(null);
    const videoRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            const elements = {
                container: videoContainerRef.current,
                video: videoRef.current,
                content: contentRef.current
            };

            if (!elements.container || !elements.video || !elements.content) return;

            const t2 = gsap.timeline({
                scrollTrigger: {
                    trigger: elements.container,
                    pin: true,
                    start: "0%",
                    end: "100%",
                    scrub: 1,
                }
            });

            t2.fromTo(elements.video,
                { width: "50%" },
                { width: "100%" }
            );

            t2.fromTo(elements.content,
                { x: "-40%" },
                { x: 0 },
                "-=0.5"
            );

        }, videoContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="zoom-video-area">
            <div className="video-container" ref={videoContainerRef}>
                <video ref={videoRef} loop muted autoPlay>
                    <source src="/assets/video/2.mp4" type="video/mp4" />
                </video>
                <div className="video-items">
                    <div className="content" ref={contentRef}>
                        <h2>Marketing <strong>Agency <i className="fas fa-star-of-life" /></strong></h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZoomVideoV1;