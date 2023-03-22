// POPUP WITH FORM COMPONENT
function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
  ...props
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="popup__item-container">
        <h2 className="popup__title">{title}</h2>
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        ></button>
        <form
          action="#"
          name={`${name}`}
          id={`${name}`}
          className={`form form_type_${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          {props.children}
          <button
            type="submit"
            form={`${name}`}
            className="form__btn-submit"
            disabled={isFormValid ? false : true}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
