import { useEffect } from 'react';

const DarkClassV3 = () => {

    useEffect(() => {
        document.body.classList.add("bg-fixed");
        document.body.style.backgroundImage = "url(/assets/img/shape/2.jpg)";

        return () => {
            document.body.classList.remove("bg-fixed");
            document.body.style.backgroundImage = "";
        };
    }, []);

    return (
        <>
            <div className="light-banner-active bg-gray bg-fixed" style={{ backgroundImage: 'url(/assets/img/shape/6.jpg)' }} />
        </>
    );
};

export default DarkClassV3;