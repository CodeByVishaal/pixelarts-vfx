/* eslint-disable no-unused-vars */

import { toast } from 'react-toastify';

interface FormEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

const BlogCommentForm = () => {

    const handleForm: FormEventHandler = (event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        form.reset()
        toast.success("Thanks For Your Message")
    }

    return (
        <>
            <form className="contact-comments" onSubmit={handleForm}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input name="name" className="form-control" placeholder="Name *" type="text" required autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input name="email" className="form-control" placeholder="Email *" type="email" required autoComplete='off' />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group comments">
                            <textarea className="form-control" name='textarea' placeholder="Comment" required autoComplete='off' />
                        </div>
                        <div className="form-group full-width submit">
                            <button className="btn btn-theme effect" type="submit">Post Comment</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default BlogCommentForm;