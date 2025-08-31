import { useState } from 'react';

const useSearchBar = () => {
    const [openSearch, setOpenSearch] = useState<boolean>(false);

    const searchOpen = () => {
        setOpenSearch(true);
        const topSearchElement = document.querySelector('.top-search');
        if (topSearchElement) {
            topSearchElement.classList.add('smooth-search');
        }
    };

    const searchClose = () => {
        setOpenSearch(false);
        const topSearchElement = document.querySelector('.top-search');
        if (topSearchElement) {
            topSearchElement.classList.remove('smooth-search');
        }
    };

    return { openSearch, searchOpen, searchClose };
};

export default useSearchBar;

