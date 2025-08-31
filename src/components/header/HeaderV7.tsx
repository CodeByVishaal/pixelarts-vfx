import MainMenu from "./MainMenu";
import { Link } from "react-router-dom";
import logo from "/assets/img/logo.png";
import logoLight from "/assets/img/pixelart-logo.png";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useStickyMenu from "../../hooks/useStickyMenu";

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
          <div className="container d-flex justify-content-between align-items-center">
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
                <img src={logoLight} className="logo logo-display" alt="Logo" />
                <img
                  src={logoLight}
                  className="logo logo-scrolled"
                  alt="Logo"
                />
                <img src={logo} className="logo-dark" alt="Logo" />
              </Link>
            </div>
            <div
              className={`collapse navbar-collapse ${
                isOpen ? "show collapse-mobile" : "collapse-mobile"
              }`}
              id="navbar-menu"
            >
              <img className="regular-img" src={logoLight} alt="Logo" />
              <img className="light-img" src={logo} alt="Logo" />
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
                    <Link to="/contact-us">Get in touch</Link>
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
