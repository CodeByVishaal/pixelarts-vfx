import { Helmet } from "react-helmet-async";
import AboutV3 from "../../components/about/AboutV3";
import AwardV1 from "../../components/awards/AwardV1";
import BannerV9 from "../../components/banner/BannerV9";
import BlogV2 from "../../components/blog/BlogV2";
import ClientsV1 from "../../components/clients/ClientsV1";
import FooterV3 from "../../components/footer/FooterV3";
import HeaderV3 from "../../components/header/HeaderV3";
import PortfolioV3 from "../../components/portfolio/PortfolioV3";
import PriceV1 from "../../components/price/PriceV1";
import ServicesV3 from "../../components/services/ServicesV3";
import TestimonialV3 from "../../components/testimonial/TestimonialV3";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";

const Home3 = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 3</title>
            </Helmet>

            <div className="smooth-scroll-container">
                <HeaderV3 />
                <BannerV9 />
                <ServicesV3 sectionClass='default-padding bg-gray' hasTitle={true} />
                <AboutV3 sectionClass='bg-gray' />
                <PortfolioV3 hasTitle={true} sectionClass='default-padding' />
                <ClientsV1 sectionClass='bg-gray overflow-hidden blurry-shape-left' />
                <PriceV1 />
                <AwardV1 sectionClass='default-padding bg-gray' />
                <TestimonialV3 />
                <BlogV2 sectionClass='bg-gray' />
                <FooterV3 />
                <DarkClass />
                <ThemeDark />
            </div>
        </>
    );
};

export default Home3;