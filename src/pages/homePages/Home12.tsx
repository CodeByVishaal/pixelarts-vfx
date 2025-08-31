import { Helmet } from "react-helmet-async";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";
import HeaderV1 from "../../components/header/HeaderV1";
import AccordionV1 from "../../components/accordion/AccordionV1";

const Home12 = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 12</title>
            </Helmet>

            <HeaderV1 />
            <AccordionV1 />
            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default Home12;