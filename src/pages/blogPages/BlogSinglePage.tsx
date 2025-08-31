import LayoutV1 from '../../components/layouts/LayoutV1';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import BlogSingleContent from '../../components/blog/BlogSingleContent';
import DarkClass from '../../components/classes/DarkClass';
import { useParams } from 'react-router-dom';
import BlogV3Data from "../../../src/assets/jsonData/blog/BlogV3Data.json";
import { Helmet } from 'react-helmet-async';
import ThemeDark from '../../components/switcher/ThemeDark';

const BlogSinglePage = () => {

    const { id } = useParams();
    const data = BlogV3Data.find(portfolio => portfolio.id === parseInt(id || '0'));

    return (
        <>
            <Helmet>
                <title>Dixor - Blog Single</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Blog Single' breadCrumb='blog-single' />
                {data && <BlogSingleContent sectionClass='default-padding-bottom' blogInfo={data} totalBlogs={BlogV3Data.length} />}
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default BlogSinglePage;