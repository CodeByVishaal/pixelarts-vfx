import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TeamV1 from "../../components/team/TeamV1";
import ThemeLight from "../../components/switcher/ThemeLight";

const TeamLightPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Team Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Team Experts' breadCrumb='team-light' />
                <TeamV1 sectionClass='bg-gray' />
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default TeamLightPage;