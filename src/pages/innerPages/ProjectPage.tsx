import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import PortfolioV2 from "../../components/portfolio/PortfolioV2";
import ThemeDark from "../../components/switcher/ThemeDark";

const ProjectPage = () => {
  return (
    <>
      <Helmet>
        <title>Pixel Arts - VFX</title>
      </Helmet>

      <LayoutV1>
        <Breadcrumb title="Our Projects" breadCrumb="Projects" />
        <PortfolioV2 moreBtn={true} sectionClass="default-padding-bottom" />
        <DarkClass />
        <ThemeDark />
      </LayoutV1>
    </>
  );
};

export default ProjectPage;
