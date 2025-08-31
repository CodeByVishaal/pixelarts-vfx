import BlogData from '../../../src/assets/jsonData/blog/BlogData.json';
import SingleRecentPostLight from './SingleRecentPostLight';

const RecentPostsWidgetLight = () => {
    return (
        <>
            <div className="sidebar-item recent-post">
                <h4 className="title">Recent Post</h4>
                <ul>
                    {BlogData.slice(0, 3).map(blog =>
                        <SingleRecentPostLight blog={blog} key={blog.id} />
                    )}
                </ul>
            </div>
        </>
    );
};

export default RecentPostsWidgetLight;