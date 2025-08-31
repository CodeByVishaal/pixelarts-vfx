import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServicesV5 from "../../components/services/ServicesV5";
import ThemeDark from "../../components/switcher/ThemeDark";

const Services4Page = () => {
  return (
    <>
      <Helmet>
        <title>Pixer Arts</title>
      </Helmet>

      <LayoutV1>
        <Breadcrumb title="Our Services" breadCrumb="services" />
        <ServicesV5 sectionClass="bg-gray" />
        <DarkClass />
        <ThemeDark />
      </LayoutV1>
    </>
  );
};

export default Services4Page;
