import { Link } from "react-router-dom";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useStickyMenu from "../../hooks/useStickyMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import MainMenu from "./MainMenu";
import logoLight from "/assets/img/pixelart-logo.png";

const HeaderV7 = () => {
  const { isOpen, openMenu, closeMenu } = useSidebarMenu();
  const toggleSubMenu = useSubMenuToggle();
  const isMenuSticky = useStickyMenu();

  return (
    <>
      <header>
        <nav
          className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs navbar-fixed ${
            isMenuSticky ? "sticked" : "no-background"
          } ${isOpen ? "navbar-responsive" : ""} `}
        >
          <div
            className="container d-flex justify-content-between align-items-center"
            style={{ marginLeft: "80px" }}
          >
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbar-menu"
                onClick={openMenu}
              >
                <i className="fa fa-bars" />
              </button>
              <Link className="navbar-brand" to="/">
                <img
                  className="regular-img object-scale-down"
                  src={logoLight}
                  alt="Image Not Found"
                  style={{ width: "120px", height: "80px" }}
                />
                <img
                  src={logoLight}
                  className="logo logo-scrolled"
                  alt="Logo"
                />
              </Link>
            </div>
            <div
              className={`collapse navbar-collapse ${
                isOpen ? "show collapse-mobile" : "collapse-mobile"
              }`}
              id="navbar-menu"
            >
              <img className="regular-img" src={logoLight} alt="Logo" />
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbar-menu"
                onClick={closeMenu}
              >
                <i className="fa fa-times" />
              </button>
              <MainMenu
                toggleSubMenu={toggleSubMenu}
                navbarPlacement="navbar-center"
              />
            </div>
            <div className="attr-right">
              <div className="attr-nav flex">
                <ul>
                  <li className="button">
                    <Link style={{ borderRadius: "50px" }} to="/contact-us">
                      Get in touch
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`overlay-screen ${isOpen ? "opened" : ""}`}
            onClick={closeMenu}
          />
        </nav>
      </header>
    </>
  );
};

export default HeaderV7;
