/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

import { useState } from "react";
import ModalVideo from "react-modal-video";

interface DataType {
  navbarPlacement?: string;
  toggleSubMenu?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MainMenu = ({ navbarPlacement }: DataType) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
    <div style={{marginLeft:'150px'}}><ul
        className={`nav navbar-nav ${navbarPlacement ? navbarPlacement : ""}`}
        data-in="fadeInDown"
        data-out="fadeOutUp"
      >
        <li className="megamenu-fw megamenu-style-two column-three">
          <Link to="/" className="">
            Home
          </Link>
        </li>
        <li className="dropdown">
          <Link to="/about-us">About Us</Link>
        </li>
        <li className="">
          <Link to="/project" className="">
            Projects
          </Link>
        </li>
        <li className="">
          <Link to="/services" className="">
            Services
          </Link>
        </li>
        <li>
          <Link to="/showreel" className="">
            Showreel
          </Link>
        </li>

        <li>
          <Link to="/contact-us">Contact</Link>
        </li>
      </ul>
</div>
      
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="35mvh-2oII8"
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default MainMenu;
