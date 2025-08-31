import SkillProgressData from "../../../src/assets/jsonData/progress/SkillProgressData.json"
import SkillProgress from "../process/SkillProgress";

const TeamQualification = () => {
    return (
        <>
            <div className="team-qualifcations default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="qualification-grid">
                                <h2>Work Expertise</h2>
                                <div className="qualification-item">
                                    <i className="flaticon-data-management" />
                                    <h4>Database Design</h4>
                                </div>
                                <div className="qualification-item">
                                    <i className="flaticon-marketing-agent" />
                                    <h4>Digital marketing</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="skill-items pl-50 pl-md-0 pl-xs-0 mt-md-50 mt-xs-30">
                                <h2>Personal Skills</h2>
                                {SkillProgressData.map(skill =>
                                    <SkillProgress skill={skill} key={skill.id} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamQualification;