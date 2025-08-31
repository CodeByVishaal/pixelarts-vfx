import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import ClientsV1 from "../../components/clients/ClientsV1";
import FunFactV1 from "../../components/fact/FunFactV1";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServicesV2 from "../../components/services/ServicesV2";
import ThemeLight from "../../components/switcher/ThemeLight";
import TestimonialV2 from "../../components/testimonial/TestimonialV2";

const Services2LightPage = () => {
  return (
    <>
      <Helmet>
        <title>Dixor - Services 2 Light</title>
      </Helmet>

      <LayoutV1>
        <Breadcrumb title="Our Services" breadCrumb="services-2-light" />
        <ServicesV2 />
        <FunFactV1 sectionClass="default-padding" />
        <ClientsV1 sectionClass="bg-gray" />
        <TestimonialV2 />
        <ThemeLight />
      </LayoutV1>
    </>
  );
};

export default Services2LightPage;
