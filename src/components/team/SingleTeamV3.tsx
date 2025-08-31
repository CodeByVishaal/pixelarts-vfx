import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    name?: string;
    designation?: string;
}

const SingleTeamV3 = ({ team }: { team: DataType }) => {
    const { id, thumb, name, designation } = team

    return (
        <>
            <div className="team-style-three-item">
                <div className="thumb">
                    <Link to={`/team-details/${id}`}>
                        <img src={`/assets/img/team/${thumb}`} alt="Image Not Found" width={600} height={650} />
                    </Link>
                </div>
                <div className="info">
                    <h4><Link to={`/team-details/${id}`}>{name}</Link></h4>
                    <span>{designation}</span>
                </div>
            </div>
        </>
    );
};

export default SingleTeamV3;