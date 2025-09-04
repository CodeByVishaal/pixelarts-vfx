import { Route, Routes } from "react-router-dom";
import Home9 from "./pages/homePages/Home9";
import AboutUsPage from "./pages/innerPages/AboutUsPage";
import ContactUsPage from "./pages/innerPages/ContactUsPage";
import ProjectPage from "./pages/innerPages/ProjectPage";

// Services Page
import NotFoundPage from "./pages/innerPages/NotFoundPage";
import Services4Page from "./pages/servicesPages/Services4Page";

import { AdminProvider } from "./contexts/AdminContext";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AdminLogin from "./pages/adminpages/AdminLogin";
import ShowreelPage from "./pages/ShowreelPage";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<Home9 />}></Route>
          <Route path="/about-us" element={<AboutUsPage />}></Route>
          <Route path="/project" element={<ProjectPage />}></Route>
          <Route path="/contact-us" element={<ContactUsPage />}></Route>
          <Route path="/services" element={<Services4Page />}></Route>
          <Route path="/showreel" element={<ShowreelPage />}></Route>
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
