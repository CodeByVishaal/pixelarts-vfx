import { Link } from "react-router-dom";
import NewsletterV2 from "../newsletter/NewsletterV2";
import FooterSocial from "../social/FooterSocial";
import logoLight from "/assets/img/pixelart-logo.png";

interface DataType {
  sectionClass?: string;
}

const FooterV2 = ({ sectionClass }: DataType) => {
  return (
    <>
      <footer className={`style-two ${sectionClass ? sectionClass : ""}`}>
        <div className="container">
          <div className="f-items">
            <div className="row">
              <div className="col-lg-6 footer-item about pr-120 pr-md-15 pr-xs-15">
                <div className="top">
                  <img
                    className="regular-img object-scale-down"
                    src={logoLight}
                    alt="Image Not Found"
                    style={{ width: "120px", height: "80px" }}
                  />
                  <img
                    className="light-img"
                    src={logoLight}
                    alt="Image Not Found"
                  />
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
                <div className="footer-contact">
                  <ul>
                    <li>
                      <a href="mailto:someone@example.com">info@dixor.com</a>
                    </li>
                    <li>
                      <a href="tel:+4733378901">+61 432247973</a>
                    </li>
                  </ul>
                </div>
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
                  Copyright &copy; {new Date().getFullYear()} Dixor. All Rights
                  Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterV2;
