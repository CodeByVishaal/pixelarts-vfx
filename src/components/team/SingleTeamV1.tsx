import SocialShareV1 from "../social/SocialShareV1";
import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    name?: string;
    designation?: string;
}

const SingleTeamV1 = ({ team }: { team: DataType }) => {
    const { id, thumb, name, designation } = team

    return (
        <>
            <div className="team-style-one-item">
                <div className="thumb">
                    <Link to={`/team-details/${id}`}>
                        <img src={`/assets/img/team/${thumb}`} alt="Image Not Found" width={300} height={315} />
                    </Link>
                    <div className="social-overlay">
                        <ul>
                            <SocialShareV1 />
                        </ul>
                        <div className="icon">
                            <i className="fas fa-plus" />
                        </div>
                    </div>
                </div>
                <div className="info">
                    <h4><Link to={`/team-details/${id}`}>{name}</Link></h4>
                    <span>{designation}</span>
                </div>
            </div>
        </>
    );
};

export default SingleTeamV1;