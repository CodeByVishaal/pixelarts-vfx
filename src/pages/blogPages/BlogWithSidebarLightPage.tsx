import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeLight from "../../components/switcher/ThemeLight";
import BlogWithSidebarContent from "../../components/blog/BlogWithSidebarContent";

const BlogWithSidebarLightPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Blog With Sidebar Light</title>
            </Helmet>

            <div className="smooth-scroll-container">
                <LayoutV1>
                    <Breadcrumb title='Blog Sidebar' breadCrumb='blog-with-sidebar-light' />
                    <BlogWithSidebarContent sectionClass="default-padding-bottom" />
                    <ThemeLight />
                </LayoutV1>
            </div>
        </>
    );
};

export default BlogWithSidebarLightPage;