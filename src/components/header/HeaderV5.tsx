import { Link } from "react-router-dom";
import useSidebarInfo from "../../hooks/useSidebarInfo";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useStickyMenu from "../../hooks/useStickyMenu";
import useSubMenuToggleV2 from "../../hooks/useSubMenuToggleV2";
import SocialShareV3 from "../social/SocialShareV3";
import HeaderNewsLetter from "./HeaderNewsLetter";
import MainMenuV2 from "./MainMenuV2";
import logoLight from "/assets/img/logo-light.png";

const HeaderV5 = () => {
  const { isOpen } = useSidebarMenu();
  const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();
  const toggleSubMenu2 = useSubMenuToggleV2();
  const isMenuSticky = useStickyMenu();

  return (
    <>
      <header>
        <nav
          className={`navbar mobile-sidenav navbar-default border-less validnavs nav-full-width navbar-fixed on no-full ${
            isMenuSticky ? "sticked" : "no-background"
          } ${isOpen ? "pause-sticked" : ""}`}
        >
          <div className="container d-flex justify-content-between align-items-center">
            {/* Start Header Navigation */}
            <div className="col-xl-2 col-lg-3">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                  <img
                    className="regular-img object-scale-down"
                    src={logoLight}
                    alt="Image Not Found"
                    style={{ width: "120px", height: "80px" }}
                  />
                </Link>
              </div>
            </div>

            <div className="attr-right">
              <div className="attr-nav flex">
                <ul>
                  <li className="side-menu">
                    <Link to="#" onClick={openInfoBar}>
                      <strong>MENU </strong>
                      <div className="line">
                        <span className="bar-1" />
                        <span className="bar-2" />
                        <span className="bar-3" />
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2">
                <div className={`side ${isInfoOpen ? "on" : ""}`}>
                  <Link to="#" className="close-side" onClick={closeInfoBar}>
                    Close <i className="fas fa-times" />
                  </Link>
                  <div className="widget">
                    <div className="logo">
                      <Link to="/home-2">
                        <img src={logoLight} alt="Logo" />
                      </Link>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-7 col-lg-7">
                        <div className="side-navbar-inner">
                          <div className="simple-menu">
                            <MainMenuV2
                              toggleSubMenu2={toggleSubMenu2}
                              closeInfoBar={closeInfoBar}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 offset-xl-1 col-lg-4 offset-lg-1">
                        <div className="side-widgets">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay-screen" />
        </nav>
      </header>
    </>
  );
};

export default HeaderV5;
