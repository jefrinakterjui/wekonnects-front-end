import "../styles/auth.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../api/api";

export default function SignupPage() {
  const navigate = useNavigate();

  // ==== Form State ====
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    referral: "",
  });

  // ==== Error State ====
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ==== Loading State ====
  const [isLoading, setIsLoading] = useState(false);

  // ==== Handle Input Change ====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ==== Validation ====
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: typeof errors = {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Phone (Indian format)
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter valid Indian number (+91 followed by 10 digits)";
      isValid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please re-enter password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ==== Handle Submit ====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    const loadingToast = toast.loading("Creating your account...");
    setIsLoading(true);

    try {
      // This matches your Postman body + includes phone & optional referral
      await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: "user", // as per your Postman example
        phone: formData.phone, // your form has this field
        referralCode: formData.referral.trim() || undefined, // optional
      });

   toast.success("Account created successfully! Please log in.", {
        id: loadingToast,
      });
      navigate("/login");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Signup failed. Please try again.";
     toast.error(message, { id: loadingToast });
    } finally {
      setIsLoading(false);
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
            <h2 className="auth-title">Create Your Account</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Name */}
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}

              {/* Phone */}
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}

              {/* Email */}
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}

              {/* Password */}
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}

              {/* Confirm Password */}
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}

              {/* Referral (Optional) */}
              <label>Referral Code (Optional)</label>
              <input
                type="text"
                name="referral"
                placeholder="Enter referral code"
                value={formData.referral}
                onChange={handleChange}
                disabled={isLoading}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="auth-btn"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="auth-footer">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}