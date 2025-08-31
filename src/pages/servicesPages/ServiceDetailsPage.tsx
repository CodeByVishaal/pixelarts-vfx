import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServiceDetailsContent from "../../components/services/ServiceDetailsContent";
import ServicesV1Data from "../../../src/assets/jsonData/services/ServicesV1Data.json"
import { Helmet } from "react-helmet-async";
import ThemeDark from "../../components/switcher/ThemeDark";

const ServiceDetailsPage = () => {

    const { id } = useParams();
    const data = ServicesV1Data.find(service => service.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dixor - Service Details</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Our Services' breadCrumb='service-details' />
                {data && <ServiceDetailsContent serviceInfo={data} sectionClass='default-padding-bottom' />}
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default ServiceDetailsPage;