import { MouseEvent } from 'react';

const handleSmoothScroll = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ behavior: 'smooth', top: 0 });
};

export default handleSmoothScroll;