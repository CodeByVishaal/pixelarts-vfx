import { useParams } from "react-router-dom";
import BlogSingleWithSidebarContent from "../../components/blog/BlogSingleWithSidebarContent";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import BlogV3Data from "../../../src/assets/jsonData/blog/BlogV3Data.json"
import { Helmet } from "react-helmet-async";
import ThemeDark from "../../components/switcher/ThemeDark";

const BlogSingleWithSidebarPage = () => {

    const { id } = useParams();
    const data = BlogV3Data.find(portfolio => portfolio.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dixor - Blog Single With Sidebar</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Blog Grid' breadCrumb='blog-single-with-sidebar' />
                {data && <BlogSingleWithSidebarContent sectionClass='default-padding-bottom' blogInfo={data} totalBlogs={BlogV3Data.length} />}
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default BlogSingleWithSidebarPage;