import { Helmet } from "react-helmet-async";
import BannerV4 from "../../components/banner/BannerV4";
import DarkClassV3 from "../../components/classes/DarkClassV3";
import HeaderV5 from "../../components/header/HeaderV5";
import ThemeDark from "../../components/switcher/ThemeDark";
import DarkClass from "../../components/classes/DarkClass";

const Home5 = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 5</title>
            </Helmet>

            <HeaderV5 />
            <BannerV4 />
            <DarkClassV3 />
            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default Home5;