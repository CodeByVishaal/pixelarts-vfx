import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import QuickContact from "../../components/contact/QuickContact";
import FaqV1 from "../../components/faq/FaqV1";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeLight from "../../components/switcher/ThemeLight";

const FaqLightPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Faq Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Frequently asked question' breadCrumb='faq-light' />
                <FaqV1  sectionClass='bg-gray' />
                <QuickContact title='Need' titleBold='Help?' sectionClass='bg-theme' />
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default FaqLightPage;