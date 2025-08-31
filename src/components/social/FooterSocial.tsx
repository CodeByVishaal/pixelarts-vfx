import twitter from "/assets/img/icon/twitter.png"
import { Link } from "react-router-dom";

const FooterSocial = () => {
    return (
        <>
            <li>
                <Link to="https://www.facebook.com/" target='_blank'><i className="fab fa-facebook-f" /></Link>
            </li>
            <li>
                <Link to="https://www.linkedin.com/" target='_blank'><i className="fab fa-linkedin-in" /></Link>
            </li>
            <li>
                <Link to="https://www.x.com/" target='_blank'><img src={twitter} alt="Image Not Found" /></Link>
            </li>
        </>
    );
};

export default FooterSocial;