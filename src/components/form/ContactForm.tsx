/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";

interface FormEventHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const handleForm: FormEventHandler = async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      comments: formData.get("comments"),
    };

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Thanks For Your Email!");
        form.reset();
      } else {
        toast.error("Failed to send email. Try again.");
      }
    } catch (error) {
      toast.error("Error sending email.");
    } finally {
      setLoading(false);
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
            <button
              style={{ borderRadius: "50px" }}
              type="submit"
              name="submit"
              id="submit"
              disabled={loading}
            >
              {loading ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                <i className="fa fa-paper-plane" />
              )}{" "}
              {loading ? "Sending..." : "Get in Touch"}
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
