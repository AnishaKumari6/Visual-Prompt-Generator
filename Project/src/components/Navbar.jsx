import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4 text-white">
        
        {/* Website Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition group">
          <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            PromptLens
          </span>
        </Link>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-6 text-gray-300">
          <Link to="/about" className="hover:text-white transition text-sm font-medium">
            About
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white/80 hidden md:block">
                Hi, <span className="text-purple-400">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-red-400/50 hover:text-red-300 transition-all text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-5 py-2 rounded-full text-sm font-medium hover:text-white transition"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:scale-105 transition shadow-lg hover:shadow-white/20"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
