import { useCallback } from 'react';

const useHoverEffect = () => {
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        const wrapper = e.currentTarget.querySelector('.image-hover-wrapper') as HTMLElement;
        const image = e.currentTarget.querySelector('.image-hover-placeholder') as HTMLElement;
        if (wrapper && image) {
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'translateX(-50px) rotate(-8deg)';
            image.style.transform = 'scale(1, 1)';
        }
    }, []);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        const wrapper = e.currentTarget.querySelector('.image-hover-wrapper') as HTMLElement;
        const image = e.currentTarget.querySelector('.image-hover-placeholder') as HTMLElement;
        if (wrapper && image) {
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'translateX(100px) rotate(8deg)';
            image.style.transform = 'scale(0.5, 0.5)';
        }
    }, []);

    return { handleMouseMove, handleMouseLeave };
};

export default useHoverEffect