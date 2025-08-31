import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeLight from "../../components/switcher/ThemeLight";
import Blog2ColumnContent from "../../components/blog/Blog2ColumnContent";

const Blog2ColumnLightPage = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Blog 2 Column Light</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title='Blog Grid' breadCrumb='blog-2-column-light' />
                <Blog2ColumnContent sectionClass='default-padding-bottom' />
                <ThemeLight />
            </LayoutV1>
        </>
    );
};

export default Blog2ColumnLightPage;