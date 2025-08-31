import FactV1Data from '../../../src//assets/jsonData/fact/FactV1Data.json';
import SingleFactV1 from './SingleFactV1';

interface DataType {
    sectionClass?: string
}

const FunFactV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`fun-factor-circle-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fun-fact-circle-lists">
                                {FactV1Data.map(fact =>
                                    <SingleFactV1 fact={fact} key={fact.id} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FunFactV1;