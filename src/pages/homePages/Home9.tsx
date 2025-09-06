import { Helmet } from "react-helmet-async";
import AboutV1 from "../../components/about/AboutV1";
import BannerV1 from "../../components/banner/BannerV1";
import MultiSection from "../../components/multi/MultiSection";

import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServicesV1 from "../../components/services/ServicesV1";
import ThemeDark from "../../components/switcher/ThemeDark";
import TestimonialV1 from "../../components/testimonial/TestimonialV1";

const Home9 = () => {
  return (
    <>
      <LayoutV1>
        <Helmet>
          <title>Pixel Arts</title>
        </Helmet>

        <div className="smooth-scroll-container">
          <BannerV1 />
          <AboutV1 />
          <ServicesV1 sectionClass="default-padding bg-gray" hasTitle={true} />

          <TestimonialV1 />

          <MultiSection />

          <DarkClass />
          <ThemeDark />
        </div>
      </LayoutV1>
    </>
  );
};

export default Home9;
