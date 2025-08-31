import { Link } from "react-router-dom";
import SocialShareV3 from "../social/SocialShareV3";
import HeaderNewsLetter from "./HeaderNewsLetter";
import logoLight from "/assets/img/logo-light.png";

interface SidebarInfoProps {
  openInfoBar?: () => void;
  isInfoOpen?: boolean;
  closeInfoBar?: () => void;
}

const SidebarInfo = ({ isInfoOpen, closeInfoBar }: SidebarInfoProps) => {
  return (
    <>
      <div className="attr-right">
        <div className={`side ${isInfoOpen ? "on" : ""}`}>
          <Link to="#" className="close-side" onClick={closeInfoBar}>
            <i className="fa fa-times"></i>
          </Link>
          <div className="top">
            <div className="widget">
              <div className="logo">
                <img src={logoLight} alt="Logo" />
              </div>
            </div>
            <div className="widget address">
              <div>
                <ul>
                  <li>
                    <div className="content">
                      <p>Address</p>
                      <strong>California, TX 70240</strong>
                    </div>
                  </li>
                  <li>
                    <div className="content">
                      <p>Email</p>
                      <strong>support@validtheme.com</strong>
                    </div>
                  </li>
                  <li>
                    <div className="content">
                      <p>Contact</p>
                      <strong>+44-20-7328-4499</strong>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="widget newsletter">
              <h4 className="title">Get Subscribed!</h4>
              <HeaderNewsLetter />
            </div>
            <div className="widget social">
              <ul className="link">
                <SocialShareV3 />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarInfo;
