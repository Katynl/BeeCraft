import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isProfilePage = location.pathname === "/profile";

  const goTo = (path) => {
    const token = localStorage.getItem("access_token");
    const protectedRoutes = ["/profile", "/orders"];
    if (protectedRoutes.includes(path) && !token) {
      localStorage.setItem("redirectAfterLogin", path);
      if (window.confirm("Войдите или зарегистрируйтесь")) {
        navigate("/login");
      }
    } else {
      navigate(path);
      closeMenu();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
    closeMenu();
  };

  return (
    <header className="fixed top-0 w-full bg-stone-50/80 backdrop-blur-sm py-4 px-6 md:px-12 z-50 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button
            onClick={() => goTo("/")}
            className="text-base md:text-2xl font-medium tracking-wide text-stone-800 hover:text-[#d4aa2a] transition-colors duration-300"
          >
            <span className="text-[#d4aa2a]">BEE</span> CRAFT
          </button>
          <nav className="hidden font-medium font-plexsans md:flex space-x-6">
            <NavLink onClick={() => goTo("/")}>Главная</NavLink>
            <NavLink onClick={() => goTo("/about")}>О нас</NavLink>
            <NavLink onClick={() => goTo("/catalog")}>Каталог</NavLink>
            <NavLink onClick={() => goTo("/news")}>Новости</NavLink>
            <NavLink onClick={() => goTo("/contacts")}>Контакты</NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => goTo("/cart")}
            className="relative p-1 hover:text-[#d4aa2a] transition-colors"
            aria-label="Корзина"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4aa2a] text-stone-800 text-xs font-medium rounded-sm w-5 h-5 flex items-center justify-center animate-pulse">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {isProfilePage ? (
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-sm font-plexsans bg-stone-100 hover:bg-rose-100 hover:text-rose-600 transition"
            >
              Выйти
            </button>
          ) : (
            <button
              onClick={() => goTo("/profile")}
              className="p-1 hover:text-[#d4aa2a] transition-colors"
              aria-label="Профиль"
            >
              <UserIcon className="h-6 w-6" />
            </button>
          )}

          <button
            className="md:hidden p-1 hover:text-[#d4aa2a] transition-colors"
            onClick={toggleMenu}
            aria-label="Меню"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Мобильное меню (раскрывается/скрывается) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col font-medium space-y-3 pb-4 pt-4 font-plexsans border-t border-stone-200">
          <MobileNavLink onClick={() => goTo("/")}>Главная</MobileNavLink>
          <MobileNavLink onClick={() => goTo("/about")}>О нас</MobileNavLink>
          <MobileNavLink onClick={() => goTo("/catalog")}>
            Каталог
          </MobileNavLink>
          <MobileNavLink onClick={() => goTo("/news")}>Новости</MobileNavLink>
          <MobileNavLink onClick={() => goTo("/contacts")}>
            Контакты
          </MobileNavLink>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="relative text-stone-600 hover:text-stone-800 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#d4aa2a] after:transition-all after:duration-300 hover:after:w-full"
  >
    {children}
  </button>
);

const MobileNavLink = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-left text-stone-600 hover:text-stone-800 transition-colors py-1"
  >
    {children}
  </button>
);

export default Navbar;
