import banner6 from "/assets/img/banner/6.jpg";
import portfolio45 from "/assets/img/portfolio/45.jpg";
import portfolio46 from "/assets/img/portfolio/46.jpg";
import ServicesV1Data from "../../../src/assets/jsonData/services/ServicesV1Data.json";
import { Link } from "react-router-dom";

interface DataType {
    title?: string;
}

interface ServiceDetailsProps {
    serviceInfo?: DataType;
    sectionClass?: string;
}

const ServiceDetailsContentLight = ({ serviceInfo, sectionClass }: ServiceDetailsProps) => {
    const { title } = serviceInfo || {};

    return (
        <>
            <div className={`services-details-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="services-details-items">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="service-single-thumb">
                                    <img src={banner6} alt="Thumb" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-7">
                                <h2>{title}</h2>
                                <p>
                                    We denounce with righteous indige nation and dislike men who are so beguiled and demo realized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue cannot foresee. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled data structures manages data in technology. Dislike men who are so beguiled and demo realized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble.
                                </p>
                            </div>
                            <div className="col-lg-5 pl-60 pl-md-15 pl-xs-15">
                                <p>
                                    New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. These cases are perfectly simple and easy to distinguish.
                                </p>
                                <ul className="feature-list-item">
                                    <li>Social media marketing</li>
                                    <li>Search engine optimization (seo)</li>
                                    <li>Public Relations</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-50 mt-xs-20">
                            <div className="process-style-two">
                                <div className="process-style-two-item">
                                    <span>01</span>
                                    <h4>Project Research</h4>
                                    <p>
                                        Excuse Deal say over contain performance from comparison new melancholy themselves.
                                    </p>
                                </div>
                                <div className="process-style-two-item">
                                    <span>02</span>
                                    <h4>Best Concept</h4>
                                    <p>
                                        Excuse Deal say over contain performance from comparison new melancholy themselves.
                                    </p>
                                </div>
                                <div className="process-style-two-item">
                                    <span>03</span>
                                    <h4>Design Implement</h4>
                                    <p>
                                        Excuse Deal say over contain performance from comparison new melancholy themselves.
                                    </p>
                                </div>
                                <div className="process-style-two-item">
                                    <span>04</span>
                                    <h4>Final Result</h4>
                                    <p>
                                        Excuse Deal say over contain performance from comparison new melancholy themselves.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-80 mt-xs-50 gallery-two-columns">
                            <div className="col-md-6">
                                <img src={portfolio45} alt="Image Not Found" />
                            </div>
                            <div className="col-md-6">
                                <img src={portfolio46} alt="Image Not Found" />
                            </div>
                        </div>
                        <div className="d-grid colums-2 mt-50">
                            <div className="item">
                                <div className="faq-style-one faq-style-two">
                                    <h2 className="mb-30">Any questions find here.</h2>
                                    <div className="accordion" id="faqAccordion">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Business Innovation
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Bennings appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments are off under folly death.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Search Engine Optimization
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Regularity appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments are off under folly death.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Thinking Differently
                                                </button>
                                            </h2>
                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Permanent appetite disposed me an at subjects an. To no indulgence diminution so discovered mr apartments are off under folly death.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <h2>What we do?</h2>
                                <p>
                                    Regular libero tempore, cum soluta nobis est elig endi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda.
                                </p>
                                <p>
                                    Momnis voluptas assumenda est, omnis dolor repelle ndus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.
                                </p>
                            </div>
                        </div>
                        <div className="services-more mt-100 mt-xs-30">
                            <h2 className="mb-20">Most popular services</h2>
                            <div className="row">
                                {ServicesV1Data.slice(0, 3).map(service =>
                                    <div className="col-lg-4 col-md-6" key={service.id}>
                                        <div className="item">
                                            <img src={`/assets/img/icon/${service.iconLight}`} alt="Image Not Found" width={75} height={60} />
                                            <h4><Link to={`/service-details-light/${service.id}`}>{service.title}</Link></h4>
                                            <p>{service.text}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetailsContentLight;