import illustration6 from '/assets/img/illustration/6.png';
import thumb10 from '/assets/img/thumb/10.jpg';
import icon12 from '/assets/img/icon/12.png';
import icon13 from '/assets/img/icon/13.png';
import icon31 from '/assets/img/icon/31.png';
import icon32 from '/assets/img/icon/32.png';
import { Link } from 'react-router-dom';
import useUpDownScroll from '../../hooks/useUpDownScroll';

interface DataType {
    sectionClass?: string
}

const AboutV5 = ({ sectionClass }: DataType) => {
    useUpDownScroll(".upDownScrol");

    return (
        <>
            <div className={`about-style-five-area default-padding overflow-hidden ${sectionClass ? sectionClass : ""}`}>
                <div className="shape-right-bottom upDownScrol">
                    <img src={illustration6} alt="Image Not Found" />
                </div>
                <div className="container">
                    <div className="about-five-one-info">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5">
                                <div className="about-style-five-content" style={{ backgroundImage: 'url(/assets/img/shape/11.png)' }}>
                                    <div className="content">
                                        <h2>670+ Project <br /> Launched</h2>
                                        <p>
                                            Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves.
                                        </p>
                                        <Link to="#"><i className="fas fa-long-arrow-right" /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-7 pl-50 pl-md-15 pl-xs-15">
                                <div className="banner-style-five-info">
                                    <div className="d-grid">
                                        <div className="thumb">
                                            <img src={thumb10} alt="Image Not Found" />
                                        </div>
                                        <ul className="list-style-four">
                                            <li>
                                                <div className="icon">
                                                    <img className="regular-img" src={icon12} alt="Image Not Found" />
                                                    <img className="light-img" src={icon31} alt="Image Not Found" />
                                                </div>
                                                <div className="info">
                                                    <h4>Motion Graphics</h4>
                                                    <p>
                                                        Excellence projects regus remarkably on estimating. Side in so life past are awesome dine. Melancholy themselves.
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <img className='regular-img' src={icon13} alt="Image Not Found" />
                                                    <img className="light-img" src={icon32} alt="Image Not Found" />
                                                </div>
                                                <div className="info">
                                                    <h4>3D Rendering</h4>
                                                    <p>
                                                        Detailing projects regus remarkably on estimating. Side in so life past are awesome dine. Melancholy themselves.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
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

export default AboutV5;