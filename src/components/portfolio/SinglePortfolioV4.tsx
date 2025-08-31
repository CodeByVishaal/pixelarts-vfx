import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    tag?: string;
}

const SinglePortfolioV4 = ({ portfolio }: { portfolio: DataType }) => {
    const { thumb, id, tag, title } = portfolio

    return (
        <>
            <div className="portfolio-style-four">
                <div className="thumb">
                    <img src={`/assets/img/portfolio/${thumb}`} alt="Image Not Found" width={700} height={600} />
                    <div className="content">
                        <span>{tag}</span>
                        <Link to={`/project-details/${id}`}>
                            <h2>{title}</h2>
                        </Link>
                        <Link className="btn-animation" to={`/project-details/${id}`}>
                            <i className="fas fa-arrow-right" /> <span>View Project</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SinglePortfolioV4;