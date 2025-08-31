import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    author?: string;
    date?: string;
}

const SingleBlog2ColumnLight = ({ blog }: { blog: DataType }) => {
    const { id, thumb, author, title, date } = blog

    return (
        <>
            <div className="home-blog-style-one">
                <div className="thumb">
                    <Link to={`/blog-single-with-sidebar-light/${id}`}>
                        <img src={`/assets/img/blog/${thumb}`} width={800} height={600} alt="Thumb" />
                    </Link>
                    <div className="info">
                        <div className="meta">
                            <ul>
                                <li>
                                    <Link to="#">{author}</Link>
                                </li>
                                <li>{date}</li>
                            </ul>
                        </div>
                        <h2 className="post-title">
                            <Link to={`/blog-single-with-sidebar-light/${id}`}>{title}</Link>
                        </h2>
                        <Link to={`/blog-single-with-sidebar-light/${id}`} className="button-regular">
                            Continue Reading
                            <i className="fas fa-long-arrow-right" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleBlog2ColumnLight;