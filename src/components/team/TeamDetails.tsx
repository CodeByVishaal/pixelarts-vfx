import SocialShareV1 from "../social/SocialShareV1";
import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    name?: string;
    designation?: string;
    text?: string;
    age?: string;
    email?: string;
    phone?: string;
}

interface TeamDetailsProps {
    teamInfo: DataType;
    sectionClass?: string;
}

const TeamDetails = ({ teamInfo, sectionClass }: TeamDetailsProps) => {
    const { thumb, name, designation, text, age, email, phone } = teamInfo

    return (
        <>
            <div className={`team-single-area ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="team-content-top">
                        <div className="row align-center">
                            <div className="col-xl-6 col-lg-5 left-info">
                                <div className="thumb">
                                    <img src={`/assets/img/team/${thumb}`} alt="Thumb" width={800} height={900} />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-7">
                                <div className="team-right-info">
                                    <h2>{name}</h2>
                                    <span>{designation}</span>
                                    <p>{text}</p>
                                    <ul className="user-location">
                                        <li>
                                            <strong>Age:</strong>
                                            <p>{age} Years</p>
                                        </li>
                                        <li>
                                            <strong>Location:</strong>
                                            <p>Baird House, 15-17 St Cross St London EC1N 8UW</p>
                                        </li>
                                        <li>
                                            <strong>Email:</strong>
                                            <a href={`mailto:${email}`}>{email}</a>
                                        </li>
                                        <li>
                                            <strong>Phone:</strong>
                                            <a href={`tel:${phone}`}>{phone}</a>
                                        </li>
                                    </ul>
                                    <div className="social">
                                        <Link className="btn circle btn-sm btn-gradient animation" to="/contact-us">Contact Me</Link>
                                        <div className="share-link">
                                            <i className="fas fa-share-alt" />
                                            <ul>
                                                <SocialShareV1 />
                                            </ul>
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

export default TeamDetails;