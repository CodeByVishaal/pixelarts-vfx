import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ServicesV1Data from "../../../src/assets/jsonData/services/ServicesV1Data.json";
import { Helmet } from "react-helmet-async";
import ThemeLight from "../../components/switcher/ThemeLight";
import ServiceDetailsContent from "../../components/services/ServiceDetailsContent";

const ServiceDetailsLightPage = () => {

    const { id } = useParams();
    const data = ServicesV1Data.find(service => service.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dixor - Service Details Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Our Services' breadCrumb='service-details-light' />
                {data && <ServiceDetailsContent serviceInfo={data} sectionClass='default-padding-bottom' />}
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default ServiceDetailsLightPage;