import { Link } from 'react-router-dom';
import team10 from '/assets/img/team/10.jpg';
import team11 from '/assets/img/team/11.jpg';
import team12 from '/assets/img/team/12.jpg';

const BannerV6 = () => {
    return (
        <>
            <div className="banner-style-six-area">
                <div className="container">
                    <div className="banner-six-thumb bg-cover" style={{ backgroundImage: 'url(/assets/img/banner/2.jpg)' }}>
                        <div className="content">
                            <div className="row">
                                <div className="col-lg-8 offset-lg-4">
                                    <div className="banner-six-right-info">
                                        <div className="info">
                                            <h2>Crafting <strong>Digital</strong></h2>
                                            <h2>Experience</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="banner-six-bottom-info">
                                        <h4>What we do</h4>
                                        <p>We are crafting digital success stories</p>
                                        <div className="expert-card">
                                            <div className="thumb">
                                                <img src={team10} alt="Image Not Found" />
                                                <img src={team11} alt="Image Not Found" />
                                                <img src={team12} alt="Image Not Found" />
                                            </div>
                                            <Link to="/team">Meet our experts <i className="fas fa-arrow-right" /></Link>
                                        </div>
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

export default BannerV6;