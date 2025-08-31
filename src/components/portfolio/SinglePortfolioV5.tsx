import { Link } from "react-router-dom";
import useLeftRightAnimation from "../../hooks/useLeftRightAnimation";

interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    tag?: string;
}

const SinglePortfolioV5 = ({ portfolio }: { portfolio: DataType }) => {
    const { id, thumb, title, tag } = portfolio

    const containerRef = useLeftRightAnimation()

    return (
        <>
            <div className="portfolio-style-five">
                <Link to={`/project-details/${id}`} className="cursor-target">
                    <div className="thumb-zoom" >
                        <img className="img-reveal" src={`/assets/img/portfolio/${thumb}`} alt="Image Not Found" width={800} height={1067} ref={containerRef} />
                        <div className="overlay">
                            <h2>{title}</h2>
                            <span>{tag}</span>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default SinglePortfolioV5;