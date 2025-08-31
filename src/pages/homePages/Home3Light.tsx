import { Helmet } from "react-helmet-async";
import AboutV3 from "../../components/about/AboutV3";
import BannerV9 from "../../components/banner/BannerV9";
import BlogV2 from "../../components/blog/BlogV2";
import FooterV3 from "../../components/footer/FooterV3";
import HeaderV3 from "../../components/header/HeaderV3";
import PortfolioV3Light from "../../components/portfolio/PortfolioV3Light";
import PriceV1 from "../../components/price/PriceV1";
import TestimonialV3 from "../../components/testimonial/TestimonialV3";
import WhyChooseV2 from "../../components/whyChoose/WhyChooseV2";
import ThemeLight from "../../components/switcher/ThemeLight";
import ServicesV3 from "../../components/services/ServicesV3";

const Home3Light = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 3 Light</title>
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV3 />
                <BannerV9 />
                <ServicesV3 sectionClass='default-padding' hasTitle={true} />
                <AboutV3 />
                <PortfolioV3Light hasTitle={true} sectionClass='default-padding bg-gray' />
                <PriceV1 />
                <WhyChooseV2 sectionClass='bg-gray' />
                <TestimonialV3 />
                <BlogV2 sectionClass='bg-gray' />
                <FooterV3 />
                <ThemeLight />
            </div>
        </>
    );
};

export default Home3Light;