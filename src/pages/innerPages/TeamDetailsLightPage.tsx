import { useParams } from "react-router-dom";
import AchievementAward from "../../components/awards/AchievementAward";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TeamDetails from "../../components/team/TeamDetails";
import TeamQualification from "../../components/team/TeamQualification";
import TeamV1Data from "../../../src//assets/jsonData/team/TeamV1Data.json"
import { Helmet } from "react-helmet-async";
import ThemeLight from "../../components/switcher/ThemeLight";

const TeamDetailsLightPage = () => {

    const { id } = useParams();
    const data = TeamV1Data.find(team => team.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dixor - Team Details Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Team Experts' breadCrumb='team-details-light' />
                {data && <TeamDetails teamInfo={data} sectionClass='default-padding-bottom' />}
                <AchievementAward />
                <TeamQualification />
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default TeamDetailsLightPage;