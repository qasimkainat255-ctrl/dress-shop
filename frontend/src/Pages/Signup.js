import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create account.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      setError("Unable to connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] px-6 py-16 text-[#3b2927]">

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

        {/* FORM */}
        <div className="order-2 flex items-center p-8 md:p-14 lg:order-1">
          <div className="w-full max-w-md">

            <p className="text-sm uppercase tracking-[0.25em] text-[#a66b6b]">
              Dress Shop
            </p>

            <h1 className="mt-3 font-serif text-4xl md:text-5xl">
              Create Account
            </h1>

            <p className="mt-3 text-[#765e5a]">
              Join us and discover your new favorite styles.
            </p>

            {error && (
              <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 outline-none focus:border-[#a66b6b]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 outline-none focus:border-[#a66b6b]"
              />

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company (Optional)"
                className="w-full rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 outline-none focus:border-[#a66b6b]"
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 pr-20 outline-none focus:border-[#a66b6b]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#a66b6b]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 pr-20 outline-none focus:border-[#a66b6b]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#a66b6b]"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#3b2927] py-4 font-semibold text-white transition hover:bg-[#a66b6b]"
              >
                Create Account
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#765e5a]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#a66b6b] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative order-1 hidden min-h-[650px] lg:order-2 lg:block">
          <img
            src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=80"
            alt="Fashion collection"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute bottom-12 left-10 right-10 text-white">
            <p className="text-sm uppercase tracking-[0.3em]">
              New Season
            </p>

            <h2 className="mt-3 font-serif text-5xl">
              Your wardrobe,
              <br />
              your story.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}