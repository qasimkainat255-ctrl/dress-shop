import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setMobileMenu(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <style>{`

        /* =========================================
           NAVBAR
        ========================================== */

        .dress-navbar {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;

          background: rgba(255, 250, 248, 0.96);

          border-bottom: 1px solid rgba(62, 41, 41, 0.08);

          transition:
            all 0.3s ease;

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .dress-navbar.scrolled {
          box-shadow:
            0 8px 30px rgba(62, 41, 41, 0.08);
        }

        .navbar-container {
          max-width: 1280px;

          min-height: 82px;

          margin: 0 auto;

          padding: 0 32px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 30px;
        }

        /* =========================================
           LOGO
        ========================================== */

        .dress-logo {
          display: flex;

          align-items: center;

          gap: 12px;

          color: #3e2929;

          flex-shrink: 0;
        }

        .logo-mark {
          width: 44px;
          height: 44px;

          display: flex;

          align-items: center;
          justify-content: center;

          border: 1px solid #a56d6d;

          border-radius: 50%;

          color: #a56d6d;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 22px;

          font-style: italic;

          transition:
            all 0.3s ease;
        }

        .dress-logo:hover .logo-mark {
          background: #a56d6d;

          color: white;

          transform: rotate(-8deg);
        }

        .logo-text {
          display: flex;

          flex-direction: column;

          line-height: 1;
        }

        .logo-main {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 25px;

          font-weight: 500;

          letter-spacing: -0.5px;
        }

        .logo-sub {
          margin-top: 5px;

          color: #a56d6d;

          font-size: 8px;

          font-weight: 700;

          letter-spacing: 3px;

          text-transform: uppercase;
        }

        /* =========================================
           DESKTOP NAV LINKS
        ========================================== */

        .desktop-nav {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 34px;

          margin-left: auto;
        }

        .nav-link {
          position: relative;

          padding: 30px 0;

          color: #5a4643;

          font-size: 13px;

          font-weight: 600;

          transition:
            color 0.3s ease;
        }

        .nav-link::after {
          content: "";

          position: absolute;

          left: 50%;

          bottom: 20px;

          width: 0;

          height: 1px;

          background: #a56d6d;

          transform:
            translateX(-50%);

          transition:
            width 0.3s ease;
        }

        .nav-link:hover {
          color: #a56d6d;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .nav-link.active {
          color: #a56d6d;
        }

        /* =========================================
           RIGHT ACTIONS
        ========================================== */

        .navbar-actions {
          display: flex;

          align-items: center;

          gap: 8px;

          flex-shrink: 0;
        }

        .nav-icon-button {
          position: relative;

          width: 40px;
          height: 40px;

          border: none;

          border-radius: 50%;

          background: transparent;

          color: #3e2929;

          display: flex;

          align-items: center;
          justify-content: center;

          font-size: 19px;

          cursor: pointer;

          transition:
            all 0.3s ease;
        }

        .nav-icon-button:hover {
          background: #f4e4df;

          color: #a56d6d;

          transform: translateY(-2px);
        }

        .nav-count {
          position: absolute;

          top: 2px;
          right: 0;

          min-width: 17px;
          height: 17px;

          padding: 0 4px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #a56d6d;

          color: white;

          font-size: 8px;

          font-weight: 700;

          border: 2px solid #fffaf8;
        }

        /* =========================================
           LOGIN / USER
        ========================================== */

        .login-button {
          margin-left: 8px;

          min-height: 42px;

          padding: 0 20px;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          border-radius: 24px;

          background: #3e2929;

          color: white;

          font-size: 12px;

          font-weight: 700;

          transition:
            all 0.3s ease;
        }

        .login-button:hover {
          background: #a56d6d;

          transform: translateY(-2px);
        }

        .user-menu {
          position: relative;
        }

        .user-button {
          min-height: 42px;

          padding: 0 14px;

          display: flex;

          align-items: center;

          gap: 9px;

          border: 1px solid #ead7d2;

          border-radius: 24px;

          background: white;

          color: #3e2929;

          cursor: pointer;
        }

        .user-avatar {
          width: 27px;
          height: 27px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #f1ddd8;

          color: #a56d6d;

          font-size: 11px;

          font-weight: 700;
        }

        .user-name {
          max-width: 95px;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;

          font-size: 11px;

          font-weight: 700;
        }

        .user-dropdown {
          position: absolute;

          top: calc(100% + 10px);

          right: 0;

          width: 210px;

          padding: 10px;

          background: white;

          border: 1px solid #eee2de;

          border-radius: 16px;

          box-shadow:
            0 18px 45px rgba(62, 41, 41, 0.13);

          animation:
            dropdownIn 0.2s ease;
        }

        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .user-dropdown-name {
          padding: 12px;

          border-bottom: 1px solid #f0e4e0;
        }

        .user-dropdown-name strong {
          display: block;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 16px;

          font-weight: 500;
        }

        .user-dropdown-name span {
          display: block;

          margin-top: 4px;

          color: #8d7773;

          font-size: 10px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .dropdown-link {
          width: 100%;

          padding: 11px 12px;

          display: flex;

          align-items: center;

          border: none;

          border-radius: 9px;

          background: transparent;

          color: #4e3a37;

          font-size: 11px;

          text-align: left;

          cursor: pointer;
        }

        .dropdown-link:hover {
          background: #fbf0ed;

          color: #a56d6d;
        }

        .dropdown-logout {
          color: #ad5d5d;
        }

        /* =========================================
           SEARCH BAR
        ========================================== */

        .search-area {
          position: absolute;

          top: 100%;

          left: 0;

          width: 100%;

          padding: 18px 30px;

          background: rgba(255,255,255,0.98);

          border-bottom: 1px solid #eee2de;

          box-shadow:
            0 12px 30px rgba(62,41,41,0.08);
        }

        .search-inner {
          max-width: 800px;

          margin: 0 auto;

          position: relative;
        }

        .search-input {
          width: 100%;

          height: 50px;

          padding:
            0 50px
            0 20px;

          border: 1px solid #ead7d2;

          border-radius: 30px;

          outline: none;

          background: #fffaf8;

          color: #3e2929;

          font-size: 13px;
        }

        .search-input:focus {
          border-color: #a56d6d;

          box-shadow:
            0 0 0 3px rgba(165,109,109,0.08);
        }

        .search-close {
          position: absolute;

          right: 8px;

          top: 50%;

          width: 35px;
          height: 35px;

          border: none;

          border-radius: 50%;

          background: #f5e8e4;

          color: #3e2929;

          cursor: pointer;

          transform:
            translateY(-50%);
        }

        /* =========================================
           MOBILE TOGGLE
        ========================================== */

        .mobile-toggle {
          display: none;

          width: 42px;
          height: 42px;

          align-items: center;
          justify-content: center;

          flex-direction: column;

          gap: 5px;

          border: 1px solid #ead7d2;

          border-radius: 50%;

          background: white;

          cursor: pointer;
        }

        .mobile-toggle span {
          width: 18px;

          height: 1.5px;

          display: block;

          background: #3e2929;

          transition:
            all 0.3s ease;
        }

        .mobile-menu {
          display: none;
        }

        /* =========================================
           MOBILE
        ========================================== */

        @media (max-width: 950px) {

          .desktop-nav {
            display: none;
          }

          .navbar-actions .login-button,
          .navbar-actions .user-menu {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .mobile-menu {
            position: absolute;

            top: 100%;

            left: 0;

            width: 100%;

            display: flex;

            flex-direction: column;

            padding: 15px 20px 25px;

            background: rgba(255,250,248,0.98);

            border-bottom: 1px solid #eee2de;

            box-shadow:
              0 15px 30px rgba(62,41,41,0.08);

            animation:
              mobileMenuIn 0.25s ease;
          }

          @keyframes mobileMenuIn {
            from {
              opacity: 0;

              transform:
                translateY(-8px);
            }

            to {
              opacity: 1;

              transform:
                translateY(0);
            }
          }

          .mobile-link {
            padding: 15px 10px;

            border-bottom: 1px solid #f0e4e0;

            color: #4e3a37;

            font-size: 13px;

            font-weight: 600;
          }

          .mobile-link.active {
            color: #a56d6d;
          }

          .mobile-auth {
            padding-top: 15px;

            display: grid;

            grid-template-columns: 1fr 1fr;

            gap: 10px;
          }

          .mobile-auth a,
          .mobile-auth button {
            min-height: 45px;

            display: flex;

            align-items: center;
            justify-content: center;

            border-radius: 25px;

            font-size: 12px;

            font-weight: 700;
          }

          .mobile-login {
            border: 1px solid #3e2929;

            color: #3e2929;
          }

          .mobile-signup {
            border: none;

            background: #3e2929;

            color: white;
          }

          .mobile-logout {
            grid-column: span 2;

            border: none;

            background: #f5e2de;

            color: #a56d6d;

            cursor: pointer;
          }
        }

        @media (max-width: 600px) {

          .navbar-container {
            min-height: 72px;

            padding: 0 18px;
          }

          .logo-mark {
            width: 39px;
            height: 39px;

            font-size: 20px;
          }

          .logo-main {
            font-size: 21px;
          }

          .logo-sub {
            font-size: 7px;

            letter-spacing: 2px;
          }

          .navbar-actions {
            gap: 3px;
          }

          .nav-icon-button {
            width: 37px;
            height: 37px;

            font-size: 17px;
          }
        }

      `}</style>

      {/* ==================================================
          NAVBAR
      =================================================== */}

      <header
        className={`dress-navbar ${
          scrolled ? "scrolled" : ""
        }`}
      >

        <div className="navbar-container">

          {/* LOGO */}

          <Link
            to="/"
            className="dress-logo"
          >

            <div className="logo-mark">
              D
            </div>

            <div className="logo-text">

              <span className="logo-main">
                Dress Shop
              </span>

              <span className="logo-sub">
                Elegance Everyday
              </span>

            </div>

          </Link>

          {/* DESKTOP NAV */}

          <nav className="desktop-nav">

            <Link
              to="/"
              className={`nav-link ${
                isActive("/") ? "active" : ""
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className={`nav-link ${
                isActive("/shop") ? "active" : ""
              }`}
            >
              Shop
            </Link>

            <Link
              to="/about"
              className={`nav-link ${
                isActive("/about") ? "active" : ""
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`nav-link ${
                isActive("/contact") ? "active" : ""
              }`}
            >
              Contact
            </Link>

          </nav>

          {/* RIGHT ACTIONS */}

          <div className="navbar-actions">

            {/* SEARCH */}

            <button
              type="button"
              className="nav-icon-button"
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              aria-label="Search"
            >
              ⌕
            </button>

            {/* WISHLIST */}

            <button
              type="button"
              className="nav-icon-button"
              onClick={() =>
                navigate("/wishlist")
              }
              aria-label="Wishlist"
            >
              ♡

              <span className="nav-count">
                0
              </span>
            </button>

            {/* CART */}

            <button
              type="button"
              className="nav-icon-button"
              onClick={() =>
                navigate("/cart")
              }
              aria-label="Cart"
            >
              🛍

              <span className="nav-count">
                0
              </span>
            </button>

            {/* USER */}

            {user ? (

              <UserMenu
                user={user}
                handleLogout={handleLogout}
                navigate={navigate}
              />

            ) : (

              <Link
                to="/login"
                className="login-button"
              >
                Login
              </Link>

            )}

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              className="mobile-toggle"
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              aria-label="Toggle menu"
            >

              <span
                style={{
                  transform: mobileMenu
                    ? "rotate(45deg) translate(4px, 5px)"
                    : "none",
                }}
              />

              <span
                style={{
                  opacity: mobileMenu ? 0 : 1,
                }}
              />

              <span
                style={{
                  transform: mobileMenu
                    ? "rotate(-45deg) translate(4px, -5px)"
                    : "none",
                }}
              />

            </button>

          </div>

        </div>

        {/* SEARCH AREA */}

        {searchOpen && (

          <div className="search-area">

            <div className="search-inner">

              <input
                autoFocus
                className="search-input"
                type="text"
                placeholder="Search dresses, collections, styles..."
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    e.target.value.trim()
                  ) {
                    navigate(
                      `/shop?search=${encodeURIComponent(
                        e.target.value.trim()
                      )}`
                    );
                  }

                }}
              />

              <button
                type="button"
                className="search-close"
                onClick={() =>
                  setSearchOpen(false)
                }
              >
                ×
              </button>

            </div>

          </div>

        )}

        {/* MOBILE MENU */}

        {mobileMenu && (

          <div className="mobile-menu">

            <Link
              to="/"
              className={`mobile-link ${
                isActive("/") ? "active" : ""
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className={`mobile-link ${
                isActive("/shop") ? "active" : ""
              }`}
            >
              Shop
            </Link>

            <Link
              to="/about"
              className={`mobile-link ${
                isActive("/about") ? "active" : ""
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`mobile-link ${
                isActive("/contact") ? "active" : ""
              }`}
            >
              Contact
            </Link>

            {user ? (

              <div className="mobile-auth">

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="mobile-login"
                  >
                    Admin Panel
                  </Link>
                )}

                <Link
                  to="/"
                  className="mobile-signup"
                >
                  My Account
                </Link>

                <button
                  type="button"
                  className="mobile-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>

            ) : (

              <div className="mobile-auth">

                <Link
                  to="/login"
                  className="mobile-login"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="mobile-signup"
                >
                  Create Account
                </Link>

              </div>

            )}

          </div>

        )}

      </header>
    </>
  );
}

