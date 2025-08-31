import { Helmet } from "react-helmet-async";
import HeaderV8 from "../../components/header/HeaderV8";
import BannerV12 from "../../components/banner/BannerV12";
import ThemeLight from "../../components/switcher/ThemeLight";

const Home11Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 11</title>
            </Helmet>

            <HeaderV8 />
            <BannerV12 />
            <ThemeLight />
        </>
    );
};

export default Home11Light;