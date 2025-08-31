import { useState, useEffect, useCallback } from 'react';

const useActiveIndexV2 = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const handleMouseEnter = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const handleTouchStart = useCallback((index: number) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 767) {
                setActiveIndex(null);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { activeIndex, handleMouseEnter, handleTouchStart };
};

export default useActiveIndexV2;
