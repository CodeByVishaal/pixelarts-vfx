import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import TeamV1 from "../../components/team/TeamV1";
import DarkClass from "../../components/classes/DarkClass";
import ThemeDark from "../../components/switcher/ThemeDark";

const TeamPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Team</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Team Experts' breadCrumb='team' />
                <TeamV1 sectionClass='bg-gray' />
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default TeamPage;