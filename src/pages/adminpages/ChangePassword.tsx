import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdmin } from "../../contexts/AdminContext";
import "./AdminLogin.css";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const { token, logout } = useAdmin();
  const navigate = useNavigate();
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/auth/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // 🛑 Show backend validation or custom error
        toast.error(data.message || "Failed to change password", {
          position: "top-right",
        });
      } else {
        // ✅ Success
        toast.success("Password updated successfully. Please log in again.", {
          position: "top-right",
        });

        // Clear auth and redirect to login
        logout();
        navigate("/admin/login", { replace: true });
      }
    } catch (err) {
      console.error("Change password error:", err);
      toast.error("Something went wrong. Try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Change Password - Pixel Arts VFX</title>
      </Helmet>

      <div
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
          style={{
            background: "#1E1E1E",
            borderRadius: "15px",
            padding: "40px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <h2 style={{ color: "#fff", marginBottom: "20px" }}>
            Change Password
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleInputChange}
              className="form-control white-placeholder"
              style={inputStyle}
              required
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleInputChange}
              className="form-control white-placeholder"
              style={inputStyle}
              required
            />

            <button
              type="submit"
              style={{
                background: "#974FEE",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: "600",
                color: "white",
                marginTop: "16px",
                width: "100%",
              }}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const inputStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #2D2D2D",
  fontSize: "14px",
  background: "#2D2D2D",
  color: "#ffffff",
  width: "100%",
  marginBottom: "16px",
};

export default ChangePassword;
