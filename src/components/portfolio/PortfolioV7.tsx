import { Link } from "react-router-dom";
import PortfolioV4Data from "../../assets/jsonData/portfolio/PortfolioV4Data.json"
import SinglePortfolioV7 from "./SinglePortfolioV7";

const PortfolioV7 = () => {
    return (
        <>
            <div className="portfolio-style-six-area default-padding bg-gray">
                <div className="container">
                    <div className="portfolio-style-six-items title-animation">
                        <div className="portfolio-style-six-items">
                            <div className="row gutter-xl">
                                {PortfolioV4Data.slice(8, 14).map(portfolio =>
                                    <div className="col-lg-6 portfolio-style-six-item">
                                        <SinglePortfolioV7 portfolio={portfolio} key={portfolio.id} />
                                    </div>
                                )}
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center">
                                        <Link className="btn-round-animation dark mt-120" to="/project">Load More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioV7;