import { Helmet } from "react-helmet-async";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import NotFoundContent from "../../components/notFound/Error404Content";
import ThemeDark from "../../components/switcher/ThemeDark";

const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - 404 Not Found</title>
            </Helmet>

            <LayoutV1>
                <NotFoundContent />
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default NotFoundPage;