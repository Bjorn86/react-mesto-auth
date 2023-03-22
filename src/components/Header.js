import { Link } from "react-router-dom";

// HEADER COMPONENT
function Header() {
  return (
    <header className="header">
      <div className="logo header__logo"></div>
      {window.location.href.indexOf("sign-in") > -1 ? (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      ) : (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
