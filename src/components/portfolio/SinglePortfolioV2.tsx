import { Link } from "react-router-dom";
import useLeftRightAnimation from "../../hooks/useLeftRightAnimation";

interface DataType {
    id?: number;
    thumb?: string;
    tag?: string;
    date?: string;
    text?: string;
}

const SinglePortfolioV2 = ({ portfolio }: { portfolio: DataType }) => {
    const { id, thumb, tag, date, text } = portfolio

    const containerRef = useLeftRightAnimation()

    return (
        <>
            <div className="portfolio-style-two">
                <Link to={`/project-details/${id}`} className="cursor-target">
                    <div className="thumb-zoom">
                        <img className="img-reveal" src={`/assets/img/portfolio/${thumb}`} width={826} height={1067} alt="Image Not Found" ref={containerRef} />
                    </div>
                    <div className="pf-item-info">
                        <div className="content">
                            <div className="pf-tags">
                                <span>{tag}</span>
                                <span>{date}</span>
                            </div>
                            <h2>{text}</h2>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default SinglePortfolioV2;