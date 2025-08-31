import LayoutV1 from '../../components/layouts/LayoutV1';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import PortfolioV6Light from '../../components/portfolio/PortfolioV6Light';
import { Helmet } from 'react-helmet-async';
import ThemeLight from '../../components/switcher/ThemeLight';

const Project3LightPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Project 3 Light</title>
            </Helmet>

            <div className="project-page">
                <LayoutV1>
                    <Breadcrumb title='Case Studies' breadCrumb='Project-3-light' />
                    <PortfolioV6Light sectionClass='bg-gray' />
                    <ThemeLight />
                </LayoutV1>
            </div>
        </>
    );
};

export default Project3LightPage;