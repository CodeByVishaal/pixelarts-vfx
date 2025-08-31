import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import QuickContact from "../../components/contact/QuickContact";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeLight from "../../components/switcher/ThemeLight";

const Team2LightPage = () => {
  return (
    <>
      <Helmet>
        <title>Dixor - Team 2 Light</title>
      </Helmet>

      <LayoutV1>
        <Breadcrumb title="Team Experts" breadCrumb="team-2-light" />
        <QuickContact sectionClass="bg-theme" />
        <ThemeLight />
      </LayoutV1>
    </>
  );
};

export default Team2LightPage;
