import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Navbar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const go = (page) => {
    setOpen(false);

    switch (page) {
      case "landing":
        navigate("/");
        break;
      case "login":
        navigate("/login");
        break;
      case "register":
        navigate("/register");
        break;
      case "user-dashboard":
        navigate("/dashboard");
        break;
      case "search-jobs":
        navigate("/jobs");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "track":
        navigate("/track");
        break;
      case "about":
        navigate("/about");
        break;
      default:
        navigate("/");
    }
  };

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            onClick={() =>
              go(currentUser ? "user-dashboard" : "landing")
            }
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="bg-white/20 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              JobPortal
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {!currentUser ? (
              <>
                <button
                  onClick={() => go("login")}
                  className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-medium rounded-xl hover:bg-white/30 transition-all"
                >
                  Login
                </button>

                <button
                  onClick={() => go("register")}
                  className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-xl hover:scale-105 transition-all"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>

                {/* Profile Icon */}
                <div
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
                >
                  <span className="text-white font-semibold">
                    {currentUser?.name?.charAt(0) || "U"}
                  </span>
                </div>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 mt-3 w-52 
                    bg-blue-500/90 backdrop-blur-2xl
                    border border-blue-300/30
                    rounded-2xl shadow-2xl
                    overflow-hidden
                    animate-fadeIn">

                    <button
                      onClick={() => go("profile")}
                      className="block w-full text-left px-5 py-3 text-white hover:bg-white/20 transition-all"
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => go("user-dashboard")}
                      className="block w-full text-left px-5 py-3 text-white hover:bg-white/20 transition-all"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={() => go("track")}
                      className="block w-full text-left px-5 py-3 text-white hover:bg-white/20 transition-all"
                    >
                      Track Jobs
                    </button>

                    <button
                      onClick={() => go("search-jobs")}
                      className="block w-full text-left px-5 py-3 text-white hover:bg-white/20 transition-all"
                    >
                      Find Job
                    </button>

                    <button
                      onClick={() => go("about")}
                      className="block w-full text-left px-5 py-3 text-white hover:bg-white/20 transition-all"
                    >
                      About
                    </button>

                    <div className="border-t border-white/20" />

                    <button
                      onClick={onLogout}
                      className="block w-full text-left px-5 py-3 text-red-200 hover:bg-red-500/20 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;