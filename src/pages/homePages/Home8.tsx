import { Helmet } from "react-helmet-async";
import AboutV5 from "../../components/about/AboutV5";
import AwardV1 from "../../components/awards/AwardV1";
import BannerV7 from "../../components/banner/BannerV7";
import BlogV1 from "../../components/blog/BlogV1";
import FooterV4 from "../../components/footer/FooterV4";
import HeaderV2 from "../../components/header/HeaderV2";
import PortfolioV4 from "../../components/portfolio/PortfolioV4";
import ProcessWrapper from "../../components/process/ProcessWrapper";
import ServicesV5 from "../../components/services/ServicesV5";
import TeamV2 from "../../components/team/TeamV2";
import TestimonialV3 from "../../components/testimonial/TestimonialV3";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";

const Home8 = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 8</title>
            </Helmet>

            <HeaderV2 />
            <BannerV7 />
            <ServicesV5 sectionClass='bg-gray' />
            <AboutV5 sectionClass='blurry-shape-left' />
            <PortfolioV4 sectionClass='bg-gray default-padding' hasTitle={true} />
            <ProcessWrapper />
            <TeamV2 />
            <AwardV1 sectionClass='default-padding-top' />
            <TestimonialV3 />
            <BlogV1 sectionClass='bg-gray' />
            <FooterV4 sectionClass='bg-gray' />
            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default Home8