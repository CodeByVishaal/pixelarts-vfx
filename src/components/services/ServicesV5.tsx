import ServicesV5Data from "../../../src/assets/jsonData/services/ServicesV5Data.json"
import SingleServiceV5 from "./SingleServiceV5";

interface DataType {
    sectionClass?: string
}

const ServicesV5 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`services-style-five-area default-padding ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-23">
                            <div className="heading-fixed">
                                <h2 className="fixed-heading">Services</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="service-style-five-items pb-30 pb-md-0 pb-xs-0">
                                <ul>
                                    {ServicesV5Data.map(service =>
                                        <SingleServiceV5 service={service} key={service.id} />
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesV5;