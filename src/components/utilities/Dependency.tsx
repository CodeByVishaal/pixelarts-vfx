import { ScrollToTop } from 'react-simple-scroll-up';
import { ToastContainer } from 'react-toastify';

const Dependency = () => {
    return (
        <>
            <ScrollToTop symbol={<i className="fas fa-long-arrow-up"></i>} />
            <ToastContainer />
        </>
    );
};

export default Dependency;