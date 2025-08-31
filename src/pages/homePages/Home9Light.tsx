import { Helmet } from "react-helmet-async";
import AboutV1 from "../../components/about/AboutV1";
import BannerV1 from "../../components/banner/BannerV1";
import BlogV2 from "../../components/blog/BlogV2";
import BrandV1 from "../../components/brand/BrandV1";
import FooterV3 from "../../components/footer/FooterV3";
import HeaderV1 from "../../components/header/HeaderV1";
import MultiSection from "../../components/multi/MultiSection";
import ProjectV2Light from "../../components/project/ProjectV2Light";
import ServicesV1 from "../../components/services/ServicesV1";
import ThemeLight from "../../components/switcher/ThemeLight";
import TestimonialV1 from "../../components/testimonial/TestimonialV1";

const Home9Light = () => {
  return (
    <>
      <Helmet>
        <title>Dixor - Home 9 Light</title>
      </Helmet>

      <HeaderV1 />
      <BannerV1 />
      <BrandV1 />
      <AboutV1 lightMode={true} />
      <ServicesV1 sectionClass="default-padding bg-gray" hasTitle={true} />
      <ProjectV2Light />

      <TestimonialV1 />

      <MultiSection />
      <BlogV2 sectionClass="bg-gray" />
      <FooterV3 />
      <ThemeLight />
    </>
  );
};

export default Home9Light;
