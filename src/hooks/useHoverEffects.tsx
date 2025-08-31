import { useState, useCallback } from "react";

const useHoverEffects = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>();

    const handleMouseEnter = useCallback((index: number | undefined) => {
        if (index !== undefined) {
            // Set activeIndex to the new index when hovering over a new item
            setActiveIndex(index);
            setHoveredIndex(index); // Also set hoveredIndex
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        // Do not reset activeIndex here
        setHoveredIndex(null);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, index: number | undefined) => {
        if (index !== undefined) {
            setHoveredIndex(index);
            const hoverWrapper = document.querySelector(`.service-hover-wrapper-${index}`) as HTMLElement | null;
            if (hoverWrapper) {
                hoverWrapper.style.opacity = "1";
                hoverWrapper.style.transform = "translate(-100%, -50%)";
                hoverWrapper.style.left = `${e.clientX}px`;
            }
        }
    }, []);

    const handleMouseLeaveWrapper = useCallback((index: number | undefined) => {
        if (index !== undefined) {
            const hoverWrapper = document.querySelector(`.service-hover-wrapper-${index}`) as HTMLElement | null;
            if (hoverWrapper) {
                hoverWrapper.style.opacity = "0";
                hoverWrapper.style.transform = "translate(-50%, -50%)";
            }
        }
    }, []);

    return {
        activeIndex,
        hoveredIndex,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseMove,
        handleMouseLeaveWrapper,
    };
};

export default useHoverEffects;