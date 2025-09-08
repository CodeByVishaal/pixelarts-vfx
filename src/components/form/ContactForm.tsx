/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";

interface FormEventHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

const ContactForm = () => {
  const handleForm: FormEventHandler = async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const formData = {
      name: (form.name as any).value,
      email: (form.email as any).value,
      phone: (form.phone as any).value,
      comments: (form.comments as any).value,
    };

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_API_URL || "http://localhost:5000"}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Thanks For Your Email!");
        form.reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error("Error sending message. Check your connection.");
    }
  };

  return (
    <>
      <form className="contact-form contact-form" onSubmit={handleForm}>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <input
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                required
                autoComplete="off"
              />
              <span className="alert-error" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="form-control"
                id="email"
                name="email"
                placeholder="Email*"
                type="email"
                required
                autoComplete="off"
              />
              <span className="alert-error" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                className="form-control no-arrows"
                id="phone"
                name="phone"
                placeholder="Phone"
                type="number"
                required
                autoComplete="off"
              />
              <span className="alert-error" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group comments">
              <textarea
                className="form-control"
                id="comments"
                name="comments"
                placeholder="Tell Us About Project *"
                required
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <button style={{ borderRadius: "50px" }} type="submit" name="submit" id="submit">
              <i className="fa fa-paper-plane" /> Get in Touch
            </button>
          </div>
        </div>

        {/* Alert Message */}
        <div className="col-lg-12 alert-notification">
          <div id="message" className="alert-msg" />
        </div>
      </form>
    </>
  );
};

export default ContactForm;
