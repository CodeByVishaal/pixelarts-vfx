import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import PortfolioV6 from "../../components/portfolio/PortfolioV6";
import ThemeDark from "../../components/switcher/ThemeDark";

const Project3Page = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Project 3</title>
            </Helmet>

            <div className="project-page">
                <LayoutV1>
                    <Breadcrumb title='Case Studies' breadCrumb='Project-3' />
                    <PortfolioV6 />
                    <DarkClass />
                    <ThemeDark />
                </LayoutV1>
            </div>
        </>
    );
};

export default Project3Page;