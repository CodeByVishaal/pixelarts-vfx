/* eslint-disable no-unused-vars */
import { toast } from 'react-toastify';

interface FormEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

const HeaderNewsLetter = () => {

    const handleForm: FormEventHandler = (event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        form.reset()
        toast.success("Thanks For Your Email")
    }

    return (
        <>
            <form onSubmit={handleForm}>
                <div className="input-group stylish-input-group">
                    <input type="email" placeholder="Enter your e-mail" className="form-control" name="email" autoComplete='off' />
                    <span className="input-group-addon">
                        <button type="submit">
                            <i className="fas fa-arrow-right" />
                        </button>
                    </span>
                </div>
            </form>
        </>
    );
};

export default HeaderNewsLetter;