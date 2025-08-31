import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSidebarInfo = () => {
    const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
    const location = useLocation();

    const openInfoBar = (): void => {
        setIsInfoOpen(true);
        document.body.classList.add('on-side');
    };

    const closeInfoBar = (): void => {
        setIsInfoOpen(false);
        document.body.classList.remove('on-side');
    };

    useEffect(() => {
        const handleRouteChange = () => {
            console.log("Route changed");
            closeInfoBar(); // Close the info bar and remove the class
        };

        handleRouteChange(); // Trigger on initial mount when route changes

        // Optionally, you can also add a listener for route changes
        // This is useful if you want to handle route changes dynamically
        return () => {
            // Cleanup if needed
        };
    }, [location.pathname]); // Listen for changes in the URL path

    return { isInfoOpen, openInfoBar, closeInfoBar };
};

export default useSidebarInfo;