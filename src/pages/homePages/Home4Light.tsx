import { Helmet } from "react-helmet-async";
import CursorEffect from "../../components/animation/CursorEffect";
import BannerV3 from "../../components/banner/BannerV3";
import HeaderV4 from "../../components/header/HeaderV4";
import ThemeLight from "../../components/switcher/ThemeLight";

const Home4Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 4 Light</title>
            </Helmet>

            <HeaderV4 />
            <BannerV3 />
            <CursorEffect />
            <ThemeLight />
        </>
    );
};

export default Home4Light;