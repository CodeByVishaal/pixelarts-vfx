import PriceV2Data from "../../assets/jsonData/price/PriceV2Data.json"
import SinglePriceV2 from "./SinglePriceV2";

const PriceV3 = () => {
    return (
        <>
            <div id="pricing" className="pricing-style-two-area default-padding bottom-less bg-gray">
                <div className="container">
                    <div className="pricing-style-two-items">
                        <div className="tab-content pricing-tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="nav-id-1">
                                <div className="row">
                                    {PriceV2Data.monthlyPlans.map(plan =>
                                        <div className="col-xl-4 col-lg-6 col-md-6 mb-30" key={plan.id}>
                                            <SinglePriceV2 plan={plan} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="nav-id-2">
                                <div className="row">
                                    {PriceV2Data.yearlyPlans.map(plan =>
                                        <div className="col-xl-4 col-lg-6 col-md-6 mb-30" key={plan.id}>
                                            <SinglePriceV2 plan={plan} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PriceV3;