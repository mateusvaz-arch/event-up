import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const updateCount = () => {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavCount(favs.length);
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    const interval = setInterval(updateCount, 1000);

    return () => {
      window.removeEventListener("storage", updateCount);
      clearInterval(interval);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" onClick={closeMenu}>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "900",
              letterSpacing: "1px",
              color: "white",
            }}
          >
            EventUp
          </h2>
        </Link>
      </div>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        {user ? (
          <>
            <Link to="/" className={isActive("/")} onClick={closeMenu}>
              🏠 Home
            </Link>
            <Link
              to="/create"
              className={isActive("/create")}
              onClick={closeMenu}
            >
              ➕ Criar
            </Link>
            <Link
              to="/favorites"
              className={isActive("/favorites")}
              onClick={closeMenu}
            >
              ⭐ Favoritos
              {favCount > 0 && (
                <span
                  style={{
                    background: "var(--danger)",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "10px",
                    marginLeft: "4px",
                    verticalAlign: "middle",
                  }}
                >
                  {favCount}
                </span>
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="btn-logout"
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "1rem",
                textAlign: "left",
                fontSize: "1rem",
              }}
            >
              🚪 Sair
            </button>
          </>
        ) : (
          <Link to="/login" className={isActive("/login")} onClick={closeMenu}>
            🔑 Login
          </Link>
        )}
        <a href="/backlog.html" onClick={closeMenu}>
          📋 Backlog
        </a>
      </div>
    </nav>
  );
}
