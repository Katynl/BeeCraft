import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

const focusClass =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4aa2a] focus-visible:ring-offset-2";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

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
      return;
    }

    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
    closeMenu();
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-stone-50/80 px-6 py-4 shadow-sm backdrop-blur-sm md:px-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => goTo("/")}
            aria-label="Перейти на главную страницу"
            className={`text-base font-medium tracking-wide text-stone-800 transition-colors duration-300 hover:text-[#d4aa2a] md:text-2xl ${focusClass}`}
          >
            <span className="text-[#d4aa2a]">BEE</span> CRAFT
          </button>

          <nav className="hidden space-x-6 font-medium md:flex" aria-label="Основная навигация">
            <NavLink onClick={() => goTo("/")}>Главная</NavLink>
            <NavLink onClick={() => goTo("/about")}>О нас</NavLink>
            <NavLink onClick={() => goTo("/catalog")}>Каталог</NavLink>
            <NavLink onClick={() => goTo("/news")}>Новости</NavLink>
            <NavLink onClick={() => goTo("/contacts")}>Контакты</NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => goTo("/cart")}
            className={`relative rounded-sm p-1 transition-colors hover:text-[#d4aa2a] ${focusClass}`}
            aria-label={`Корзина${totalItems > 0 ? `, товаров: ${totalItems}` : ""}`}
          >
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            {totalItems > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-sm bg-[#d4aa2a] text-xs font-medium text-stone-800"
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {isProfilePage ? (
            <button
              type="button"
              onClick={handleLogout}
              className={`rounded-sm bg-stone-100 px-4 py-2 text-sm transition hover:bg-rose-100 hover:text-rose-600 ${focusClass}`}
            >
              Выйти
            </button>
          ) : (
            <button
              type="button"
              onClick={() => goTo("/profile")}
              className={`rounded-sm p-1 transition-colors hover:text-[#d4aa2a] ${focusClass}`}
              aria-label="Профиль"
            >
              <UserIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          )}

          <button
            type="button"
            className={`rounded-sm p-1 transition-colors hover:text-[#d4aa2a] md:hidden ${focusClass}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMenuOpen ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="flex flex-col space-y-3 border-t border-stone-200 pb-4 pt-4 font-medium"
          aria-label="Мобильная навигация"
        >
          <MobileNavLink onClick={() => goTo("/")}>Главная</MobileNavLink>
          <MobileNavLink onClick={() => goTo("/about")}>О нас</MobileNavLink>
          <MobileNavLink onClick={() => goTo("/catalog")}>Каталог</MobileNavLink>
          <MobileNavLink onClick={() => goTo("/news")}>Новости</MobileNavLink>
          <MobileNavLink onClick={() => goTo("/contacts")}>Контакты</MobileNavLink>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative rounded-sm text-stone-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#d4aa2a] after:transition-all after:duration-300 hover:text-stone-800 hover:after:w-full ${focusClass}`}
  >
    {children}
  </button>
);

const MobileNavLink = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-sm py-1 text-left text-stone-600 transition-colors hover:text-stone-800 ${focusClass}`}
  >
    {children}
  </button>
);

export default Navbar;