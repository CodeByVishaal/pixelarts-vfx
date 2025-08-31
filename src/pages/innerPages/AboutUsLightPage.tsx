import { Helmet } from "react-helmet-async";
import AboutV6 from "../../components/about/AboutV6";
import FunFactV1 from "../../components/fact/FunFactV1";
import LayoutV1 from "../../components/layouts/LayoutV1";
import PartnerV2 from "../../components/partner/PartnerV2";
import TeamV1 from "../../components/team/TeamV1";
import TestimonialV3 from "../../components/testimonial/TestimonialV3";
import ThemeLight from "../../components/switcher/ThemeLight";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

const AboutUsLightPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - About Us Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='About Company' breadCrumb='About' />
                <AboutV6 sectionClass="default-padding-bottom" />
                <FunFactV1 sectionClass='default-padding-bottom' />
                <PartnerV2 sectionClass='bg-gray' />
                <TeamV1 hasTitle={true} />
                <TestimonialV3 />
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default AboutUsLightPage;