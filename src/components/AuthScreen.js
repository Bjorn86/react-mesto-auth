import { Link } from "react-router-dom";

// AUTHORIZATION SCREEN COMPONENT
function AuthScreen({
  name,
  title,
  buttonText,
  onSubmit,
  isFormValid,
  ...props
}) {
  return (
    <section className="authorization">
      <div className="authorization__wrapper">
        <h2 className="authorization__title">{title}</h2>
        <form
          action="#"
          name={`${name}`}
          id={`${name}`}
          noValidate
          className="form form_place_authorization"
          onSubmit={onSubmit}
        >
          {props.children}
          <button
            type="submit"
            form={`${name}`}
            className="form__btn-submit form__btn-submit_place_authorization"
            disabled={isFormValid ? false : true}
          >
            {buttonText}
          </button>
        </form>
        {name === "registr" && (
          <p className="authorization__text">
            Уже зарегистрированы?{" "}
            <Link
              to="/sign-in"
              className="authorization__text authorization__link"
            >
              Войти
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default AuthScreen;
