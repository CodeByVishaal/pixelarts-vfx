import { useEffect } from 'react';

const DarkClassV5 = () => {

    useEffect(() => {
        document.body.classList.add("bg-dark", "fixed-cursor");

        return () => {
            document.body.classList.remove("bg-dark", "fixed-cursor");
        };
    }, []);

    return (
        <>
        </>
    );
};

export default DarkClassV5;