import FooterSocial from '../social/FooterSocial';
import logo from "/assets/img/logo.png";
import logoLight from "/assets/img/logo-light.png";
import { Link } from "react-router-dom";
import SidebarMenu from './SidebarMenu';
import useSidebarMenu from '../../hooks/useSidebarMenu';
import useStickyMenu from '../../hooks/useStickyMenu';
import useSidebarInfo from '../../hooks/useSidebarInfo';

const HeaderV4 = () => {

    const { isOpen, openMenu, closeMenu } = useSidebarMenu();
    const isMenuSticky = useStickyMenu();
    const { isInfoOpen, openInfoBar, closeInfoBar } = useSidebarInfo();

    return (
        <>
            <header>
                <nav className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs nav-full-width navbar-fixed ${isMenuSticky ? "sticked" : ""} ${isOpen ? "pause-sticked" : ""}`}>
                    <div className="container d-flex justify-content-between align-items-center">

                        <div className="col-xl-2 col-lg-3">
                            <div className="navbar-header">
                                <Link className="navbar-brand" to="/">
                                    <img src={logoLight} className="logo" alt="Logo" />
                                    <img src={logo} className="logo-dark" alt="Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6">
                            <div className={`collapse navbar-collapse ${isOpen ? "show collapse-mobile" : "collapse-mobile"}`} id="navbar-menu">
                                <div className="left-info">
                                    <p><strong>Contact</strong> <a href="mailto:support@avrix.com">support@avrix.com</a></p>
                                </div>
                                <div className="right-info">
                                    <ul>
                                        <FooterSocial />
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <SidebarMenu openMenu={openMenu} isInfoOpen={isInfoOpen} openInfoBar={openInfoBar} closeInfoBar={closeInfoBar} />
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu} />
                </nav>
            </header>
        </>
    );
};

export default HeaderV4;