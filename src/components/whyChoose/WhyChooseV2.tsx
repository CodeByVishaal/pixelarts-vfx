import Animate from '../animation/Animate';
import thumb3 from '/assets/img/thumb/3.jpg';

interface DataType {
    sectionClass?: string
}

const WhyChooseV2 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`default-padding bg-gray ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5">
                            <div className="thumb-style-one">
                                <img src={thumb3} alt="Image Not Found" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="choose-us-style-one">
                                <div className="pl-80 pl-md-0 pl-xs-0">
                                    <h4 className="sub-title">Why Dixor</h4>
                                    <h2 className="title">Unlock Revenue Growth</h2>
                                    <div className="faq-style-one accordion mt-30" id="faqAccordion">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Business Innovation
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                                <div className="accordion-body">
                                                    <p>
                                                        Bennings appetite disposed me an at subjects an. To no
                                                        indulgence diminution so discovered mr apartments. Are off
                                                        under folly death wrote cause.
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
                                                        Cennings appetite disposed me an at subjects an. To no
                                                        indulgence diminution so discovered mr apartments. Are off
                                                        under folly death wrote cause.
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
                                                        Tennings appetite disposed me an at subjects an. To no
                                                        indulgence diminution so discovered mr apartments. Are off
                                                        under folly death wrote cause.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="award-items">
                                    <Animate className='animate__animated animate__fadeInLeft'>
                                        <div className="award-item">
                                            <i className="fab fa-behance" />
                                            <h4>Behance Awards </h4>
                                        </div>
                                    </Animate>

                                    <Animate className='animate__animated animate__fadeInLeft' delay="100ms">
                                        <div className="award-item">
                                            <i className="fas fa-layer-group" />
                                            <h4>Design Awards</h4>
                                        </div>
                                    </Animate>

                                    <Animate className='animate__animated animate__fadeInLeft' delay="200ms">
                                        <div className="award-item">
                                            <i className="fab fa-laravel" />
                                            <h4>Coding Awards</h4>
                                        </div>
                                    </Animate>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhyChooseV2;