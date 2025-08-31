import { Helmet } from "react-helmet-async";
import AboutV4 from "../../components/about/AboutV4";
import CursorEffect from "../../components/animation/CursorEffect";
import TextAnimationV1 from "../../components/animation/TextAnimationV1";
import BannerV6 from "../../components/banner/BannerV6";
import BlogV2 from "../../components/blog/BlogV2";
import BrandV2 from "../../components/brand/BrandV2";
import FunFactV1 from "../../components/fact/FunFactV1";
import FooterV2 from "../../components/footer/FooterV2";
import HeaderV2 from "../../components/header/HeaderV2";
import PortfolioV2 from "../../components/portfolio/PortfolioV2";
import ServicesV4 from "../../components/services/ServicesV4";
import TestimonialV2 from "../../components/testimonial/TestimonialV2";
import ZoomVideoV1 from "../../components/videos/ZoomVideoV1";
import ThemeLight from "../../components/switcher/ThemeLight";

const Home7Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 7 Light</title>
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV2 />
                <BannerV6 />
                <TextAnimationV1 />
                <BrandV2 />
                <AboutV4 sectionClass='default-padding' />
                <ServicesV4 />
                <PortfolioV2 hasTitle={true} sectionClass='default-padding bg-gray' />
                <FunFactV1 sectionClass="default-padding" />
                <ZoomVideoV1 />
                <TestimonialV2 sectionClass="text-center bg-gray" />
                <BlogV2 />
                <FooterV2 />
                <CursorEffect />
                <ThemeLight />
            </div>
        </>
    );
};

export default Home7Light;