/* =====================================================
   USER MENU COMPONENT
===================================================== */

function UserMenu({
  user,
  handleLogout,
  navigate,
}) {
  const [open, setOpen] = useState(false);

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="user-menu">

      <button
        type="button"
        className="user-button"
        onClick={() =>
          setOpen(!open)
        }
      >

        <span className="user-avatar">
          {firstLetter}
        </span>

        <span className="user-name">
          {user.name}
        </span>

        <span style={{ fontSize: "10px" }}>
          {open ? "⌃" : "⌄"}
        </span>

      </button>

      {open && (

        <div className="user-dropdown">

          <div className="user-dropdown-name">

            <strong>
              {user.name}
            </strong>

            <span>
              {user.email}
            </span>

          </div>

          <button
            type="button"
            className="dropdown-link"
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
          >
            My Account
          </button>

          {user.role === "admin" && (

            <button
              type="button"
              className="dropdown-link"
              onClick={() => {
                setOpen(false);
                navigate("/admin");
              }}
            >
              Admin Panel
            </button>

          )}

          <button
            type="button"
            className="dropdown-link"
            onClick={() => {
              setOpen(false);
              navigate("/wishlist");
            }}
          >
            My Wishlist
          </button>

          <button
            type="button"
            className="dropdown-link"
            onClick={() => {
              setOpen(false);
              navigate("/cart");
            }}
          >
            My Cart
          </button>

          <button
            type="button"
            className="dropdown-link dropdown-logout"
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
          >
            Logout
          </button>

        </div>

      )}

    </div>
  );
}