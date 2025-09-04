import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import MovieGallery from "../../components/MovieGallery";
import SeriesGallery from "../../components/SeriesGallery";
import ThemeDark from "../../components/switcher/ThemeDark";

const ProjectPage = () => {
  return (
    <>
      <Helmet>
        <title>Pixel Arts - VFX</title>
      </Helmet>

      <LayoutV1>
        <Breadcrumb title="Our Projects" breadCrumb="Projects" />
        <MovieGallery />
        <SeriesGallery />
        <DarkClass />
        <ThemeDark />
      </LayoutV1>
    </>
  );
};

export default ProjectPage;
