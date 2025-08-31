import AwardV1Data from '../../../src/assets/jsonData/award/AwardV1Data.json'
import SingleAwardV1 from './SingleAwardV1';
import SplitText from "../animation/SplitText.jsx"

interface DataType {
    sectionClass?: string
}

const AwardV1 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`award-area ${sectionClass ? sectionClass : ""}`} style={{ backgroundImage: 'url(/assets/img/shape/7.png)' }}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-6">
                            <h4 className="sub-title">Our Award</h4>
                            <h2 className="title split-text">
                                <SplitText
                                    className="title"
                                    delay={120}
                                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                    easing="easeOutCubic"
                                    threshold={0.2}
                                    rootMargin="-50px"
                                >
                                    Award we achieve
                                </SplitText>
                            </h2>
                        </div>
                        {AwardV1Data.map(item =>
                            <div className="col-lg-6" key={item.id}>
                                <SingleAwardV1 item={item} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AwardV1;