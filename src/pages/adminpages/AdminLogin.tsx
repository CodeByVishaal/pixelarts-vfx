import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import "./AdminLogin.css"; // 👈 add this line

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, isAuthenticated, loading } = useAdmin();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(credentials.username, credentials.password);

    if (!success) {
      setError("Invalid username or password");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Pixel Arts VFX</title>
      </Helmet>

      <div
        className="admin-login-container"
        style={{
          minHeight: "100vh",
          background: "#141414",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          className="login-card"
          style={{
            background: "#1E1E1E",
            borderRadius: "15px",
            padding: "40px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <div className="text-center mb-4">
            <h2
              style={{
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "24px",
                marginBottom: "8px",
              }}
            >
              Admin Dashboard
            </h2>
            <p style={{ color: "#808080", fontSize: "14px" }}>
              Sign in to manage your media content
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control white-placeholder"
                id="username"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleInputChange}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #2D2D2D",
                  fontSize: "14px",
                  background: "#2D2D2D",
                  color: "#ffffff",
                  width: "100%",
                  marginBottom: "16px",
                }}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="form-control white-placeholder"
                id="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #2D2D2D",
                  fontSize: "14px",
                  background: "#2D2D2D",
                  color: "#ffffff",
                  width: "100%",
                }}
              />
            </div>

            {error && (
              <div
                className="alert alert-danger"
                style={{
                  borderRadius: "8px",
                  padding: "12px 16px",
                  backgroundColor: "rgba(255, 59, 48, 0.1)",
                  border: "1px solid rgba(255, 59, 48, 0.2)",
                  color: "#ff3b30",
                  marginBottom: "16px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn w-100"
              style={{
                background: "#974FEE",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: "600",
                color: "white",
                transition: "all 0.2s ease",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
