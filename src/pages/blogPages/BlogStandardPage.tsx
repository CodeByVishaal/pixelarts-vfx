import LayoutV1 from '../../components/layouts/LayoutV1';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import BlogStandardContent from '../../components/blog/BlogStandardContent';
import DarkClass from '../../components/classes/DarkClass';
import { Helmet } from 'react-helmet-async';
import ThemeDark from '../../components/switcher/ThemeDark';

const BlogStandardPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Blog Standard</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Blog Standard' breadCrumb='blog-standard' />
                <BlogStandardContent sectionClass='default-padding-bottom' />
                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default BlogStandardPage;