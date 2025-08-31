import CountUp from 'react-countup';

const WhyChooseV3 = () => {
    return (
        <>
            <div className="choose-us-style-three-area default-padding">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-xl-4 offset-xl-1 order-xl-last">
                            <div className="choose-us-style-three">
                                <div className="fun-fact">
                                    <div className="counter">
                                        <div className="timer"><CountUp end={40} enableScrollSpy /> </div>
                                        <div className="operator">+</div>
                                    </div>
                                    <h3>We have won 40+ award and we believe in
                                        quality.</h3>
                                </div>
                                <ul className="list-style-three">
                                    <li>
                                        <h4>Top Brand</h4>
                                        <p>
                                            We help brands stand ou visual design
                                        </p>
                                    </li>
                                    <li>
                                        <h4>Skill Developer</h4>
                                        <p>
                                            With more than 12 years real experience.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="award-items-style-two">
                                <div className="award-item-two">
                                    <i className="fab fa-behance" />
                                    <div className="center">
                                        <h4>Behance Awards</h4>
                                        <p>2x Featured design of the week</p>
                                    </div>
                                    <h2>2010</h2>
                                </div>
                                <div className="award-item-two">
                                    <i className="fas fa-layer-group" />
                                    <div className="center">
                                        <h4>Design Awards</h4>
                                        <p>
                                            Craetive Best design of the day
                                        </p>
                                    </div>
                                    <h2>2013</h2>
                                </div>
                                <div className="award-item-two">
                                    <i className="fab fa-vuejs" />
                                    <div className="center">
                                        <h4>Coding Awards</h4>
                                        <p>
                                            Creative agency of the day
                                        </p>
                                    </div>
                                    <h2>2016</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhyChooseV3;