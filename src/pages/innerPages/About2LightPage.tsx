import { Helmet } from "react-helmet-async";
import AboutV4 from "../../components/about/AboutV4";
import FunFactV1 from "../../components/fact/FunFactV1";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TestimonialV2 from "../../components/testimonial/TestimonialV2";
import ZoomVideoV1 from "../../components/videos/ZoomVideoV1";
import WhyChooseV1 from "../../components/whyChoose/WhyChooseV1";
import ThemeLight from "../../components/switcher/ThemeLight";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const About2LightPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - About 2 Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='About Company' breadCrumb='About-2-light' />
                <AboutV4 sectionClass='default-padding-bottom' />
                <FunFactV1 sectionClass='default-padding-bottom' />
                <ZoomVideoV1 />
                <WhyChooseV1 sectionClass='default-padding' />
                <TestimonialV2 sectionClass='bg-gray' />
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default About2LightPage;