import { Helmet } from "react-helmet-async";
import HeaderV8 from "../../components/header/HeaderV8";
import BannerV11 from "../../components/banner/BannerV11";
import CursorEffect from "../../components/animation/CursorEffect";
import ThemeLight from "../../components/switcher/ThemeLight";

const Home10Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 10 Light</title>
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV8 />
                <BannerV11 />
                <CursorEffect />
                <ThemeLight />
            </div>
        </>
    );
};

export default Home10Light;