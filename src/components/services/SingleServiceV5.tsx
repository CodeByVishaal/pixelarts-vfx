import { Link } from "react-router-dom";
import useHoverEffect from "../../hooks/useHoverEffect";

interface DataType {
    id: number;
    number: string;
    title: string;
    thumb: string;
}

const SingleServiceV5 = ({ service }: { service: DataType }) => {
    const { id, number, title, thumb } = service;

    const { handleMouseMove, handleMouseLeave } = useHoverEffect();

    return (
        <>
            <li>
                <Link
                    to={`/service-details/${id}`}
                    className="image-hover-item"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="item-content">
                        <span>{number}</span>
                        <Link to={`/service-details/${id}`}>
                            <h2>{title}</h2>
                        </Link>
                    </div>
                    <div className="image-hover-wrapper">
                        <img
                            className="image-hover-placeholder"
                            src={`/assets/img/portfolio/${thumb}`}
                            alt="Image Not Found"
                            width={600}
                            height={600}
                        />
                    </div>
                </Link>
            </li>
        </>
    );
};

export default SingleServiceV5;