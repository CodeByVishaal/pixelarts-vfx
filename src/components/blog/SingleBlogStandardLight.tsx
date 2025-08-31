import { Link } from "react-router-dom";

interface DataType {
    id?: number;
    thumb?: string;
    date?: string;
    title?: string;
    text?: string;
    author?: string;
}

const SingleBlogStandardLight = ({ blog }: { blog: DataType }) => {
    const { id, thumb, date, title, text, author } = blog

    return (
        <>
            <div className="blog-style-one item">
                <div className="thumb">
                    <Link to={`/blog-single-with-sidebar-light/${id}`}>
                        <img src={`/assets/img/blog/${thumb}`} alt="Image Not Found" width={1500} height={750} />
                    </Link>
                </div>
                <div className="info">
                    <div className="meta">
                        <ul>
                            <li>
                                <Link to="#">{author}</Link>
                            </li>
                            <li>
                                {date}
                            </li>
                        </ul>
                    </div>
                    <h2>
                        <Link to={`/blog-single-with-sidebar-light/${id}`}>{title}</Link>
                    </h2>
                    <p>{text}</p>
                    <Link className="button-regular" to={`/blog-single-with-sidebar-light/${id}`}>
                        Continue Reading <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SingleBlogStandardLight;