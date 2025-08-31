import LayoutV1 from '../../components/layouts/LayoutV1';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { useParams } from 'react-router-dom';
import BlogV3Data from "../../../src/assets/jsonData/blog/BlogV3Data.json"
import { Helmet } from 'react-helmet-async';
import ThemeLight from '../../components/switcher/ThemeLight';
import BlogSingleWithSidebarContent from '../../components/blog/BlogSingleWithSidebarContent';

const BlogSingleWithSidebarLightPage = () => {

    const { id } = useParams();
    const data = BlogV3Data.find(portfolio => portfolio.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dixor - Blog Single With Sidebar Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Blog Single' breadCrumb='blog-single-with-sidebar-light' />
                {data && <BlogSingleWithSidebarContent sectionClass='default-padding-bottom' blogInfo={data} totalBlogs={BlogV3Data.length} />}
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default BlogSingleWithSidebarLightPage;