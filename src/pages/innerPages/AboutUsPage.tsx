import { Helmet } from "react-helmet-async";
import AboutV6 from "../../components/about/AboutV6";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import ClientsV1 from "../../components/clients/ClientsV1";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeDark from "../../components/switcher/ThemeDark";
import TestimonialV3 from "../../components/testimonial/TestimonialV3";

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>Pixel Arts</title>
      </Helmet>

      <LayoutV1>
        <Breadcrumb title="About Company" breadCrumb="About" />
        <AboutV6 sectionClass="bg-gray default-padding" />
        <ClientsV1 sectionClass="bg-gray" />
        <TestimonialV3 />
        <DarkClass />
        <ThemeDark />
      </LayoutV1>
    </>
  );
};

export default AboutUsPage;
