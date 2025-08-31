import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProjectDetailsLightContent from "../../components/project/ProjectDetailsLightContent";
import PortfolioV4Data from "../../../src/assets/jsonData/portfolio/PortfolioV4Data.json";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ThemeLight from "../../components/switcher/ThemeLight";

const ProjectDetailsLightPage = () => {

    const { id } = useParams();
    const data = PortfolioV4Data.find(portfolio => portfolio.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dixor - Project Details Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Case Studies' breadCrumb='project-details-light' />
                {data && <ProjectDetailsLightContent projectInfo={data} totalProjects={PortfolioV4Data.length} />}
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default ProjectDetailsLightPage;