import PortfolioV5Data from '../../../src/assets/jsonData/portfolio/PortfolioV5Data.json';
import useUpDownScroll from '../../hooks/useUpDownScroll';
import SinglePortfolioV5 from './SinglePortfolioV5';
import shape2 from "/assets/img/shape/2.png"

interface DataType {
    hasShape?: boolean
}

const PortfolioV5 = ({ hasShape }: DataType) => {

    useUpDownScroll(".upDownScrol");

    return (
        <>
            <div className="portfolio-style-five-area default-padding bg-gray">

                {/* Moving Shape */}
                {hasShape ?
                    <div className="upDownScrol">
                        <img src={shape2} alt="Image Not Found" />
                    </div> : <></>
                }

                <div className="container">
                    <div className="portfolio-style-five-items title-animation">
                        <div className="title-fixed text-center">
                            <h2>Work</h2>
                        </div>
                        <div className="portfolio-style-five-items">
                            <div className="row gutter-xl">
                                {PortfolioV5Data.slice(0, 2).map(portfolio =>
                                    <div className="col-lg-6 portfolio-style-five-item" key={portfolio.id}>
                                        <SinglePortfolioV5 portfolio={portfolio} />
                                    </div>
                                )}
                                <div className="col-lg-10 offset-lg-1">
                                    <div className="row gutter-xl">
                                        {PortfolioV5Data.slice(2, 4).map(portfolio =>
                                            <div className="col-lg-6 portfolio-style-five-item" key={portfolio.id}>
                                                <SinglePortfolioV5 portfolio={portfolio} />
                                            </div>
                                        )}
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

export default PortfolioV5;