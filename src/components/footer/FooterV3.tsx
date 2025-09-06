import { Link } from "react-router-dom";
import NewsletterV2 from "../newsletter/NewsletterV2";
import FooterSocial from "../social/FooterSocial";

const FooterV3 = () => {
  return (
    <>
      <footer>
        <div className="footer-box">
          <div className="container">
            <div className="f-items">
              <div className="row">
                <div className="col-lg-6 footer-item about pr-120 pr-md-15 pr-xs-15 pr-md-15 pr-xs-15">
                  <div className="top">
                    <h2>Get Support?</h2>
                    <a className="quick-btn" href="mailto:someone@example.com">
                      <i className="fas fa-long-arrow-right" />
                    </a>
                  </div>
                  <ul className="address-list">
                    <li>
                      <h4>Australia</h4>
                      <p>13, Tyler crescent Tarneit Vic-3029 Melbourne </p>
                    </li>
                    <li>
                      <h4>Canada</h4>
                    <p>500 rue Puget, Laval H7K1C5, Canada</p>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-5 offset-lg-1 footer-item">
                  <h4 className="widget-title">Useful Link</h4>
                  <ul className="useful-link">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link to="/project">Projects</Link>
                    </li>
                    <li>
                      <Link to="/about-us">Showreel</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact</Link>
                    </li>

                    <li>
                      <Link to="/services">Services</Link>
                    </li>
                  </ul>
                  <NewsletterV2 />
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <ul className="footer-social">
                    <FooterSocial />
                  </ul>
                </div>
                <div className="col-lg-6 text-end">
                  <p>
                    Copyright &copy; {new Date().getFullYear()} Dixor. All
                    Rights Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterV3;
