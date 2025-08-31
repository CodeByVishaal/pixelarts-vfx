import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CursorEffect = () => {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const followerRef = useRef<HTMLDivElement | null>(null);

    const posX = useRef(0);
    const posY = useRef(0);
    const mouseX = useRef(0);
    const mouseY = useRef(0);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const cards = document.querySelectorAll(".cursor-target");

        if (!cursor || !follower) return;

        const moveCursor = (e: MouseEvent) => {
            mouseX.current = e.pageX;
            mouseY.current = e.pageY;
        };

        const animateFollower = () => {
            posX.current += (mouseX.current - posX.current) / 9;
            posY.current += (mouseY.current - posY.current) / 9;

            gsap.set(follower, { left: posX.current - 20, top: posY.current - 20 });
            gsap.set(cursor, { left: mouseX.current, top: mouseY.current });

            requestAnimationFrame(animateFollower);
        };

        document.addEventListener("mousemove", moveCursor);
        animateFollower();

        cards.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                cursor.classList.add("active");
                follower.classList.add("active");
            });

            el.addEventListener("mouseleave", () => {
                cursor.classList.remove("active");
                follower.classList.remove("active");
            });
        });

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            cards.forEach((el) => {
                el.removeEventListener("mouseenter", () => { });
                el.removeEventListener("mouseleave", () => { });
            });
        };
    }, []);

    return (
        <div className="cursor-hover-parent">
            <div className="cursor" ref={cursorRef} />
            <div className="cursor-follower" ref={followerRef} />
        </div>
    );
};

export default CursorEffect;
