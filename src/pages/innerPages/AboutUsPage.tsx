import { Helmet } from "react-helmet-async";
import AboutV6 from "../../components/about/AboutV6";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import ClientsV1 from "../../components/clients/ClientsV1";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServicesV2 from "../../components/services/ServicesV2";
import TestimonialV3 from "../../components/testimonial/TestimonialV3";

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>Pixel Arts</title>
      </Helmet>

      <LayoutV1>
        <Breadcrumb title="About Company" breadCrumb="About" />
        <AboutV6 />
        <ClientsV1 sectionClass="bg-gray" />
        <ServicesV2 />
        <TestimonialV3 sectionClass="bg-gray" />
        <DarkClass />
      </LayoutV1>
    </>
  );
};

export default AboutUsPage;
