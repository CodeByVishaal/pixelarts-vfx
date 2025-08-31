import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import PortfolioV3 from "../../components/portfolio/PortfolioV3";
import ThemeDark from "../../components/switcher/ThemeDark";

const Project2Page = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Project 2</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Case Studies' breadCrumb='Project-2' />
                <PortfolioV3 sectionClass='default-padding-bottom' />
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default Project2Page;