import { Route, Routes } from "react-router-dom";
import Home9 from "./pages/homePages/Home9";

// Home Light

// Inner Pages
import AboutUsPage from "./pages/innerPages/AboutUsPage";
import ContactUsPage from "./pages/innerPages/ContactUsPage";
import ProjectDetailsPage from "./pages/innerPages/ProjectDetailsPage";
import ProjectPage from "./pages/innerPages/ProjectPage";

// Inner Light
import About2LightPage from "./pages/innerPages/About2LightPage";
import AboutUsLightPage from "./pages/innerPages/AboutUsLightPage";
import ContactUsLightPage from "./pages/innerPages/ContactUsLightPage";
import FaqLightPage from "./pages/innerPages/FaqLightPage";
import Project2LightPage from "./pages/innerPages/Project2LightPage";
import Project3LightPage from "./pages/innerPages/Project3LightPage";
import ProjectDetailsLightPage from "./pages/innerPages/ProjectDetailsLightPage";
import ProjectLightPage from "./pages/innerPages/ProjectLightPage";
import Team2LightPage from "./pages/innerPages/Team2LightPage";
import TeamDetailsLightPage from "./pages/innerPages/TeamDetailsLightPage";
import TeamLightPage from "./pages/innerPages/TeamLightPage";

// Services Page
import NotFoundPage from "./pages/innerPages/NotFoundPage";
import Services4Page from "./pages/servicesPages/Services4Page";

import { AdminProvider } from "./contexts/AdminContext";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminLogin from "./pages/adminpages/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import ShowReelPage from "./pages/showreelpages/ShowReelPage";

const Routers = () => {
  return (
    <>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<Home9 />}></Route>
          {/* Inner Pages */}
          <Route path="/about-us" element={<AboutUsPage />}></Route>
          <Route path="/project" element={<ProjectPage />}></Route>
          <Route
            path="/project-details/:id"
            element={<ProjectDetailsPage />}
          ></Route>
          <Route path="/contact-us" element={<ContactUsPage />}></Route>

          {/* Inner Light  */}
          <Route path="/about-us-light" element={<AboutUsLightPage />}></Route>
          <Route path="/about-2-light" element={<About2LightPage />}></Route>
          <Route path="/team-light" element={<TeamLightPage />}></Route>
          <Route path="/team-2-light" element={<Team2LightPage />}></Route>
          <Route
            path="/team-details-light/:id"
            element={<TeamDetailsLightPage />}
          ></Route>
          <Route path="/project-light" element={<ProjectLightPage />}></Route>
          <Route
            path="/project-2-light"
            element={<Project2LightPage />}
          ></Route>
          <Route
            path="/project-3-light"
            element={<Project3LightPage />}
          ></Route>
          <Route
            path="/project-details-light/:id"
            element={<ProjectDetailsLightPage />}
          ></Route>
          <Route path="/showreel" element={<ShowReelPage />}></Route>
          <Route
            path="/contact-us-light"
            element={<ContactUsLightPage />}
          ></Route>
          <Route path="/faq-light" element={<FaqLightPage />}></Route>

          <Route path="/services" element={<Services4Page />}></Route>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />}></Route>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </AdminProvider>
    </>
  );
};

export default Routers;
