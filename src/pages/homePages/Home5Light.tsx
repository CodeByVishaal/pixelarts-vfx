import { Helmet } from "react-helmet-async";
import BannerV4 from "../../components/banner/BannerV4";
import LightClassV3 from "../../components/classes/LightClassV3";
import HeaderV5 from "../../components/header/HeaderV5";
import ThemeLight from "../../components/switcher/ThemeLight";

const Home5Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 5 Light</title>
            </Helmet>

            <HeaderV5 />
            <BannerV4 />
            <LightClassV3 />
            <ThemeLight />
        </>
    );
};

export default Home5Light;