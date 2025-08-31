import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import BlogV3Data from "../../../src/assets/jsonData/blog/BlogV3Data.json"
import { Helmet } from "react-helmet-async";
import ThemeLight from "../../components/switcher/ThemeLight";
import BlogSingleContent from "../../components/blog/BlogSingleContent";

const BlogSingleLightPage = () => {

    const { id } = useParams();
    const data = BlogV3Data.find(portfolio => portfolio.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dixor - Blog Single Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Blog Single' breadCrumb='blog-single-light' />
                {data && <BlogSingleContent sectionClass='default-padding-bottom' blogInfo={data} totalBlogs={BlogV3Data.length} />}
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default BlogSingleLightPage;