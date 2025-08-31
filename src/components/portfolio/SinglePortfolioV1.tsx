import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    thumbLight?: string;
    text?: string;
    textBold?: string;
}

const SinglePortfolioV1 = ({ portfolio }: { portfolio: DataType }) => {
    const { id, thumb, text, textBold, thumbLight } = portfolio

    return (
        <>
            <div className="portfolio-style-one-item">
                <img className="regular-img" src={`/assets/img/portfolio/${thumb}`} alt="Image Not Found" width={710} height={800} />
                <img className="light-img" src={`/assets/img/portfolio/${thumbLight}`} alt="Image Not Found" width={710} height={800} />
                <div className="info">
                    <h2><Link to={`/project-details/${id}`}>{text} <strong>{textBold}</strong></Link></h2>
                    <Link className="btn-animation mt-30" to={`/project-details/${id}`}><i className="fas fa-arrow-right" /> <span>See Details</span></Link>
                </div>
            </div>
        </>
    );
};

export default SinglePortfolioV1;