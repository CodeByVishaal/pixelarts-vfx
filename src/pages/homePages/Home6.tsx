import { Helmet } from "react-helmet-async";
import AboutV7 from "../../components/about/AboutV7";
import CursorEffect from "../../components/animation/CursorEffect";
import BannerV10 from "../../components/banner/BannerV10";
import BlogV1 from "../../components/blog/BlogV1";
import FunFactV1 from "../../components/fact/FunFactV1";
import FooterV4 from "../../components/footer/FooterV4";
import HeaderV6 from "../../components/header/HeaderV6";
import PartnerV2 from "../../components/partner/PartnerV2";
import PortfolioV2 from "../../components/portfolio/PortfolioV2";
import ServicesV2 from "../../components/services/ServicesV2";
import TestimonialV2 from "../../components/testimonial/TestimonialV2";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";

const Home6 = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 6</title>
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV6 />
                <BannerV10 />
                <AboutV7 sectionClass='bg-gray' />
                <PartnerV2 />
                <ServicesV2 sectionClass='default-padding-top bg-gray' hasTitle={true} />
                <PortfolioV2 sectionClass='default-padding' hasTitle={true} />
                <TestimonialV2 sectionClass='bg-gray' />
                <FunFactV1 sectionClass='default-padding' />
                <BlogV1 sectionClass='bg-gray' />
                <CursorEffect />
                <FooterV4 />
                <DarkClass />
                <ThemeDark />
            </div>
        </>
    );
};

export default Home6;