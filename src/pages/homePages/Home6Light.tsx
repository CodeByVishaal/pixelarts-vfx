import { Helmet } from "react-helmet-async";
import AboutV7 from "../../components/about/AboutV7";
import BlogV1 from "../../components/blog/BlogV1";
import FunFactV1 from "../../components/fact/FunFactV1";
import FooterV2 from "../../components/footer/FooterV2";
import HeaderV6 from "../../components/header/HeaderV6";
import PartnerV2 from "../../components/partner/PartnerV2";
import PortfolioV2 from "../../components/portfolio/PortfolioV2";
import ServicesV2 from "../../components/services/ServicesV2";
import TestimonialV2 from "../../components/testimonial/TestimonialV2";
import ThemeLight from "../../components/switcher/ThemeLight";
import BannerV10 from "../../components/banner/BannerV10";

const Home6Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 6 Light</title>
            </Helmet>

            <HeaderV6 />
            <BannerV10 />
            <AboutV7 />
            <PartnerV2 sectionClass='bg-gray' />
            <ServicesV2 sectionClass='default-padding-top' hasTitle={true} />
            <PortfolioV2 sectionClass='default-padding bg-gray' hasTitle={true} />
            <TestimonialV2 />
            <FunFactV1 sectionClass='default-padding bg-gray' />
            <BlogV1 />
            <FooterV2 />
            <ThemeLight />
        </>
    );
};

export default Home6Light;