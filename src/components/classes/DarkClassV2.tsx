import { useEffect } from 'react';

const DarkClassV2 = () => {

    useEffect(() => {
        document.body.classList.add("bg-fixed", "fixed-cursor");
        document.body.style.backgroundImage = "url('/assets/img/shape/1.jpg')";

        return () => {
            document.body.classList.remove("bg-fixed", "fixed-cursor");
            // document.body.style.backgroundImage = "";
            document.body.style.backgroundImage = "url('/assets/img/shape/1.jpg')";
        };
    }, []);

    return (
        <>
            <div className="light-banner-active bg-gray bg-cover" style={{ backgroundImage: 'url(/assets/img/shape/6.jpg)' }} />

        </>
    );
};

export default DarkClassV2;