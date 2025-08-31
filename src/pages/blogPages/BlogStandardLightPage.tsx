import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeLight from "../../components/switcher/ThemeLight";
import BlogStandardContent from "../../components/blog/BlogStandardContent";

const BlogStandardLightPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Blog Standard Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Blog Standard' breadCrumb='blog-standard-light' />
                <BlogStandardContent sectionClass='default-padding-bottom' />
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default BlogStandardLightPage;