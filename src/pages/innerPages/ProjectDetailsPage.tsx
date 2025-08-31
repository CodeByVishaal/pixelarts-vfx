import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ProjectDetailsContent from "../../components/project/ProjectDetailsContent";
import PortfolioV4Data from "../../../src/assets/jsonData/portfolio/PortfolioV4Data.json";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ThemeDark from "../../components/switcher/ThemeDark";

const ProjectDetailsPage = () => {

    const { id } = useParams();
    const data = PortfolioV4Data.find(portfolio => portfolio.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dixor - Project Details</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Case Studies' breadCrumb='project-details' />
                {data && <ProjectDetailsContent projectInfo={data} totalProjects={PortfolioV4Data.length} />}
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ProjectDetailsPage;