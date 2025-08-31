import { Helmet } from "react-helmet-async";
import HeaderV1 from "../../components/header/HeaderV1";
import AccordionV1 from "../../components/accordion/AccordionV1";
import ThemeLight from "../../components/switcher/ThemeLight";

const Home12Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 12 Light</title>
            </Helmet>

            <HeaderV1 />
            <AccordionV1 />
            <ThemeLight />
        </>
    );
};

export default Home12Light;