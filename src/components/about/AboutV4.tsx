import about1 from "/assets/img/about/1.jpg";
import about4 from "/assets/img/about/4.jpg";
import SkillProgressData from "../../../src/assets/jsonData/progress/SkillProgressData.json";
import SkillProgress from "../process/SkillProgress";
import SplitText from "../animation/SplitText.jsx"
import useUpDownScrollV2 from "../../hooks/useUpDownScrollV2";

interface DataType {
    sectionClass?: string
}

const AboutV4 = ({ sectionClass }: DataType) => {

    useUpDownScrollV2(".upDownScrolSlow");

    return (
        <>
            <div className={`about-style-four-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-5">
                            <div className="about-style-four-thumb">
                                <img src={about1} alt="Image Not Found" />
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="about-style-four-info">
                                <div className="content">

                                    <p>
                                        <SplitText
                                            delay={5}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by garret. Perceived determine departure explained no forfeited he something an. Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff.
                                        </SplitText>

                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="progress-style-two">
                                        {SkillProgressData.map(skill =>
                                            <SkillProgress skill={skill} key={skill.id} />
                                        )}
                                    </div>
                                    <div className="thumb upDownScrolSlow">
                                        <img src={about4} alt="Image Not Found" />
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

export default AboutV4;