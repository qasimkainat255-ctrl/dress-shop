import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Unable to connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] px-6 py-16 text-[#3b2927]">

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

        {/* IMAGE */}
        <div className="relative hidden min-h-[650px] lg:block">
          <img
            src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80"
            alt="Fashion"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-12 left-10 right-10 text-white">
            <p className="text-sm uppercase tracking-[0.3em]">
              Welcome Back
            </p>

            <h2 className="mt-3 font-serif text-5xl">
              Your style awaits.
            </h2>
          </div>
        </div>

        {/* FORM */}
        <div className="flex items-center p-8 md:p-14">
          <div className="w-full max-w-md">

            <p className="text-sm uppercase tracking-[0.25em] text-[#a66b6b]">
              Dress Shop
            </p>

            <h1 className="mt-3 font-serif text-4xl md:text-5xl">
              Welcome Back
            </h1>

            <p className="mt-3 text-[#765e5a]">
              Login to continue shopping your favorite styles.
            </p>

            {error && (
              <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-[#eadbd6] bg-[#fffaf7] px-4 py-4 outline-none focus:border-[#a66b6b]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
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
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#3b2927] py-4 font-semibold text-white transition hover:bg-[#a66b6b]"
              >
                Login
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#765e5a]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#a66b6b] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}