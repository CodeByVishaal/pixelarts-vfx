import BlogV3Data from "../../../src/assets/jsonData/blog/BlogV3Data.json";
import SingleBlog2Column from './SingleBlog2Column';
import { useEffect, useState } from 'react';
import Pagination from 'react-paginate';
import { useNavigate, useParams } from 'react-router-dom';

interface DataType {
    sectionClass?: string
}

const Blog2ColumnContent = ({ sectionClass }: DataType) => {

    // Pagination 
    const navigate = useNavigate();
    const { page } = useParams<{ page?: string }>();

    // Set initial page from URL
    const currentPageNumber = Number(page) || 1;
    const [currentPage, setCurrentPage] = useState(currentPageNumber);
    const [itemsPerPage] = useState(4);

    useEffect(() => {
        setCurrentPage(currentPageNumber);
    }, [currentPageNumber]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBlogData = BlogV3Data.slice(startIndex, endIndex);

    const handlePageClick = (data: any) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);

        // Update the URL dynamically
        navigate(`/blog-2-column?page=${selectedPage}`);

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    };

    const totalPages = Math.ceil(BlogV3Data.length / itemsPerPage);

    return (
        <>
            <div className={`blog-area blog-grid-colum ${sectionClass ? sectionClass : ""}`}>
                <div className="container">
                    <div className="row">
                        {currentBlogData.map(blog =>
                            <div className="col-lg-6 mb-50" key={blog.id}>
                                <SingleBlog2Column blog={blog} />
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="row">
                        <div className="col-md-12 pagi-area text-center">
                            <Pagination
                                previousLabel={currentPage === 1 ? <i className='fas fa-ban'></i> : <i className='fas fa-angle-double-left'></i>}
                                nextLabel={currentPage === totalPages ? <i className='fas fa-ban'></i> : <i className='fas fa-angle-double-right'></i>}
                                breakLabel={'...'}
                                pageCount={Math.ceil(BlogV3Data.length / itemsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination text-center'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousLinkClassName={'page-link'}
                                nextLinkClassName={'page-link'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog2ColumnContent;