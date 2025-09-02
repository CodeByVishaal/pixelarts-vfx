import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, isAuthenticated, loading } = useAdmin();

  // Redirect if already authenticated
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
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          className="login-card"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="text-center mb-4">
            <h2
              style={{
                color: "#333",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              Admin Dashboard
            </h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>
              Sign in to manage your media content
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label"
                style={{ color: "#333", fontWeight: "500" }}
              >
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e1e5e9",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e1e5e9")}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: "#333", fontWeight: "500" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "2px solid #e1e5e9",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e1e5e9")}
              />
            </div>

            {error && (
              <div
                className="alert alert-danger"
                style={{
                  borderRadius: "10px",
                  padding: "12px 16px",
                  backgroundColor: "#fee",
                  border: "1px solid #fcc",
                  color: "#c33",
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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                transition: "all 0.3s ease",
                transform: loading ? "scale(0.98)" : "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.target as HTMLElement).style.transform =
                    "translateY(-2px)";
                  (e.target as HTMLElement).style.boxShadow =
                    "0 10px 25px rgba(102, 126, 234, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  (e.target as HTMLElement).style.transform = "translateY(0)";
                  (e.target as HTMLElement).style.boxShadow = "none";
                }
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

          <div
            className="text-center mt-4"
            style={{ color: "#666", fontSize: "14px" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
