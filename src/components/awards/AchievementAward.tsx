import CountUp from 'react-countup';

const AchievementAward = () => {
    return (
        <>
            <div className="achivement-award-area default-padding overflow-hidden bg-gray">
                <div className="container overflow-hidden">
                    <div className="row align-center">
                        <div className="col-xl-5">
                            <div className="site-title">
                                <h4 className="sub-title">Award & Achivement </h4>
                                <h2 className="title">Awards & Recognitions</h2>
                            </div>
                            <p>
                                Bndulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now premium service has achived.
                            </p>
                            <div className="achivement-fact">
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={38} enableScrollSpy /></div>
                                        <div className="operator">K</div>
                                    </div>
                                    <span className="medium">Completed Projects</span>
                                </div>
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={4} enableScrollSpy /></div>
                                        <div className="operator">M</div>
                                    </div>
                                    <span className="medium">Awesome Clients</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 offset-xl-1">
                            <div className="choose-us-style-two">
                                <div className="award-grid">
                                    <div className="award-item">
                                        <i className="fab fa-behance" />
                                        <h4>Behance Awards </h4>
                                    </div>
                                </div>
                                <div className="award-grid">
                                    <div className="award-item">
                                        <i className="fas fa-layer-group" />
                                        <h4>Design Awards</h4>
                                    </div>
                                    <div className="award-item">
                                        <i className="fab fa-laravel" />
                                        <h4>Coding Awards</h4>
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

export default AchievementAward;