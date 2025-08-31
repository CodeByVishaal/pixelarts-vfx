import { Link } from "react-router-dom";
import MainMenu from "./MainMenu";
import SidebarInfo from "./SidebarInfo";
import logo from "/assets/img/logo.png";
import logoLight from "/assets/img/pixelart-logo.png";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useSidebarInfo from "../../hooks/useSidebarInfo";
import useStickyMenu from "../../hooks/useStickyMenu";

const HeaderV1 = () => {
  const { isOpen, openMenu, closeMenu } = useSidebarMenu();
  const toggleSubMenu = useSubMenuToggle();
  const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();
  const isMenuSticky = useStickyMenu();

  return (
    <>
      <header>
        <nav
          className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs navbar-fixed on menu-center ${
            isMenuSticky ? "sticked" : "no-background"
          } ${isOpen ? "navbar-responsive" : ""}`}
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
            <SidebarInfo
              openInfoBar={openInfoBar}
              closeInfoBar={closeInfoBar}
              isInfoOpen={isInfoOpen}
            />
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

export default HeaderV1;
