import { Helmet } from "react-helmet-async";
import DarkClassV5 from "../../components/classes/DarkClassV5";
import BannerV12 from "../../components/banner/BannerV12";
import HeaderV8 from "../../components/header/HeaderV8";

const Home11 = () => {
    return (
        <>
            <Helmet>
                <title>Dixor - Home 11</title>
            </Helmet>

            <HeaderV8 />
            <BannerV12 />
            <DarkClassV5 />
        </>
    );
};

export default Home11;