/* eslint-disable no-unused-vars */

interface FormEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

const SearchWidget = () => {

    const handleSearch: FormEventHandler = (event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        form.reset()
    }

    return (
        <>
            <div className="sidebar-item search">
                <div className="sidebar-info">
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Enter Keyword" name="text" className="form-control" autoComplete='off' />
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SearchWidget;