import { Helmet } from "react-helmet-async";
import ThemeLight from "../../components/switcher/ThemeLight";
import HeaderV1 from "../../components/header/HeaderV1";
import BannerV13 from "../../components/banner/BannerV13";
import PortfolioV7 from "../../components/portfolio/PortfolioV7";
import FooterV1 from "../../components/footer/FooterV1";

const Home13Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 13 Light</title>
            </Helmet>

            <HeaderV1 />
            <BannerV13 />
            <PortfolioV7 />
            <FooterV1 />
            <ThemeLight />
        </>
    );
};

export default Home13Light;