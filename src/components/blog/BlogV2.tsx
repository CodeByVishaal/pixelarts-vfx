import BlogV2Data from '../../../src/assets/jsonData/blog/BlogV2Data.json';
import SingleBlogV2 from './SingleBlogV2';
import SplitText from "../animation/SplitText.jsx"

interface DataType {
    sectionClass?: string
}

const BlogV2 = ({ sectionClass }: DataType) => {
    return (
        <>
            <div className={`blog-area home-blog blog-style-two-area default-padding bottom-less ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                            <div className="site-heading text-center">
                                <h4 className="sub-title">News & Events</h4>
                                <h2 className="title">
                                    <SplitText
                                        delay={150}
                                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                        easing="easeOutCubic"
                                        threshold={0.2}
                                        rootMargin="-50px"
                                    >
                                        Latest Blog Posts
                                    </SplitText>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {BlogV2Data.map(blog =>
                            <div className="col-lg-6 col-md-6 mb-30" key={blog.id}>
                                <SingleBlogV2 blog={blog} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogV2;