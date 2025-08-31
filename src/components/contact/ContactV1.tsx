import ContactForm from "../form/ContactForm";
import SocialShareV2 from "../social/SocialShareV2";

interface DataType {
  sectionClass?: string;
}

const ContactV1 = ({ sectionClass }: DataType) => {
  return (
    <>
      <div
        className={`contact-area overflow-hidden relative ${
          sectionClass ? sectionClass : ""
        }`}
      >
        <div className="container">
          <div className="contact-style-one-items">
            <div className="row">
              <div className="col-tact-stye-one col-lg-4">
                <div className="contact-style-one-info">
                  <ul className="contact-address">
                    <li>
                      <a className="phone-link" href="tel:+4733378901">
                        <i className="fas fa-user-headset" /> +4733378901
                      </a>
                    </li>
                    <li>
                      <div className="info">
                        <h4>Location</h4>
                        <p>
                          55 Main Street, The Grand Avenue <br /> 2nd Block, New
                          York City
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="info">
                        <h4>Official Email</h4>
                        <a href="mailto:pixelartswebsite@gmail.com">
                          pixelartswebsite@gmail.com
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="info">
                        <ul className="social-link">
                          <SocialShareV2 />
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-tact-stye-one col-lg-7 offset-lg-1">
                <div className="contact-form-style-one">
                  <h4 className="sub-title">Have Questions?</h4>
                  <h2 className="title">Send us a Massage</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactV1;
