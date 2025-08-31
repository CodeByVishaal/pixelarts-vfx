import ProcessV1Data from '../../../src/assets/jsonData/process/ProcessV1Data.json';
import SingleProcessV1Light from './SingleProcessV1Light';

interface DataType {
    sectionClass?: string
}

const ProcessV1Light = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`process-style-one-items ${sectionClass ? sectionClass : ""}`}>
                <div className="row">
                    {ProcessV1Data.map(process =>
                        <div className="col-lg-3 col-md-6 process-style-one-item" key={process.id}>
                            <SingleProcessV1Light process={process} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProcessV1Light;