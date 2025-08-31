import { Helmet } from "react-helmet-async";
import AboutV5 from "../../components/about/AboutV5";
import AwardV1 from "../../components/awards/AwardV1";
import BannerV7 from "../../components/banner/BannerV7";
import BlogV1 from "../../components/blog/BlogV1";
import FooterV4 from "../../components/footer/FooterV4";
import HeaderV2 from "../../components/header/HeaderV2";
import PortfolioV4 from "../../components/portfolio/PortfolioV4";
import ServicesV5 from "../../components/services/ServicesV5";
import TeamV2 from "../../components/team/TeamV2";
import TestimonialV3 from "../../components/testimonial/TestimonialV3";
import ThemeLight from "../../components/switcher/ThemeLight";

const Home8Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 8 Light</title>
            </Helmet>

            <HeaderV2 />
            <BannerV7 />
            <ServicesV5 sectionClass='bg-gray' />
            <AboutV5 />
            <PortfolioV4 hasTitle={true} />
            <TeamV2 />
            <TestimonialV3 />
            <AwardV1 sectionClass='default-padding bg-gray' />
            <BlogV1 />
            <FooterV4 />
            <ThemeLight />
        </>
    );
};

export default Home8Light;