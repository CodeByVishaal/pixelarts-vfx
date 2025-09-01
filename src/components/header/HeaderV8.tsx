import { Link } from "react-router-dom";
import logoLight from "/assets/img/pixelart-logo.png";
import logo from "/assets/img/logo.png";
import MainMenu from "./MainMenu";
import useSubMenuToggle from "../../hooks/useSubMenuToggle";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import SidebarInfo from "./SidebarInfo";
import useSidebarInfo from "../../hooks/useSidebarInfo";

const HeaderV8 = () => {
  const { isOpen, openMenu, closeMenu } = useSidebarMenu();
  const toggleSubMenu = useSubMenuToggle();
  const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();

  return (
    <>
      <header>
        <nav className="navbar mobile-sidenav navbar-sticky navbar-default validnavs navbar-fixed no-background">
          <div className="container container-full d-flex justify-content-between align-items-center">
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
          <div className="overlay-screen" />
        </nav>
      </header>
    </>
  );
};

export default HeaderV8;
