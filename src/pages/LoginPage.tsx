import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import logo from "../assets/logo.png";
import { useState } from "react";
import { loginUser } from "../api/api";
import toast from "react-hot-toast";
export default function LoginPage() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",     // ← Now using email
    password: "",
    // phone: "",  // ← Commented out for now
  });

  // Error state
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    // phone: "",  // ← Commented out
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  if (!validateForm()) return;

    const loadingToast = toast.loading("Logging you in...");

    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      const token = res.data?.data?.accessToken;
      const role = res.data?.data?.user.role;
      

      toast.success("Login successful! Welcome back 👋", { id: loadingToast });

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("Name",res.data?.data?.user.name);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password";

      toast.error(message, { id: loadingToast });
    }
  };


  return (
    <section className="auth-page">
      <div className="auth-container">
        {/* Left Side Logo */}
        <div className="auth-left">
          <Link to="/">
            <img src={logo} alt="We Konnects" className="auth-logo" />
          </Link>
        </div>

        {/* Right Side Form */}
        <div className="auth-right">
          <div className="auth-box">
            <h4 className="welcome-text">Welcome to We Konnects</h4>
            <h2 className="auth-title">Login to your Account</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Email Field */}
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}

              {/* Password Field */}
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}

              <button type="submit" className="auth-btn">
                Login
              </button>
            </form>

            <p className="auth-footer">
              New user?{" "}
              <Link to="/signup" className="auth-link">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}