import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-circular-progressbar/dist/styles.css";
import "react-modal-video/css/modal-video.css";
import "react-photo-view/dist/react-photo-view.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css/bundle";

import "../src/assets/css/animate.css";
import "../src/assets/css/flaticon-set.css";
import "../src/assets/css/font-awesome.css";

import "../src/assets/css/helper.css";
import "../src/assets/css/style.css";
import "../src/assets/css/unit-test.css";
import "../src/assets/css/validnavs.css";

import { useState } from "react";
import Routers from "./Routers";
import Dependency from "./components/utilities/Dependency";
import Preloader from "./components/utilities/Preloader";
import RoutesScrollToTop from "./components/utilities/RoutesScrollToTop";

function App() {
  //  Preloader
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <Preloader onFinish={() => setIsLoading(false)} />
      ) : (
        <>
          <Routers />
          <RoutesScrollToTop />
          <Dependency />
        </>
      )}
    </>
  );
}

export default App;
