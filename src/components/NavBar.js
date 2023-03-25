import { Link, useLocation } from "react-router-dom";

// NAVIGATION BAR COMPONENT
function NavBar({ email, onHamburgerClick, isOpen, onLogOut }) {
  // VARIABLES WITH HOOKS
  const location = useLocation();
  // HANDLE ELEMENT TOGGLE
  function handleElementToggle() {
    if (location.pathname === "/sign-in") {
      return (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      );
    } else if (location.pathname === "/sign-up") {
      return (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      );
    } else {
      return (
        <>
          <p className="header__user-email">{email || ""}</p>
          <button
            type="button"
            className="header__btn-sign-out"
            onClick={onLogOut}
          >
            Выйти
          </button>
          <button
            type="button"
            className={`header__btn-hamburger ${
              isOpen ? "header__btn-hamburger_type_close" : ""
            }`}
            onClick={onHamburgerClick}
          ></button>
        </>
      );
    }
  }
  return <div className="header__nav">{handleElementToggle()}</div>;
}

export default NavBar;
